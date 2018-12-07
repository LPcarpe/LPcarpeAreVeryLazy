<?php
try(
    $pdo = new PDO("mysql:host = localhost; dbname=hyerp", 'root'. );
)
catch(PDOExeption $$e){
    die('链接数据库失败'.$e->getMessage());
}
?>