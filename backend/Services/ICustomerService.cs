using Backend.Models;
using Backend.Dto;

namespace Backend.Services
{
    public interface ICustomerService
    {
        Task<IEnumerable<Customer>> GetAllAsync();
        Task<Customer?> GetByIdAsync(Guid id);
        Task AddAsync(Customer customer);
        Task UpdateAsync(Guid id, Customer updatedCustomer);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<CustomerDto>> GetAllDtoCustomers();
        Task<CustomerDto?> GetDtoCustomerById(Guid id);

    }
}
