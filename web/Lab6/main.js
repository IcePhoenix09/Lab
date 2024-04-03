function init(){
    createHeader();
    createMain();
    createFooter();
    // const el = document.querySelector('.demo');
    // el.style.backgroundColor = 'yellow';
}

function createHeader(){
    let header = document.createElement('div');
    document.body.appendChild(header);
    header.innerText = "Hello World header"; 
    header.className = "header";
    header.appendChild(document.createElement('br'));

    let userRatingButton = document.createElement('button');
    userRatingButton.innerText = "User Rating"
    header.appendChild(userRatingButton);
    userRatingButton.addEventListener('click', () => onClick("User"))

    let newsButton = document.createElement('button');
    newsButton.innerText = "News"
    header.appendChild(newsButton);
    newsButton.addEventListener('click', () => onClick("News"))

    let contactsButton = document.createElement('button');
    contactsButton.innerText = "Contacts"
    header.appendChild(contactsButton);
    contactsButton.addEventListener('click', () => onClick("Contacts"))
    
    let aboutButton = document.createElement('button');
    aboutButton.innerText = "About"
    header.appendChild(aboutButton);
    aboutButton.addEventListener('click', () => onClick("About"))
}

function onClick(name){
    let header = document.getElementById("content_header");
    header.innerText = name;
}

function createFooter(){
    let footer = document.createElement('div');
    document.body.appendChild(footer);
    footer.className = "footer";

    showCurrentUserNumber(footer);
    footer.appendChild(document.createElement('br'));
    showNewUser(footer);
}

function showCurrentUserNumber(content){
    let block = document.createElement('div');
    content.appendChild(block);

    block.innerText = "Current User - " + currentUser();
}

function showNewUser(content){
    let block = document.createElement('div');
    content.appendChild(block);
    block.innerText = "New Users:";

    let new_users = getNewUsers();
    let ul = document.createElement('ul')
    ul.className = "userList"
    block.appendChild(ul)
    for (user of new_users){
        let li = document.createElement('li')
        ul.appendChild(li);
        li.innerText = user.first_name;
    }
}

function createMain(){
    let main = document.createElement('div');
    document.body.appendChild(main);
    main.className = "main";
    main.id = "main";

    let userList = new UserList(main);
    let input = new InputField(main, userList.user_table);
    let rightField = new RightField(main, userList.user_table);
  
    input.init("Left Panel", "leftPanel", "left");
    userList.init("Content", "content", "content_header");
    rightField.init("Right Panel", "rightPanel", "right");
}

class MainLoader{
    constructor(content){
        this.content = content;
        this.loader;
        this.active = false;
    }

    start(){
        if (!this.active){
            this.loader = document.createElement('div');
            this.loader.className = "loader";
            this.content.appendChild(this.loader);
            this.active = true;
        }
    }

    stop(){
        this.loader.remove();
    }
}

class Panel{
    constructor(content){
        this.outerContent = content;
        this.content = document.createElement('div');
        this.loader = new MainLoader(this.content);
    }

    init(name, class_name, id){
        this.outerContent.appendChild(this.content);
        this.content.className =class_name;

        let PanelHeader = document.createElement('h3');
        PanelHeader.id = id;
        PanelHeader.innerText = name;
        this.content.appendChild(PanelHeader);

        this.startLoading();
    }

    startLoading(){
        this.loader.start();
        setTimeout(() => {
            this.loader.stop(); 
            this.show();
        }, 1000);
    }

    show(){};
}

class InputField extends Panel{
    constructor(content, table){
        super(content);
        this.table = table;
    }

    show(){
        const form = document.createElement('form');
        this.content.appendChild(form);

        const input = document.createElement("input");
        input.placeholder = "Search"
        form.appendChild(input);

        const button = document.createElement('button');
        button.innerText = 'Submit' 
        form.appendChild(button);

        form.onsubmit = (event) => {
            event.preventDefault();
            this.table.resetColor();
            if (input.value != ''){
                this.table.highlightRow(input.value);
            }
        }
    }
}

class UserList extends Panel{
    constructor(content){
        super(content);
        this.user_table = new UserTable(this.content);
    }

    show(){
        this.createButtonAndTable();
    }

    createButtonAndTable(){
        let button = document.createElement("button");
        button.id = "get_user"
        button.innerText = "Get User";
        this.content.appendChild(button);
        this.info_block = document.createElement('div');
        this.content.appendChild(this.info_block);
        this.info_block.innerText = "No User!";

        this.user_table.placeObjects();
        button.addEventListener('click', () => this.showUserList(this.user_table));
    }
    
    async showUserList(table){
        document.getElementById("get_user").disabled = true;
        table.clearData();
    
        let loader = document.createElement('div');
        loader.className = "loader";
        loader.id = "content_loader";
        this.content.appendChild(loader);
    
        let rand_user = await fetchUsers();
    
        loader.remove();
        
        table.addData(rand_user);
        let check = document.getElementById('edit');
        if (check.checked){
            table.addDeleteButton();
        }

        if (table.length == 0){
            this.info_block.innerText = "No User!";
        } else {
            this.info_block.innerText = "";
        }
        document.getElementById("get_user").disabled = false;
    }
}

class RightField extends Panel{
    constructor(content, table){
        super(content);
        this.table = table;
        this.sumField = document.createElement('div');
        this.checkbox = document.createElement('div');
    }

    show(){
        document.addEventListener("UpdatedUserList", e => {
            this.update.call(this);
        });
        this.content.appendChild(this.sumField);
        this.update(); 

        let input = document.createElement('input');
        input.type = "checkbox";
        input.id = "edit";
        this.checkbox.appendChild(input);
        input.addEventListener("click", () => this.onEdit())

        let label = document.createElement('label');
        label.for = "edit";
        label.innerText = "EditTable";
        this.checkbox.appendChild(label);

        this.content.appendChild(this.checkbox);
    }

    update(){
        this.sumField.innerText = "Sum - " + this.table.getSum();
    }

    onEdit(){
        let check = document.getElementById('edit');
        if (check.checked){
            this.table.addDeleteButton();
        } else {
            this.table.removeDeleteButton();
        }
    }

}

// this class need to replace old element of the table to new
// it works by replacing tbody of the table
class ReplaceableTable{
    constructor(content){
        this.content = content;
        this.table = document.createElement("table");
        this.length = 0;
        this.resetEvent = new Event("UpdatedUserList");
    }

    placeTable(){
        this.content.appendChild(this.table);
        // I create this tbody to replace it later in showUser
        let tbody = document.createElement("tbody");
        this.table.appendChild(tbody);
    }

    clearData(){
        this.length = 0;
        let old_tbody = this.table.getElementsByTagName('tbody')[0];
        let new_tbody = document.createElement('tbody');
        this.table.replaceChild(new_tbody, old_tbody);
    }

    replaceData(item_list){
        this.length = 0;
        let old_tbody = this.table.getElementsByTagName('tbody')[0];
        let new_tbody = document.createElement('tbody');
        this.populate_with_new_rows(new_tbody, item_list);
        this.table.replaceChild(new_tbody, old_tbody)
    }

    populate_with_new_rows(tbody, item_list){
        for (let item of item_list){
            this.length ++;
            let newRow = tbody.insertRow(tbody.rows.length);
            newRow.insertCell(0).innerHTML = item.first_name; 
            newRow.insertCell(1).innerHTML = item.last_name; 
            newRow.insertCell(2).innerHTML = item.score; 
        }
        document.dispatchEvent(this.resetEvent);
    }

    addData(item_list){
        this.populate_with_new_rows(this.table, item_list);
    }
}

class UserTable extends ReplaceableTable{
    constructor(content){
        super(content);
    }

    placeObjects(){
        this.placeTable();
        this.createHeader();
    }

    resetColor(){
        let rows = this.table.getElementsByTagName('tr');
        for (let row of rows){
            row.style="";
        }
    }

    highlightRow(text){
        let rows = this.table.getElementsByTagName('tr');
        for (let row of rows){
            for (let cell of row.getElementsByTagName('td')){
                if (cell.innerText.search(text) != -1){
                    row.style="background-color:yellow;";
                }
            }
        }
    }

    getSum(){
        let sum = 0;
        const rows = this.table.getElementsByTagName('tr');
        for (let row of rows){
            const cell = row.getElementsByTagName('td')
            sum += Number(cell[2].innerText);
        }
        return sum;
    }

    addDeleteButton(){
        const rows = this.table.getElementsByTagName('tr');
        for (let row of rows){
            const deleteButton = document.createElement('button');
            deleteButton.innerText = "Delete";
            deleteButton.addEventListener('click', () => 
                this.onDelete(row, deleteButton));
            
            row.appendChild(deleteButton);
        }
    }

    removeDeleteButton(){
        const rows = this.table.getElementsByTagName('tr');
        for (let row of rows){
            let buttons = row.getElementsByTagName('button');
            buttons[0].remove();
        }        
    }

    onDelete(row, button){
        row.remove();
        button.remove();
        document.dispatchEvent(this.resetEvent);
    }

    createHeader(){
        var thead = document.createElement('thead');
        this.table.appendChild(thead);

        const firstHeader = document.createElement("th");
        firstHeader.addEventListener('click', () => this.sortTable());
        thead.appendChild(firstHeader).
            appendChild(document.createTextNode("First Name"));
        
        thead.appendChild(document.createElement("th")).
            appendChild(document.createTextNode("Last Name"));

        thead.appendChild(document.createElement("th")).
            appendChild(document.createTextNode("Score"));
    }

    sortTable(){
        let tbody = this.table.getElementsByTagName('tbody')[0];

        const rows = Array.from(this.table.getElementsByTagName('tr'));
        // console.log(rows[0].getElementsByTagName('td')[0].innerText);
        rows.sort(function(a, b){
            let first = a.getElementsByTagName('td')[0];
            let second = b.getElementsByTagName('td')[0];
            if (first.innerText < second.innerText){
                return -1;
            }
            if (first.innerText > second.innerText){
                return 1;
            }
            return 0;
        });

        for (let i = 0; i < rows.length; i++){
            rows[i].remove();
        }

        for (let i = 0; i < rows.length; i++){
            tbody.appendChild(rows[i]);
        }
    }

}

init();
