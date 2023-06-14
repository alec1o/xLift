namespace Sisma.Models;

public class Cluster
{
    public string id;
    public string host;
    public string key;
    public int port;
    public int ram;
    public int storage;

    public Cluster(string id, string host, string key, int port, int ram, int storage)
    {
        this.id = id;
        this.host = host;
        this.key = key;
        this.port = port;
        this.ram = ram;
        this.storage = storage;
    }
}
