let shareNum = 0

onconnect = function(e) {
  var port = e.ports[0];
  // port.postMessage('Hello World!');

  port.onmessage = function(e){
    shareNum++
    port.postMessage('num:'+shareNum)
  }




}