;(function($){
	function Index(){
		this.hnav=$('.carshow');
		this.nav_top=$('.nav_top');
		this.num=0;
		this.timer=null;
		this.oli=$('ol li');
		this.ul=$('.right1').children('ul');
	}
	
	Index.prototype.init=function(){
		var that=this;
		this.hnav.on('mouseover',function(){
			that.hnav.children('ul').show();
		}).on('mouseout',function(){
			that.hnav.children('ul').hide();
		});
		
		this.hnav.children('ul').on('mouseout',function(){
			$(this).hide();
		})
		this.nav();
		this.lunbo();
		this.timer=setInterval(function(){
			that.move();
			
		},2000)
		
		/*划过方块按钮后图片切换*/
		this.oli.on('mouseover',function(){
			clearInterval(that.timer);
			that.num=$(this).index();
			$(this).siblings().css('background','rgb(184, 184, 184)');
			$(this).css('background','rgb(238, 114, 7)');
			
			that.ul.stop(true,true).animate({
				left:-that.ul.children('li').outerWidth()*$(this).index()
			})
		}).on('mouseout',function(){
			that.timer=setInterval(function(){
				that.move();
			},2000)
		})
		
		this.gamelist();
		this.tab();
		this.hotbox();
		this.popbox();
		this.inpclick();
		
	}
	/*头部的切换*/
	Index.prototype.nav=function(){
		this.nav_top.children('a').on('mouseover',function(){
			$(this).css('text-decoration','underline');
		}).on('mouseout',function(){
			$(this).css('text-decoration','none');
		});
		$('.carshow').children('ul').children('li').children('a').on('mouseover',function(){
			$(this).css('text-decoration','underline');
		}).on('mouseout',function(){
			$(this).css('text-decoration','none');
		});
		
		

		$('.cart_box').on('mouseover',function(){
			$(this).parent('.shop_cart').css('background-position-y','-30px')
			$(this).children('.mincart').show();
		}).on('mouseout',function(){
			$(this).parent('.shop_cart').css('background-position-y','-30px')
			$(this).children('.mincart').hide();
		});
		
		$('dl').hover(function(){
			$(this).css('background','#FFFFFF');
			$(this).children('dd').show();
		},function(){
			$(this).css('background','#e6e6e6');
			$(this).children('dd').hide();
		})
		
		$('.line_title').children().on('mouseover',function(){
			$(this).css('text-decoration','underline');
		}).on('mouseout',function(){
			$(this).css('text-decoration','none');
		});
		
	
		/*下半导航*/
		$('.mtobg').hover(function(){
			$(this).css('background','url(images/bg-.jpg)')
		},function(){
			$(this).css('background','')
		})
	}
	/*轮播效果*/
	Index.prototype.move=function(){
		if(this.num>4){
			this.num=0;
		}
		this.ul.animate({
			left:-this.ul.children('li').outerWidth()*this.num,
			
		});	
		
		this.oli.siblings().css('background','rgb(184, 184, 184)');
		this.oli.eq(this.num).css('background','rgb(238, 114, 7)');
		this.num++;
	}
	/*给轮播图添加路径*/
	Index.prototype.lunbo=function(){
		$.ajax({
			url:"php/getdata_lunbo.php",
			dataType:'json',
			success:function(data){
				var img=$('.right1 ul li a img');
				$.each(data,function(a,b){
					img.eq(a).attr("src",b.url);
				})
			}
		});
		
	}
	/*小按钮*/
	Index.prototype.gamelist=function(){
		$('.left2 li').not('.left2_li').on('mouseover',function(){
			$(this).css('background-position-x','-265px');
		}).on('mouseout',function(){
			$(this).css('background-position-x','-6px');
		})
	}
	
	/*tab切换*/
	Index.prototype.tab=function(){
		$('.hottab li').on('mouseover',function(){
			$(this).siblings().css('background','#20252a')
			$(this).css('background','#353a40');
			$('.hotbox ul').siblings().hide().eq($(this).index()).show()
		})
	}
	Index.prototype.hotbox=function(){
		$.ajax({
			url:"php/getsaledata.php",
			dataType:'json',
			success:function(data){
				var html='';
				var html1='';
				var html2='';
				var html3='';
				var html4='';
				var html5='';
				var html6='';
				var html7='';
				for (var i=0;i<4;i++) {
					html+=`<li>
							<a href="#">
								<img src="${data[i].url}"/>
								<div></div>
								<span>${data[i].title}</span>
								<span>商城价： ¥${data[i].price}</span>
							</a>
						</li>`
				};
				$(html).appendTo('.hotshop1');
				for (var i=4;i<8;i++) {
					html1+=`<li>
							<a href="#">
								<img src="${data[i].url}"/>
								<div></div>
								<span>${data[i].title}</span>
								<span>商城价： ¥${data[i].price}</span>
							</a>
						</li>`
				};
				$(html1).appendTo('.hotshop2');
				for (var i=8;i<12;i++) {
					html2+=`<li>
							<a href="#">
								<img src="${data[i].url}"/>
								<div></div>
								<span>${data[i].title}</span>
								<span>
									<i>超值价</i>
									${data[i].price}
									<del>¥199</del>
								</span>
							</a>
						</li>`
				}
				$(html2).appendTo('.hotshop3');
				
				for (var i=12;i<19;i++) {				
					html3+=`<li>
								<a href="#">
									<img src="${data[i].url}"/>
									<div></div>
									<div>
										${data[i].title}
										<br />
										<span>商城价：&nbsp;${data[i].price}</span>
									</div>
								</a>
							</li>`
				}
				$(html3).appendTo('.left3_thing');
				
				for (var i=19;i<27;i++) {				
					html4+=`<li>
								<a href="#">
									<img src="${data[i].url}">
									<span>${data[i].title}</span>
									<span>商城价： ¥${data[i].price}</span>
								</a>
							</li>`
				}
				$(html4).appendTo('.right3 ul');
				
				for (var i=27;i<35;i++) {				
					html5+=`<li>
								<a href="#">
									<img src="${data[i].url}">
									<span>${data[i].title}</span>
									<span>商城价： ¥${data[i].price}</span>
								</a>
							</li>`
				}
				$(html5).appendTo('.right4 ul');
				
				for (var i=36;i<44;i++) {				
					html6+=`<li>
								<a href="#">
									<img src="${data[i].url}">
									<span>${data[i].title}</span>
									<span>商城价： ¥${data[i].price}</span>
								</a>
							</li>`
				}
				$(html6).appendTo('.right5 ul');
				
				for (var i=43;i<51;i++) {				
					html7+=`<li>
								<a href="#">
									<img src="${data[i].url}">
									<span>${data[i].title}</span>
									<span>商城价： ¥${data[i].price}</span>
								</a>
							</li>`
				}
				$(html7).appendTo('.right6 ul');
				
			}
		})
		
	}
	Index.prototype.popbox=function(){
		$('.hlogin').on('click',function(){
			$('#winbg').css('display','block');
			setTimeout(function(){
				$('#login_all').css('display','block');
			},500)
		})
		$('.login_head_top').on('click',function(){
			$('#login_all').css('display','none');
			$('#winbg').css('display','none');
		})
	}
	Index.prototype.inpclick=function(){
		$('.login_input').children('input').focus(function(){
			$('.login_box1').css('border','1px solid #4aafe9')
		}).focusout(function(){
			$('.login_box1').css('border','')
		})
		$('.pass_input').children('input').focus(function(){
			$('.login_box3').css('border','1px solid #4aafe9')
		}).focusout(function(){
			$('.login_box3').css('border','')
		})
	}
	/*Index.prototype.cookie=function(){
		function addCookie(key,value,day){
				var date=new Date();//创建日期对象
				date.setDate(date.getDate()+day);//过期时间：获取当前的日期+天数，设置给date
				document.cookie=key+'='+encodeURI(value)+';expires='+date;//添加cookie，设置过期时间
			}
			function getCookie(key){
				var str=decodeURI(document.cookie);
				var arr=str.split('; ');
				for(var i=0;i<arr.length;i++){
					var arr1=arr[i].split('=');
	 				if(arr1[0]==key){
						return arr1[1];
					}
				}
			}
			function delCookie(key,value){
				addCookie(key,value,-1);//添加的函数,将时间设置为过去时间
			}
			
			$(function(){
				if(getCookie('UserName')){
					$('.denglu_top').hide();
					$('.tuichu').show();
					$('.nihao').html('你好,'+getCookie('UserName'));
				}
				$('.tuichu').on('click',function(){
					delCookie('UserName','',-1);
					$('.tuichu').hide();
					$('.denglu_top').show();
				});
			});
	}*/
	
	new Index().init();
	window.Index=Index;
})(jQuery);
