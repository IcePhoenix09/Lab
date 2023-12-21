namespace TableReservationManager{
    public class Restaurant
    {
        public string name;
        public List<Table> tables = new List<Table>(); 

        public Restaurant(string restaurantName, int numberOfTables){
            name = restaurantName;
            for (int i = 0; i < numberOfTables; i++){
                tables.Add(new Table());
            }
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
