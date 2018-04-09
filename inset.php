<?php
require "connect.php";
header("content-type:text/html;charset=utf-8");
if(isset($_POST['submit'])&&$_POST['submit']=='立即注册'){
	$username=$_POST['username'];
	$password=$_POST['password'];
	$query="insert person values(null,'$username',md5('$password'))";
	mysql_query($query);
	header('location:http://127.0.0.1/HBuilderProjects/Project/index.html');
}

?>