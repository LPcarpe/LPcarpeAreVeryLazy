$('document').ready(function() {
    var isHide = false;
    
    nextPic();

    function nextPic() {
        isHide = true;
        $('#callback_container ul li:first').fadeOut(1000);
    }
    function prevPic() {
        isHide = false;
        $('#callback_container ul li:first').fadeIn(1000);
    }
    $('#callback_container #prev').click(function() {
        if(isHide){
            prevPic();
        }
        else{
            nextPic();
        }
    });
    $('#callback_container #next').click(function() {
        if(isHide){
            prevPic();
        }
        else{
            nextPic();
        }
    });
    

    // 滚动监听的平滑滚动
    jQuery(document).ready(function ($) {
        $(".scroll").click(function (event) {
            event.preventDefault();
            $('html,body').animate({
                scrollTop: $(this.hash).offset().top
            }, 1000);
        });
    });

    $().UItoTop({
        text: ''
    });
});
