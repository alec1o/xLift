using Newtonsoft.Json;
using Sisma.Core;
using Sisma.Models;
using System.Diagnostics.CodeAnalysis;

namespace Sisma.Handler
{
    public static class Matchmaking
    {
        public static object m_lock = new();
        public static List<Match> matches = new();
        public static List<(List<Client> clients, DateTime limit, Room room)> queues = new();
        [AllowNull] private static Server server;
        private static bool inited = false;

        public static void Init(Server server)
        {
            if (inited || server == null) return;

            Matchmaking.inited = true;
            Matchmaking.server = server;


            ThreadPool.QueueUserWorkItem(_ => Checker());
        }

        private static void Checker()
        {
            while (Matchmaking.inited)
            {
                var m_queues = queues.ToArray();
                foreach (var queue in m_queues)
                {
                    // init match full user
                    if (queue.clients.Count >= queue.room.MaxUser)
                    {
                        Output.Show("MATCHMAKING ROOM FULL");
                        lock (m_lock)
                        {
                            User[] users = queue.clients.Select(x => x.User).ToArray();

                            if (users != null && users.Length > 0)
                            {
                                ThreadPool.QueueUserWorkItem(_ =>
                                {
                                    // 1. init docker image
                                    Host host = new Host(server.Host.address, new List<Port> { new Port("random", new Random().Next(1, 65535)) }, queue.room.Mode, queue.room.UID ?? string.Empty);

                                    var match = new Match(Guid.NewGuid().ToString(), false, host, users);

                                    var r = new Dictionary<string, dynamic>();
                                    r.Add("sisma", "MATCH_ENTER.RESULT");
                                    r.Add("success", true);
                                    r.Add("match", match);
                                    var data = JsonConvert.SerializeObject(r);
                                    foreach (var c in queue.clients)
                                    {
                                        c.Send(data);
                                    }
                                });
                            }
                            else
                            {
                                var r = new Dictionary<string, dynamic>();
                                r.Add("sisma", "MATCH_ENTER.RESULT");
                                r.Add("success", false);
                                r.Add("error", "Error on start match, try late");
                                var data = JsonConvert.SerializeObject(r);
                                foreach (var c in queue.clients)
                                {
                                    c.Send(data);
                                }
                            }

                            queues.Remove(queue);
                        }
                    }
                    else if (queue.limit <= DateTime.Now)
                    {
                        Output.Show("MATCHMAKING TIMEOUT");
                        lock (m_lock)
                        {
                            // timeout, no user to start match
                            if (queue.room.MinUser < queue.clients.Count)
                            {
                                var r = new Dictionary<string, dynamic>();
                                r.Add("sisma", "MATCH_ENTER.RESULT");
                                r.Add("success", false);
                                r.Add("error", "Matchmaking timeout");
                                var data = JsonConvert.SerializeObject(r);
                                foreach (var c in queue.clients)
                                {
                                    c.Send(data);
                                }
                            }
                            else
                            {
                                // start game bc match time end
                                User[] users = queue.clients.Select(x => x.User).ToArray();

                                if (users != null && users.Length > 0)
                                {
                                    ThreadPool.QueueUserWorkItem(_ =>
                                    {
                                        // 1. init docker image
                                        Host host = new Host(server.Host.address, new List<Port> { new Port("random", new Random().Next(1, 65535)) }, queue.room.Mode, queue.room.UID ?? string.Empty);

                                        var match = new Match(Guid.NewGuid().ToString(), false, host, users);

                                        var r = new Dictionary<string, dynamic>();
                                        r.Add("sisma", "MATCH_ENTER.RESULT");
                                        r.Add("success", true);
                                        r.Add("match", match);
                                        var data = JsonConvert.SerializeObject(r);
                                        foreach (var c in queue.clients)
                                        {
                                            c.Send(data);
                                        }
                                    });
                                }
                                else
                                {
                                    var r = new Dictionary<string, dynamic>();
                                    r.Add("sisma", "MATCH_ENTER.RESULT");
                                    r.Add("success", false);
                                    r.Add("error", "Internal error on start match, try late");
                                    var data = JsonConvert.SerializeObject(r);
                                    foreach (var c in queue.clients)
                                    {
                                        c.Send(data);
                                    }
                                }
                            }

                            queues.Remove(queue);
                        }
                    }
                }
            }
        }

        public static void AddUserInQueue(Client client, Room room)
        {
            // find user
            if (client.Match != null)
            {
                var r = new Dictionary<string, dynamic>();
                r.Add("sisma", "MATCH_ENTER.RESULT");
                r.Add("success", true);
                r.Add("match", client.Match);
                client.Send(JsonConvert.SerializeObject(r));
                return;
            }

            lock (m_lock)
            {
                // found free match
                foreach (var queue in queues)
                {
                    if (queue.room.Mode == room.Mode)
                    {
                        if (queue.clients.Count < queue.room.MaxUser)
                        {
                            queue.clients.Add(client);
                            Output.Show("Client added on queue");
                            return;
                        }
                        Output.Show("Mode founded");

                    }
                };
                Output.Show("Queue not exist, create queue");

                queues.Add(new(new List<Client> { client }, DateTime.Now.AddMilliseconds(room.MatchTimeout), room));
                Output.Show($"Client added in new queue LIMIT{DateTime.Now.AddMilliseconds(room.MatchTimeout)} NOW{DateTime.Now}");
            }
        }

        public static void RemoveUserInQueue(Client client)
        {
            lock (m_lock)
            {
                // found free match
                foreach (var queue in queues)
                {
                    foreach (var c in queue.clients)
                    {
                        if (c.User.UID == client.User.UID)
                        {
                            queue.clients.Remove(c);

                            var r = new Dictionary<string, dynamic?>();
                            r.Add("sisma", "MATCH_ENTER.RESULT");
                            r.Add("success", true);
                            r.Add("match", null);
                            client.Send(JsonConvert.SerializeObject(r));
                            return;
                        }
                    }
                };
            }
        }
    }
}
