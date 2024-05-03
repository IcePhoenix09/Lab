class Client{
  constructor(url){
    this.url = url;
    this.userName = null;

    var cookies = document.cookie.split(';');
    var username;
    cookies.forEach(function(cookie) {
    if (cookie.trim().startsWith('username=')) {
        username = cookie.trim().substring('username='.length);
    }
    });
    this.userName = username;
  };

  async getMessages(){
    let data = await fetch(this.url + '/messages');
    return data.json();
  }

  async sendMessage(text){
    let data = await fetch(`${this.url}/messages/new?name=${this.userName}&text=${text}`, {
      method: 'POST'
    });
    return data.json();
  }

}
  