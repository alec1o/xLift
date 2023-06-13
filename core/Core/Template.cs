namespace Sisma.Core;

public abstract class Template
{
    public class Auth
    {
        public string sub = string.Empty;
        public int level = default;
        public int exp = default;
    }

    public class Message
    {
        public string sisma = string.Empty;
    }
}
