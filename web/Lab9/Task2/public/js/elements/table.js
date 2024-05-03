class SimpleTable{
  constructor(id){
    this.table = document.getElementById(id);
  }

  addOneRow(row){
    let newRow = this.table.insertRow(this.table.rows.length);
    for (let i in row){
      newRow.insertCell(i).innerHTML = row[i]; 
    }
  }

  clearTable(){
    let rows = Array.from(this.table.getElementsByTagName('tr'));
    rows.splice(0, 1);
    for(let row of rows){
      row.remove();
    }
  }
}
