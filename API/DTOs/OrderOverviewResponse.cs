using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class OrderOverviewResponse
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalPrice { get; set; }
        public string Product { get; set; } = string.Empty;
        public string ProductImageUrl { get; set; } = string.Empty;
    }
}
