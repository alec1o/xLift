namespace Sisma.Models;

public class User
{
    public string UID { get; set; }
    public int Level { get; set; }
    public string Token { get; set; }
    public bool SuperUser { get; set; }

    public User(string uid, string token, int level, bool superUser)
    {
        UID = uid;
        Level = level;
        Token = token;
        SuperUser = superUser;
    }
}

