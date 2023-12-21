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
                        throw new ArgumentOutOfRangeException($"Argument tableNumber should be between in range 0 and {restaurant.tables.Count}. Got {tableNumber} instead");
                    }

                    return restaurant.tables[tableNumber].Book(date);
                }
            }

            throw new ArgumentException($"Restaurant '{restaurantName}' not found");
        }

        public void SortRestaurantsByAvailability(DateTime dt)
        {
            Restaurants.Sort((Restaurant x, Restaurant y) =>
            {
                return y.CountAvailableTables(dt).CompareTo(x.CountAvailableTables(dt));
            });
        }
    }
}
