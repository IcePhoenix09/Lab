// See https://aka.ms/new-console-template for more information

namespace MonitorFiles{
    class Program{

        static void Main(){
            var monitor = new FileMonitor(@"/home/roma/HW/Lab6/testFolder/");
            var serv = new InformService();

            monitor.FileCreated += (object source, FileMoniorArgs args) => 
            {Console.WriteLine($"{args.ModifiedDate} | File created - {args.PathToFile}");};

            monitor.FileDeleted += (object source, FileMoniorArgs args) => 
            Console.WriteLine($"{args.ModifiedDate} | File deleted - {args.PathToFile}");
        
            monitor.FileModified += (object source, FileMoniorArgs args) =>
            Console.WriteLine($"{args.ModifiedDate} | File modified - {args.PathToFile}"); 
        
            monitor.FileRenamed += (object source, FileMoniorArgs args) =>
            Console.WriteLine($"{args.ModifiedDate} | File renamed - {args.PathToFile}");

            Console.WriteLine("Press enter to exit.");
            Console.ReadLine();
        }

    }
}
