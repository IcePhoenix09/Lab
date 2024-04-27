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

let form = new SimpleForm(document.body, 'EnterText', (inputValue) =>{
  const pickerOpts = {
    types: [
      {
        description: "Images",
        accept: {
          "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };
  // create a reference for our file handle
  let fileHandle;

  async function getFile() {
  // open file picker, destructure the one element returned array
  [fileHandle] = await window.showOpenFilePicker(pickerOpts);

  // run code with our fileHandle
  }
})

form.placeAtContext();
