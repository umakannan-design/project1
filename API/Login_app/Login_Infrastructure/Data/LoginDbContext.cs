using Login_app.Models;
using Microsoft.EntityFrameworkCore;

namespace Login_app.Data
{
    public class LoginDbContext: DbContext
    {
        public LoginDbContext(DbContextOptions<LoginDbContext> options) : base(options)
        {
            
        }

        public DbSet<RegisterUser> RegisterUser { get; set; }
    }
}
