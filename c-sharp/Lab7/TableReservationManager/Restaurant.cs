using System.Text.Json.Serialization.Metadata;

namespace TableReservationManager{

    public class Restaurant
    {
        public string Name {get; set;}

        public List<Table> tables = new List<Table>(); 

        public Restaurant(string restaurantName, int numberOfTables){
            Name = restaurantName;
            for (int i = 0; i < numberOfTables; i++){
                tables.Add(new Table());
            }
        }

        public List<Table> GetFreeTables(DateTime date){
            List<Table> freeTable = new(); 

            foreach (Table table in tables)
            {
                if (!table.IsBooked(date))
                {
                    freeTable.Add(table);
                }
            }
            return freeTable;
        }

        public int CountAvailableTables(DateTime date){
            int count = 0;
            foreach (Table table in tables)
            {
                if (!table.IsBooked(date))
                {
                    count++;
                }
            }
            return count;
        }
    }

    public class Table
    {
        private List<DateTime> bookedDates;

        public Table()
        {
            bookedDates = new List<DateTime>();
        }

        public bool Book(DateTime data)
        {
            try
            { 
                if (bookedDates.Contains(data))
                {
                    return false;
                }
                bookedDates.Add(data);
                return true;
            }
            catch (Exception)
            {
                Console.WriteLine("Error");
                return false;
            }
        }

        public bool IsBooked(DateTime data)
        {
            return bookedDates.Contains(data);
        }
    }
}
