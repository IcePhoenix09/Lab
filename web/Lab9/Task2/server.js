const path = require('path');
const express = require('express');

const app = express();

let clients = [];
var data = {
  'messages': [
    {
      'name': 'Roma',
      'text': 'hi'},
    {
      'name': 'Joe',
      'text': 'hi'},
    {
      'name': 'Test',
      'text': 'test'},
  ]
}

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//   res.render('login');
// });

app.get('/login/:name', (req, res) => {
  res.redirect(`/chat/`);
})

app.get('/chat/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/chat.html'));
});

app.get('/messages', (req, res) => {
  res.json(data);
})

app.post('/messages/new', (req, res) => {
  const userName = req.query.name;
  const text = req.query.text;
  const message = {name: userName, text: text}
  data.messages.push(message);
  sendEventsToAll(message);

  res.json(data);
})

app.listen(3000, () => {
  console.log('Server is listening at port 3000');
});


function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}
app.get('/events', eventsHandler);

function sendEventsToAll(message) {
  clients.forEach(client => client.response.write(`data: ${JSON.stringify(message)}\n\n`))
}
