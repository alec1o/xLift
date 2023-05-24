namespace Sisma.Models;

public class User
{
    public string UID { get; set; }
    public int Level { get; set; }
    public string Token { get; set; }
    public bool SuperUser { get; set; }

    public User(string uid, string token, int level, bool superUser)
    {
        this.UID = uid;
        this.Level = level;
        this.Token = token;
        this.SuperUser = superUser;
    }
}

