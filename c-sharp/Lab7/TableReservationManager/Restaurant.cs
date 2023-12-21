namespace TableReservationManager{
    public class Restaurant
    {
        public string name;
        public Table[] tables; 
    }

    public class Table
    {
        private List<DateTime> booked_dates;


        public Table()
        {
            booked_dates = new List<DateTime>();
        }

        public bool Book(DateTime data)
        {
            try
            { 
                if (booked_dates.Contains(data))
                {
                    return false;
                }
                booked_dates.Add(data);
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
            return booked_dates.Contains(data);
        }
    }
}