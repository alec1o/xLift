using System.Net.WebSockets;
using System.Text;

namespace Sisma;

public class Room
{
    public readonly string guid;
    public readonly string dockerImage;
    public readonly int minClient;
    public readonly int maxClient;
    public readonly int incrementTimeout;
    public readonly int matchmakingTimeout;
    public readonly MasterServer server;
    public readonly List<MasterClient> clients;
    public bool done { get; private set; }
    private readonly object _lock = new object();
    private readonly DateTime createdAt = DateTime.Now;
    private bool incrementStarted;

    public Room(MasterServer server, string dockerImage, int minClient, int maxClient, int matchmakingTimeout, int incrementTimeout)
    {
        this.guid = Guid.NewGuid().ToString();
        this.dockerImage = dockerImage;
        this.minClient = minClient;
        this.maxClient = maxClient;
        this.matchmakingTimeout = matchmakingTimeout;
        this.incrementTimeout = incrementTimeout;
        this.server = server;
        this.clients = new List<MasterClient>();

        Init();
    }

    public bool AddClient(MasterClient client)
    {
        lock (_lock)
        {
            if (done || clients.Count >= maxClient)
            {
                return false;
            }

            clients.Add(client);

            // check this room is avaliable to start match
            if (clients.Count >= minClient)
            {
                // start increment user on room with timer because house isn't full
                if (incrementStarted is false && clients.Count < maxClient)
                {
                    incrementStarted = true;

                    ThreadPool.QueueUserWorkItem(_ =>
                    {
                        // increment time to try add more client on room
                        Thread.Sleep(incrementTimeout);
                        done = true;
                        StartMatch();
                    });
                }
                else
                {
                    done = true;

                    StartMatch();
                }
            }

            return true;
        }
    }

    private void StartMatch()
    {
        // todo: init docker container
        // toodo: get docker port bind

        // Mock bing
        byte[] data = Encoding.UTF8.GetBytes("{\"message\": \"matchmaking-done\", \"host\":{\"ip\":\"127.0.0.1\", \"ports\": [{\"tcp-chat\":2000}, {\"tcp-game\":2000}, {\"udp-game\":2000}]}");
        List<Task> tasks = new List<Task>();

        foreach (var client in clients)
        {
            tasks.Add(server.server.SendAsync(client.guid, data, WebSocketMessageType.Text));
        }

        Task.WaitAll(tasks.ToArray());
    }

    private void StopMatch()
    {
        byte[] data = Encoding.UTF8.GetBytes("{\"message\": \"matchmaking-timeout\"}");
        List<Task> tasks = new List<Task>();

        foreach (var client in clients)
        {
            tasks.Add(server.server.SendAsync(client.guid, data, WebSocketMessageType.Text));
        }

        Task.WaitAll(tasks.ToArray());
    }

    private void Init()
    {
        ThreadPool.QueueUserWorkItem(_ =>
        {
            Thread.Sleep(matchmakingTimeout);

            if (clients.Count < minClient && incrementStarted is false)
            {
                // matchmaking timeout message
                StopMatch();
            }
            else
            {
                done = true;
                incrementStarted = true;
                clients.Clear();
            }
        });

        server.server.ClientDisconnected += (_, client) =>
        {
            lock (_lock)
            {
                foreach (var target in clients)
                {
                    if (target.guid.ToString() == client.Client.Guid.ToString())
                    {
                        clients.Remove(target);
                        return;
                    }
                }
            }
        };
    }
}
