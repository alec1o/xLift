using Microsoft.AspNetCore.Mvc;

namespace worker.Controllers;

[Route("/")]
[ApiController]
public class IndexController : Controller
{
    public record ApplicationDetails(string Name, string Version, string Documentation);
    
    [HttpGet]
    public ApplicationDetails Get()
    {
        return new ApplicationDetails
        (
            Name: "xLift Worker",
            Version: "0.1.0",
            Documentation: "/swagger"
        );
    }
}