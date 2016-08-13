(function($){
	// 初始化table 分页的数据
	var pageSize=10; // 一页行数
	var type=-1;
	var name="";
	//加载所有的标签，并保存到sessionstorage中
	$.ajax({
		dataType: "json",
		type: "post",
		async:false,
		url:ctx+"/back/tag/customer-cache-list",
        success: function(data){
        	// 将所有的标签放置在sessionStorage里
        	sessionStorage.setItem('store-tagList', JSON.stringify(data));
        }
	});
	
	$(function(){
		function initLabelUser(tagId,tagName,pageNo,param){
			//初始化表格数据的ajax
			$.ajax({
				url:ctx+"/back/tag/user-list",
				type:"POST",
				 async: false,
				 data:{tagId:tagId,tagName:tagName,pageNo:pageNo,pageSize:pageSize,param:param},
				 dataType:"html",
				 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			        timeout: 8000,
			        error: function(){
			        	$.toast("连接异常",1500);
			        },
			        success: function(userData){
			        	var totalCount = $($(userData)[0]).attr("data-totalCount");
			        	// 标签的Id（隐藏域） 和名字
			        	$("#curLableId").val($($(userData)[0]).attr("data-tagId"));
			        	$("#curLabelName").val($($(userData)[0]).attr("data-tagName"));
			        	//初始化
		        		$("#labelUserList").html(userData);
	        			CreatePager(pageSize,pageNo,totalCount,1,'labelUserTable');
			        }
			});
		}
		//输入页数，跳转到某一页
		$("body").on("keypress",".go_page",function(event){
			var curTagId = $("#curLableId").val();
			var curTagName = $("#curLabelName").val();
			var pageNo = $(this).val();
			if(event.keyCode == "13"){
				if(pageNo != ""){
					if(pageNo == 0){
						pageNo = 1;
					}
					initLabelUser(curTagId,curTagName,pageNo,"");
				};
			}
			$(".multi_sele").show();
			$(".t_ope_div").hide();
		});
		//直接选择页数   与分页按钮功能冲突
		$("body").on("click","#page_div li a",function(){
			var pageNo = $(this).attr("curPage");
			var curTagId = $("#curLableId").val();
			var curTagName = $("#curLabelName").val();
			initLabelUser(curTagId,curTagName,pageNo,"");
			$(".multi_sele").show();
			$(".t_ope_div").hide();
		});
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
    		var curTagId = $("#curLableId").val();
			var curTagName = $("#curLabelName").val();
			initLabelUser(curTagId,curTagName,goPageNum,"");
			$(".multi_sele").show();
			$(".t_ope_div").hide();
    	});
		
		// 点击左侧标签，右侧显示相应标签信息与会员
		$("body").on("click",".labels_ul li", function(){
			var curLabelId = $(this).attr("data-id");
			var tagName = $(this).attr("data-name");
			$(".labels_ul li").removeClass("active");
			$(this).addClass("active");
			initLabelUser(curLabelId,tagName,1,"");
			$("#searchParam").val("");//搜索框数据清空
			$(".multi_sele").show();
			$(".t_ope_div").hide();
			$(".edit_label_div").find("button").hide();
		});
		
		// 删除标签
		$("body").on("click",".del-icon",function(ev){
			ev.stopPropagation();
			var curTr = $(this).closest("li");
			var curId=curTr.attr("data-id");
			var curIndex = curTr.attr("data-index");
			$.wxConfirm("请注意：标签删除后，所有打上该标签的会员，将失去此标签！您确定要进行删除吗？",function(){
				// 与后台交互，删除标签
				$.ajax({
					type:"post",
					url:ctx+"/back/tag/delete",
					data:{tagId:curId},
					async:true,
					success:function(data){
						if(data){
							var lis = $(".labels_ul li");
							for(var i = 0; i< lis.length; i++){
								var litIndex = parseInt($(lis[i]).attr("data-index"));
								if(litIndex > curIndex){
									litIndex = litIndex-1;
									$(lis[i]).attr("data-index", litIndex);
								}
							}
							curTr.remove();
							if(lis.length==1){
								var newLi = '<li data-index="0">暂无数据</li>';
								$(".labels_ul").append(newLi);
							}
							
							//修改sessionStorage里的标签名字
							var curTagList = JSON.parse(sessionStorage.getItem("store-tagList"));
							for(var i = 0; i<curTagList.length;i++){
								if(curTagList[i].tagId == curId){
									curTagList.pop(curTagList[i]);
								}
								sessionStorage.setItem('store-tagList', JSON.stringify(curTagList));
							}
							
							$("#searchParam").val("");//搜索框数据清空
							$($(".labels_ul li")[0]).click();
						}
					}
				});
				
			});
		});
		
		//编辑标签名称
		$("body").on("click","#curLabelName",function(){
			$(this).removeProp("readonly");
			$(".edit_label_div").find("button").show();
		});
		
		//修改标签
		$("body").on("click","#change_lName",function(){
			var curTitle = $.trim($("#curLabelName").val());
			var curId = $.trim($("#curLableId").val());
			
			// 验证标签名字是否重复
			var curTagList = JSON.parse(sessionStorage.getItem("store-tagList"));
			if(curTagList.length > 0 ){
				for(var i = 0; i<curTagList.length; i++){
					if(curTagList[i].name == curTitle){
						$.toast("该标签已存在", 1500);
						return false;
					}
				}
			}
			$.ajax({
				type:"post",
				url:ctx+"/back/tag/update",
				data:{tagId:curId,tagName:curTitle},
				async:true,
				success:function(){
					$("#curLabelName").prop("readonly","readonly");
					$(".edit_label_div").find("button").hide();
					$(".labels_ul li[data-id='"+curId+"']").find(".l_left").html(curTitle);
					$(".labels_ul li[data-id='"+curId+"']").attr("data-name",curTitle);
					//修改sessionStorage里的标签名字
					var curTagList = JSON.parse(sessionStorage.getItem("store-tagList"));
					for(var i = 0; i<curTagList.length;i++){
						if(curTagList[i].tagId == curId){
							curTagList[i].name = curTitle;
						}
					}
					sessionStorage.setItem('store-tagList', JSON.stringify(curTagList));
					initLabelUser(curId,curTitle,1,"");
				}
			});
			
		});
		
		// 取消修改
		$("body").on("click","#cancel_lName",function(){
			var tagName = $(".labels_ul li.active").attr("data-name");
			$("#curLabelName").val(tagName).prop("readonly","readonly");
			$(".edit_label_div").find("button").hide();
		});
		//输入搜索内容，回车搜索
		$("body").on("keypress","#searchParam",function(event){
			var curId = $.trim($("#curLableId").val());
			var curName = $.trim($("#curLabelName").val());
			var param = $.trim($("#searchParam").val());
			
			if(event.keyCode == "13"){
				initLabelUser(curId,curName,1,param);
			}
		});
		
		//点击搜索
		$(".search_icon").on("click",function(){
			var curId = $.trim($("#curLableId").val());
			var curName = $.trim($("#curLabelName").val());
			var param = $.trim($("#searchParam").val());
			initLabelUser(curId,curName,1,param);
		});
	
		// 新建标签
		$("body").on("click", "#add_label", function(){
			$("#add_new_modal .modal-body").slimscroll({
		        height: "250px",
			});
			$("#add_new_modal").attr("data-backdrop", "static");
			$("#add_new_modal").modal("show");
		});
		// 确定添加新标签
		$("body").on("click", "#add_label_btn", function(){
			var newLabel = $.trim($("#new_label").val());
			var curModal = $(this).closest(".modal");
			if(newLabel == ""){
				$.toast("请输入新标签的名称", 1500);
				return false;
			} else{
				// 验证标签名字是否重复
				var curTagList = JSON.parse(sessionStorage.getItem("store-tagList"));
				if(curTagList.length > 0 ){
					for(var i = 0; i<curTagList.length; i++){
						if(curTagList[i].name == newLabel){
							$.toast("该标签已存在", 1500);
							return false;
						}
					}
				}
				
				$.ajax({
					type:"post",
					url:ctx+"/back/tag/save",
					data:{tagName:newLabel},
					async:true,
					success:function(data){
						if(data){
							curModal.find(".error-msg").html("").hide();
							$("#add_new_modal").find("#new_label").val("");
							$("#add_new_modal").modal("hide");
							var preIndex = $(".labels_ul").find("li:last").attr("data-index");
							var preId = $(".labels_ul").find("li:last").attr("data-id");
							if(!preId){
								var tr = $(".labels_ul").find("li:first").remove();
							}
							var newLi = '<li data-name="'+newLabel+'" data-id="'+ data +'" data-index="'+(parseInt(preIndex) +1)+'">'+
				       						'<div class="l_left">'+newLabel+'</div>'+
				       						'<div class="l_right">'+
				       							'<span style="margin-right:5px;">0人</span>'+
				       							'<a class="del-icon" title="删除"></a>'+
				       						'</div>'+
				       					'</li>';
							
							$(".labels_ul").append(newLi);
							//返回新增tag的id
							var curTagList = JSON.parse(sessionStorage.getItem("store-tagList"));
							if(curTagList==null){
								curTagList = new Array(1);
							}
							curTagList.push({tagId: data, name:newLabel, count: 0});
							sessionStorage.setItem('store-tagList', JSON.stringify(curTagList));
						} else{
							curModal.find(".error-msg").show();
							return false;
						}
					}
				});
			}
			
		});
		
		$("body").on("click","#canel_label_btn",function(){
			$("#new_label").val("");
		});
		
		// 移除该标签下的该用户
		$(".table").on("click",".remove-icon",function(){
			var curLabelId = $("#curLableId").val();
			var curTr = $(this).closest("tr");
			var curUserId = $(this).closest("tr").attr("data-userid");
			var curTag = $(".labels_ul li.active");
			// 与后台交互，移除改标签下的该用户
			$.wxConfirm("请注意：您确定要进行删除吗？",function(){
				$.ajax({
					type:"post",
					url:ctx+"/back/customer-tag/delete",
					data:{tagId:curLabelId,userId:curUserId},
					async:true,
					success:function(data){
						if(data){
							curTag.find(".l_right .show-num").html(parseInt(curTr.attr("data-totalcount"))-1+"人");
							initLabelUser(curTag.attr("data-id"),curTag.attr("data-name"),1,"");
							$.toast("删除成功", 1500);
						} else{
							$.toast("删除失败", 1500);
						}
					}
				});
			});
		});
		
		// 点击多选
		$(".table").on("click", ".multi_sele",function(ev){
			ev.preventDefault();
			var curTable = $(this).closest(".table");
			curTable.find("tr .remove-icon").hide();
			curTable.find("tr .multi-sele-div").show();
			$(this).next(".t_ope_div").show();
			$(this).hide();
		});
		// 点击checkbox选择行记录
		$(".table").on("click", ".user_check",function(ev){
			ev.stopPropagation();
		});
		//点击行，选择该条记录
		$("body").on("click", ".table tbody tr", function(){
			if($(this).find(".multi-sele-div").is(":visible")){
				$(this).find(".multi-sele-div .user_check").click();
				return;
			}
		});
		// 移除
		$(".table").on("click", ".del_sele",function(ev){
			ev.preventDefault();
			var curTable = $(this).closest(".table");
			var seleTr = curTable.find(".user_check:checked").closest("tr");
			var seleUserIds = [];
			var tagId;
			var curTag = $(".labels_ul li.active");
			if(seleTr.length > 0){
				tagId = $(seleTr[0]).attr("data-tagid");
				for(var i = 0; i< seleTr.length; i++){
					seleUserIds.push($(seleTr[i]).attr("data-userid"));
				}
				var test = seleUserIds.toString();
				// 与后台交互，移除改标签下的该用户
				$.ajax({
					type:"post",
					url:ctx+"/back/customer-tag/batch-delete",
					data:{tagId:tagId,userIds:test},
					async:true,
					success:function(data){
						if(data){
							curTag.find(".l_right span").html(parseInt($(seleTr[0]).attr("data-totalcount"))-parseInt(seleTr.length)+"人");
							initLabelUser(curTag.attr("data-id"),curTag.attr("data-name"),1,"");
							$.toast("删除成功", 1500);
						}else{
							$.toast("删除失败", 1500);
						}
						$(".t_ope_div").hide();
						$(".blue_a.multi_sele").show();
						$.toast("移除成功",1500);
					}
				});
			} else{
				$.toast("请选择要移除的会员", 1500);
			}
		});
		// 取消
		$(".table").on("click", ".cancel_sele",function(ev){
			ev.preventDefault();
			var curTable = $(this).closest(".table");
			var seleTr = curTable.find(".user_check:checked").removeProp("checked");
			
			curTable.find("tr .remove-icon").show();
			curTable.find("tr .multi-sele-div").hide();
			curTable.find(".multi_sele").show();
			curTable.find(".t_ope_div").hide();
		});
		
		$($(".labels_ul li")[0]).click();
	});
	
})(jQuery)
