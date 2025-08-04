using System.ComponentModel.DataAnnotations;

namespace Backend.Dto
{
    public class LoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
