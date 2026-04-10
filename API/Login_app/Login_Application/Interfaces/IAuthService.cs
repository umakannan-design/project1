using Login_app.DTOs;
using Login_Application.DTOs;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Login_Application.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegisterUser(RegisterDto dto);
        Task<object> LoginAsync(LoginDto dto);
        Task<ProfileDto> GetProfileAsync(ClaimsPrincipal user);
    }
}
