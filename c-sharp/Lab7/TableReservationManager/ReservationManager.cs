namespace TableReservationManager{
    public class ReservationManager
    {

        public List<Restaurant> restaurants;

        public ReservationManager()
        {
            restaurants = new List<Restaurant>();
        }

        public void AddRestaurant(string name, int number_of_tables)
        {
            try
            {
                Restaurant newRestaurant = new()
                {
                    name = name,
                    tables = new Table[number_of_tables]
                };

                for (int i = 0; i < number_of_tables; i++)
                {
                    newRestaurant.tables[i] = new Table();
                }
                restaurants.Add(newRestaurant);
            }
            catch (Exception)
            {
                Console.WriteLine("Error");
            }
        }


        private void LoadRestaurants(string filePath)
        {
            //TODO change to json
            try
            {
                string[] ls = File.ReadAllLines(filePath);
                foreach (string l in ls)
                {
                    var parts = l.Split(',');
                    if (parts.Length == 2 && int.TryParse(parts[1], out int tableCount))
                    {
                        AddRestaurant(parts[0], tableCount);
                    }
                    else
                    {
                        Console.WriteLine(l);
                    }
                }
            }
            catch (Exception)
            {
                Console.WriteLine("Error");
            }
        }

        public List<string> FindAllFreeTables(DateTime dt)
        {
            try
            { 
                List<string> free = new List<string>();
                foreach (var restaurant in restaurants)
                {
                    for (int i = 0; i < restaurant.tables.Length; i++)
                    {
                        if (!restaurant.tables[i].IsBooked(dt))
                        {
                            free.Add($"{restaurant.name} - Table {i + 1}");
                        }
                    }
                }
                return free;
            }
            catch (Exception)
            {
                Console.WriteLine("Error");
                return new List<string>();
            }
        }

        public bool BookTable(string restaurantName, DateTime date, int tableNumber)
        {
            foreach (var restaurant in restaurants)
            {
                if (restaurant.name == restaurantName)
                {
                    if (tableNumber < 0 || tableNumber >= restaurant.tables.Length)
                    {
                        throw new Exception(null); //Invalid table number
                    }

                    return restaurant.tables[tableNumber].Book(date);
                }
            }

            throw new Exception(null); //Restaurant not found
        }

        public void SortRestaurantsByAvailabilityForUsers(DateTime dt)
        {
            try
            { 
                bool swapped;
                do
                {
                    swapped = false;
                    for (int i = 0; i < restaurants.Count - 1; i++)
                    {
                        int avTc = CountAvailableTables(restaurants[i], dt); // available tables current
                        int avTn = CountAvailableTables(restaurants[i + 1], dt); // available tables next

                        if (avTc < avTn)
                        {
                            // Swap restaurants
                            var temp = restaurants[i];
                            restaurants[i] = restaurants[i + 1];
                            restaurants[i + 1] = temp;
                            swapped = true;
                        }
                    }
                } while (swapped);
            }
            catch (Exception)
            {
                Console.WriteLine("Error");
            }
        }

        public int CountAvailableTables(Restaurant restaurant, DateTime time)
        {
            try
            {
                int count = 0;
                foreach (var table in restaurant.tables)
                {
                    if (!table.IsBooked(time))
                    {
                        count++;
                    }
                }
                return count;
            }
            catch (Exception)
            {
                Console.WriteLine("Error");
                return 0;
            }
        }
    }
}