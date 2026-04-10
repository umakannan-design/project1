using Login_app.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Login_Application.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(RegisterUser user);
    }
}
