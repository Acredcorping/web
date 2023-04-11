const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

//添加会议室
app.post('/save-room-data', (req, res) => {
  const newRoom = req.body;
  const fs = require('fs');
    // 读取JSON文件
  fs.readFile('static/json/conferenceRoom.json', (err, data) => {
    if (err) {
      console.error(err);
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
        return;
      }
      console.log('Room data saved successfully.');
    });
  });
  
});

//删除会议室
app.post('/delete-room-data', (req, res) =>{
  const fs = require('fs');
  const delete_id = req.body.room_id;
  // 读取JSON文件
  fs.readFile('static/json/conferenceRoom.json', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // 解析JSON数据
    const rooms = JSON.parse(data);

    // 找到要删除的数据在JSON数组中的索引
    const room_id_to_delete = delete_id;
    const index_to_delete = rooms.data.findIndex(room => room.room_id === room_id_to_delete);
    
    if (index_to_delete !== -1) {
      // 如果找到了要删除的数据，则将其从数组中删除
      rooms.data.splice(index_to_delete, 1);

      // 将更新后的JSON数据写回文件
      fs.writeFile('static/json/conferenceRoom.json', JSON.stringify(rooms), err => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`Room with id ${room_id_to_delete} has been deleted successfully.`);
      });
    } else {
      console.log(`Room with id ${room_id_to_delete} does not exist.`);
    }
  });

})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
