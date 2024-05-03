
const client = new Client('http://localhost:3000');

let table = new SimpleTable("main_table");
let form = new SimpleForm("post_form", (value) => {
  table.addOneRow([client.userName, value])
  client.sendMessage(value);
});
form.placeAtContext();

function getData(){
  client.getMessages().then((data) => {
    addDataToTable(data.messages);
  });
}

function addDataToTable(data){
  for (item of data){
    table.addOneRow([item.name, item.text]);
  }
}

function showUserName(){
  let field = document.getElementById('user_name');
  field.innerText = 'User name - ' + client.userName;
}

let eventSource = new EventSource("/events");
eventSource.onmessage = function(event) {
  table.clearTable();
  getData();
};

showUserName();
getData();
