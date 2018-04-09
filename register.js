;(function($){
	function Register(){
		/*this.user=$('.user').val();
		this.pass=$('.focus2').val();
		this.pass2=$('.focus3').val();
		this.email=$('.focus4').val();*/
	}
	Register.prototype.init=function(){
		window.onload=function(){
			$('#boxpop').css('display','block');
		}
		this.closepop();
		this.check();
		this.yanzheng();
		this.passyz();
		this.passyz2();
		this.email();
		var fieds=$('.fied'	)
		
		$('#submit').on('click',function(){
			var user=$('.user').val();
			var pass=$('.focus2').val();
			var pass2=$('.focus3').val();
			var email=$('.focus4').val();
			var phone=$('.focus5').val();
			var phoneyzm=$('.focus6').val();
				if (user=='') {
					$('form').attr({
						onsubmit:"return false"
					})
					$('.usertitle').html('请输入用户名').css('color','red')
				}else if(pass==''){
					$('form').attr({
						onsubmit:"return false"
					})
					$('.passtitle').html('请输入密码').css('color','red')
				}else if(pass2==''){
					$('form').attr({
						onsubmit:"return false"
					})
					$('.passagaintitle').html('请再次输入密码').css('color','red')
				}else if(email==''){
					$('form').attr({
						onsubmit:"return false"
					})
					$('.emailtitle').html('完成验证后，你可以用该手机登录和找回密码').css('color','rgb(204, 204, 204)')
					
				}else if(phone==''){
					$('form').attr({
						onsubmit:"return false"
					})
					$('.phonetitle').html('请输入短信验证码').css('color','red')
					
				}else if(phoneyzm==''){
					$('form').attr({
						onsubmit:"return false"
					})
					$('.yzmtitle').html('请输入短信验证码').css('color','red')
					
				}else if(user!=''&&pass!=''&&pass2!=''&&email!=''&&phone!=''&&phoneyzm!=''){
					$('form').attr({
						onsubmit:"return true"
					})
				}
			
		})
	}
	Register.prototype.closepop=function(){
		$('.agree').on('click',function(){
			$('#boxpop').css('display','none');
			var fieds=$('.fied'	)
		});
	}
	Register.prototype.check=function(){
		
		
		
		
		
		$('.focus1').focus(function(){
			var user=$('.user').val();
			if(user==''){
				$(this).attr('placeholder','');
				$('.usertitle').html('支持中文、字母、数字、“-”“_”的组合，4-20个字符');
			}
				
		})
		//
		$('.focus2').focus(function(){
			var pass=$('.focus2').val();
			if(pass==''){
				$(this).attr('placeholder','')
				$('.passtitle').html('建议使用字母、数字和符号两种及以上的组合，6-20个字符').css('color','rgb(204, 204, 204)')
			}
				
		})
		//
		$('.focus3').focus(function(){
			var pass2=$('.focus3').val();
			if(pass2==''){
				$(this).attr('placeholder','')
				$('.passagaintitle').html('请再次输入密码').css('color','rgb(204, 204, 204)')
			}
				
		})
		//
		$('.focus4').focus(function(){
			var email=$('.focus4').val();
			if(email==''){
				$(this).attr('placeholder','')
				$('.emailtitle').html('完成验证后，你可以用该邮箱登录和找回密码').css('color','rgb(204, 204, 204)')
			}
				
		})
		//
		$('.focus5').focus(function(){
			var phone=$('.focus5').val();
			if(phone==''){
				$(this).attr('placeholder','')
				$('.phonetitle').html('完成验证后，你可以用该手机登录和找回密码').css('color','rgb(204, 204, 204)')
			}
				
			
		})
		//
		$('.focus6').focus(function(){
			$(this).attr('placeholder','')
		})
		
	}
	
	Register.prototype.yanzheng=function(){
		$('.focus1').focusout(function(){
			
			this.user=$('.user').val();
			var that=this;
			$.ajax({
				type:"post",
				url:"php/register.php",
				data:{
					username:this.user
				},
				success:function(data){
					var reg=/^([0-9a-zA-Z\u4e00-\u9fa5]){4,20}$/ig;
					var reg1=/^[0-9]{4,20}$/ig;
					if(data){
						$('.usertitle').html('该用户名已存在').css('color','red');
					}else if(that.user==''){
						$('.focus1').attr('placeholder','您的账户名和登录名')
						$('.usertitle').html('').css('color','rgb(204, 204, 204)');
					}else if(reg1.test(that.user)){
						$('.usertitle').html('用户名不能为纯数字，请重新输入').css('color','red')
					}else if(reg.test(that.user)){
						$('.usertitle').html('√').css('color','green')
					}else{
						$('.usertitle').html('格式不正确').css('color','red')
					}
					
				}
			})
		})
		$('.focus2').focusout(function(){
			
		})
	}
	Register.prototype.passyz=function(){
			$('.focus2').focusout(function(){
				var pass=$('.focus2').val();
				
				var reg=/^([0-9]){6,20}$/ig;
				var reg1=/^([0-9a-z]){6,20}$/ig;
				var reg2=/^([0-9a-zA-Z]){6,20}$/ig;
				if (reg.test(pass)) {
					
					$('.passtitle').html('弱').css('color','red')
				} else if(reg1.test(pass)){
					
					$('.passtitle').html('中').css('color','deepskyblue')
				}else if(reg2.test(pass)){
					
					$('.passtitle').html('高').css('color','green')
				}else{
					$('.passtitle').html('格式不正确').css('color','red')
				}
				
			})
	}
	Register.prototype.passyz2=function(){
			$('.focus3').focusout(function(){
				var pass1=$('.focus2').val();
				var pass2=$('.focus3').val();
				if (pass1==pass2) {
					$('.passagaintitle').html('√').css('color','green')
				} else{
					$('.passagaintitle').html('两次密码不一样').css('color','red')
				}
				
			})
	}
	Register.prototype.email=function(){
			$('.focus4').focusout(function(){
				var email=$('.focus4').val();
				var reg=/^([\w\-]+)@([\w\-]+).([\w\-]+)$/g;
				if (reg.test(email)) {
					$('.emailtitle').html('√').css('color','green')
				} else{
					$('.emailtitle').html('邮箱格式不正确请重新输入').css('color','red')
				}
				
			})
			$('.focus5').focusout(function(){
				var phone=$('.focus5').val();
				var reg2=/^[1][3|5|6|7|8]\d{9}$/g;
				if (reg2.test(phone)) {
					$('.phonetitle').html('√').css('color','green')
				} else{
					$('.phonetitle').html('手机号码格式错误请重新输入').css('color','red')
				}
			})
	}
	
	
	new Register().init();
	
})(jQuery);
