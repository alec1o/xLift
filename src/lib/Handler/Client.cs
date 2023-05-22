using Sisma.Models;
using System.Net.WebSockets;
using System.Text;
using WatsonWebsocket;

namespace Sisma.Handler
{
    public class Client
    {
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

        }
    }
}
