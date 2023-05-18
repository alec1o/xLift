namespace Sisma;

public class MessageHandler
{
    private Action action;
    public bool IsValid => action != null;


    public MessageHandler(MasterServer server, MasterClient client, byte[] buffer)
    {
        //
        action = () =>
        {
            // action here. mock add client on room
            // todo: check mode exist on list
            // todo: if mode isn't exist, send error for client
            // todo: else. mode exist: add client on Queue.
            server.matchmaking.AddOnQueue(client, "mode-here");
        };
    }

    public void Init()
    {
        action?.Invoke();
    }
}

