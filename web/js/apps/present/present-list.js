(function($){
	//显示提示
	$('body').find('#tips-icon').on('click',function(e){
		e.preventDefault();
		$(window).scrollTop(0);
		$('#tips-icon').popover('toggle');
		e.stopPropagation();
	})
	//点击更多查看标签弹出层
	$('body').on("click",".more-tags", function(){
		var tagsContent=$(this).parents('td').children('.all-tags').html();
		$('.more-tags-content').html(tagsContent);
		$("#tags_modal .modal-body").slimscroll({
	    height: "250px",
		});
		$("#tags_modal").modal("show");
	})
	// 初始化table 分页的数据
	var pageSize=10; // 一页行数
	//显示table数据方法 
	function initPresentList(pageNo){
		if(!pageNo){
			pageNo = 1;
		}
		var newParams =  $.param({pageNo:pageNo,pageSize:pageSize})
		//初始化表格数据
		$.ajax({
			url:ctx+"/back/customer/present/list-present",
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
	        	$("#presentList").showLoading();
	        },
	        success: function(data,textStatus){
	        	$(window).scrollTop(0);
	        	$('#presentList').hideLoading();
	        	var totalCount = parseInt($($(data)[0]).attr("data-totalCount"));
	        	$(".table-panel").find("#presentList").html(data);
	        	CreatePager(pageSize,pageNo,totalCount,1,'presentListTable');
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
			$.toast("没有找到数据");
			return false;
		}
		initPresentList(goPageNum);
	});
	//直接选择页数跳转
	$("body").on("click","#page_div li a",function(){
		var pageNo = $(this).attr("curPage"); 
		initPresentList(pageNo);
	});
	//跳转编辑页面
	$('body').on('click','.to-edit',function(){
		var presentId=$(this).parents('tr').children('.present-id').val();
		window.location.href = ctx+"/back/customer/present/to-edite/"+presentId;
	})
	//删除功能
	$('body').on('click','.to-delete',function(){
		var presentId=$(this).parents('tr').children('.present-id').val();
		$.ajax({
			url:ctx+"/back/customer/present/delete/"+presentId,
			type:"POST",
			async: false,
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(data,textStatus){
	        	if(data.code==0){
	        		$.toast("删除成功",1500);
	        		initPresentList(1);
	        	}
	        }
		});
	})
	//上移下移
	$('body').on('click','.arrow-icon',function(){
		var flag=$(this).hasClass('glyphicon-arrow-up');
		var presentId=$(this).parents('tr').children('.present-id').val();
		var level=$(this).parents('tr').children('.level').val();
		if(presentId==$('#presentListTable tbody').find('tr').eq(0).find('.present-id').val() && flag){
			$.toast("无法上移了",1500);
			return false;
		}
		if(presentId==$('#presentListTable tbody').find('tr:last').find('.present-id').val() && !flag){
			$.toast("无法下移了",1500);
			return false;
		}
		$.ajax({
			url:ctx+"/back/customer/present/change-level/"+presentId+"/"+flag+"/"+level,
			type:"POST",
			async: false,
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(data,textStatus){
	        	if(data.code==0){
	        		$.toast("移动成功",1500);
	        		initPresentList(1);
	        	}
	        }
		});
	})
	
})(jQuery)

