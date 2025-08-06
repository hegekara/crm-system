#if DEBUG
using Xunit;
using Moq;
using Backend.Controllers;
using Backend.Services;
using Backend.Models;
using Backend.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Http.HttpResults;

public class CustomersControllerTests
{
    private readonly Mock<ICustomerService> _serviceMock;
    private readonly CustomersController _controller;

    public CustomersControllerTests()
    {
        _serviceMock = new Mock<ICustomerService>();
        _controller = new CustomersController(_serviceMock.Object);
    }

    [Fact]
    public async Task GetAll_ShouldReturnOk()
    {
        _serviceMock.Setup(s => s.GetAllAsync()).ReturnsAsync(new List<Customer> { new Customer() });

        var result = await _controller.GetAll();

        result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetAll_ShouldReturnNoContent()
    {
        _serviceMock.Setup(s => s.GetAllAsync()).ReturnsAsync(new List<Customer>());

        var result = await _controller.GetAll();

        result.Should().BeOfType<NoContentResult>();
    }

    [Fact]
    public async Task GetById_ShouldReturnOk()
    {
        var id = Guid.NewGuid();
        _serviceMock.Setup(s => s.GetByIdAsync(id)).ReturnsAsync(new Customer { Id = id });

        var result = await _controller.GetById(id);

        result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task GetDtoCustomerById_ShouldReturnOk()
    {
        var id = Guid.NewGuid();
        _serviceMock.Setup(s => s.GetDtoCustomerById(id)).ReturnsAsync(new CustomerDto { Id = id });

        var result = await _controller.GetDtoCustomerById(id);

        result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public async Task Create_ShouldReturnOk()
    {
        var customer = new Customer { Id = Guid.NewGuid(), FirstName = "Ali", Tckn = "12345678901" };

        var result = await _controller.Create(customer);

        result.Should().BeOfType<CreatedAtActionResult>();
    }

    [Fact]
    public async Task Update_ShouldReturnOk()
    {
        var id = Guid.NewGuid();
        var customer = new Customer { FirstName = "Test", Tckn = "12345678901" };

        _serviceMock.Setup(s => s.GetByIdAsync(id)).ReturnsAsync(customer);

        var result = await _controller.Update(id, customer);

        result.Should().BeOfType<OkResult>();
    }

    [Fact]
    public async Task Delete_ShouldReturnOk()
    {
        var id = Guid.NewGuid();
        _serviceMock.Setup(s => s.GetByIdAsync(id)).ReturnsAsync(new Customer { Id = id });

        var result = await _controller.Delete(id);

        result.Should().BeOfType<OkResult>();
    }

    [Fact]
    public async Task Delete_ShouldReturnNoContent()
    {
        var id = Guid.NewGuid();
        _serviceMock.Setup(s => s.GetByIdAsync(id)).ReturnsAsync((Customer?)null);

        var result = await _controller.Delete(id);

        result.Should().BeOfType<NoContentResult>();
    }
}
#endif