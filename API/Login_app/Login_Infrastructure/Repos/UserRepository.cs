using Login_app.Data;
using Login_app.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;

namespace Login_Infrastructure.Repos
{
    public class UserRepository : IUserRepository
    {
        private readonly LoginDbContext? _context;
        public UserRepository(LoginDbContext context)
        {
            _context = context;
        }
        public async Task AddUserAsync(RegisterUser user)
        {
            await _context.RegisterUser.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UserExistAsync(string email)
        {
            return await _context.RegisterUser.AnyAsync(item => item.Email == email);
        }

        public async Task<RegisterUser> GetByEmailAsync(string email)
        {
              return await _context.RegisterUser.FirstOrDefaultAsync(x => x.Email == email);
        }
    }
}
