using System.ComponentModel.DataAnnotations;

namespace Backend.Dto
{
    public class AuthResponseDto
    {
        public string id { get; set; }
        public string token { get; set; }
        public string message { get; set; } = "";
    }
}
