using Newtonsoft.Json;
using Sisma.Core;
using Sisma.Handler;
using System.Text;

namespace Sisma.Controller;

public class UserController
{
    public readonly Client Client;

    public UserController(Client client) { this.Client = client; }

    public bool OnMessage(byte[] buffer)
    {
        try
        {
            Template.Message? message = JsonConvert.DeserializeObject<Template.Message>(Encoding.UTF8.GetString(buffer));

            if (message != null)
            {
                switch (message.sisma.ToUpper())
                {
                    // MATCH
                    case "MATCH_GET": return Match_Get(ref buffer);
                    case "MATCH_ENTER": return Match_Enter(ref buffer);
                    case "MATCH_EXIT": return Match_Exit(ref buffer);
                }
            }
        }
        catch (Exception e) { Output.Show(e); }

        return false;
    }

    private bool Match_Get(ref byte[] buffer)
    {
        throw new NotImplementedException();
    }

    private bool Match_Enter(ref byte[] buffer)
    {
        Output.Show("MATCH_ENTER");

        var json = Encoding.UTF8.GetString(buffer);
        var request = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);

        if (request == null)
        {
            //
            Output.Show("NULL MATCH_ENTER REQUEST");
            return false;
        }
        else
        {
            var mode = request.GetValueOrDefault("mode", string.Empty) ?? string.Empty;
            Output.Show("MATCH_ENTER " + mode);

            if (mode != null)
            {
                foreach (var room in Client.Server.Rooms)
                {
                    if (room.Mode == mode)
                    {
                        Matchmaking.AddUserInQueue(Client, room);
                        return true;
                    }
                }

                Output.Show("MATCH_ENTER NOT FOUND MODE: " + mode);
            }

            return true;
        }
    }

    private bool Match_Exit(ref byte[] buffer)
    {
        Matchmaking.RemoveUserInQueue(Client);
        return true;
    }
}
