
const worker = new Worker('./fibonacci.js');
let form = new SimpleForm('form', (value) => {
  console.log(`Input value - ${value}`);
  worker.postMessage(value);
});
form.placeAtContext();

worker.onmessage = ({data}) => {
  console.log(data);
  let resulFuild = document.getElementById('result');
  resulFuild.innerText = data;
};
