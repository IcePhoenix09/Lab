const socket = new WebSocket('ws://localhost:8000');

let currencies = [];

socket.onmessage = ({data}) => {
  // console.log('Message from server', data)
  currencies = JSON.parse(data);
  showPrices();
};

for (i = 0; i < 5; i++){
  let text = document.createElement('p');
  document.body.appendChild(text);
}

function showPrices(){
  let textFields = document.getElementsByTagName('p');
  for (let i in currencies){
    textFields[i].innerText = `${currencies[i].name} : ${currencies[i].price}`; 
  }
}

