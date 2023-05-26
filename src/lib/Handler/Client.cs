using Newtonsoft.Json;
using Sisma.Controller;
using Sisma.Core;
using Sisma.Models;
using System.Net.Http.Headers;
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

        public readonly RootController? rootController;

        public Client(User user, ConnectionEventArgs connection, Server server)
        {
            User = user;
            Server = server;
            Connection = connection;

            if (user.SuperUser)
            {
                rootController = new RootController(this);
            }
        }

        private void Init()
        {
            Dictionary<string, string> response = new Dictionary<string, string>();

            string message = (User.SuperUser) ? "AUTH_ROOT_SUCCESS" : "AUTH_USER_SUCCESS";

            response.Add(KEY, message);

            string json = JsonConvert.SerializeObject(response);

            Send(json);
        }

        internal void OnDisconnect()
        {
            Server.Clients.Remove(this);
            Output.Show($"CLIENT {User.UID} -> DISCONNECTED");
        }

        internal void OnMessage(byte[] buffer, WebSocketMessageType type)
        {
            string json = Encoding.UTF8.GetString(buffer);

            Output.Show($"ON MESSAGE {User.UID} -> RAW: {json}");

            rootController?.OnMessage(buffer);
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
            string token = string.Empty;

            var path = connection.HttpRequest.Url?.AbsolutePath;

            if (!string.IsNullOrWhiteSpace(path) && path.Length > 1)
            {
                foreach (var c in path.ToArray())
                {
                    if (c != ' ' && c != '/')
                    {
                        token += c;
                    }
                }

                Output.Show(token);
            }
            else
            {
                Output.Show("Invalid token");
            }

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

                    var auth = JsonConvert.DeserializeObject<Template.Auth>(json);

                    if (auth == null)
                    {
                        throw new Exception("Invalid token body");
                    }

                    int timestamp = (int)DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds;

                    if (auth.exp < timestamp)
                    {
                        throw new Exception($"Invalid expired: min value is {timestamp}");
                    }

                    Output.Show(timestamp);

                    user = new User(auth.sub, token, auth.level, false);
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
    }
}
