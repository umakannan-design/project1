using Login_app.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Login_Infrastructure.Repos
{
    public interface IUserRepository
    {
        Task<bool> UserExistAsync(string email);
        Task AddUserAsync(RegisterUser user);
        Task<RegisterUser> GetByEmailAsync(string email);
    }
}
