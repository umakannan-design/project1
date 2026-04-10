using Login_Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Login_Infrastructure.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        string ICurrentUserService.Name { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        string ICurrentUserService.Email { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
        string ICurrentUserService.Role { get => throw new NotImplementedException(); set => throw new NotImplementedException(); }
    }
    //{
    //    private readonly IHttpContextAccessor _contextAccesser;
    //    public CurrentUserService(IHttpContextAccessor contextAccesser)
    //    {
    //        _contextAccesser = contextAccesser;
    //    }

    //    public string Email =>
    //    _contextAccesser.HttpContext?.User.FindFirst(ClaimTypes.Email)?.Value;

    //    public string Name =>
    //    _contextAccesser.HttpContext?.User.Identity?.Name;

    //    public string Role =>
    //        _contextAccesser.HttpContext?.User.FindFirst(ClaimTypes.Role)?.Value;
}
