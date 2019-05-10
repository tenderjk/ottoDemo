<?php
$search=@$_REQUEST["search"];
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

$sql="";

if($search!="") {
	$sql=@mysql_query('SELECT *  FROM goods where name like "%'.$search.'%"');
}

if(!$sql) {
	echo '{"code":0,"msg":"'.mysql_error().'"}';
}
else {
    $str="";
	while ($data=mysql_fetch_assoc($sql)) {
		$str=$str.json_encode($data).",";
        }
        $str="[".substr($str,0,-1)."]";
	echo $str;
}
?>