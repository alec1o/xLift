using System.ComponentModel.DataAnnotations;

namespace api.Controllers.Models;

[Display(Name = "Port Instance")]
public class Port
{
    [Required]
    [Display(Name = "TCP/IP Protocol", Description = "UDP or TCP")]
    public string Protocol { get; set; } = String.Empty;

    [Required]
    [Display(Name = "TCP/IP Port", Description = "0~65535")]
    [Range(0, 65535)] public int Value { get; set; }
}
