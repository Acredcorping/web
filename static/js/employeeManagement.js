layui.use('table', function(){
    var table = layui.table;
    
    table.render({
      elem: '#employeeTable'
      ,url:'../static/json/employees.json'
      ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
      ,cellMinWidth: 80
      ,defaultToolbar: ['filter', 'exports', 'print']
      ,title: '用户数据表'
      ,cols: [[
        {type: 'checkbox', fixed: 'left', align: "center"}
        ,{field:'e_id', title:'ID', fixed: 'left', width: 80, unresize: true, sort: true, align: "center"}
        ,{field:'e_name', title:'姓名', width: 80, align: "center"}
        ,{field:'e_sex', title:'性别', sort: true, width: 80, align: "center"}
        ,{field:'e_age', title:'年龄', sort: true, width: 80, align: "center"}
        ,{field:'e_phoneNum', title:'电话', width:150, align: "center"}
        ,{field:'e_email', title:'邮箱', templet: function(res){
          return '<em>'+ res.e_email +'</em>'
        }}
        ,{field:'e_address', title:'地址'}
        ,{field:'e_addTime', title:'加入时间'}
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
        layer.prompt({
          formType: 2
          ,value: data.email
        }, function(value, index){
          obj.update({
            email: value
          });
          layer.close(index);
        });
      }
    });
  });