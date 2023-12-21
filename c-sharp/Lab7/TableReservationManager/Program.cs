
namespace TableReservationManager{

    public class TableReservationApp
    {
        static void Main(string[] args)
        {
            ReservationManager manager = new();
            manager.LoadRestaurants("test_data.json");

            manager.AddRestaurant("A", 10);
            manager.AddRestaurant("B", 5);

            // System.Console.WriteLine(manager.GetAllFreeTables(new DateTime(2023, 12, 25)));

            Console.WriteLine(manager.BookTable("Mak", new DateTime(2023, 12, 25), 3)); // True
            Console.WriteLine(manager.BookTable("Mak", new DateTime(2023, 12, 25), 3)); // False

            foreach (KeyValuePair<Restaurant, List<Table>> restaurantPair in 
                    manager.GetAllFreeTables(new DateTime(2023, 12, 25))){
                Console.WriteLine($"{restaurantPair.Key.Name} has {restaurantPair.Value.Count} free seats");
            }

        }
    }
}
