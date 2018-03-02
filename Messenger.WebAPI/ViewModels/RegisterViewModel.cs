using System.ComponentModel.DataAnnotations;

namespace Messenger.WebAPI.ViewModels
{
    public class RegisterViewModel
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "User name required")]
        [MinLength(6, ErrorMessage = "User name length must be 6 and greater")]
        public string UserName { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Password required")]
        [MinLength(6, ErrorMessage = "Password length must be 6 and greater")]
        public string Password { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Confirmed password required")]
        [Compare(nameof(Password), ErrorMessage = "First pasword and second password must be an equal")]
        public string ConfirmPassword { get; set; }
    }
}