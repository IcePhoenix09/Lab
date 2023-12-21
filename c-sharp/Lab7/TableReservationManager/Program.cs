
namespace TableReservationManager{

    public class TableReservationApp
    {
        static void Main(string[] args)
        {
            ReservationManager manager = new();
            manager.LoadRestaurants("test_data.json");

            manager.AddRestaurant("A", 10);
            manager.AddRestaurant("B", 5);

            var date = new DateTime(2023, 12, 25);      

            Console.WriteLine(manager.BookTable("Mak", date, 3)); // True
            Console.WriteLine(manager.BookTable("Mak", date, 3)); // False

            manager.SortRestaurantsByAvailability(date);

            foreach (KeyValuePair<Restaurant, List<Table>> restaurantPair in 
                    manager.GetAllFreeTables(date)){
                Console.WriteLine($"{restaurantPair.Key.Name} has {restaurantPair.Value.Count} free seats");
            }

        }
    }
}
