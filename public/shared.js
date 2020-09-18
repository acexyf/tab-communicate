let musicNum = null;

const connectedClients = [];

onconnect = function (e) {
  var port = e.source;
  //   port.start();
  console.log("onconnect");
  connectedClients.push({
    port,
  });

  port.onmessage = (e) => {
    let { type, data } = e.data;

    if (type == "get") {
      port.postMessage({
        type: "get",
        data: musicNum,
      });
    } else if (type == "set") {
      musicNum = data;
      console.log(connectedClients, connectedClients.length);
      connectedClients.forEach((elem) => {
        console.log(elem.port !== port);
        if (elem.port !== port) {
          elem.port.postMessage({
            type: "get",
            data: musicNum,
          });
        }
      });
    } else if (type == "close") {
      self.close();
    }
  };
};
