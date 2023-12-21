using System.Runtime.CompilerServices;

namespace TableReservationManager{

    public static class UnitTests{
        public static void StartTesting(){
            ReservationManagerTest.AddRestaurant_Test();
            ReservationManagerTest.LoadRestaurants_Test();
            ReservationManagerTest.GetAllFreeTables_Test();
            ReservationManagerTest.BookTable_Test();
            ReservationManagerTest.SortRestaurantsByAvailability_Test();
        }
    }

    public static class ReservationManagerTest{

        public static void AddRestaurant_Test(){
            ReservationManager manager = new();
            manager.AddRestaurant("A", 10);
            manager.AddRestaurant("B", 5);

            List<Restaurant> result = manager.GetRestaurant();

            if (result[0].Name == "A" &&
                result[1].Name == "B" &&
                result[0].tables.Count == 10 &&
                result[1].tables.Count == 5){
                Console.WriteLine("Passed: AddRestaurant_Test");
            } else {
                Console.WriteLine("Failed: AddRestaurant_Test");
            }
        }

        public static void LoadRestaurants_Test(){
            ReservationManager manager = new();
            manager.LoadRestaurants("test_data.json");

            List<Restaurant> result = manager.GetRestaurant();

            if (result[0].Name == "PuzataHouse" &&
                result[1].Name == "Mak" &&
                result[0].tables.Count == 10 &&
                result[1].tables.Count == 500){
                Console.WriteLine("Passed: LoadRestaurants_Test");
            } else {
                Console.WriteLine("Failed: LoadRestaurants_Test");
            }
        }

        public static void GetAllFreeTables_Test(){
            ReservationManager manager = new();

            manager.AddRestaurant("A", 10);
            manager.AddRestaurant("B", 5);

            var date = new DateTime(2023, 12, 25);

            var result = manager.GetAllFreeTables(date);

            if (result.Keys.Count == 2){
                Console.WriteLine("Passed: GetAllFreeTables_Test");
            } else {
                Console.WriteLine("Failed: GetAllFreeTables_Test");
            }
        }

        public static void BookTable_Test(){
            ReservationManager manager = new();

            manager.AddRestaurant("A", 10);
            manager.AddRestaurant("B", 5);

            var date = new DateTime(2023, 12, 25);     

            bool test1 = manager.BookTable("A", date, 3); // True
            bool test2 = manager.BookTable("A", date, 3); // False 

            if (test1 == true && test2 == false){
                Console.WriteLine("Passed: BookTable_Test");
            } else {
                Console.WriteLine("Passed: BookTable_Test");
            }
        }

        public static void SortRestaurantsByAvailability_Test(){
            ReservationManager manager = new();

            manager.AddRestaurant("A", 5);
            manager.AddRestaurant("B", 10);

            var date = new DateTime(2023, 12, 25);      

            manager.SortRestaurantsByAvailability(date);
            List<Restaurant> result = manager.GetRestaurant();

            if (result[0].Name == "B" &&
                result[1].Name == "A" &&
                result[0].tables.Count == 10 &&
                result[1].tables.Count == 5){
                Console.WriteLine("Passed: SortRestaurantsByAvailability_Test");
            } else {
                Console.WriteLine("Failed: SortRestaurantsByAvailability_Test");
            }
        }
    }
}
