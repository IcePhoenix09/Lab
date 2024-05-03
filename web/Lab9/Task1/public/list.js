
class SimpleList{
  constructor(context){
    this.context = context;
    this.lines = [];
    this.list = document.createElement('ol');
  }

  placeAtContext(title){
    this.placeTitle(title);
    this.context.appendChild(this.list);
  }

  addOneLine(item){
    const listItem = document.createElement('li');
    listItem.innerText = item;
    this.lines.push(listItem);
    this.list.appendChild(listItem);
  }

  addMultipleLines(items){
    for (let item of items){
      this.addOneLine(item);
    }
  }
  
  clearList(){
    for (let i in this.lines){
      this.lines[i].remove(); // remove item from html
    }
    this.lines.length = 0; // clear array
  }

  replaceLines(items){
    this.clearList();
    this.addMultipleLines(items);
  }

  placeTitle(title){
    const header = document.createElement('h3');
    header.innerText = title;
    this.context.appendChild(header);
  }
}

class ListControlPannel{
  constructor(context, onAddList, onDelete){
    this.context = context;
    this.addButtonField = document.createElement('div');
    this.deleteButtonField = document.createElement('div');
    this.onAddList = onAddList;
    this.onDelete = onDelete;
  }

  placeAtContext(){
    this.context.appendChild(this.addButtonField);
    this.context.appendChild(document.createElement('br'));
    this.context.appendChild(this.deleteButtonField);
    this.createAddButton();
    this.createDeleteButton();
  }

  createAddButton(){
    let addButton = new ActionButton(this.addButtonField, "Create new list", () => {
      addButton.remove();
      let form = new inputsForm(this.addButtonField, 1, (value) => {
        this.onAddList(value);
        form.remove();
        this.createAddButton();
      });
      form.placeAtContext();
    });
    addButton.placeAtContext();
  }
  
  createDeleteButton(){
    let deleteButton = new ActionButton(this.deleteButtonField, "Delete this list", () => {
      this.onDelete();
    });
    deleteButton.placeAtContext();
  }
}
