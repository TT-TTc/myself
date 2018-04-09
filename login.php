<?php
require "connect.php";
if(isset($_POST['name'])){//前端ajax传输过来的额
	$username=$_POST['name'];
	$password=$_POST['pass'];
}else{
	exit('非法操作');
}
$query="select * from person where username='$username' and password=md5('$password')";
$result=mysql_query($query);

if(mysql_fetch_array($result)){
	echo true;
}else{
	echo false;
}


?>