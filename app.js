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

//添加雇员
app.post('/save-employee-data', (req, res) => {
  const newRoom = req.body;
  const fs = require('fs');
    // 读取JSON文件
  fs.readFile('static/json/employees.json', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // 解析JSON数据
    const rooms = JSON.parse(data);
    // 将data数组替换为新的房间数据数组
    rooms.data = newRoom;
    // 将更新后的JSON数据写回文件
    fs.writeFile('static/json/employees.json', JSON.stringify(rooms), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Employee data saved successfully.');
    });
  });
  
});

//更改用户密码
app.post('/save-user-data', (req, res) => {
  const newRoom = req.body;
  const fs = require('fs');
    // 读取JSON文件
  fs.readFile('static/json/user.json', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // 解析JSON数据
    const rooms = JSON.parse(data);
    // 将data数组替换为新的房间数据数组
    rooms.data = newRoom;
    // 将更新后的JSON数据写回文件
    fs.writeFile('static/json/user.json', JSON.stringify(rooms), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('User data saved successfully.');
    });
  });
  
});

//添加部门
app.post('/save-department-data', (req, res) => {
  const newRoom = req.body;
  const fs = require('fs');
    // 读取JSON文件
  fs.readFile('static/json/department.json', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // 解析JSON数据
    const rooms = JSON.parse(data);
    // 将data数组替换为新的房间数据数组
    rooms.data = newRoom;
    // 将更新后的JSON数据写回文件
    fs.writeFile('static/json/department.json', JSON.stringify(rooms), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Department data saved successfully.');
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

//删除会议
app.post('/delete-meeting-data', (req, res) =>{
  const fs = require('fs');
  const delete_id = req.body.meet_id;
  // 读取JSON文件
  fs.readFile('static/json/meeting.json', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // 解析JSON数据
    const meetings = JSON.parse(data);

    // 找到要删除的数据在JSON数组中的索引
    const meet_id_to_delete = delete_id;
    const index_to_delete = meetings.data.findIndex(meeting => meeting.meet_id === meet_id_to_delete);
    
    if (index_to_delete !== -1) {
      // 如果找到了要删除的数据，则将其从数组中删除
      meetings.data.splice(index_to_delete, 1);

      // 将更新后的JSON数据写回文件
      fs.writeFile('static/json/meeting.json', JSON.stringify(meetings), err => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(`Meeting with id ${meet_id_to_delete} has been deleted successfully.`);
      });
    } else {
      console.log(`Meeting with id ${meet_id_to_delete} does not exist.`);
    }
  });

})

//预约会议
app.post('/save-meeting-data', (req, res) => {
  const newMeet = req.body;
  const fs = require('fs');
    // 读取JSON文件
  fs.readFile('static/json/meeting.json', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // 解析JSON数据
    const meetings = JSON.parse(data);
    // 将data数组替换为新的房间数据数组
    meetings.data = newMeet;
    // 将更新后的JSON数据写回文件
    fs.writeFile('static/json/meeting.json', JSON.stringify(meetings), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('Meeting data saved successfully.');
    });
  });
  
});

//注册用户
app.post('/save-user-data', (req, res) => {
  var newUser = req.body;
  const fs = require('fs');
    // 读取JSON文件
  fs.readFile('static/json/user.json', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    // 解析JSON数据
    var users = data;
    // 将data数组替换为新的房间数据数组
    users = newUser;
    // 将更新后的JSON数据写回文件
    fs.writeFile('static/json/user.json', JSON.stringify(users), err => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('User data saved successfully.');
    });
  });
  
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
