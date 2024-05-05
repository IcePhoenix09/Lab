
const worker = new SharedWorker('./fibonacci.js');
const channel = new BroadcastChannel('worker_channel');

worker.port.start();

let form = new SimpleForm('form', (value) => {
  console.log(`Input value - ${value}`);
  worker.port.postMessage(value);
});
form.placeAtContext();

channel.onmessage = ({data}) => {
  let resulFuild = document.getElementById('result');
  resulFuild.innerText = data;
  alert(`Result - ${data}`);
}
