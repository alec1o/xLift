using Newtonsoft.Json;
using Sisma.Core;
using Sisma.Models;
using System.Diagnostics.CodeAnalysis;
using System.Net.WebSockets;
using System.Text;
using WatsonWebsocket;

namespace Sisma.Handler
{
    public class Client
    {
        public const string KEY = "sisma";

        public User User { get; set; }
        public Match? Match { get; set; }
        public ConnectionEventArgs Connection { get; set; }
        public Server Server { get; set; }

        public Client(User user, ConnectionEventArgs connection, Server server)
        {
            User = user;
            Server = server;
            Connection = connection;
        }

        private void Init()
        {
            Dictionary<string, string> response = new Dictionary<string, string>();

            string message = (User.SuperUser) ? "AUTH_ROOT_SUCCESS" : "AUTH_USER_SUCCESS";

            response.Add(KEY, message);

            string json = JsonConvert.SerializeObject(response);

            Send(json);
        }

        public void Send(byte[] buffer)
        {
            Server.Socket.SendAsync(Connection.Client.Guid, buffer, WebSocketMessageType.Text);
        }

        public void Send(string buffer)
        {
            Send(Encoding.UTF8.GetBytes(buffer));
        }

        public static void Auth(ConnectionEventArgs connection, Server server)
        {
            string token = connection.HttpRequest.Headers.Get("token") ?? string.Empty;

            if (string.IsNullOrWhiteSpace(token))
            {
                server.Socket.DisconnectClient(connection.Client.Guid);
                return;
            }

            User user;

            if (token == Config.SISMA_ROOT_KEY)
            {
                user = new User(uid: "", token: token, level: 0, superUser: true);

                Output.Show("[ROOT USER CONNECTED]");
                Output.Show($"{nameof(token)} -> {token}");

                Output.Show($"{nameof(Config.SISMA_ROOT_KEY)} -> {Config.SISMA_ROOT_KEY}");
            }
            else
            {
                var password = Encoding.ASCII.GetBytes(Config.SISMA_JWT_KEY);

                try
                {
                    string json = Jose.JWT.Decode(token, password);

                    if (string.IsNullOrWhiteSpace(json))
                    {
                        throw new Exception("Invalid token");
                    }

                    Output.Show("Token: " + json);

                    var content = JsonConvert.DeserializeObject<TokenContent>(json);

                    if (content == null)
                    {
                        throw new Exception("Invalid token body");
                    }

                    int timestamp = (int)DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;

                    if (content.exp < timestamp)
                    {
                        throw new Exception($"Invalid expired: min value is {timestamp}");
                    }

                    Output.Show(timestamp);

                    user = new User(content.sub, token, content.level, false);
                }
                catch (Exception e)
                {
                    Output.Show(e);
                    server.Socket.DisconnectClient(connection.Client.Guid);
                    return;
                }
            }

            // create client instance            
            Client client = new Client(user, connection, server);

            // add client on list of clients
            server.Clients.Add(client);

            client.Init();
        }

        private class TokenContent
        {
            [AllowNull]
            public string sub { get; set; }
            public int level { get; set; }
            public long exp { get; set; }
        }
    }
}
