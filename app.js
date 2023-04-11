const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());


app.use(bodyParser.json());

app.post('/save-room-data', (req, res) => {
  const newRoom = req.body;
  const fs = require('fs');
  
    // 读取JSON文件
  fs.readFile('static/json/conferenceRoom.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('读取JSON文件出错。');
      return;
    }

    // 解析JSON数据
    const rooms = JSON.parse(data);

    // 将data数组替换为新的房间数据数组
    rooms.data = newRoom;

    // 将更新后的JSON数据写回文件
    fs.writeFile('static/json/conferenceRoom.json', JSON.stringify(rooms), err => {
      if (err) {
        console.error(err);
        res.status(500).send('写入JSON文件出错。');
        return;
      }

      res.send('房间数据保存成功。');
    });
  });

  res.send('Room data saved successfully.');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
