namespace Login_app.Models
{
    public class RegisterUser
    {
        public int Id { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? PhoneNo { get; set; }
        public string? Role { get; set; }
    }
}
