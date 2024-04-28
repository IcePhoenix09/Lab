// this event is called to save data
const onChangeEvent = new Event("listChange")

const bc = new BroadcastChannel("test_channel");

let list = new SimpleList(document.body, onChangeEvent);
let panel = new Panel(document.body, list);

// display items on html
list.placeAtContext();
panel.placeAtContex();

function saveList(){
  items = [];
  for (line of list.lines){
    items.push(line.text);
  }
  localStorage.setItem("list", JSON.stringify(items));
}

// get data from storage. If data is not found list is filled with test data
function loadList(){
  try{
    items = JSON.parse(localStorage.getItem("list"));
    list.replaceLines(items);
  } catch (error) {
    console.warn('[Warning] saved data not found:', error);
    list.replaceLines(['test data', 'test data 2']);
    saveList(list);
  };
}
loadList();

document.addEventListener("listChange", e => {
  console.log("Saving Data...")
  saveList();
  bc.postMessage("Data Changed");
})

bc.onmessage = (event) => {
  if (event.data === "Data Changed"){
    loadList();
    console.log("Data changed")
  }
};
