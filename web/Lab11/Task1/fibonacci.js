
function fibonacci(n) {
  return n < 1 ? 0
       : n <= 2 ? 1
       : fibonacci(n - 1) + fibonacci(n - 2)
}

onmessage = function(e) {
  console.log(`Count - ${e.data}`);
  let result = fibonacci(e.data);
  self.postMessage(result);
}
