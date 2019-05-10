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

if($name!=""){
    $sql=@mysql_query('SELECT count(*) as num FROM user where username="'.$name.'"');
    if(!$sql) {
        echo '{"code":0,"msg":"'.mysql_error().'"}';
    }
    else {
        $str="";
        $res=mysql_fetch_row($sql);
        
        if($res[0]==1) {
            echo '{"code":"0"}';
            return;
        }
        else {
            if($password=="") {
                echo '{"code":"1"}';
                return;
            }
        }
        
    }
    $sex=@$_REQUEST["sex"];
    $email=@$_REQUEST["email"];
    $nickname=@$_REQUEST["nickname"];
    $sql=@mysql_query('INSERT INTO user (username,password,email,nickname,sex) values("'.$name.'","'.$password.'","'.$email.'","'.$nickname.'","'.$sex.'")');
    if(!$sql) {
        echo '{"code":0,"msg":"'.mysql_error().'"}';
    }
    else {
        echo '{"code":"1"}';
    }
}

else {
    echo '{"code":"0"}';
}

?>