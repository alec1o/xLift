using Sisma.Core;

namespace Sisma.Models;

public class Room
{
    public string? UID { get; set; }
    public string Mode { get; set; }
    public string ContainerImage { get; set; }
    public string ContainerParam { get; set; }
    public Port[] ContainerPorts { get; set; }
    public int MatchTimeout { get; set; }
    public int ContainerRam { get; set; }
    public int ContainerCpu { get; set; }
    public int MinUser { get; set; }
    public int MaxUser { get; set; }

    public Room(string uid, string mode, int minUser, int maxUser, int matchTimeout, string containerImage, string containerParam, Port[] containerPorts, int containerRam, int containerCpu)
    {
        this.UID = uid;
        this.Mode = mode;
        this.ContainerImage = containerImage;
        this.ContainerParam = containerParam;
        this.ContainerPorts = containerPorts;
        this.MatchTimeout = matchTimeout;
        this.MinUser = minUser;
        this.MaxUser = maxUser;
        this.ContainerRam = containerRam;
        this.ContainerCpu = containerCpu;
    }

    public static bool IsValid(Room? room)
    {
        if (room == null) return false;

        if (room.MatchTimeout <= 0) return false;
        if (room.ContainerRam < 0) return false;
        if (room.ContainerCpu < 0) return false;
        if (room.MinUser <= 0) return false;
        if (room.MaxUser <= 0) return false;


        if (string.IsNullOrWhiteSpace(room.Mode)) return false;
        if (string.IsNullOrWhiteSpace(room.ContainerImage)) return false;
        if (string.IsNullOrWhiteSpace(room.ContainerParam)) return false;

        // FIX NULL VALUE
        room.UID = room.UID ?? string.Empty;

        room.UID = room.UID.Trim();
        room.Mode = room.Mode.Trim();
        room.ContainerImage = room.ContainerImage.Trim();
        room.ContainerParam = room.ContainerParam.Trim();

        if (room.ContainerPorts == null || room.ContainerPorts.Length <= 0) return false;

        try
        {
            List<int> ports = new List<int>();

            foreach (var port in room.ContainerPorts)
            {
                port.Name = port.Name.Trim();
                if (string.IsNullOrEmpty(port.Name)) return false;
                if (port.Value <= 0 || port.Value > 65535) return false;

                foreach (var value in ports)
                {
                    if (value == port.Value) return false;
                }

                ports.Add(port.Value);
            }
        }
        catch (Exception e)
        {
            Output.Show(e);
            return false;
        }

        return true;
    }
}

