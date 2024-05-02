
class Client{
  constructor(url){
    this.url = url;
    this.listName = null;
  };

  async getList(listName){
    let data = await fetch(this.url + '/list/' + listName);
    this.listName = listName;
    return data.json();
  }

  async getAllLists(){
    let data = await fetch(this.url + '/lists');
    return data.json();
  }

  async createNewList(listName){
    const fullURL = `${this.url}/list/new/${listName}`
    let data = await fetch(fullURL, {
      method: 'POST'
    });
    console.log("test")
    this.listName = listName;
    return data.json();
  }

  async addNewRow(name, amount, status){
    const fullURL = `${this.url}/list/add/${this.listName}?name=${name}&amount=${amount}&status=${status}`
    let data = await fetch(fullURL, {
      method: 'POST'
    });
  }

  async deleteRow(index){
    const fullURL = `${this.url}/list/row/delete/?name=${this.listName}&index=${index}`
    let data = await fetch(fullURL, {
      method: 'DELETE'
    })
  }

  async deleteList(){
    const fullURL = `${this.url}/list/delete/${this.listName}`
    let data = await fetch(fullURL, {
      method: 'DELETE'
    })
    this.listName = null;
    return data.json();
  }

}
