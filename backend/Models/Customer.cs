using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Customer
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(11)]
        [MinLength(11)]
        public string Tckn { get; set; }

        [Phone]
        [MaxLength(20)]
        public string PhoneNumber { get; set; }

        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; }

        [MaxLength(100)]
        public string BusinessName { get; set; }

        [MaxLength(200)]
        public string BusinessAddress { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }


        public Customer() { }

        public Customer(string firstName, string lastName, string tckn, string phoneNumber, string email, string businessName, string BusinessAddress)
        {
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Tckn = tckn;
            this.PhoneNumber = phoneNumber;
            this.Email = email;
            this.BusinessName = businessName;
            this.BusinessAddress = BusinessAddress;
        }
    }
}
