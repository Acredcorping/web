layui.use(['table', 'jquery'], function () {
  var table = layui.table;
  var $ = layui.jquery;
  table.render({
    elem: '#conference-table',
    url: '../static/json/conferenceRoom.json',
    cellMinWidth: 80,
    toolbar: '#toolbarDemo', //开启头部工具栏，并为其绑定左侧模板
    defaultToolbar: ['filter', 'exports', 'print'],
    title: '用户数据表',
    data: roomArray,
    cols: [
      [{
          type: 'checkbox',
          fixed: 'left'
        }, {
          field: 'room_id',
          title: 'ID',
          fixed: 'left',
          sort: true
        }, {
          field: 'room_name',
          title: '会议室名称'
        }, {
          field: 'max_capacity',
          title: '最大容纳人数',
          sort: true
        }, {
          field: 'city',
          title: '地址'
        }, {
          field: 'joinTime',
          title: '创建时间'
        }, {
          fixed: 'right',
          title: '操作',
          toolbar: '#barDemo'
        }

      ]
    ],
    page: true

  });

  //头工具栏事件
  table.on('toolbar(test)', function (obj) {
    var checkStatus = table.checkStatus(obj.config.id);
    switch (obj.event) {
      case 'getCheckData':
        var data = checkStatus.data;
        layer.alert(JSON.stringify(data));
        break;
      case 'getCheckLength':
        var data = checkStatus.data;
        layer.msg('选中了：' + data.length + ' 个');
        break;
      case 'isAll':
        layer.msg(checkStatus.isAll ? '全选' : '未全选');
        break;
    };
  });

  //监听行工具事件
  table.on('tool(test)', function (obj) {
    var data = obj.data;
    console.log(obj)
    if (obj.event === 'del') {
      layer.confirm('真的删除行么', function (index) {
        obj.del();
        layer.close(index);
        $.ajax({
          url: 'http://localhost:3000/delete-room-data',
          type: 'POST',
          async: true,
          contentType: 'application/json',
          data: JSON.stringify(data),
          success: function (res) {
            if (res.code === 0) {
              // 删除成功，重新加载表格数据
              table.reload('demo');
              layer.close(index);
            } else {
              layer.msg(res.msg, {
                icon: 2
              });
            }
          }
        });
      });
    } else if (obj.event === 'edit') {
      layer.open({
        type: 2,
        title: '修改会议室信息',
        shadeClose: true,
        shade: 0.8,
        area: ['550px', '360px'],
        content: "./editConferenceRoom.html",
        success: function (layero, index) {
          var iframeWin = window[layero.find('iframe')[0]['name']];
          $(layer.getChildFrame("#room_id", index)).val(data.room_id);
          $(layer.getChildFrame("#room_name", index)).val(data.room_name);
          $(layer.getChildFrame("#max_capacity", index)).val(data.max_capacity);
          $(layer.getChildFrame("#city", index)).val(data.city);
        }
      });
    }
  });

  //通过会议室id进行模糊搜索
  $("#search_room_id").on("keyup", function () {
    //通过会议室id模糊搜索
    var keyword = document.getElementById("search_room_id").value;
    var regExp = new RegExp(keyword, "i");
    // var tableData = layui.table.cache['conference-table'];
    // 直接使用roomArray作为数据源，这样在输入框删除某些字符的时候，还可以从整个表进行查找
    var tableData = roomArray.data;
    var filteredData = tableData.filter(function (item) {
      for (var key in item) {
        if (regExp.test(item[key])) {
          return true;
        }
      }
      return false;
    });

    table.render({
      elem: '#conference-table',
      cellMinWidth: 80,
      toolbar: '#toolbarDemo', //开启头部工具栏，并为其绑定左侧模板
      defaultToolbar: ['filter', 'exports', 'print'],
      title: '用户数据表',
      data: filteredData,
      cols: [
        [{
            type: 'checkbox',
            fixed: 'left'
          }, {
            field: 'room_id',
            title: 'ID',
            fixed: 'left',
            sort: true
          }, {
            field: 'room_name',
            title: '会议室名称'
          }, {
            field: 'max_capacity',
            title: '最大容纳人数',
            sort: true
          }, {
            field: 'city',
            title: '地址'
          }, {
            field: 'joinTime',
            title: '创建时间'
          }, {
            fixed: 'right',
            title: '操作',
            toolbar: '#barDemo'
          }

        ]
      ],
      page: true

    });
  })

  //通过会议室名称模糊搜索
  $("#search_room_name").on("keyup", function () {
    var keyword = document.getElementById("search_room_name").value;
    var regExp = new RegExp(keyword, "i");
    // var tableData = layui.table.cache['conference-table'];
    // 直接使用roomArray作为数据源，这样在输入框删除某些字符的时候，还可以从整个表进行查找
    var tableData = roomArray.data;
    var filteredData = tableData.filter(function (item) {
      for (var key in item) {
        if (regExp.test(item[key])) {
          return true;
        }
      }
      return false;
    });

    table.render({
      elem: '#conference-table',
      cellMinWidth: 80,
      toolbar: '#toolbarDemo', //开启头部工具栏，并为其绑定左侧模板
      defaultToolbar: ['filter', 'exports', 'print'],
      title: '用户数据表',
      data: filteredData,
      cols: [
        [{
            type: 'checkbox',
            fixed: 'left'
          }, {
            field: 'room_id',
            title: 'ID',
            fixed: 'left',
            sort: true
          }, {
            field: 'room_name',
            title: '会议室名称'
          }, {
            field: 'max_capacity',
            title: '最大容纳人数',
            sort: true
          }, {
            field: 'city',
            title: '地址'
          }, {
            field: 'joinTime',
            title: '创建时间'
          }, {
            fixed: 'right',
            title: '操作',
            toolbar: '#barDemo'
          }

        ]
      ],
      page: true

    });
  })

  //批量删除
  $("#batch_delete_room").on("click", function () {
    console.log("test");
    var checkStatus = table.checkStatus('conference-table');
    console.log(checkStatus.data);
    console.log(roomArray.data);
    var filtered_roomArray = roomArray.data.filter((obj1) => {
      return !checkStatus.data.some((obj2) => {
        return isObjectEqual(obj1, obj2);
      });
    });
    console.log(filtered_roomArray);
    json_attr(filtered_roomArray, "save-room-data");
  })

});


$(function () {
  $("#addConferenceRoomButton").on("click", function () {
    layer.open({
      type: 2,
      title: '增加会议室',
      shadeClose: true,
      shade: 0.8,
      area: ['550px', '360px'],
      content: "./addConferenceRoom.html"
    });
  })



})