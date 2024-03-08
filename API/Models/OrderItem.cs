using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Models
{
    public class OrderItem
    {
        public Order Order { get; set; } = new Order();
        public int OrderId { get; set; }
        public Product Product { get; set; } = new Product();
        public int ProductId { get; set; }
        public ProductType ProductType { get; set; } = new ProductType();
        public int ProductTypeId { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }
    }
}
