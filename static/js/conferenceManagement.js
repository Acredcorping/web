layui.use('table', function(){
    var table = layui.table;
    console.log("ceshi ")
    table.render({
      elem: '#conference-table'
      ,url:'../static/json/conferenceRoom.json'
      ,cellMinWidth: 80
      ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
      ,defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
        title: '提示'
        ,layEvent: 'LAYTABLE_TIPS'
        ,icon: 'layui-icon-tips'
      }]
      ,title: '用户数据表'
      ,cols: [[
        {type: 'checkbox', fixed: 'left'}
        ,{field:'id', title:'ID', fixed: 'left', sort: true}
        ,{field:'room_name', title:'会议室名称', edit: 'text'}
        ,{field:'max_capacity', title:'最大容纳人数', sort:true}
        ,{field:'city', title:'地址'}
        ,{field:'joinTime', title:'创建时间'}
        ,{fixed: 'right', title:'操作', toolbar: '#barDemo'}
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