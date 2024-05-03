const path = require('path');
const express = require('express');
const WebSocket = require('ws');

const app = express();

function generate(min, max) { 
  return Math.random() * (max - min) + min;
}

const cryptocurrencyList = ['BTC', 'ETH', 'USDT', 'BNB', 'SOL'];
let data = []
for (currency of cryptocurrencyList){
  data.push({name: currency, price: generate(100, 100000)})
}

function update(currency){
  console.log(`${currency.name} price - ${currency.price} updated to`);
  currency.price += generate(-100, 100);
  console.log(currency.price);
  console.log('');
}

function startUpdate(currency){
  let interval = Math.floor(generate(1000, 10000));
  setTimeout(() => {
    console.log(currency);
    update(currency);
    sendUpdateEvent();
    startUpdate(currency)
  }, interval);
}
for (currency of data){
  startUpdate(currency);
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.set('view engine', 'ejs');
// app.get('/', (req, res) => {
//   res.render('login');
// });


const server = new WebSocket.Server({ port: '8000'})
server.on('connection', socket => {
  socket.on('message', message => {
    socket.send(`Roger ${message}`);
  })
});

function sendPrices(){
  server.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

function sendUpdateEvent(){
  sendPrices();
}

app.listen(3000, () => {
  console.log('Server is listening at port 3000');
});
