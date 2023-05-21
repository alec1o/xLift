namespace Sisma.Models;

public class Room
{
    public string UID { get; set; }
    public string Mode { get; set; }
    public string ContainerImage { get; set; }
    public string ContainerParam { get; set; }
    public Port[] ContainerPorts { get; set; }
    public int MatchTimeout { get; set; }
    public int MinUser { get; set; }
    public int MaxUser { get; set; }

    public Room(string uid, string mode, int minUser, int maxUser, int matchTimeout, string containerImage, string containerParam, Port[] containerPorts)
    {
        UID = uid;
        Mode = mode;
        ContainerImage = containerImage;
        ContainerParam = containerParam;
        ContainerPorts = containerPorts;
        MatchTimeout = matchTimeout;
        MinUser = minUser;
        MaxUser = maxUser;
    }
}

