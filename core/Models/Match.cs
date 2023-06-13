namespace Sisma.Models;

public class Match
{
    public string UID { get; set; }
    public bool Opened { get; set; }
    public Host Host { get; set; }
    public User[] Users { get; set; }

    public Match(string uid, bool opened, Host host, User[] users)
    {
        this.UID = uid;
        this.Opened = opened;
        this.Host = host;
        this.Users = users;
    }
}
