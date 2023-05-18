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
    private readonly object _lockClients = new object();

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
            var token = input.HttpRequest.Headers.Get("token");

            if (string.IsNullOrWhiteSpace(token))
            {
                // invalid token. disconnect user
                Console.WriteLine("[AUTH] Error Token Not Found...");
                server.DisconnectClient(input.Client.Guid);
                return;
            }

            Console.WriteLine("Verify token...");
            var result = MasterClient.IsValid(token);
            if (result.isValid is false)
            {
                // invalid token. disconnect user
                Console.WriteLine("[AUTH] Error Invalid Token...");
                server.DisconnectClient(input.Client.Guid);
                return;
            }

            var client = new MasterClient(input.Client.Guid, token, sub: string.Empty, result.rootAccess);

            lock (_lockClients)
            {
                clients.Add(client);
                Console.WriteLine($"[AUTH] Client Connected (root: {result.rootAccess})");
                Console.WriteLine($"[INFO] Clients: {clients.Count}");
            }
        };

        server.MessageReceived += (_, input) =>
        {
            Console.WriteLine($"Client receive: {Encoding.UTF8.GetString(input.Data.ToArray())}");
        };

        server.ClientDisconnected += (_, input) =>
        {
            lock (_lockClients)
            {
                foreach (var client in clients)
                {
                    if (input.Client.Guid.ToString() == client.guid.ToString())
                    {
                        clients.Remove(client);
                        Console.WriteLine("[AUTH] Client Disconnected");
                        Console.WriteLine($"[INFO] Clients: {clients.Count}");
                        return;
                    }
                }
            }

            Console.WriteLine("[INVALID TOKEN] Client Disconnected");
        };

        Task.Run(async () =>
        {
            await server.StartAsync();
            Console.WriteLine($"[SERVER RUN] at ws://{address}:{port}/");
        });
    }
}