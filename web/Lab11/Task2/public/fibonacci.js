const channel = new BroadcastChannel('worker_channel');

function fibonacci(n) {
  return n < 1 ? 0
       : n <= 2 ? 1
       : fibonacci(n - 1) + fibonacci(n - 2)
}

onconnect = (e) => {
  const port = e.ports[0];
  port.addEventListener("message", (e) => {
    console.log(`Count - ${e.data}`);
    let result = fibonacci(e.data);
    channel.postMessage(result);
  })
  port.start();
}
