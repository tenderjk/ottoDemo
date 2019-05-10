<?php
$name=@$_REQUEST["username"];
$password=@$_REQUEST["password"];
$link=@mysql_connect("localhost","root","123456");
if (!$link) {
	echo '{"code":0,"msg":"'.mysql_error().'"}';
}

$db=@mysql_select_db("otto");
if (!$db) {
	echo '{"code":0,"msg":"'.mysql_error().'"}';
}
$q=@mysql_query("set names utf8");
if (!$q) {
	echo '{"code":0,"msg":"'.mysql_error().'"}';
}
$sql=@mysql_query('SELECT count(*) as num FROM user where username="'.$name.'" and password="'.$password.'"');
if(!$sql) {
	echo '{"code":0,"msg":"'.mysql_error().'"}';
}
else {
    $str="";
    $res=mysql_fetch_row($sql);
	
	echo '{"code":"'.$res[0].'"}';
}
?>