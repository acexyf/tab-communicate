let musicNum = null;

const connectedClients = new Set()

let id = 1

function sendMessageToClients(payload, currentClientId = null) {
  connectedClients.forEach(({ id, client }) => {
    if (currentClientId && currentClientId == id) return;
    client.postMessage(payload);
  });
}

function setupClient(clientPort) {
  clientPort.onmessage = (event) => {
    const { type, data, id } = event.data;
    if(type=='set'){
        musicNum = data


        sendMessageToClients({
            type: 'get',
            data: data,
        }, id)

    }
  };
}

self.addEventListener("connect", (event) => {
  const newClient = event.source;
  connectedClients.add({
    client: newClient,
    id: id,
  });
  setupClient(newClient);

  newClient.postMessage({
    type: 'id',
    data: id
  })

  id++
});
