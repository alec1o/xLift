namespace Sisma.Core;

public static class Config
{
    public static readonly string SISMA_ROOT_KEY =
        Environment.GetEnvironmentVariable("SISMA_ROOT_KEY", EnvironmentVariableTarget.User)
        ?? throw new ArgumentNullException("SISMA_ROOT_KEY Not found");
}
