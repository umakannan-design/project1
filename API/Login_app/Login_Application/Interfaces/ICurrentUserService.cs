using System;
using System.Collections.Generic;
using System.Text;

namespace Login_Application.Interfaces
{
    public interface ICurrentUserService
    {
        string Name { get; set; }
        string Email { get; set; }
        string Role { get; set; }
    }
}
