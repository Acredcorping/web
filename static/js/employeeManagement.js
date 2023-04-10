layui.use('table', function(){
    var table = layui.table;
    
    table.render({
      elem: '#employeeTable'
      ,url:'../static/json/employees.json'
      ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
      ,defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
        title: '提示'
        ,layEvent: 'LAYTABLE_TIPS'
        ,icon: 'layui-icon-tips'
      }]
      ,title: '用户数据表'
      ,cols: [[
        {type: 'checkbox', fixed: 'left'}
        ,{field:'e_id', title:'ID', width:80, fixed: 'left', unresize: true, sort: true}
        ,{field:'e_name', title:'姓名', width:120}
        ,{field:'e_sex', title:'性别', width:80, sort: true}
        ,{field:'e_age', title:'年龄', width:80, sort: true}
        ,{field:'e_phoneNum', title:'电话', width:120}
        ,{field:'e_email', title:'邮箱', width:150, templet: function(res){
          return '<em>'+ res.e_email +'</em>'
        }}
        ,{field:'city', title:'地址', width:120}
        ,{field:'joinTime', title:'加入时间', width:120}
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
        
        //自定义头工具栏右侧图标 - 提示
        case 'LAYTABLE_TIPS':
          layer.alert('这是工具栏右侧自定义的一个图标按钮');
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