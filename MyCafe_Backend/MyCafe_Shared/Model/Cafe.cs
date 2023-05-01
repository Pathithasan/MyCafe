using System;
using System.ComponentModel.DataAnnotations;

namespace MyCafe_Shared.Model
{
	public class Cafe
	{
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required.")]
        [StringLength(50, ErrorMessage = "Name must be between 2 and 50 characters.", MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(255, ErrorMessage = "Description must be between 10 and 255 characters.", MinimumLength = 10)]
        public string Description { get; set; } = string.Empty;

        public string Logo { get; set; } = string.Empty;

        [Required(ErrorMessage = "Location is required.")]
        [StringLength(255, ErrorMessage = "Location must be between 10 and 255 characters.", MinimumLength = 10)]
        public string Location { get; set; } = string.Empty;
    }
}

