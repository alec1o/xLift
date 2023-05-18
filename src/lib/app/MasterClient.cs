namespace Sisma;

public class MasterClient
{
    public readonly Guid guid;
    public readonly string sub;
    public readonly string token;
    public readonly bool rootAccess;

    public MasterClient(Guid guid, string token, string sub, bool rootAccess)
    {
        this.sub = sub;
        this.guid = guid;
        this.token = token;
        this.rootAccess = rootAccess;
    }

    public static (bool isValid, bool rootAccess) IsValid(string token)
    {
        // isn't really verify
        return (isValid: token != null, rootAccess: false);
    }
}