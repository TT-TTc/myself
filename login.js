function addCookie(key,value,day){
					var date=new Date();
					date.setDate(date.getDate()+day);
					document.cookie=key+'='+encodeURI(value)+';expires='+date;
				}
$('.denglu').on('click',function(){
	var $username=$('#email').val();
	var $password=$('#pass').val();
	$.ajax({
		type:'post',
		url:'php/login.php',
		data:{
			name:$username,
			pass:$password
		},
		success:function(data){
			if(!data){
				$('.login_box2').html('用户名或者密码错误');
				
			}else{
				addCookie('UserName',$username,7);
				location.href='index.html';
			}
		}
	})
});