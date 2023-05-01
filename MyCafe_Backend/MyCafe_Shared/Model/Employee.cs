using System;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using MyCafe_Shared.Enum;

namespace MyCafe_Shared.Model
{
	public class Employee
	{
        [Key]
        [RegularExpression(@"UI\d{7}", ErrorMessage = "Invalid employee ID format. It should be in the format 'UIXXXXXXX', where X is a digit.")]
        public string Id { get; set; } = string.Empty;

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(50, ErrorMessage = "Name must be between 2 and 50 characters.", MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email address is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address format.")]
        public string EmailAddress { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number is required.")]
        [RegularExpression(@"^[89]\d{7}$", ErrorMessage = "Invalid phone number format. It should start with 8 or 9 and have 8 digits.")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required(ErrorMessage = "Gender is required.")]
        [RegularExpression(@"^(Male|Female)$", ErrorMessage = "Invalid gender value. It should be either 'Male' or 'Female'.")]
        public string Gender { get; set; } = string.Empty;


        public int CafeId { get; set; }

        [Required(ErrorMessage = "Start date is required.")]
        public DateTime StartDate { get; set; }
    }
}

