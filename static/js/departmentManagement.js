layui.use('table', function(){
    var table = layui.table;
    
    table.render({
      elem: '#departmentTable'
      ,url:'../static/json/department.json'
      ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
      ,cellMinWidth: 80
      ,defaultToolbar: ['filter', 'exports', 'print']
      ,title: '部门列表'
      ,cols: [[
        {type: 'checkbox', fixed: 'left', align: "center"}
        ,{field:'d_id', title:'ID', fixed: 'left', width: 80, unresize: true, sort: true, align: "center"}
        ,{field:'d_name', title:'部门名称', width: 140, align: "center"}
        ,{field:'d_description', title:'部门描述', sort: true}
        ,{fixed: 'right', title:'操作', toolbar: '#barDemo', width:150}
      ]]
      ,page: true
    });
    
    //头工具栏事件
    table.on('toolbar(test)', function(obj){
      var checkStatus = table.checkStatus(obj.config.id);
      switch(obj.event){
        case 'getCheckData':
          var data = checkStatus.data;
          layer.alert(JSON.stringify(data));
        break;
        case 'getCheckLength':
          var data = checkStatus.data;
          layer.msg('选中了：'+ data.length + ' 个');
        break;
        case 'isAll':
          layer.msg(checkStatus.isAll ? '全选': '未全选');
        break;
      };
    });
    
    //监听行工具事件
    table.on('tool(test)', function(obj){
      var data = obj.data;
      //console.log(obj)
      if(obj.event === 'del'){
        layer.confirm('真的删除行么', function(index){
          obj.del();
          layer.close(index);
        });
      } else if(obj.event === 'edit'){
        // console.log(data);
        layer.open({
          type: 2,
          title: '编辑员工',
          shadeClose: true,
          shade: 0.8,
          area:['400px', '540px'],
          content: "./editDepartment.html",
          success: function(layero, index) {
            $(layer.getChildFrame("#d_id", index)).val(data.d_id);
            $(layer.getChildFrame("#d_name", index)).val(data.d_name);
            $(layer.getChildFrame("#d_description", index)).val(data.d_description);
          }
        })
      }
    });

    $("#batch-delete").on("click", function () {
      var checkStatus = table.checkStatus('departmentTable');
      // console.log(checkStatus.data);
      // console.log(departmentArray.data);
      var filtered_departmentArray = departmentArray.data.filter((obj1) => {
        return !checkStatus.data.some((obj2) => {
          return isObjectEqual(obj1, obj2);
        });
      });
      // console.log(filtered_departmentArray);
      json_attr(filtered_departmentArray, "save-department-data");
    })
  
  });

$(function () {
  $("#addDepartment").on("click", function () {
    layer.open({
      type: 2,
      title: '增加部门',
      shadeClose: true,
      shade: 0.8,
      area: ['600px', '420px'],
      content: "./addDepartment.html"
    });
  })


})