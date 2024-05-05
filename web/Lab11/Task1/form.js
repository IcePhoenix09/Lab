class SimpleForm{
  constructor(id, onSubmit){
    this.onSubmit = onSubmit;
    
    this.field = document.getElementById(id);
    this.form = document.createElement('form');
  };

  placeAtContext(){
    this.field.appendChild(this.form);

    const input = document.createElement("input");
    this.form.appendChild(input);
  
    const button = document.createElement('button');
    button.innerText = 'Submit' 
    this.form.appendChild(button);

    this.form.onsubmit = (event) => {
      event.preventDefault();
      this.onSubmit(input.value);
      input.value = '';
    }
  };

  remove(){
    this.form.remove();
  }
}