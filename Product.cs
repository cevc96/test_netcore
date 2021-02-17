using System;
using Microsoft.EntityFrameworkCore;

namespace dotnetApi
{
    public class ProductContext : DbContext
    {
        public int Id { get; set; }

        public string Nombre { get; set; }

        public double Precio { get; set; }

        public int Stock { get; set; }

        public DateTime FechaRegistro { get; set; }
    }
}
