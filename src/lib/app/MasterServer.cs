using System.Net;

namespace Sisma;

public class MasterServer
{
    public readonly IPAddress address;
    public readonly int port;

    public MasterServer(string address, int port)
    {
        this.address = IPAddress.Parse(address);
        this.port = port;
    }

    public void Init()
    {

    }
}