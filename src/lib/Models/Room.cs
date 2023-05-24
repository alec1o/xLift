namespace Sisma.Models;

public class Room
{
    public string UID { get; set; }
    public string Mode { get; set; }
    public string ContainerImage { get; set; }
    public string ContainerParam { get; set; }
    public Port[] ContainerPorts { get; set; }
    public int MatchTimeout { get; set; }
    public int RamMemoryLimit { get; set; }
    public int CpuLimit { get; set; }
    public int MinUser { get; set; }
    public int MaxUser { get; set; }

    public Room(string uid, string mode, int minUser, int maxUser, int matchTimeout, string containerImage, string containerParam, Port[] containerPorts, int ramMemoryLimit, int cpuLimit)
    {
        this.UID = uid;
        this.Mode = mode;
        this.ContainerImage = containerImage;
        this.ContainerParam = containerParam;
        this.ContainerPorts = containerPorts;
        this.MatchTimeout = matchTimeout;
        this.MinUser = minUser;
        this.MaxUser = maxUser;
        this.RamMemoryLimit = ramMemoryLimit;
        this.CpuLimit = cpuLimit;
    }
}

