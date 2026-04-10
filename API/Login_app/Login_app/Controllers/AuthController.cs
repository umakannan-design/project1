using Login_app.DTOs;
using Login_app.Models;
using Login_Application.DTOs;
using Login_Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Login_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("UserRegistration")]
        public async Task<IActionResult> UserRegistration(RegisterDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); 
            }
            var result = await _authService.RegisterUser(dto);
            if(result != "User Registered Successfully")
            {
                return BadRequest(new { message = result });
            }

            return Ok(new { message = result });
        }

        [HttpPost("Login")]

        public async Task<IActionResult> UserLogin(LoginDto dto)
        {
            var result = await _authService.LoginAsync(dto);
            if (!(bool)result.GetType().GetProperty("success").GetValue(result))
            {
                return BadRequest(new { message = result });
            }

            return Ok(new { message = result });
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var result = await _authService.GetProfileAsync(User);
            return Ok(result);
        }
    }
}
