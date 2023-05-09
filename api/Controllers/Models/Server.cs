using System.ComponentModel.DataAnnotations;

namespace api.Controllers.Models;

[Display(Name = "Server Instance")]
public class Server
{
    [Required]
    [Display(Name = "UID", Description = "Unique ID")]
    public string UID { get; set; } = String.Empty;

    [Required]
    [Display(Name = "IP Address", Description = "Ipv4 or Ipv6")]
    public string IPAddress { get; set; } = String.Empty;

    [Display(Name = "Created At", Description = "UTC date time")]
    public DateTime CreatedAt { get; set; }

    [Display(Name = "Updated At", Description = "UTC date time")]
    public DateTime UpdatedAt { get; set; }

    [Display(Name = "List of ports")]
    public List<Port> Ports { get; set; } = new List<Port>();
}
