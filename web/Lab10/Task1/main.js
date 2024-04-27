let list = new SimpleList(document.body);
let panel = new Panel(document.body, list);

list.placeAtContext();
list.addMultipleLines(['test', 'test1']);

panel.placeAtContex();

const onChangeEvent = new Event("listChange");

function saveList(list){
    for (line of list.lines){
        console.log(line.text);
    }
}
saveList(list);
