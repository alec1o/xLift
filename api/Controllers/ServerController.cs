using api.Controllers.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("api/server")]
public class ServerController : ControllerBase
{
    [HttpGet]
    public List<Server> GetMany()
    {
        return new List<Server>();
    }

    [HttpPost]
    public Server Post(string image, List<Port> ports)
    {
        return new Server();
    }

    [HttpDelete]
    public Server Delete()
    {
        return new Server();
    }

    [HttpGet("{uid}")]
    public Server Get(string uid)
    {
        return new Server();
    }
}