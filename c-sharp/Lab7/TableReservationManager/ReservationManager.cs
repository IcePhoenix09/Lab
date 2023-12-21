using System.Text.Json;
using System.Text;


namespace TableReservationManager{

    public class ReservationManager
    {
        private List<Restaurant> Restaurants;

        public ReservationManager(){
            Restaurants = new List<Restaurant>();
        }

        public void AddRestaurant(string name, int number_of_tables)
        {
            if (Restaurants.Exists(restaurant => restaurant.Name == name)){
                throw new ArgumentException($"Restaurant '{name}' is already added");
            } else {
                Restaurant newRestaurant = new(name, number_of_tables);
                Restaurants.Add(newRestaurant);
            }       
        }

        public void LoadRestaurants(string pathToFile){
            string jsonString = File.ReadAllText(pathToFile);
            List<RestorantData>? jsonData = JsonSerializer.Deserialize<List<RestorantData>>(jsonString);

            if (jsonData == null){
                throw new NullReferenceException($"JSON file at - '{pathToFile}' is probably empty or not valid");
            } else{
                foreach (RestorantData item in jsonData){
                    if (item.Name == null || item.Name == ""){
                        throw new NullReferenceException("Name field could not be empty");
                    } else {
                        Restaurants.Add(new Restaurant(item.Name, item.NumberOfTables));
                    }
                }
            }
        }

        public Dictionary<Restaurant, List<Table>> GetAllFreeTables(DateTime date)
        {
            Dictionary<Restaurant, List<Table>> free = new();
            foreach (var restaurant in Restaurants)
            {
                List<Table> freeRestrurantTables = restaurant.GetFreeTables(date);
                free.Add(restaurant, freeRestrurantTables);
            }
            return free;
        }

        public bool BookTable(string restaurantName, DateTime date, int tableNumber)
        {
            foreach (var restaurant in Restaurants)
            {
                if (restaurant.Name == restaurantName)
                {
                    if (tableNumber < 0 || tableNumber >= restaurant.tables.Count)
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
                    for (int i = 0; i < Restaurants.Count - 1; i++)
                    {
                        int avTc = CountAvailableTables(Restaurants[i], dt); // available tables current
                        int avTn = CountAvailableTables(Restaurants[i + 1], dt); // available tables next

                        if (avTc < avTn)
                        {
                            // Swap restaurants
                            var temp = Restaurants[i];
                            Restaurants[i] = Restaurants[i + 1];
                            Restaurants[i + 1] = temp;
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
