<?php
require "connect.php";
$username=$_POST['username'];
$query="select * from person where username='$username'";
$result=mysql_query($query);

if(mysql_fetch_array($result)){
	echo true;
}else{
	echo false;
}


?>