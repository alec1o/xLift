namespace Sisma;

public class Program
{
    private const string initError = "[ERROR]\n\nExample 1:\n\tdotnet net run <ip> <port>\n\nExample 2:\n\tdotnet net run dev\n";

    private static void Main(string[] args)
    {
        string address;
        int port;

        try
        {
            if (args[0].ToLower() == "dev")
            {
                address = "127.0.0.1";
                port = 10101;
            }
            else
            {
                address = args[0];
                port = int.Parse(args[1]);
            }
        }
        catch
        {
            Console.WriteLine(initError);
            return;
        }

        var master = new MasterServer(address, port);
        master.Init();

        Console.WriteLine("[STARTED] KEY {ENTER} TO STOP");
        Console.ReadLine();
    }
}
