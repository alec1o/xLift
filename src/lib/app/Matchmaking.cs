namespace Sisma;

public class Matchmaking
{
    public readonly List<Room> rooms = new List<Room>();
    public readonly MasterServer server;
    private readonly object _lock = new object();
    public Matchmaking(MasterServer server)
    {
        this.server = server;
    }

    public void AddOnQueue(MasterClient client, string mode)
    {
        lock (_lock)
        {
            foreach (var room in rooms)
            {
                if (room.done is false)
                {
                    if (room.AddClient(client))
                    {
                        return;
                    }
                }
            }

            // room not found. create new room add add user

            // todo: get docker image name
            /*
            dockerImage = MyClass.GetImageFromMode(mode); 
            */

            var newRoom = new Room(server, "docker-image-here", 2, 4, 10000/*10s*/, 0);
            rooms.Add(newRoom);
            newRoom.AddClient(client);

            // todo: remove room from list;
            /*
            room.OnDone(() =>
            {
                lock(_lock)
                {
                    rooms.Remove(room);
                }    
            });
            */
        }
    }
}

