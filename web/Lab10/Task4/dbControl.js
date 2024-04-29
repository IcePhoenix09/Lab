class dbStorage{
  constructor(){
    let openRequest = indexedDB.open("store", 1);
    openRequest.onupgradeneeded = function(event) {
      console.log("Data base not found. Creating data base");
      this.db = openRequest.result;
      this.db.createObjectStore('items', {keyPath: 'name'});
    };

    openRequest.onerror = function() {
      console.error("Error", openRequest.error);
    };

    openRequest.onsuccess = function() {
      this.db = openRequest.result;
      console.log(this.db)
      console.log("Data base successfully opened");
    };
  }

  getItems(){
    console.log("Retrieving all items");
    console.log(this.db)
    let transaction = this.db.transaction("items", "readonly");
    let items = transaction.objectStore("items");
    items.getAll();

    console.log("Found items - " + items);
    return items;
  }

  addItem(item){
    let transaction = this.db.transaction("items", "readwrite");
    let items = transaction.objectStore("items");

    let request = items.add({name: item});
    request.onsuccess = function() {
      console.log(`Item (${item}) successfully added`, request.result);
    };
    request.onerror = function() {
      console.log("Error", request.error);
    };
  }

  deleteItem(item){
    let transaction = this.db.transaction("items", "readwrite");
    let items = transaction.objectStore("items");
    items.delete(item);
    console.log(`Item ${item} was deleted`);
  }

  deleteAll(){
    let transaction = this.db.transaction("items", "readwrite");
    let items = transaction.objectStore("items");
    items.clear();
    console.log("All items was deleted");
  }
}
