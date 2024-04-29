// this event is called to update data on other tabs
const onChangeEvent = new Event("listChange")

const bc = new BroadcastChannel("test_channel");

let dbControl = new dbStorage();
dbControl.init().then(() => {
  loadList();
});

let list = new SimpleList(document.body, dbControl);
let panel = new Panel(document.body, list);

// display items on html
list.placeAtContext();
panel.placeAtContex();

// function saveList(){
//   items = [];
//   for (line of list.lines){
//     items.push(line.text);
//   }
//   localStorage.setItem("list", JSON.stringify(items));
// }

function loadList(){
  const items = dbControl.getItems();
  list.updateLines(items);
}


document.addEventListener("listChange", e => {
  bc.postMessage("Data Changed");
})

bc.onmessage = (event) => {
  if (event.data === "Data Changed"){
    loadList();
    console.log("Data changed")
  }
}
