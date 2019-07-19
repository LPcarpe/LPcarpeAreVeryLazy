<?php
require_once "config.php";

$conn = new mysqli(HOSTNAME, USER_NAME, PASSWORD, "runoob");

if($conn->connect_error){
    die("connect error".$conn->connect_error);
}else{
    $stmt = $conn->prepare("INSERT INTO Websites(name, url, alexa, country) VALUES (?,?,?,?)");
    $stmt->bind_param("ssis", $name, $url, $alexa, $country);

    $name = "Google";
    $url = "https://www.google.com/";
    $alexa = 1;
    $country = "USA";
    $stmt->execute();

    $name = "淘宝";
    $url = "https://www.taobao.com/";
    $alexa = 13;
    $country = "CN";
    $stmt->execute();

    $name = "菜鸟教程";
    $url = "http://www.runoob.com/";
    $alexa = 4689;
    $country = "CN";
    $stmt->execute();

    $name = "微博";
    $url = "http://weibo.com/";
    $alexa = 20;
    $country = "CN";
    $stmt->execute();

    $name = "Facebook";
    $url = "https://www.facebook.com/";
    $alexa = 3;
    $country = "USA";
    $stmt->execute();

    $name = "stackoverflow";
    $url = "http://www.stackoverflow.com/";
    $alexa = 0;
    $country = "IND";
    $stmt->execute();

    echo "insert data success";

    $stmt->close();
    $conn->close();
}

?>