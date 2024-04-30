const express = require('express');

const app = express();

var data = {
  'purchases': [
    {
    'name': 'l1',
    'list': [
      {'name': 'Bread', 'amount': '200g', 'status': true},
      {'name': 'Milk', 'amount': '1l', 'status': true},
    ]},
    {'name': 'l2',
    'list': [
      {'name': 'Bread', 'amount': '200g', 'status': false},
      {'name': 'Test', 'amount': '200g', 'status': false},
      {'name': 'Juice', 'amount': '2l', 'status': false},
      {'name': 'cheese', 'amount': '500g', 'status': false},
    ]},
    {'name': 'l3',
      'list': [
      {'name': 'Test1', 'amount': '200g', 'status': false},
      {'name': 'Test2', 'amount': '200g', 'status': true},
      {'name': 'Test3', 'amount': '200g', 'status': false},
    ]}
  ]
}

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.get('/lists', (req, res) => {
  res.json(data);
});

app.get('/list/:name', (req, res) => {
  const purchases = data.purchases.find((purchases) => purchases.name == req.params.name);
  res.json(purchases.list);
});

app.post('/list/add/:name', (req, res) => {
  const purchases = data.purchases.find((purchases) => purchases.name == req.params.name);
  console.log(req.query);
  
  purchases.list.push({
    name: req.query.name,
    amount: req.query.amount,
    status: req.query.status
  })
  res.status(200);
});

app.post('/lists/new', (req, res) => {
  res.send("Creare new list");
});

app.delete('/list/delete')

app.listen(3000, () => {
  console.log('Server is listening at port 3000');
});
