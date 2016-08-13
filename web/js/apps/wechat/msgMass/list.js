(function($){
	var pageSize=10; // 一页行数
	// 授权状态弹出层
	$("#unauth_modal .modal-body").slimscroll({
	    height: "250px",
	});
	$("#unauth_modal").modal("show");
	//初始化查询授权状态
	if($('#authStatus').val()==1){
		initSendNewsList(1);
	}
	//授权完成按钮
	$("body").on("click", "#authSuc", function(){
		$.ajax({
			url:ctx+"/back/wechat/check-auth",
			type:"POST",
			async: false,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(data){
	        	if(data.code==0){
	        		$('#unauth_modal').modal('hide');
	        		//初始化table数据
	        		initSendNewsList();
	        	}else{
	        		$('.unauth-tips').show().delay(5000).hide(0);
	        	}
	        }
		});
	})
	//初始化日期
	$("#sendnews_time").datetimepicker({
		weekStart: 1,
	    todayBtn: 1,
	    autoclose: true,
	    todayHighlight: 1,
	    startView: 2,
	    minView: 2,
	    forceParse: 0
	});
	
	
	//显示table数据方法 
	function initSendNewsList(pageNo){
		var form_param = $("#sendNewsSearchform").serialize();//form serialize
		if(!pageNo){
			pageNo = 1;
		}
		//初始化表格数据
		var newParams =  $.param({pageNo:pageNo,pageSize:pageSize}) + '&' + form_param;
		$.ajax({
			url:ctx+"/back/wechat/msg-mass/list-data",
			type:"POST",
			async: false,
			data:newParams,
			dataType:"html",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        beforeSend:function(){
	        	$("#sendNewsList").showLoading();
	        },
	        success: function(data,textStatus){
	        	$(window).scrollTop(0);
	        	$('#sendNewsList').hideLoading();
	        	var totalCount = parseInt($($(data)[0]).attr("data-totalCount"));
	        	$(".table-panel").find("#sendNewsList").html(data);
	        	CreatePager(pageSize,pageNo,totalCount,1,'sendNewsListTable');
	        }
		});
	}
	
	//点击跳转页码
	$("body").on("click","#goPage",function(){
		var goPageNum=parseInt($(this).prev().val());
		if(!goPageNum)
			return false;
		var $_pageLi=$(this).parents(".paging_full_numbers").find(".pagination li");
		var maxPage=$_pageLi.eq($_pageLi.length-3).find("a").attr("curpage");
		if(goPageNum>maxPage||goPageNum<=0){
			$.toast("没有找到数据");
			return false;
		}
		initSendNewsList(goPageNum);
	});
	//直接选择页数跳转
	$("body").on("click","#page_div li a",function(){
		var pageNo = $(this).attr("curPage");
		initSendNewsList(pageNo);
	});
	//重置
	$(".reset").on("click",function(){
		document.getElementById("sendNewsSearchform").reset();
	})
	//查询
	$("body").on("click", ".btn-search", function(){
		initSendNewsList();
	})
	//回车查询
	$(".normal-search-panel").on("keypress","input:focus",function(event){
		var keywhich = (event.keyCode? event.keyCode:event.which);
		if(keywhich == 13){
			event.preventDefault();
			initSendNewsList();
		}
	});
	//点击更多查看标签弹出层
	$('body').on("click",".more-tags", function(){
		var tagsContent=$(this).parents('td').children('.all-tags').html();
		$('.more-tags-content').html(tagsContent);
		$("#tags_modal .modal-body").slimscroll({
	    height: "250px",
		});
		$("#tags_modal").modal("show");
	})
})(jQuery)

