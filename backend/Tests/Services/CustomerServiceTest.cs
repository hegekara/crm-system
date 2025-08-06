#if DEBUG
using Xunit;
using Moq;
using Backend.Services;
using Backend.Repositories;
using Backend.Models;
using AutoMapper;
using FluentAssertions;

public class CustomerServiceTests
{
    private readonly Mock<ICustomerRepository> _repositoryMock;
    private readonly Mock<IMapper> _mapperMock;
    private readonly CustomerService _service;

    public CustomerServiceTests()
    {
        _repositoryMock = new Mock<ICustomerRepository>();
        _mapperMock = new Mock<IMapper>();
        _service = new CustomerService(_repositoryMock.Object, _mapperMock.Object);
    }

    [Fact]
    public async Task GetAllAsync_ReturnCustomers()
    {
        var customers = new List<Customer> { new Customer { FirstName = "ali", LastName = "eren", Tckn = "12345678901" } };
        _repositoryMock.Setup(r => r.GetAllAsync()).ReturnsAsync(customers);

        var result = await _service.GetAllAsync();

        result.Should().NotBeNullOrEmpty();
        result.Should().HaveCount(1);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnCustomer()
    {
        var id = Guid.NewGuid();
        var customer = new Customer { Id = id, FirstName = "Veli", Tckn = "12345678901" };
        _repositoryMock.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(customer);

        var result = await _service.GetByIdAsync(id);

        result.Should().NotBeNull();
        result.Id.Should().Be(id);
    }

    [Fact]
    public async Task AddAsync_ShouldAdd()
    {
        var customer = new Customer { FirstName = "Zeynep", Tckn = "12345678901" };

        await _service.AddAsync(customer);

        _repositoryMock.Verify(r => r.AddAsync(customer));
    }

    [Fact]
    public async Task UpdateAsync_ShouldUpdate()
    {
        var id = Guid.NewGuid();
        var existingCustomer = new Customer { Id = id, FirstName = "Mehmet", Tckn = "12345678901" };
        var updatedCustomer = new Customer { FirstName = "Ahmet", Tckn = "12345678901" };

        _repositoryMock.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(existingCustomer);

        await _service.UpdateAsync(id, updatedCustomer);

        _repositoryMock.Verify(r => r.SaveChangesAsync());
        existingCustomer.FirstName.Should().Be("Ahmet");
    }

    [Fact]
    public async Task DeleteAsync_ShouldDelete()
    {
        var id = Guid.NewGuid();
        var customer = new Customer { Id = id, FirstName = "Fatma" };

        _repositoryMock.Setup(r => r.GetByIdAsync(id)).ReturnsAsync(customer);

        await _service.DeleteAsync(id);

        _repositoryMock.Verify(r => r.DeleteAsync(id), Times.Once);
    }
}
#endif