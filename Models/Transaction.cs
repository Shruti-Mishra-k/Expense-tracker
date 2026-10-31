using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;



    public class Transaction
    {
        public int Id { get; set; }
    public string Title { get; set; } = "";
        public double Amount { get; set; }
    public string Type { get; set; } = "";
        public DateTime Date { get; set; } = DateTime.Now;
    }
