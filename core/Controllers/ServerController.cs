namespace core.Controllers;

public class ServerController
{
    internal ServerController()
    {

    }

    public bool OnData(ref string action, ref byte[] buffer)
    {
        switch (action.ToUpper().Trim())
        {
            case "USER.GET": return UserGet(ref buffer);
            case "USER.STATUS": return UserStatus(ref buffer);
            case "USER.DESTROY": return UserDestroy(ref buffer);
            case "USER.FORWARD": return UserForward(ref buffer);

            case "ROOM.GET": return RoomGet(ref buffer);
            case "ROOM.STATUS": return RoomStatus(ref buffer);
            case "ROOM.DESTROY": return RoomDestroy(ref buffer);
            case "ROOM.REGISTER": return RoomRegister(ref buffer);

            case "MATCH.GET": return MatchGet(ref buffer);
            case "MATCH.STATUS": return MatchStatus(ref buffer);

            default: return false;
        }
    }

    private bool UserStatus(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool UserGet(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool UserDestroy(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool UserForward(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool RoomStatus(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool RoomGet(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool RoomDestroy(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool RoomRegister(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool MatchStatus(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool MatchGet(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }
}
