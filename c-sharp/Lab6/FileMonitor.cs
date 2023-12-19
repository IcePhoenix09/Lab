

namespace MonitorFiles{

    public class FileMoniorArgs : EventArgs{
        public string PathToFile { get; set; }
        public DateTime ModifiedDate {get; set;}
    }

    public class FileMonitor{

        public delegate void FileMonitorDelegate(object source, FileMoniorArgs args);

        public event FileMonitorDelegate FileCreated;
        public event FileMonitorDelegate FileDeleted;
        public event FileMonitorDelegate FileModified;
        public event FileMonitorDelegate FileRenamed;

        FileSystemWatcher watcher;

        public FileMonitor(string watchedFolder){
            watcher = new FileSystemWatcher(watchedFolder);

            watcher.Created += OnCreated;
            watcher.Deleted += OnDeleted;
            watcher.Changed += OnChanged;
            watcher.Renamed += OnRenamed;

            watcher.Filter = "*.txt";            
            watcher.IncludeSubdirectories = true;
            watcher.EnableRaisingEvents = true;
        }
        private void OnCreated(object sender, FileSystemEventArgs e) =>
            OnFileCreated(e.FullPath);
 

        private void OnDeleted(object sender, FileSystemEventArgs e) =>
            OnFileDeleted(e.FullPath);

        private void OnChanged(object sender, FileSystemEventArgs e)
        {
            if (e.ChangeType != WatcherChangeTypes.Changed)
            {
                return;
            }
            OnFileModified(e.FullPath);
        }

        private void OnRenamed(object sender, RenamedEventArgs e) =>
            OnFileRenamed(e.OldFullPath);

        protected virtual void OnFileCreated(string FilePath){

            if (FileCreated != null){
                FileCreated(this, new FileMoniorArgs(){PathToFile = FilePath, ModifiedDate = DateTime.Now});
            }
        }

        protected virtual void OnFileDeleted(string FilePath){
            if (FileDeleted != null){
                FileDeleted(this, new FileMoniorArgs(){PathToFile = FilePath, ModifiedDate = DateTime.Now});
            }
        }

        protected virtual void OnFileModified(string FilePath){
            if (FileModified != null){
                FileModified(this, new FileMoniorArgs(){PathToFile = FilePath, ModifiedDate = DateTime.Now});
            }
        }

        protected virtual void OnFileRenamed(string FilePath){
            if (FileRenamed != null){
                FileRenamed(this, new FileMoniorArgs(){PathToFile = FilePath, ModifiedDate = DateTime.Now});
            }
        }

    }
}
