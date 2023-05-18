using System.Net;
using System.Text;
using WatsonWebsocket;

namespace Sisma;

public class MasterServer
{
    public readonly IPAddress address;
    public readonly int port;
    public readonly WatsonWsServer server;
    public readonly List<MasterClient> clients;

    public MasterServer(string address, int port)
    {
        this.address = IPAddress.Parse(address);
        this.port = port;
        this.server = new WatsonWsServer(address, port, false);
        this.clients = new List<MasterClient>();
    }

    public void Init()
    {
        server.ServerStopped += (_, input) =>
        {
            Console.WriteLine("[WEBSOCKET STOPED]");
        };

        server.ClientConnected += (_, input) =>
        {
            Console.WriteLine("Connecting client...");

            var token = input.HttpRequest.Headers.Get("token");

            if (string.IsNullOrWhiteSpace(token))
            {
                // invalid token. disconnect user
                Console.WriteLine("Error on connect...");
                server.DisconnectClient(input.Client.Guid);
                return;
            }

            Console.WriteLine("Verify token...");
            var data = MasterClient.VerifyJwt(token);

            if (data == null)
            {
                // invalid token. disconnect user
                Console.WriteLine("Error on connect...");
                server.DisconnectClient(input.Client.Guid);
                return;
            }

            Console.WriteLine("Client connected: " + (new IPEndPoint(IPAddress.Parse(input.Client.Ip), input.Client.Port)).ToString());
        };

        server.MessageReceived += (_, input) =>
        {
            Console.WriteLine($"Client receive: {Encoding.UTF8.GetString(input.Data.ToArray())}");
        };

        server.ClientDisconnected += (_, input) =>
        {
            Console.WriteLine("Client disconnected: " + (new IPEndPoint(IPAddress.Parse(input.Client.Ip), input.Client.Port)).ToString());
        };

        Task.Run(async () =>
        {
            await server.StartAsync();
            Console.WriteLine($"[SERVER RUN] at ws://{address}:{port}/");
        });
    }
}