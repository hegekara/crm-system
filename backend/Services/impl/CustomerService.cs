using Backend.Models;
using Backend.Repositories;

namespace Backend.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _repository;

        public CustomerService(ICustomerRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Customer>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Customer?> GetByIdAsync(Guid id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(Customer customer)
        {
            await _repository.AddAsync(customer);
        }

        public async Task UpdateAsync(Guid id, Customer updatedCustomer)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return;

            existing.FirstName = updatedCustomer.FirstName;
            existing.LastName = updatedCustomer.LastName;
            existing.Tckn = updatedCustomer.Tckn;
            existing.PhoneNumber = updatedCustomer.PhoneNumber;
            existing.Email = updatedCustomer.Email;
            existing.BusinessName = updatedCustomer.BusinessName;
            existing.BusinessAddress = updatedCustomer.BusinessAddress;
            existing.IsActive = updatedCustomer.IsActive;
            existing.UpdatedAt = DateTime.UtcNow;

            await _repository.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
