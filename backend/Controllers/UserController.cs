using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Serilog;
using Backend.Dto;

namespace Backend.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("list")]
        public IActionResult GetUsers()
        {
            var users = _userManager.Users.Select(u => new
            {
                u.Id,
                u.UserName,
                u.FirstName,
                u.LastName,
                u.Email
            }).ToList();

            return Ok(users);
        }



        [Authorize(Roles = "Admin")]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return NotFound("Kullanıcı bulunamadı");

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                Log.Error("Kullanıcı silinemedi: {@Errors}", result.Errors);
                return BadRequest(result.Errors);
            }

            Log.Warning("Kullanıcı silindi - ID: {Id} - {FirstName} {LastName}", id, user.FirstName, user.LastName);
            return Ok("Kullanıcı silindi");
        }
    }
}
