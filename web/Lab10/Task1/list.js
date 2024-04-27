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

class Line{
    constructor(context, text){
        this.context = context;
        this.text = text

        this.listItem = document.createElement('li');
        this.br = document.createElement('br');
        this.listItem.innerText = text;

        //create button
        this.deleteButton = new ActionButton(this.listItem, 'delete', () => {
            this.deleteButton.remove();
            this.remove();
        });
    }

    placeAtContext(){
        this.listItem.appendChild(document.createElement('br'));
        this.deleteButton.placeAtContext();
        this.context.appendChild(this.listItem);
        this.context.appendChild(this.br);
    }

    remove(){
        console.log(this.br);
        this.listItem.remove();
        this.br.remove();
    }
}

class SimpleList{
    constructor(context, onChangeEvent){
        this.context = context;
        this.lines = [];
        this.list = null;
        this.onChangeEvent = onChangeEvent;
    }
    placeAtContext(){
        this.list = document.createElement('ol');
        this.context.appendChild(this.list);
    }

    add(item){
        let line = new Line(this.list, item);
        this.lines.push(line);
        line.placeAtContext();
    }

    addOneLine(item){
        this.add(item);
        document.dispatchEvent(this.onChangeEvent);
    }

    addMultipleLines(items){
        for (let item of items){
            this.add(item);
        }
        document.dispatchEvent(this.onChangeEvent);
    }
    
    deleteAllLines(){
        for (let i in this.lines){
            this.lines[i].remove(); // remove item from html
        }
        this.lines.length = 0; // crear array
        document.dispatchEvent(this.onChangeEvent);
    }

    deleteLine(string){
        let line = this.lines.find((line) => line.text === string);
        line.remove(); // remove item from html
        this.lines.splice(this.lines.indexOf(line), 1); // remove item from array
        document.dispatchEvent(this.onChangeEvent);
    };

    replaceLines(items){
        this.deleteAllLines();
        this.addMultipleLines(items);
    }
}

class SimpleForm{
    constructor(context, onSubmit){
        this.context = context;
        this.onSubmit = onSubmit;
        
        this.form = document.createElement('form');
    };
    placeAtContext(){
        this.context.appendChild(this.form);

        const input = document.createElement("input");
        input.placeholder = "Name"
        this.form.appendChild(input);

        const button = document.createElement('button');
        button.innerText = 'Submit' 
        this.form.appendChild(button);

        this.form.onsubmit = (event) => {
            event.preventDefault();

            const value = input.value;
            this.onSubmit(value);
        }
    };

    remove(){
        this.form.remove();
    }
}

class Panel{
    constructor(contex, list){
        this.contex = contex;
        
        this.addButtonField = document.createElement('div');
        this.addButton = new ActionButton(this.addButtonField, 'Add new', () =>{
            this.createInputField();
        })
        this.addButton.placeAtContext();

        this.deleteButtonField = document.createElement('div');
        this.deleteButton = new ActionButton(this.deleteButtonField, 'Delete All', () => {
            list.deleteAllLines();
        });
        this.deleteButton.placeAtContext();
    }

    placeAtContex(){
        console.log()
        this.contex.appendChild(this.addButtonField);
        this.contex.appendChild(document.createElement('br'));
        this.contex.appendChild(this.deleteButtonField);
    }

    createAddButton(){
        this.addButton.placeAtContext();
    }

    createInputField(){
        this.addButton.remove();
        let form = new SimpleForm(this.addButtonField, (inputValue) => {
            list.addOneLine(inputValue);
            form.remove();
            this.createAddButton();
        })
        form.placeAtContext();
    }
}
