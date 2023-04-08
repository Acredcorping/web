$(function(){
    $("#addConference").on("mousedown",function(){
        var id = $(this).attr('id'); // 获取切换页面的标识
        $('iframe').attr('src', 'pages/' + id + '.html'); // 修改iframe的src属性，切换页面   
    });
})