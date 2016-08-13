(function($){
	//初始化礼遇内容
	function showPresentContentStatus(){
		if($('#coupon').prop('checked')){
			$('.add-coupon').show();
		}
		if($('#richtext').prop('checked')){
			$('.add-richtext').show();
		}
		if($('#link').prop('checked')){
			$('.add-link').show();
		}
	}
	showPresentContentStatus();
	//切换礼遇内容
	$('.present-content-setting').find('input[type="radio"]').on('click',function(){
		$('.add-coupon').hide();
		$('.add-richtext').hide();
		$('.add-link').hide();
		showPresentContentStatus();
	})
	
	//初始化富文本
	window.top.ue = new UE.ui.Editor();
	window.top.ue.render('uecontent');
	window.top.ue.addListener("ready", function () {
	setTimeout(window.top.ue.options.imageType=6,100);//设置图片类型为6缩放
		window.top.ue.setContent($("#rich_text_html").val());
	});
	window.top.ue.addListener('beforefullscreenchange', function (t, enabled){
		try{
			if(enabled){
				window.top.ue.iframe.parentElement.parentElement.style.zIndex=99999;
			}else{
		   		setTimeout("ue.iframe.parentElement.parentElement.style.zIndex=900",1000);
		   	}
		}catch(e){
		   	console.log("处理ueditor层级出错");
		}
	});



	//标签的选择
	$('.tags-box span').on('click',function(){
		$('.counting').show();
		$('.present-cus-total').hide();
		if($(this).hasClass('checked-label-span')){
			$(this).removeClass('checked-label-span').addClass('unchecked-label-span');
		}else{
			$(this).removeClass('unchecked-label-span').addClass('checked-label-span');
		}
	})
	//2S后计算标签人数
	var timer;
	$('.tags-box span').on('mouseup',function(){
		clearTimeout(timer);
		timer = setTimeout("tagsTotalNum()",2000);
	})
	//添加优惠券
	$('#addCoupon').on('click',function(){
		$('#couponModal').modal('show');
	})
	//加载优惠券列表
	// 初始化table 分页的数据
	var pageSize=5; // 一页行数
	//显示table数据方法 
	function initPresentList(pageNo){
		if(!pageNo){
			pageNo = 1;
		}
		var name=$('#searchInput').val();
		var newParams =  $.param({pageNo:pageNo,name:name})
		//初始化表格数据
		$.ajax({
			url:ctx+"/back/coupon/present/list/using-coupon-data",
			type:"POST",
			async: false,
			data:newParams,
			dataType:"html",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常", 1500);
	        },
	        success: function(data,textStatus){
	        	var totalCount = parseInt($($(data)[0]).attr("data-totalCount"));
	        	$("#couponTable").html(data);
	        	CreatePager(pageSize,pageNo,totalCount,1,'couponListTable');
	        }
		});
	}
	initPresentList();
	//点击跳转页码
	$("body").on("click","#goPage",function(){
		var goPageNum=parseInt($(this).prev().val());
		if(!goPageNum)
			return false;
		var $_pageLi=$(this).parents(".paging_full_numbers").find(".pagination li");
		var maxPage=$_pageLi.eq($_pageLi.length-3).find("a").attr("curpage");
		if(goPageNum>maxPage||goPageNum<=0){
			$.toast("没有找到数据",1500);
			return false;
		}
		initPresentList(goPageNum);
	});
	//直接选择页数跳转
	$("body").on("click","#page_div li a",function(){
		var pageNo = $(this).attr("curPage"); 
		initPresentList(pageNo);
	});
	//查询优惠券列表
	$('#searchInput').on('input',function(){
		initPresentList(1);
	})
	//删除优惠券
	$('body').on('click','.delete-btn',function(){
	    var $obj = $(this);
	    //获取当前table tr 里面 input coupon的值
	    var trLen=$obj.parents('tbody').find('tr').length;
	    var NoTr='<tr><td colspan="6" style="text-align:ceter;">暂无数据</td></tr>';
	    	$obj.parents('tr').remove();
	    	if(trLen==1){
	    		$('#presentListTable tbody').append(NoTr);
	    }
	});
	//选择优惠券
	$('body').on('click','.check-btn',function(){
		var couponName=$(this).parents('tr').children('td').eq(0).text();
		var couponType=$(this).parents('tr').children('td').eq(1).text();
		var couponAccount=$(this).parents('tr').children('td').eq(2).text();
		var couponNum=$(this).parents('tr').children('td').eq(3).text();
		var couponId=$(this).parents('tr').find('.coupon-id').val();
		var startTime=$(this).parents('tr').find('.start-time').val();
		var endTime=$(this).parents('tr').find('.end-time').val();
		var CouponContent='<tr valign="middle">'+
								'<input type="hidden" value="'+couponId+'" class="coupon-id"/>'+
    							'<td style="width:20%;text-align:center;">'+couponName+'</td>'+
    							'<td>'+couponType+'</td>'+
    							'<td>'+couponAccount+'</td>'+
    							'<td>'+couponNum+'</td>'+
    							'<td>'+startTime+'——'+endTime+'</td>'+
    							'<td style="text-align:center;">'+	
    								'<a class="delete-btn" href="javascript:void(0);">删除</a>'+
    							'</td>'+
    						'</tr>';
		$(this).removeAttr('checked');
		$('#couponModal').modal('hide');
		//限制重复优惠券
		$('#presentListTable tbody').find('tr').each(function(){
			if($(this).find('.coupon-id').val()==couponId){
				$.toast("不能重复选择相同的优惠券", 1500);
				CouponContent="";
				return false;
			}
		})
		//限制最多十张优惠券
		if($('#presentListTable tbody tr').length==10){
			$.toast("最多只能选择10张优惠券", 1500);
			CouponContent="";
			return false;
		}
		if($('#presentListTable tbody').find('tr').eq(0).find('td').length==1){
			$('#presentListTable tbody').html('');
		}
		$('#presentListTable tbody').append(CouponContent);
	})
	//范围选择标签
	$('.tags-box .tag').on('click',function(){ 
		if($(this).children('span').hasClass('checked-label-span')){
			$(this).children('span').removeClass('checked-label-span').addClass('unchecked-label-span');
		}else{
			$(this).children('span').removeClass('unchecked-label-span').addClass('checked-label-span');
		}
		$('.present-cus-total').hide();
		$('.counting').show();
	})
	//选中标签统计人数
	function tagsTotalNum(){
			var tagIds=[];
			$('.checked-label-span').each(function(){
				var tagId=$(this).prev('.tag-id').val();
				tagIds.push(tagId);
			})
			if(tagIds.length==0){
				$.toast("推送范围不能为空",1500);
        		$('.counting').hide();
        		$('.present-cus-total').find('.num').html('0');
        		$('.present-cus-total').show();
				return false;
			}else{
				$.ajax({
					url:ctx+"/back/customer/present/present-count",
					type:"POST",
					async: false,
					data:JSON.stringify(tagIds),
					contentType: "application/json",
			        timeout: 8000,
			        error: function(){
			        	$.toast("连接异常",1500);
			        },
			        success: function(data){
			        	if(data.code==0){
			        		$('.present-cus-total').find('.num').html(data.result); 
			        		$('.present-cus-total').show();
			        		$('.counting').hide();
			        	}
			        }
				});
			}
	}
	//2S后计算标签人数
	var timer;
	$('.tags-box span').on('mouseup',function(){
		clearTimeout(timer);
		timer = setTimeout(function(){tagsTotalNum()},2000);
	})
	//保存
	$('body').on('click','#btn-save',function(){
		var storeId=$('#storeId').val();
		var presentId=$('#presentId').val();
		var presentName=$.trim($('#sendnewsscope').val());
		//优惠券
		var couponIds=[];
		$('#presentListTable tbody').find('tr').each(function(){
			if($(this).find('td').length>1){
				var couponId=$(this).find('.coupon-id').val();
				var couponTitle=$(this).find('td').eq(0).text();
				couponIds.push({'couponId':couponId,'title':couponTitle});
			}
		})
		//富文本
		var richtextId=$('#richtextId').val();
		var richTextName=$.trim($('#richTextName').val());
		var ue = window.top.ue;
		var content=ue.getContentTxt();
		//链接
		var presentUrl=$.trim($('.add-link').val());
		//标签
		var tagIds=[];
		$('.checked-label-span').each(function(){
			var tagId=$(this).prev('.tag-id').val();
			var tagName=$(this).text();
			tagIds.push({'tagId':tagId,'name':tagName});
		})
		//限制条件
		if(presentName==''){
			$.toast("请输入礼遇名称", 1500);
			return false;
		}
		if($('#coupon').prop('checked')&& couponIds.length==0){
			$.toast("请选择优惠券", 1500);
			return false;
		};
		if($('#richtext').prop('checked')){
			if(richTextName==''){
				$.toast("请输入自定义文本标题", 1500);
				return false;
			}
			if(content.length>10000){
				$.toast("自定义文本内容超出限长",1500);
   				return false;
			}
			if(content.length==0){
				$.toast("请输入自定义文本内容", 1500);
				return false;
			}
		};
		if($('#link').prop('checked')&& presentUrl==''){
			$.toast("请输入链接路径", 1500);
			return false;
		};
		if(tagIds.length==0){
			$.toast("请选择礼遇范围", 1500);
			return false;
		}
		//增加http处理
		   var urlHeader=presentUrl.substring(0,7).toLowerCase();
		if(urlHeader!='http://'){
			presentUrl='http://'+presentUrl;
		}
		var data;
		var couponParam={
		                "presentId":presentId,
						"storeId":storeId,
						"type":0,
						"name":presentName,
						"coupon":couponIds,
		            	"tag":tagIds
						};
		var richTextParam={
                "presentId":presentId,
				"storeId":storeId,
				"type":1,
				"name":presentName,
				"presentArticle":{"name":richTextName,"content":content},
            	"tag":tagIds
				};
		var linkParam={
                "presentId":presentId,
				"storeId":storeId,
				"type":2,
				"name":presentName,
				"presentUrl":presentUrl,
            	"tag":tagIds
				};
		//礼遇类型
		if($('#coupon').prop('checked')){
			data=couponParam;
		};
		if($('#richtext').prop('checked')){
			data=richTextParam;
		};
		if($('#link').prop('checked')){
			data=linkParam;
		};
		$.ajax({
			url:ctx+"/back/customer/present/save",
			type:"POST",
			async: false,
			data:JSON.stringify(data),
			contentType: "application/json",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(result){
	        	if(result.code==0){
	        		$.toast("保存成功",1500);
	        		window.location.href=ctx+"/back/customer/present/list";
	        	}
	        }
		});
	})
})(jQuery)
