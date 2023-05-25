namespace Sisma.Models;

public class Host
{
    public string Mode { get; set; }
    public string RoomUID { get; set; }
    public string Address { get; set; }
    public List<Port> Ports { get; set; }

    public Host(string address, List<Port> ports, string mode, string roomUID)
    {
        this.Address = address;
        this.Ports = ports;
        this.Mode = mode;
        this.RoomUID = roomUID;
    }
}
