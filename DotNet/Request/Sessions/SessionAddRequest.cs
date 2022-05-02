using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Sessions
{
    public class SessionAddRequest
    {
        [Required]
        [Range(1,int.MaxValue)]
        public int WorkShopId { get; set; }
        [Range(0, int.MaxValue)]
        public int TotalSlots { get; set; }
        [Range(0, int.MaxValue)]
        public int OpenSlots { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
    }
}
