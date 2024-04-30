
let client = new Client('http://localhost:3000');

let table = new PurchasesTable(document.body, onDeleteRow, onAddRow)

let inputListName = new inputsForm(document.body, 1, (value) => {
	console.log("input");
	client.getList(value).then((data) => {
		table.updateTable(data);
	});
});

inputListName.placeAtContext();
document.body.appendChild(document.createElement('br'));
table.placeAtContext(['Name', 'Amount', 'Status']);

function onDeleteRow(){
	console.log("Row deleted");
}

function onAddRow(values){
	client.addNewRow(values[0], values[1], values[2]);
}
