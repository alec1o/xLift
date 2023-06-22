namespace Sisma.Models;

public class Cluster
{
    public string id;
    public string name;
    public string host;
    public string key;
    public int port;
    public float ram;
    public float storage;

    public Cluster(string id, string name, string host, string key, int port, float ram, float storage)
    {
        this.id = id;
        this.name = name;
        this.host = host;
        this.key = key;
        this.port = port;
        this.ram = ram;
        this.storage = storage;
    }
}
