<?php
require "connect.php";
$result=mysql_query('select * from salething');

$arr=array();
for($i=0;$i<mysql_num_rows($result);$i++){
	$arr[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
}
echo json_encode($arr);
?>