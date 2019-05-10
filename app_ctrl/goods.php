<?php
$type=@$_REQUEST["type"];
$id=@$_REQUEST["id"];
$all=@$_REQUEST["all"];
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

if($type!="") {
	$sql=@mysql_query('SELECT *  FROM goods where type="'.$type.'"');
}
if($id!="") {
	$sql=@mysql_query('SELECT *  FROM goods where id="'.$id.'"');
}
if($all=="all") {
	$sql=@mysql_query('SELECT *  FROM goods');
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