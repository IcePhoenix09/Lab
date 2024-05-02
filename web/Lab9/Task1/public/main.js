
let client = new Client('http://localhost:3000');

let table = new PurchasesTable(document.body, onDeleteRow, onAddRow)
let list = new SimpleList(document.body);
let panel = new ListControlPannel(document.body, onAddList)

// create form to input lisy name
const header = document.createElement('h3');
header.innerText = "Get List:"
document.body.appendChild(header);
let inputListName = new inputsForm(document.body, 1, (value) => {
	console.log("input");
	client.getList(value).then((data) => {
		table.updateTable(data);
    updateCurrentListInfo();
	});
});
inputListName.placeAtContext();
document.body.appendChild(document.createElement('br'));

// show current list name
function updateCurrentListInfo(){
  console.log(client.listName);
  currentList.innerText = "Current list - " + client.listName;
}
let currentList = document.createElement('p');
document.body.appendChild(currentList);
updateCurrentListInfo();

// create table
function onDeleteRow(index){
	console.log("Row deleted");
	client.deleteRow(index);
}
function onAddRow(values){
	client.addNewRow(values[0], values[1], values[2]);
}
table.placeAtContext(['Name', 'Amount', 'Status']);

document.body.appendChild(document.createElement('br'));

// show all lists
list.placeAtContext("Available lists");
updateList();
function updateList(){
  client.getAllLists().then((data) => {
    list.replaceLines(data.lists);
  })
}

// creates 'add new list' and 'delete current list' button
panel.placeAtContext();
async function onAddList(listName){
  await client.createNewList(listName);
  updateCurrentListInfo();
  updateList();
  table.clearTable();
}
// async function onDeleteList(){
//   await client.deleteList();
//   updateCurrentListInfo();
//   updateList();
//   table.clearTable();
// }
