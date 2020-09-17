const express = require("express");
const path = require("path");
const port = 9010;
const app = express();
const expressWs = require("express-ws")(app);

app.use("/public", express.static("public"));

app.get("/storage", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./storage.html"));
});
app.get("/storage1", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./storage1.html"));
});
app.get("/cookie", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./cookie.html"));
});
app.get("/cookie1", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./cookie1.html"));
});
app.get("/worker", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./worker.html"));
});
app.get("/websocket", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./websocket.html"));
});
app.get("/postMessage", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./postMessage.html"));
});

let clients = [];

app.get("/api/get_user_id", function (req, res) {
  res.json({
    user_id: clients.length + "",
  });
});

let musicNum = null;

app.ws("/ws/:user_id", function (ws, req) {
  let { user_id } = req.params;

  clients.push({
    user_id,
    ws,
  });

  ws.send("连接成功");

  ws.on("message", function (msg) {
    // console.log('收到消息:', msg, user_id)
    // ws.send('from server msg')

    console.log(msg, "msg");
    let parsed = {};
    try {
      parsed = JSON.parse(msg);
    } catch (error) {}
    musicNum = parsed;

    for (let i = 0; i < clients.length; i++) {
      let item = clients[i];
      if (item.user_id === user_id && item !== this) {
        item.ws.send(msg);
      }
    }
  });

  ws.on("close", function () {
    console.log("close");

    for (let i = 0; i < clients.length; i++) {
      if (clients[i].ws === this) {
        clients.splice(i, 1);
      }
    }

    // ws.send('bye')
  });
});

app.get("/api/list", (req, res) => {
  let { id } = req.query;
  let list = [];
  if (id == 1) {
    list = [
      {
        name: "阳光下的我们",
        time: "04:10",
        singer: "曲婉婷",
        album: "Say The Words",
      },
      {
        name: "像是一颗星星",
        time: "03:50",
        singer: "杨丞琳",
        album: "像是一颗星星",
      },
      {
        name: "开往早晨的午夜",
        time: "04:47",
        singer: "张碧晨",
        album: "开往早晨的午夜",
      },
    ];
  } else if (id == 2) {
    list = [
      {
        name: "别怕",
        time: "03:29",
        singer: "徐佳莹",
        album: "寻人启事",
      },
      {
        name: "星星之火",
        time: "04:40",
        singer: "罗云熙",
        album: "星星之火",
      },
      {
        name: "最好的未来",
        time: "04:13",
        singer: "刘若英",
        album: "潜流",
      },
    ];
  } else if (id == 3) {
    list = [
      {
        name: "小姐你好",
        time: "04:03",
        singer: "马赛克",
        album: "马赛克",
      },
      {
        name: "下落不明",
        time: "03:40",
        singer: "王巨星",
        album: "下落不明",
      },
      {
        name: "收敛",
        time: "03:24",
        singer: "不够",
        album: "收敛",
      },
    ];
  }
  res.json({
    list,
  });
});

app.listen(port, () => {
  console.log(`listen on ${port}`);
});
