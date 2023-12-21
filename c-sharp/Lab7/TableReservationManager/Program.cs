
using System;
using System.Collections.Generic;
using System.Reflection.Metadata;

namespace TableReservationManager{

    public class TableReservationApp
    {
        static void Main(string[] args)
        {
            ReservationManager manager = new();
            manager.LoadRestaurants("test_data.json");

            manager.AddRestaurant("A", 10);
            manager.AddRestaurant("B", 5);

            Console.WriteLine(manager.BookTable("Mak", new DateTime(2023, 12, 25), 3)); // True
            Console.WriteLine(manager.BookTable("Mak", new DateTime(2023, 12, 25), 3)); // False
        }
    }
}
