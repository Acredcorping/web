layui.use('table', function () {
  var table = layui.table;
  table.render({
    elem: '#meeting-table',
    url: '../static/json/meeting.json',
    cellMinWidth: 80,
    toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
      ,
    defaultToolbar: ['filter', 'exports', 'print'],
    title: '用户数据表',
    data: roomArray,
    cols: [
      [{
          type: 'checkbox',
          fixed: 'left'
        }, {
          field: 'meet_id',
          title: 'ID',
          fixed: 'left',
          sort: true
        }, {
          field: 'meet_name',
          title: '会议名称'
        }, {
          field: 'meet_capacity',
          title: '最大容纳人数',
          sort: true
        }, {
          field: 'meet_location',
          title: '地址'
        }, {
          field: 'meet_startTime',
          title: '开始时间'
        }, {
          field: 'meet_endTime',
          title: '结束时间'
        }, {
          field: 'meet_booked_people',
          title: '负责人'
        }, {
          field: 'meet_attend_people',
          title: '参会人员'
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

    if (obj.event === 'del') {
      layer.confirm('真的删除行么', function (index) {
        obj.del();
        layer.close(index);
        $.ajax({
          url: 'http://localhost:3000/delete-meeting-data',
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
        area: ['900px', '550px'],
        content: "./editMeeting.html",
        success: function (layero, index) {
          var iframeWin = window[layero.find('iframe')[0]['name']];
          $(layer.getChildFrame("#new_meet_id", index)).val(data.meet_id);
          $(layer.getChildFrame("#new_meet_name", index)).val(data.meet_name);
          $(layer.getChildFrame("#new_meet_capacity", index)).val(data.meet_capacity);
          $(layer.getChildFrame("#new_meet_location", index)).val(data.meet_location);
          $(layer.getChildFrame("#new_meet_startTime", index)).val(data.meet_startTime);
          // iframeWin.layui.form.render('laydate');
          $(layer.getChildFrame("#new_meet_endTime", index)).val(data.meet_endTime);
          // iframeWin.layui.form.render('laydate');
          $(layer.getChildFrame("#new_meet_booked_people", index)).val(data.meet_booked_people);
          // $(layer.getChildFrame("#new_meet_attend_people", index)).val(data.result);
          // iframeWin.layui.transfer.render('transfer');
          var childWindow = layero.find('iframe')[0].contentWindow;
          childWindow.postMessage(data.meet_attend_people, '*');
          

        }
      });

    }
  });

  //通过会议id进行模糊搜索
  $("#search_meet_id").on("keyup", function () {
    //把这里的id替换成input组件的id即可
    var keyword = document.getElementById("search_meet_id").value;
    var regExp = new RegExp(keyword, "i");
    // 直接使用roomArray作为数据源，这样在输入框删除某些字符的时候，还可以从整个表进行查找
    // 这里也得替换成相对应的array
    var tableData = meetArray.data;
    var filteredData = tableData.filter(function (item) {
      for (var key in item) {
        if (regExp.test(item[key])) {
          return true;
        }
      }
      return false;
    });
    //把这里的渲染换成初始化表格时的渲染即可，data: filteredData，其中的URL删掉不要
    table.render({
      elem: '#meeting-table',
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
            field: 'meet_id',
            title: 'ID',
            fixed: 'left',
            sort: true
          }, {
            field: 'meet_name',
            title: '会议名称'
          }, {
            field: 'meet_capacity',
            title: '最大容纳人数',
            sort: true
          }, {
            field: 'meet_location',
            title: '地址'
          }, {
            field: 'meet_startTime',
            title: '开始时间'
          }, {
            field: 'meet_endTime',
            title: '结束时间'
          }, {
            field: 'meet_booked_people',
            title: '负责人'
          }, {
            field: 'meet_attend_people',
            title: '参会人员'
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

  //通过会议名称进行模糊搜索
  $("#search_meet_name").on("keyup", function () {
    //把这里的id替换成input组件的id即可
    var keyword = document.getElementById("search_meet_name").value;
    var regExp = new RegExp(keyword, "i");
    // 直接使用roomArray作为数据源，这样在输入框删除某些字符的时候，还可以从整个表进行查找
    // 这里也得替换成相对应的array
    var tableData = meetArray.data;
    var filteredData = tableData.filter(function (item) {
      for (var key in item) {
        if (regExp.test(item[key])) {
          return true;
        }
      }
      return false;
    });
    //把这里的渲染换成初始化表格时的渲染即可，data: filteredData，其中的URL删掉不要
    table.render({
      elem: '#meeting-table',
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
            field: 'meet_id',
            title: 'ID',
            fixed: 'left',
            sort: true
          }, {
            field: 'meet_name',
            title: '会议名称'
          }, {
            field: 'meet_capacity',
            title: '最大容纳人数',
            sort: true
          }, {
            field: 'meet_location',
            title: '地址'
          }, {
            field: 'meet_startTime',
            title: '开始时间'
          }, {
            field: 'meet_endTime',
            title: '结束时间'
          }, {
            field: 'meet_booked_people',
            title: '负责人'
          }, {
            field: 'meet_attend_people',
            title: '参会人员'
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
  $("#batch_delete_meet").on("click", function () {
    console.log("test");
    var checkStatus = table.checkStatus('meeting-table');
    console.log(checkStatus.data);
    console.log(meetArray.data);
    var filtered_meetArray = meetArray.data.filter((obj1) => {
      return !checkStatus.data.some((obj2) => {
        return isObjectEqual(obj1, obj2);
      });
    });
    console.log(filtered_meetArray);
    json_attr(filtered_meetArray, "save-meeting-data");
  })
});

$(function () {
  $("#addConferenceRoomButton").on("click", function () {
    layer.open({
      type: 2,
      title: '预约会议',
      shadeClose: true,
      shade: 0.8,
      area: ['900px', '550px'],
      content: "./addMeeting.html"
    });
  })

})