using Newtonsoft.Json;
using Sisma.Core;
using Sisma.Handler;
using System.Text;

namespace Sisma.Controller;

public class RootController
{
    public readonly Client client;

    public RootController(Client client) { this.client = client; }

    public bool OnMessage(byte[] buffer)
    {
        try
        {
            Template.Message? message = JsonConvert.DeserializeObject<Template.Message>(Encoding.UTF8.GetString(buffer));

            if (message != null)
            {
                switch (message.sisma.ToUpper())
                {
                    // USER
                    case "USER_GET": return User_Get();
                    case "USER_GETALL": return User_GetAll();
                    case "USER_DESTROY": return User_Destroy();
                    case "USER_FORWARD": return User_Forward();

                    // ROOM
                    case "ROOM_GET": return Room_Get();
                    case "ROOM_GETALL": return Room_GetAll();
                    case "ROOM_DESTROY": return Room_Destroy();
                    case "ROOM_REGISTER": return Room_Register();

                    // MATCH
                    case "MATCH_GET": return Match_Get();
                    case "MATCH_GETALL": return Match_GetAll();
                    case "MATCH_DESTROY": return Match_Destroy();
                    case "MATCH_REGISTER": return Match_Register();
                }
            }
        }
        catch (Exception e) { Output.Show(e); }

        return false;
    }

    #region USER

    private bool User_Get()
    {
        throw new NotImplementedException();
    }

    private bool User_GetAll()
    {
        throw new NotImplementedException();
    }

    private bool User_Destroy()
    {
        throw new NotImplementedException();
    }

    private bool User_Forward()
    {
        throw new NotImplementedException();
    }

    #endregion

    #region ROOM

    private bool Room_Get()
    {
        throw new NotImplementedException();
    }

    private bool Room_GetAll()
    {
        throw new NotImplementedException();
    }

    private bool Room_Destroy()
    {
        throw new NotImplementedException();
    }

    private bool Room_Register()
    {
        throw new NotImplementedException();
    }

    #endregion

    #region MATCH

    private bool Match_Get()
    {
        throw new NotImplementedException();
    }

    private bool Match_GetAll()
    {
        throw new NotImplementedException();
    }

    private bool Match_Destroy()
    {
        throw new NotImplementedException();
    }

    private bool Match_Register()
    {
        throw new NotImplementedException();
    }

    #endregion
}