using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("/docs")]
[ApiExplorerSettings(IgnoreApi = true)]
public class SwaggerController : ControllerBase
{
    [HttpGet]
    public dynamic Get()
    {
        return Redirect("/swagger");
    }
}