namespace core.Controllers;

public unsafe class ClientController
{
    internal ClientController()
    {

    }

    public bool OnData(ref string action, ref byte[] buffer)
    {
        switch (action.ToUpper().Trim())
        {
            case "USER.STATUS": return UserStatus(ref buffer);
            case "USER.FORWARD": return UserForward(ref buffer);

            case "MATCH.EXIT": return MatchExit(ref buffer);
            case "MATCH.ENTER": return MatchEnter(ref buffer);
            case "MATCH.STATUS": return MatchStatus(ref buffer);

            default: return false;
        }
    }

    private bool UserStatus(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool UserForward(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool MatchExit(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool MatchEnter(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool MatchStatus(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }
}
