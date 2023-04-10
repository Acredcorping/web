layui.use('table', function(){
    var table = layui.table;
    table.render({
      elem: '#conference-table'
      ,url:'../static/json/conferenceRoom.json'
      ,cellMinWidth: 80
      ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
      ,defaultToolbar: ['filter', 'exports', 'print']
      ,title: '用户数据表'
      ,data: roomArray
      ,cols: [[
        {type: 'checkbox', fixed: 'left'}
        ,{field:'room_id', title:'ID', fixed: 'left', sort: true}
        ,{field:'room_name', title:'会议室名称'}
        ,{field:'max_capacity', title:'最大容纳人数', sort:true}
        ,{field:'city', title:'地址'}
        ,{field:'joinTime', title:'创建时间'}
        ,{fixed: 'right', title:'操作', toolbar: '#barDemo'}
        
      ]]
      ,page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
        layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'] //自定义分页布局
        ,groups: 3 //只显示 1 个连续页码
        ,first: false //不显示首页
        ,last: false //不显示尾页
      }

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
      console.log(obj)
      if(obj.event === 'del'){
        layer.confirm('真的删除行么', function(index){
          obj.del();
          layer.close(index);
          $.ajax({
            url: '../static/json/conferenceRoom.json/data/' + data.room_id,
            type: 'DELETE',
            success: function(res){
              if(res.code === 0){
                // 删除成功，重新加载表格数据
                table.reload('demo');
                layer.close(index);
              } else {
                layer.msg(res.msg, {icon: 2});
              }
            }
          });
        });
      } else if(obj.event === 'edit'){
        layer.prompt({
          formType: 4
          ,title: '编辑信息'
          ,value: [data.room_name, data.max_capacity]
        }, function(value, index){
          obj.update({
            room_name: value[0],
            max_capacity: value[1],
          });
          layer.close(index);
        });
      }
    });
  });


  $(function(){
    $("#addConferenceRoomButton").on("click", function() {
      console.log("testttt")
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

