$(document).ready(function (){
    $("#btn1").click(function (){
        $("p").hide(1000,function (){
//             alert("动画执行完成回调函数被调用");
            $("p").css("color","red")
                  .slideUp(1000)
                  .slideDown(1000)
        });
        
    });
});
