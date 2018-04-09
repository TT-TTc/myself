;(function($){
	function Cart(){
		
	}
	
	Cart.prototype.init=function(){
		this.tuibox()
		this.getcart();
		this.clickbuy();
		
	}
	Cart.prototype.clickbuy=function(){
		//
		
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
		//小计
		function singleprice(row){
			var $price=parseInt(row.parents('td').siblings('td').find('.prices b').html());
			var $salenum=parseInt(row.siblings('input').val());
			
			return ($price*$salenum).toFixed(2);
		}
		//总价
		function allprices(){
			var total=0;//自定义的求和变量
			$('.addcar').each(function(){
				if($(this).find('input:checkbox').is(':checked')){//复选框被选中
					total+=parseInt($(this).find('td').find('.xiaoji').html());
				}
				
			});
			$('.zongji').html(total);
			$('.yixuan').html($('.addcar').find('td:first input:checked').length);
		}
		//减号
		$('.buynum a:first').on('click',function(){
			var sid=$('.tu a img').attr('sid');
			var $count = $('#buynum').val();//获取当前的数量
    			$count--;
		    if ($count <= 1) {
		        $count = 1;
		    }
		    $(this).siblings('input').val($count);//赋值回去
		   	$(this).parents('td').siblings().find('.xiaoji').html(singleprice($(this)));
		   	allprices()
		    getcartoarr()
		   	numarr[$.inArray(sid,sidarr)]=$(this).siblings('input').val($count).val();
		   	
			addCookie('buynum',numarr.toString(),7);
			
		
		})
		//加号
		$('#toup').on('click',function(){
			var sid=$('.tu a img').attr('sid');
			var $count = $('#buynum').val();//获取当前的数量
    			$count++;
		    if ($count >= 99) {
		        $count = 99;
		    }
		    $(this).siblings('input').val($count);//赋值回去
		   	$(this).parents('td').siblings().find('.xiaoji').html(singleprice($(this)));
		   	allprices()
		    getcartoarr()
		   	numarr[$.inArray(sid,sidarr)]=$(this).siblings('input').val($count).val();
		   	
			addCookie('buynum',numarr.toString(),7);
		})
		//输入改购买件数
		$('#buynum').on('input',function(){
			var sid=$('.tu a img').attr('sid');
			var $count = $(this).val();//获取当前的数量
			var $price=parseInt($(this).parents('td').siblings('td').find('.prices b').html());
			var $salenum=parseInt($(this).val());
		   	$(this).parents('td').siblings().find('.xiaoji').html(($price*$salenum).toFixed(2));
		   	allprices()
		    getcartoarr()
		   	numarr[$.inArray(sid,sidarr)]=$(this).siblings('input').val($count).val();
			addCookie('buynum',numarr.toString(),7);
		})
		//checkbox
		$('.addcar').find('td').find('input:checked').on('click',function(){
			var total=0;//自定义的求和变量
			$('.addcar').each(function(){
				if($(this).find('input:checkbox').is(':checked')){//复选框被选中
					total+=parseInt($(this).find('td').find('.xiaoji').html());
				}
				
			});
			$('.zongji').html(total);
			$('.yixuan').html($('.addcar').find('td:first input:checked').length);
			
		})
		
		function deletecookie(sid, sidarr) {
		    var index=0;
		    for (var i=0;i<sidarr.length; i++) {
		        if (sid==sidarr[i]) {
		            index = i;
		        }
		    }
		    sidarr.splice(index, 1);
		    numarr.splice(index, 1);
		    addCookie('carsid', sidarr.toString(), 7);
		    addCookie('buynum', numarr.toString(), 7);
		}
		
		$('.delete').on('click', function() {
		if(window.confirm('你确定要删除吗?')){
				getcartoarr();
			    $(this).parents('.addcar').remove();
			    deletecookie($(this).parents('td').siblings('td').find('img').attr('sid'),sidarr);
			    allprices();
			}
			
		});
	}
	
	Cart.prototype.getcart=function(){
		if(getCookie('carsid')&&getCookie('buynum')){
			var sidarr=getCookie('carsid').split(',');
			var numarr=getCookie('buynum').split(',');
			for(var i=0;i<sidarr.length;i++){
				creatcart(sidarr[i],numarr[i])
			}
		}
		
		function creatcart(sid,num){
			$.ajax({
			async:false,
			url:"php/getsaledata.php",
			dataType:'json',
			success:function(data){
				var html='';
				for(var i=0;i<data.length;i++){
					if (sid==data[i].sid) {
				html+=`<tr class="addcar">
						<td>
							<input type="checkbox" checked="checked" name="check" id=""/>
						</td>
						<td>
							<div class="lefttu">
								<div class="tu">
									<a href="#">
										<img sid="${data[i].sid}" src="${data[i].url}"/>
									</a>
								</div>
								<ul>
									<li>
										<a href="#">${data[i].title}</a>
									</li>
									<li>
										<span>规格: 无</span>
									</li>
									<div style="clear: both;"></div>
								</ul>
								<div style="clear: both;"></div>
							</div>
						</td>
						<td>
							<p class="prices">¥<b>${data[i].price}</b> </p>
						</td>
						<td>
							<p class="buynum">
								<a href="javascript:;"></a>
								<input id="buynum" type="text" maxlength="2" id="buynum" value="${num}"/>
								<a id="toup" href="javascript:;"></a>
							</p>
						</td>
						<td>
							<span>
								<p>¥ 0.00</p>
							</span>
						</td>
						<td>
							<span class="xiaoji">${data[i].price*num}</span>
						</td>
						<td>
							<a class="delete" href="javascript:;">删除</a>
						</td>
					</tr>`
					}
				}
				$(html).appendTo('tbody')
			}
		});
		var shuliang=0
		$('.addcar').each(function(){
			//console.log($(this).find('input:checkbox').is(':checked'))
				if($(this).find('input:checkbox').is(':checked')){//复选框被选中
					console.log($(this).find('td').find('.xiaoji').html())
					shuliang+=parseInt($(this).find('td').find('.xiaoji').html());
				}
				
			});
			
		$('.zongji').html(shuliang);
		}
	}
	
	Cart.prototype.tuibox=function(){
		$.ajax({
			url:"php/getsaledata.php",
			dataType:'json',
			success:function(data){
				var html='';
				var div=`<div style="clear: both;"></div>`
				for (var i=0;i<5;i++) {
					html+=`<li>
							<a href="#">
								<img src="${data[i].url}"/>
								<div></div>
								<span>${data[i].title}</span>
								<span>商城价： ¥${data[i].price}</span>
							</a>
						</li>`
				};
				$(html).appendTo('#tuijian ul');
				$(div).appendTo('#tuijian ul');
			}
		})
		
	}
	
	
	new Cart().init();
})(jQuery);
