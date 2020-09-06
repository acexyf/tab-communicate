let musicNum = null

onconnect = function (e) {
  console.log('onconnect')
  var port = e.ports[0];
  // port.postMessage('Hello World!');

  port.onmessage = function (e) {
    let {
      type,
      data
    } = e.data
    if (type == 'get') {
      port.postMessage({
        type:'get',
        data: musicNum
      });
    } else if(type == 'set') {
      musicNum = data

    }



  }




}