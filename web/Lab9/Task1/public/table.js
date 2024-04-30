// Method placeAtContext put items to html using appendChild. 
// This method can be used to control items' position. 
// 'context' means place where items would be put using appendChild.

class ActionButton{
  constructor(context, label, onClick){
    this.context = context;
    this.onClick = onClick; 
    this.label = label;
    this.button = null;
  }
  placeAtContext(){
    this.button = document.createElement('button');
    this.button.innerText = this.label;
    this.button.onclick = () => this.onClick();
    this.context.appendChild(this.button);
  }
  remove(){
    this.button.remove();
  }
}

// simple input form that contains couple input fields and button
class inputsForm{
  constructor(context, numberOfinput, onSubmit){
    this.context = context;
    this.onSubmit = onSubmit;
    this.numberOfinput = numberOfinput;
    
    this.form = document.createElement('form');
  };

  placeAtContext(){
    this.context.appendChild(this.form);

    let inputs = [];

    for (let i = 0; i < this.numberOfinput; i++){
      const input = document.createElement("input");
      this.form.appendChild(input);
      inputs.push(input);
    }

    const button = document.createElement('button');
    button.innerText = 'Submit' 
    this.form.appendChild(button);

    this.form.onsubmit = (event) => {
      event.preventDefault();

      const values = [];
      for (let input of inputs){
        values.push(input.value);
        input.value = '';
      }
      this.onSubmit(values);
    }
  };

  remove(){
    this.form.remove();
  }
}

class SimpleTable{
  constructor(context, onDeleteRow, onAddRow){
    this.context = context;
    this.table = document.createElement('table');

    this.onDeleteRow = onDeleteRow;
    this.onAddRow = onAddRow;
  }

  placeAtContext(columnNames){
    this.context.appendChild(this.table);
    this.placeHeader(columnNames);
    this.placeAddForm();
  }

  addOneRow(row){
    let newRow = this.table.insertRow(this.table.rows.length);
    for (let i in row){
      newRow.insertCell(i).innerHTML = row[i]; 
    }

    const deleteButton = new ActionButton(newRow, 'Delete', () => {
      newRow.remove();
      deleteButton.remove();
      this.onDeleteRow();
    });
    deleteButton.placeAtContext();
  }

  placeAddForm(){
    let field = document.createElement('div');
    let header = document.createElement('h3');
    header.innerText = "Add new row";
    let inputForm = new inputsForm(field, 3, (values) => {
      this.onAddRow(values);
      this.addOneRow(values);
    });
    field.appendChild(header);
    inputForm.placeAtContext();
    this.context.appendChild(field);
  }
  
  placeHeader(columnNames){
    let headerRow = document.createElement('tr');
    for (let i in columnNames){
      let header = document.createElement('th');
      header.innerText = columnNames[i];
      headerRow.appendChild(header);
    }    
    this.table.appendChild(headerRow);
  }

  clearTable(){
    let rows = Array.from(this.table.getElementsByTagName('tr'));
    rows.splice(0, 1);
    for(let row of rows){
      row.remove();
    }
  }
}

class PurchasesTable extends SimpleTable{
  constructor(context, onDeleteRow, onAddRow){
    super(context, onDeleteRow, onAddRow);
  };

  addPurchaseItem(purchase){
    this.addOneRow([purchase.name, purchase.amount, purchase.status]);
  }

  updateTable(purchases){
    this.clearTable();
    for (let item of purchases){
      this.addPurchaseItem(item);
    }
  }
}
