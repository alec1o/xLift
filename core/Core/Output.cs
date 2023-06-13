namespace Sisma.Core;

public static class Output
{
    public static void Show(object output)
    {
#if DEBUG
        Console.WriteLine(output);
#endif
    }
}
