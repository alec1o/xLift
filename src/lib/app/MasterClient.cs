namespace Sisma;

public class MasterClient
{
    public readonly string rawJwt;
    public bool isConnected { get; private set; }

    public MasterClient(string jwt)
    {
        this.rawJwt = jwt;
    }

    public void Close()
    {

    }

    public void Send(byte[] message)
    {

    }

    public void Send(string message)
    {

    }

    public static bool VerifyJwt(string jwt)
    {
        // todo: verify jwt token with env key.
        return jwt == null;
    }
}