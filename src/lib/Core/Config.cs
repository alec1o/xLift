namespace Sisma.Core;

public static class Config
{
    public static readonly string SISMA_ROOT_KEY =
        Environment.GetEnvironmentVariable("SISMA_ROOT_KEY", EnvironmentVariableTarget.User)
        ?? throw new ArgumentNullException("SISMA_ROOT_KEY Not found");
    
    public static readonly string SISMA_JWT_KEY =
        Environment.GetEnvironmentVariable("SISMA_JWT_KEY", EnvironmentVariableTarget.User)
        ?? throw new ArgumentNullException("SISMA_JWT_KEY Not found");
}
