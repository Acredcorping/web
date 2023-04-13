layui.use(['element', 'layer', 'util'], function(){
    var element = layui.element
    ,layer = layui.layer
    ,util = layui.util
    ,$ = layui.$;
    
    //头部事件
    util.event('lay-header-event', {
      //左侧菜单事件
      menuLeft: function(othis){
        layer.msg('展开左侧菜单的操作', {icon: 0});
      }
      ,menuRight: function(){
        layer.open({
          type: 1
          ,content: '<div style="padding: 15px;">处理右侧面板的操作</div>'
          ,area: ['260px', '100%']
          ,offset: 'rt' //右上角
          ,anim: 5
          ,shadeClose: true
        });
      }
    });
    
  });

$(function() {
    $("#nowTime").runTimer();
})

$("#changePwd").on("click", function() {
    layer.open({
        type: 2,
        title: '修改密码',
        shadeClose: true,
        shade: 0.8,
        area: ['550px', '360px'],
        content: "./pages/changePassword.html"
    });
})

$(function(){
  var currentUrl = sessionStorage.getItem('currentUrl');
  // console.log(typeof(currentUrl));
  if(currentUrl !== "undefined") {
    $("#iframe").attr("src", currentUrl);
  }
  else {
    $("#iframe").attr("src", "pages/welcome.html");
  }

  $(".menu a").on("click", function() {
      var url = $(this).attr("data-url");
      var iframe = $("#iframe");
      iframe.attr("src", url);
      sessionStorage.setItem('currentUrl', url);
  })
})

window.onload = function () {
    var username = sessionStorage.getItem("username");
    // console.log(username);
    if(username == null){
        location.href = "login.html";
    }
    else{
      $("#user-name").html(username);
    }
}