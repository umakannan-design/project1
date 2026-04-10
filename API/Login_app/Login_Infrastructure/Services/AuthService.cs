using Login_app.DTOs;
using Login_app.Models;
using Login_Application.DTOs;
using Login_Application.Interfaces;
using Login_Infrastructure.Repos;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Login_Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepo;
        private readonly IJwtService _jwtService;

        public AuthService(IUserRepository userRepo, IJwtService jwtService)
        {
           _userRepo = userRepo;
           _jwtService = jwtService;
        }
        public async Task<string> RegisterUser(RegisterDto dto)
        {
            if(dto.Password != dto.ConfirmPassword)
            {
                return "Passwords Do not Match";
            }

            var existingUser = await _userRepo.UserExistAsync(dto.Email);
            if (existingUser)
            {
                return "User Alredy Exists";
            }
            var user = new RegisterUser
            {
                UserName = dto.Name,
                Email = dto.Email,
                PhoneNo = dto.Phone,
                Role = dto.Role,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };
            await _userRepo.AddUserAsync(user);

            return "User Registered Successfully";
        }

        public async Task<object> LoginAsync(LoginDto dto)
        {
            var existingUser = await _userRepo.GetByEmailAsync(dto.Email);
            if (existingUser == null) 
            { 
                return new {success =  false , message = "User Not Found"};
            }

            if(!BCrypt.Net.BCrypt.Verify(dto.Password, existingUser.PasswordHash))
            {
                return new { success = false, message = "Password is not Correct" };
            }

            var token = _jwtService.GenerateToken(existingUser);

            return new
            {
                success = true,
                token = token,
                email = existingUser.Email,
                name = existingUser.UserName,
                role = existingUser.Role,
            };
        }

        public async Task<ProfileDto> GetProfileAsync(ClaimsPrincipal user)
        {
            var email = user.FindFirst(ClaimTypes.Email)?.Value;
            var name = user.Identity?.Name;
            var role = user.FindFirst(ClaimTypes.Role)?.Value;
            return new ProfileDto
            {
                UserName = name,
                email = email,
                Role = role,
            };
        }
    }
}
