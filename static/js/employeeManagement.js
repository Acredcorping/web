layui.use('table', function () {
  var table = layui.table;

  table.render({
    elem: '#employeeTable'
    , url: '../static/json/employees.json'
    , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
    , cellMinWidth: 80
    , defaultToolbar: ['filter', 'exports', 'print']
    , title: '用户数据表'
    , cols: [[
      { type: 'checkbox', fixed: 'left', align: "center" }
      , { field: 'e_id', title: 'ID', fixed: 'left', width: 80, unresize: true, sort: true, align: "center" }
      , { field: 'e_name', title: '姓名', width: 80, align: "center" }
      , { field: 'e_sex', title: '性别', sort: true, width: 80, align: "center" }
      , { field: 'e_age', title: '年龄', sort: true, width: 80, align: "center" }
      , { field: 'e_department', title: '部门', width: 100, align: "center" }
      , { field: 'e_phoneNum', title: '电话', width: 150, align: "center" }
      , {
        field: 'e_email', title: '邮箱', templet: function (res) {
          return '<em>' + res.e_email + '</em>'
        }
      }
      , { field: 'e_address', title: '地址' }
      , { field: 'e_addTime', title: '加入时间' }
      , { fixed: 'right', title: '操作', toolbar: '#barDemo', width: 150 }
    ]]
    , page: true
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
    //console.log(obj)
    if (obj.event === 'del') {
      layer.confirm('真的删除行么', function (index) {
        obj.del();
        layer.close(index);
      });
    } else if (obj.event === 'edit') {
      layer.open({
        type: 2,
        title: '编辑员工',
        shadeClose: true,
        shade: 0.8,
        area: ['400px', '580px'],
        content: "./editEmployee.html",
        success: function (layero, index) {
          // console.log(data);
          var iframeWin = window[layero.find('iframe')[0]['name']];
          $(layer.getChildFrame("#e_id", index)).val(data.e_id);
          $(layer.getChildFrame("#e_name", index)).val(data.e_name);
          $(layer.getChildFrame("#e_sex", index)).val("男");
          iframeWin.layui.form.render('select');
          $(layer.getChildFrame("#e_age", index)).val(data.e_age);
          $(layer.getChildFrame("#e_department", index)).val(data.e_department);
          iframeWin.layui.form.render('select');
          $(layer.getChildFrame("#e_phone", index)).val(data.e_phoneNum);
          $(layer.getChildFrame("#e_email", index)).val(data.e_email);
          $(layer.getChildFrame("#e_address", index)).val(data.e_address);
        }
      })
    }
  });

  $("#batch-delete").on("click", function () {
    var checkStatus = table.checkStatus('employeeTable');
    // console.log(checkStatus.data);
    // console.log(employeeArray.data);
    var filtered_employeeArray = employeeArray.data.filter((obj1) => {
      return !checkStatus.data.some((obj2) => {
        return isObjectEqual(obj1, obj2);
      });
    });
    console.log(filtered_employeeArray);
    json_attr(filtered_employeeArray, "save-employee-data");
  })

});

$(function () {
  $("#addEmployee").on("click", function () {
    layer.open({
      type: 2,
      title: '增加员工',
      shadeClose: true,
      shade: 0.8,
      area: ['400px', '580px'],
      content: "./addEmployee.html"
    });
  })
})
