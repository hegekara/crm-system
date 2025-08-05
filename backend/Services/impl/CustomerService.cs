using AutoMapper;
using Backend.Dto;
using Backend.Models;
using Backend.Repositories;
using Serilog;

namespace Backend.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _repository;
        private readonly IMapper _mapper;

        public CustomerService(ICustomerRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
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
            var customer = await _repository.GetByIdAsync(id);
            Log.Warning("User Deleted - ID: {Id} - {FirstName} {LastName}", id, customer.FirstName, customer.LastName);
            await _repository.DeleteAsync(id);
        }

        public async Task<IEnumerable<CustomerDto>> GetAllDtoCustomers()
        {
            var customers = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<CustomerDto>>(customers);
        }

        public async Task<CustomerDto?> GetDtoCustomerById(Guid id)
        {
            var customer = await _repository.GetByIdAsync(id);
            return _mapper.Map<CustomerDto?>(customer);
        }
    }
}
