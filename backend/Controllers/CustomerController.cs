using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/customer")]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _service;

        public CustomersController(ICustomerService service)
        {
            _service = service;
        }

        [HttpGet("list")]
        public async Task<IActionResult> GetAll()
        {
            var customers = await _service.GetAllAsync();

            if (customers == null || !customers.Any())
            {
                return NoContent();
            }

            return Ok(customers);
        }

        [HttpGet("get/{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var customer = await _service.GetByIdAsync(id);
            if (customer == null)
            {
                return NoContent();
            }
            return Ok(customer);
        }

        [HttpGet("list/dto")]
        public async Task<IActionResult> GetAllDtoCustomers()
        {
            var customers = await _service.GetAllDtoCustomers();

            if (customers == null || !customers.Any())
            {
                return NoContent();
            }

            return Ok(customers);
        }

        [HttpGet("get/dto/{id:guid}")]
        public async Task<IActionResult> GetDtoCustomerById(Guid id)
        {
            var result = await _service.GetDtoCustomerById(id);
            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(Customer customer)
        {
            await _service.AddAsync(customer);
            return CreatedAtAction(nameof(GetById), new { id = customer.Id }, customer);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(Guid id, Customer updatedCustomer)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null) return NoContent();

            await _service.UpdateAsync(id, updatedCustomer);
            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var existing = await _service.GetByIdAsync(id);
            if (existing == null) return NoContent();

            await _service.DeleteAsync(id);
            return Ok();
        }
    }
}
