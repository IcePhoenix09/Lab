using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lab3
{
    internal class Program
    {
        enum MenuOptions : byte
        {
            // Виконати програму
            Read = 1,
            // Вийти з програми
            Send,
            Change_channel,
            Exit,
        }

        struct Messange
        {
            private string Text;
            private string Athor;
            private DateTime Time;
        }

        class Database
        {
            // private List<List<Messange>> ChatList { get; set; }
            public Database()
            {
                
            }

            public void LoadData()
            {
            
            }

            public void Print_chat(short cannel)
            {
                Console.WriteLine($"Read:");
            }

            public void Send_messange(string msq)
            {
                Console.WriteLine($"Send: {msq}");
            }


        }

        static MenuOptions Menu()
        {
            Console.WriteLine($"Оберіть пункт меню:");
            Console.WriteLine($"1.) Прочитати повідомлення;");
            Console.WriteLine($"2.) Відправити повідомлення;");
            Console.WriteLine($"3.) Змінити канал зв'язку;");
            Console.WriteLine($"4.) Вийти з програми;");
            MenuOptions selectedOption =
           (MenuOptions)Convert.ToByte(Console.ReadLine());
            return selectedOption;
        }


        static void Main(string[] args)
        {
            Console.OutputEncoding = System.Text.Encoding.UTF8;

            short channel_number = 1;
            Database DB = new Database();
            while (true)
            {
                MenuOptions selectedOption = Menu();
                switch (selectedOption)
                {
                    case MenuOptions.Read:
                        DB.Print_chat(channel_number);
                        break;
                    case MenuOptions.Send:
                        Console.WriteLine($"Введіть повідомлення");
                        string msq = Console.ReadLine();
                        DB.Send_messange(msq);
                        break;
                    case MenuOptions.Change_channel:
                        Console.WriteLine($"Введіть номер");
                        string channel = Console.ReadLine();
                        Console.WriteLine($"Канал змінено на {channel}");
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
