using System.Net;
using System.Text;
using WatsonWebsocket;

namespace Sisma;

public class MasterServer
{
    public readonly IPAddress address;
    public readonly int port;
    public readonly WatsonWsServer server;

    public MasterServer(string address, int port)
    {
        this.address = IPAddress.Parse(address);
        this.port = port;
        this.server = new WatsonWsServer(address, port, false);
    }

    public void Init()
    {
        server.ServerStopped += (a, b) =>
        {
            Console.WriteLine("[WEBSOCKET STOPED]");
        };

        server.ClientConnected += (a, b) =>
        {
            Console.WriteLine("Client connected: " + (new IPEndPoint(IPAddress.Parse(b.Client.Ip), b.Client.Port)).ToString());

            var h = b.HttpRequest.Headers;

            foreach (var i in h.AllKeys)
            {
                if (string.IsNullOrWhiteSpace(i)) continue;

                Console.WriteLine($"--> {i}: {h.Get(i)}");
            }

        };

        server.MessageReceived += (a, b) =>
        {
            Console.WriteLine($"Client receive: {Encoding.UTF8.GetString(b.Data.ToArray())}");
        };

        server.ClientDisconnected += (a, b) =>
        {
            Console.WriteLine("Client disconnected: " + (new IPEndPoint(IPAddress.Parse(b.Client.Ip), b.Client.Port)).ToString());
        };

        Task.Run(async () =>
        {
            await server.StartAsync();
            Console.WriteLine($"[SERVER RUN] at ws://{address}:{port}/");
        });
    }
}