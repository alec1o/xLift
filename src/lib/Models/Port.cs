namespace Sisma.Models;

public class Port
{
    public string Name { get; set; }
    public int Value { get; set; }

    public Port(string name, int value)
    {
        Name = name;
        Value = value;
    }
}
