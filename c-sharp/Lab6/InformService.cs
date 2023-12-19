namespace MonitorFiles{
    public class InformService{
        public void OnFileCreated(object source, FileMoniorArgs args){
            Console.WriteLine($"File created - {args.PathToFile}");   
        }

        public void OnFileDeleted(object source, FileMoniorArgs args){
            Console.WriteLine($"File deleted - {args.PathToFile}");   
        }

        public void OnFileModified(object source, FileMoniorArgs args){
            Console.WriteLine($"File modified - {args.PathToFile}");   
        }

        public void OnFileRenamed(object source, FileMoniorArgs args){
            Console.WriteLine($"File renamed - {args.PathToFile}");   
        }
    }
}