using System.ComponentModel.DataAnnotations;

namespace Backend.Dto
{
    public class CustomerDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string BusinessName { get; set; }
        public string BusinessAddress { get; set; }
    }
}
