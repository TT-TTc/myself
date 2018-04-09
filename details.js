;(function($){
	function Details(){
		
		
		
	}
	Details.prototype.init=function(){
		
		this.tuibox();
		this.buy();
		this.tosrc();
		this.addcar();
		this.Fangdajing();
		
	}
	Details.prototype.buy=function(){
		var that=this;
		this.buynum=1;
		$('#buynum').on('input',function(){
			if($(this).val()==''){
				//alert(1.1)
				$(this).val(1);
			}
		})
		$('.buynum a:first').on('click',function(){
			that.buynum=$('#buynum').val()
			if ($('.buynum input').val()<=1) {
				$('.buynum input').val(1)
				
			}else{
				
				that.buynum--;
				$('.buynum input').val(that.buynum);
			}
		})
		$('#toup').on('click',function(){
			that.buynum=$('#buynum').val()
			if($('.buynum input').val()>=99){
				$('.buynum input').val(99)
			}else{
				
				that.buynum++;
				$('.buynum input').val(that.buynum);
			}
		})
		
	
	}
	Details.prototype.tosrc=function(){
		
		$.ajax({
			url:"php/getsaledata.php",
			dataType:'json',
			async:false,
			success:function(data){
				for (var i=51;i<54;i++) {
					$('.liimg').eq(i-51).attr('src',data[i].url)
					$('.bigimg').attr('sid',data[51].sid)
					
				}
			}
		});
		$('.liimg').on('click',function(){
			$('.bigimg2 img').attr('src',$(this).attr('src'))
			$('.bigimg img').attr('src',$(this).attr('src'))
			$(this).parents('li').siblings('li').css('border-color','#FFFFFF')
			$(this).parents('li').css('border','1px solid #666666')
		})
		
	}
	Details.prototype.addcar=function(){
		var sidarr=[];
		var numarr=[];
		function getcartoarr(){
			if(getCookie('carsid')){
				sidarr=getCookie('carsid').split(',')
			}
			if(getCookie('buynum')){
				numarr=getCookie('buynum').split(',')
			}
		}
		$('.ftobuy').on('click',function(){
			
			var sid=$('.bigimg').attr('sid');
			getcartoarr();
			
			if ($.inArray(sid,sidarr) != -1) {//不等于-1存在
				var num=Number(numarr[$.inArray(sid,sidarr)]) + Number($('#buynum').val())
				numarr[$.inArray(sid,sidarr)]=num;	
				addCookie('buynum',numarr.toString(),7)
			} else{
				sidarr.push(sid)
				addCookie('carsid',sidarr.toString(),7)
				numarr.push($('#buynum').val())
				addCookie('buynum',numarr.toString(),7)
			}
			
		})
		
	}
	Details.prototype.tuibox=function(){
		$.ajax({
			url:"php/getsaledata.php",
			dataType:'json',
			success:function(data){
				var html='';
				var div=`<div style="clear: both;"></div>`
				for (var i=54;i<57;i++) {				
					html+=`<li>
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
				$(html).appendTo('.show_recommend ul');
			}
		})
		
	}
	Details.prototype.Fangdajing=function(){
		
			$('.bigimg').hover(
			function(){
				
				$('.bigimg2').css('visibility','visible');
				$('.bigimg2 img').css('visibility','visible')
				$('.sf').css('visibility','visible');
				$('.sf').width($('.bigimg img').width()*$('.bigimg2').width()/$('.bigimg2 img').width())
				$('.sf').height($('.bigimg img').height()*$('.bigimg2').height()/$('.bigimg2 img').height());
				var scale=$('.bigimg2 img').width()/$('.bigimg img').width();
					
				$(this).on('mousemove',function(ev){
					var ev=ev;
					var l=ev.pageX-$('.bigimg').offset().left-$('.sf').width()/2;
					var t=ev.pageY-$('.bigimg').offset().top-$('.sf').height()/2;
					
					if(l<0){
		   				l=0;
		   			}else if(l>$('.bigimg').width()-$('.sf').width()){
		   				l=$('.bigimg').width()-$('.sf').width();
		   			}
		   			if(t<0){
		   				t=0
		   			}else if(t>$('.bigimg').height()-$('.sf').height()){
		   				t=$('.bigimg').height()-$('.sf').height();
		   			}
		   			
					$('.sf').css({
						left:l,
						top:t
					})
					
   					$('.bigimg2 img').css({
   						left:-scale*l,
   						top:-scale*t
   					})
   					
   					
					console.log($('.sf').offset())
				})
			},
			
			function(){
				$('.bigimg2').css('visibility','hidden');
				$('.bigimg2 img').css('visibility','hidden')
				$('.sf').css('visibility','hidden');
			}
		)
		
			
		}
		
	
	
	
	 new Details().init();
	 
})(jQuery);
