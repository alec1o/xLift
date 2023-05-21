using Sisma.Models;

namespace Sisma.Handler;

public class Match
{
    public bool Opened { get; set; }
    public Room Room { get; set; }
    public List<User> Users { get; set; }

    public Match(Room room)
    {
        Room = room;
        Users = new List<User>();
    }
}
