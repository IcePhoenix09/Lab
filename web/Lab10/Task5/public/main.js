class SimpleForm{
  constructor(context, placeholder, onSubmit){
      this.context = context;
      this.onSubmit = onSubmit;
      this.placeholder = placeholder;
      
      this.form = document.createElement('form');
  };
  placeAtContext(){
    this.context.appendChild(this.form);

    const input = document.createElement("input");
    input.placeholder = this.placeholder;
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

async function getNewFileHandle() {
  const opts = {
    types: [
      {
        description: "Text file",
        accept: { "text/plain": [".txt"] },
      },
    ],
  };
  console.log("Opening selecting window");
  handler = await window.showSaveFilePicker(opts);
  return handler;
}

async function saveFile(inputValue){
  try {
    const fileHandle = await getNewFileHandle();
    if (!fileHandle) {
      console.log('No file selected.');
      return;
    }
    const file = await fileHandle.getFile();
    console.log('Selected file:', file.name);
    
    const writable = await fileHandle.createWritable();
    await writable.write(inputValue);
    await writable.close();

    console.log('Data written to file.');
  } catch (error) {
    console.error('Error selecting file:', error);
  }
}

let form = new SimpleForm(document.body, 'EnterText', (inputValue) =>{
  console.log("text that was entered - " + inputValue);
  saveFile(inputValue);
})

form.placeAtContext();
