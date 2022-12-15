// See https://aka.ms/new-console-template for more information

using System;
using Lab5_NetStandart;

Console.WriteLine("Hello, World!");
namespace testNet{
    class Program{
        static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;

            Database DB = new Database();
            while (true)
            {
                MenuOptions selectedOption = Menu();
                switch (selectedOption)
                {
                    case MenuOptions.Read:
                        DB.Print_selected_chat();
                        break;
                    case MenuOptions.Send:
                        Console.WriteLine($"Введіть повідомлення");
                        string msq = Console.ReadLine();
                        DB.Send_messange(msq);
                        break;
                    case MenuOptions.Change_channel:
                        Console.WriteLine($"Введіть номер");
                        DB.channel_number = short.Parse(Console.ReadLine());
                        Console.WriteLine($"Канал змінено на {DB.channel_number}");
                        break;
                    case MenuOptions.Exit:
                        Environment.Exit(0);
                        break;
                    default:
                        break;
                }
            }
        }
    }
}
        