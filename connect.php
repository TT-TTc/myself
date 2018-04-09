<?php
header('connect-type:text/html;charset=utf-8');
$con=@mysql_connect('localhost','root','');
if(!$con){
	die('pleace to check your localhost name or password');
}
mysql_select_db('js1711');
mysql_query('SET NAMES UTF8');
?>