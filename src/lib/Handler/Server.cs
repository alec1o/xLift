using Sisma.Models;
using System.Net;
using WatsonWebsocket;

namespace Sisma.Handler;

public class Server
{
    public readonly (string address, int port) Host;
    public readonly List<Room> Rooms;
    public readonly List<Match> Matches;
    public readonly List<Client> Clients;
    public readonly WatsonWsServer Socket;

    public Server((string address, int port) host)
    {
        Host = host;
        Rooms = new List<Room>();
        Matches = new List<Match>();
        Clients = new List<Client>();
        Socket = new WatsonWsServer(host.address, host.port, false);

        Socket.ClientConnected += (_, connection) =>
        {
            Auth(connection);
        };

        Socket.ServerStopped += (_, o) =>
        {
            Clients.Clear();
            Console.WriteLine("[WEBSOCKET SERVER CLOSED]");
        };

        Socket.Start();
        Console.WriteLine($"[WEBSOCKET SERVER STARTED] {host}");
    }

    private void Auth(ConnectionEventArgs client)
    {
        Console.WriteLine($"[CLIENT] Connected ({client.Client.Ip}, {client.Client.Port})");
    }
}
