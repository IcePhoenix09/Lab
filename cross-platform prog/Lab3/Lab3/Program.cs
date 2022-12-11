using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

[assembly: CLSCompliant(true)]
namespace Lab3
{
    internal class Program
    {
        enum MenuOptions : byte
        {
            Read = 1,
            Send,
            Change_channel,
            Exit,
        }

        class Messange
        {
            public string Text;
            public string Athor;
            public DateTime Time;

            public Messange(string text, string athor, DateTime time)
            {
                this.Text = text;
                this.Athor = athor;
                this.Time = time;   
            }

            public Messange(string text, string athor)
            {
                this.Text = text;
                this.Athor = athor;
                this.Time = DateTime.Now;
            }

            public Messange(string text)
            {
                this.Text = text;
                this.Athor = "unknown";
                this.Time = DateTime.Now;
            }

        }

        class Database
        {
            public short channel_number { get; set; }

            private Dictionary<short, List<Messange>> ChatDict { get; set; }
            public Database()
            {
                channel_number = 1;
                ChatDict = new Dictionary<short, List<Messange>>();
                LoadData();
            }

            public void LoadData()
            {
                Messange m1 = new Messange("Hi");
                Messange m2 = new Messange("Hi", "Roma");
                ChatDict.Add(1, new List<Messange>{m1, m2});

            }

            public void Print_all_chat()
            {
                foreach (var chat in ChatDict.Values)
                {
                    foreach (var msq in chat)
                    {
                        Console.WriteLine($"{msq.Time} | {msq.Athor} | {msq.Text}");

                    }
                }

            }

            public void Print_selected_chat()
            {
                foreach (var msq in ChatDict[channel_number])
                {
                    Console.WriteLine($"{msq.Time} | {msq.Athor} | {msq.Text}");

                }
            }

            public void Send_messange(string msg)
            {
                ChatDict[channel_number].Add(new Messange(msg));
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
