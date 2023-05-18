namespace Sisma;

public class MasterClient
{
    public readonly Guid guid;
    public readonly string sub;
    public readonly string token;

    public MasterClient(Guid guid, string token, string sub)
    {
        this.sub = sub;
        this.guid = guid;
        this.token = token;
    }

    public static bool IsValid(string token)
    {
        // isn't really verify
        return token != null && token.Length > 16;
    }
}