let musicNum = null

let connection_list = []


onconnect = function (e) {
  console.log('onconnect')
  var port = e.ports[0];
  port.start()


  if(connection_list.indexOf(port) === -1){
    connection_list.push(port)
  }

  port.addEventListener('message', function (e) {
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

      connection_list.map((elem)=>{
        elem.postMessage({
          type:'get',
          data: musicNum
        });
      })



    }

  }

})