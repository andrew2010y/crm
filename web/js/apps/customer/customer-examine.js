(function($){
	var pageSize=20; //table一页行数
	
	//显示table数据方法
	function initExamineList(pageNo,type){
		var form_param = $("#searchform").serialize();//form serialize
		if(!pageNo){
			pageNo = 1;
		}
		
		if(!type){
			type=$(".nav-tabs .examine-li.active").attr("data-type");
		}
		
		//初始化表格数据的ajax，ajax的参数要修改，error、beforeSend不用改，success要获取一下totalCount
		var newParams =  $.param({state:type,pageNo:pageNo,pageSize:pageSize}) + '&' + form_param;
		
		$.ajax({
			url:ctx+"/back/customer-apply/list-type",
			type:"POST",
			async: false,
			data:newParams,
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(data){
	        	
	        	$(".table-panel").find("#examineList").html("");
	        	
	        	if(data.result!=null&&data.result.result.length>0){
	        		
	        		
	        		var time,content;
	        		var apply=data.result.result;
	        		for(var i=0;i<apply.length;i++){
	        			
	        			time=apply[i].createTime+"";
						time=time.substr(0, 4) + "-" + time.substr(4, 2) + "-"+ time.substr(6, 2)+" "+time.substr(8, 2)+":"+time.substr(10, 2)+":"+time.substr(12, 2);
						if(content!=null){
							content=content+"<tr><td>"+apply[i].username+"</td><td>"+time+"</td><td>"+apply[i].content+"</td><td data-id="+apply[i].customerApplyId+"><a class='showExamineDetail'>详情&nbsp;&nbsp;</a>"
						}else{
							content="<tr><td>"+apply[i].username+"</td><td>"+time+"</td><td>"+apply[i].content+"</td><td data-id='"+apply[i].customerApplyId+"'><a class='showExamineDetail'>详情&nbsp;&nbsp;</a>"
						}
	        			
	        			if(type==0){
	        				content=content+"<a class='agree_examine'>通过&nbsp;&nbsp;</a><a class='reject_examine'>驳回</a></td></tr>";
	        			}
	        			if(type==2){
	        				content=content+"<a class='agree_examine'>通过&nbsp;&nbsp;</a><a class='delete_examine'>删除</a></td></tr>";
	        			}
        				if(type==1){
        					content=content+"</td></tr>";
        				}
	        		}
	        		
	        		$(".table-panel").find("#examineList").html(content);
	        		var totalCount=data.result.totalCount;
	        		CreatePager(pageSize,pageNo,totalCount,1,'examineListTable');
	        		
	        	}else{
	        		$(".table-panel").find("#examineList").html("<tr><td colspan='12'>暂无数据</td></tr>");
	        		CreatePager(pageSize,pageNo,0,1,'examineListTable');
	        	}
	        	
	        	
	        }
		});
	}
	//初始化table数据
	initExamineList();
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
		initExamineList(goPageNum);
	});
	//直接选择页数跳转
	$("body").on("click","#page_div li a",function(){
		var pageNo = $(this).attr("curPage");
		initExamineList(pageNo);
	});
	// 初始化日期控件
	$(".s-time-input").datetimepicker({
		weekStart: 1,
	    todayBtn: 1,
	    autoclose: true,
	    todayHighlight: 1,
	    startView: 2,
	    minView: 2,
	    forceParse: 0
	});
	//重置搜索条件
	$(".reset-conditions").on("click",function(){
		document.getElementById("searchform").reset();
		initExamineList();
	});
	//点击搜索
	$(".btn-search").on("click",function(){
		initExamineList();
	});
	//回车搜索
	$(".search-panel").on("keypress","input:focus",function(event){
		var keywhich = (event.keyCode? event.keyCode:event.which);
		if(keywhich == 13){
			event.preventDefault();
			initExamineList()
		}
	});
	//同意和通过
	
	$("body").on("click","#examineDetailModal .agree_examine",function(){
		var dataId = $("#applyId").val();
		agreeExamine(dataId);
	});
	$("body").on("click","#examineList .agree_examine",function(){
		var dataId = $(this).parent().attr("data-id");
		agreeExamine(dataId);
	});
	
	function agreeExamine(dataId){
		$.ajax({
			url:ctx+"/back/customer-apply/checkPass",
			type:"POST",
			async: false,
			data:{"customerApplyId":dataId},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(data){
	        	$.toast(data.message,1500);
	        	setTimeout(function(){
	        		window.location.reload();
	        		},1000);
	        }
		});
	}
	//驳回
	$("body").on("click","#examineDetailModal .reject_examine",function(){
		var dataId = $("#applyId").val();
		rejectExamine(dataId);
	});
	$("body").on("click","#examineList .reject_examine",function(){
		var dataId = $(this).parent().attr("data-id");
		rejectExamine(dataId);
	});
	function rejectExamine(dataId){
		$.ajax({
			url:ctx+"/back/customer-apply/checkFailed",
			type:"POST",
			async: false,
			data:{"customerApplyId":dataId},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(data){
	        	$.toast(data.message,1500);
	        	setTimeout(function(){
	        		window.location.reload();
	        	},1000);
	        }
		});
	}
	
	
	//删除
	$("body").on("click","#examineDetailModal .delete_examine",function(){
		var dataId = $("#applyId").val();
		deleteExamine(dataId);
	});
	$("body").on("click","#examineList .delete_examine",function(){
		var dataId = $(this).parent().attr("data-id");
		deleteExamine(dataId);
	});
	function deleteExamine(dataId){
		$.ajax({
			url:ctx+"/back/customer-apply/delete",
			type:"POST",
			async: false,
			data:{"customerApplyId":dataId},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(data){
	        	$.toast(data.message,1500);
	        	setTimeout(function(){
	        		window.location.reload();
	        	},1000);
	        }
		});
	}
	//查看详情事件
	$("body").on("click",".showExamineDetail",function(){
		var dataId = $(this).parent().attr("data-id");
		showExamineDetail(dataId);
	})
	//编辑申请提示信息
	$(".edit_apply").click(function(){
		$(".apply_introduct").removeAttr("disabled");
		$(this).hide();
		$(".save_apply").show();
	})
	//保存申请提示信息
	$(".save_apply").click(function(){
		var content = $(".apply_introduct").val();
		$.ajax({
			url:ctx+"/back/customer-apply-setting/saveContent",
			type:"POST",
			async: false,
			data:{"content":content},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(data){
	        	$.toast(data.message,1500);
	        }
		});
		$(this).hide();
		$(".edit_apply").show();
		$(".apply_introduct").attr("disabled",true);
	})
	// 切换种类
	$(".nav-tabs .examine-li").on("click", function() {
		$(".nav-tabs .examine-li.active").removeClass("active");
		$(this).addClass("active");
		type = $(this).attr("data-type");
		initExamineList(1, type);
		
		//重置搜索条件
		document.getElementById("searchform").reset();
		/*
		 * $(".table-hover").hide();
		 * $(".table-hover[data-table-type='"+type+"']").show();
		 */
	});
	//查看详情function 
	function showExamineDetail(dateId){
		var state;
		//type 0待审核 1已驳回 2已通过
		$.ajax({
			url:ctx+"/back/customer-apply/getCustomerApply",
			type:"POST",
			async: false,
			data:{"customerApplyId":dateId},
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(data){
	        	state = data.result.state;
	        	$(".modal-user-name").html(data.result.username);
	        	$("#applyContent").html(data.result.content);
	        	$("#applyId").val(data.result.customerApplyId);
	        	$.toast(data.message,1500);
	        }
		});
		$("#examineDetailModal .modal-footer").hide();
		$("#examineDetailModal .examinr-footer"+state).show();
		$("#examineDetailModal").modal("show");
	}
})(jQuery)

function changeState(obj){
	var status = $(obj).prop("checked");
	$.ajax({
		url:ctx+"/back/customer-apply-setting/openState",
		type:"POST",
		async: false,
		data:{"status":status},
		dataType:"json",
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        timeout: 8000,
        error: function(){
        	$.toast("连接异常",1500);
        },
        success: function(data){
        	$.toast(data.message,1500);
        }
	});
}

