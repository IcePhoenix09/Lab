
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

  async addNewRow(name, amount, status){
    const fullURL = `${this.url}/list/add/${this.listName}?name=${name}&amount=${amount}&status=${status}`
    let data = await fetch(fullURL, {
      method: 'POST'
    });
  }

}
