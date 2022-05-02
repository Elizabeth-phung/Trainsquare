using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class Session 
    {
        public int Id { get; set; }
        public int WorkShopId { get; set; }
        public int TotalSlots { get; set; }
        public int OpenSlots { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public BaseUserMapper CreatedBy { get; set; }
        public BaseUserMapper ModifiedBy { get;set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public string WorkShopName { get; set; }
        public string Summary { get; set; }
        public string ShortDescription { get; set; }
        public string ImageUrl { get; set; }
        public string ExternalSiteUrl { get; set; }
        public int NumberOfSessions { get; set; }
    }
}
