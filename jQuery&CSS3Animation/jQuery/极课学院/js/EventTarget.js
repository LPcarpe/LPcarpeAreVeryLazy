$(document).ready(function (){
    $("body").bind("click", bodyHandler);
    $("div").bind("click", divHandler);
});

function bodyHandler(event){
    console.log(event);
}

function divHandler(event){
    console.log(event);
    event.stopPropagation();
}
