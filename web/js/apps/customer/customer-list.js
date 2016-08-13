var checkedArr=[];//全局变量（防止过早销毁）
(function($){
	var options={
			province	:'p1',			//	省/直辖市
			city		:'p2',			//	市
			county		:'p3',			//	县/区
			defaultCitys:''
		};
    
	WX.cityUtils.init(options);
	$("#p1").prepend("<option value=''>---请选择---</option>").val("");
	$("#p1").find("option[selected='selected']").removeAttr("selected");
	$("body").on("change", "#p1", function() {
		if ($("#p1").prop("value") == '') {
			$("#p2").hide();
			$("#p3").hide();
		} else {
			$("#p2").prepend("<option value=''>---请选择---</option>").val("").show();
			$("#p3").prepend("<option value=''>---请选择---</option>").val("");
		}
	});
	$("body").on("change", "#p2", function() {
		if ($("#p2").prop("value") == '') {
			$("#p3").hide();
		} else
			$("#p3").prepend("<option value=''>---请选择---</option>").val("").show();
	});
	$("body").on("click", "#storeform .reset-conditions", function() {
		$('#p2,#p3').hide();
	});
	//将form表单数据转换成json
	$.fn.serializeObject = function()    {    
	   var o = {};    
	   var a = this.serializeArray();    
	   $.each(a, function() {    
	       if (o[this.name]) {    
	           if (!o[this.name].push) {    
	               o[this.name] = [o[this.name]];    
	           }    
	           o[this.name].push(this.value || '');    
	       } else {    
	           o[this.name] = this.value || '';    
	       }    
	   });    
	   return o;    
	};
	
	$('#userListTable tbody').on('change','.user_check',function(event){//记录checkbox选中状态
		event.stopPropagation();
		var productId = parseInt($(this).siblings('.useId').val());
		if($(this).prop('checked')){
			checkedArr.push(productId);
		}else{
			checkedArr.splice(checkedArr.indexOf(productId),1);
		}
		$('.checkedlength>num').text(checkedArr.length);
	});
	// 初始化table 分页的数据
	var cookieName = window.location.pathname.split('/');
	cookieName = cookieName[cookieName.length-2]+cookieName[cookieName.length-1];
	var pageSize=10; // 一页行数
	if(getCookie(cookieName)){
		pageSize = getCookie(cookieName)
	}
	$('body').on('click','.pageSizeNum',function(){
		setCookie(cookieName,parseInt($(this).text()),1);
		window.location.reload();
	});
	$('body').on('click','.selectPageSize',function(event){
		event.preventDefault();
		event.stopPropagation();
		$('.pageSizeSelect').show()
	});
	$('body').on('click',function(){
		$('.pageSizeSelect').hide()
	});
	
	// 初始化城市选择
	//new Vcity.CitySelector({input:'city_list'});
	
	// 显示更多搜索条件
	$("#more_buttom").on("click",function(e){
		e.preventDefault();
		$("#more_muen").slideToggle();
		if($("#more_chevron").hasClass("glyphicon-chevron-down")){
			$("#more_chevron").removeClass("glyphicon-chevron-down");
			$("#more_chevron").addClass("glyphicon-chevron-up");
		}else{
			$("#more_chevron").removeClass("glyphicon-chevron-up");
			$("#more_chevron").addClass("glyphicon-chevron-down");
		}
	});
	//时间区间的限制
	$('.s-time-input').each(function(i,obj){
		$(obj).on('change',function(){
			var startTime = $(obj).parents('.date-box').find('.s-time-input').eq(0).val();
			var endTime = $(obj).parents('.date-box').find('.s-time-input').eq(1).val();
			if( startTime && endTime){
				if(new Date(startTime) > new Date(endTime)){
					$(obj).val('');
					$.toast("开始日期必须小于结束日期",1500);
				}
			}
		})
	})
	//回车查询
	$(".search-panel").on("keypress","input:focus",function(event){
		var keywhich = (event.keyCode? event.keyCode:event.which);
		if(keywhich == 13){
			event.preventDefault();
			initUserList(1);
			showStore();
		}
	});
	//点击一行选中
	$("#userListTable").on("click","tr",function(event){
		if(!$(event.target).hasClass("user_check"))
			$(this).find(".user_check").click();
	})
	
	//初始化列表
	//初始化传参
	function initParam(pageNo){
		var code = "";
		if ($("#p1").val() != "") {
			code += $("#p1").val();
			if ($("#p2").val() != "") {
				code += $("#p2").val();
				if ($("#p3").val() != "") {
					code += $("#p3").val();
				}
			}
		}
		$("#city_val").val(code);
		var normalFormParam = $("#normalSearchform").serializeObject();//form serialize
		var customSearchform = $("#customSearchform").serializeObject();//form serialize
		var baseUserSearchform = $("#baseUserSearchform").serializeObject();//form serialize
		var form_param = $.extend(normalFormParam,customSearchform)
		form_param = $.extend({},form_param,baseUserSearchform)
		if(!pageNo){
			pageNo = 1;
		}
		form_param.pageNo = pageNo;
		form_param.pageSize = pageSize;
		form_param.allCustomerId = 0;
		var customPropList = [];
		$('.custom-props').each(function(index,obj){
			var customProp =   {
				storePropId: $(this).attr('data-storePropId'),
	            type: $(this).attr('data-type'),
	            subType: $(this).attr('data-subType')
	        };
			if($(this).attr('data-type')=='input'){
				if($(this).attr('data-subType')=='date'){
					var statTime=$(this).find('.integral-start').eq(0).val();
					var endTime=$(this).find('.integral-start').eq(1).val();
					if(statTime!='' ||  endTime!=''){
						if(statTime!=''){
							statTimeLong=statTime.replace(/-/g,'')+'000000';
						}else{
							statTimeLong=statTime;
						}
						if(endTime!=''){
							endTimeLong=endTime.replace(/-/g,'')+'000000';
						}else{
							endTimeLong=endTime;
						}
						customProp.searchValue = [statTimeLong,endTimeLong]		
						customPropList.push(customProp);
					}
				}
				if($(this).attr('data-subType')=='mail' || $(this).attr('data-subType')=='text'){
					if($(this).find('.custom-prop-value').val()!=''){
						customProp.searchValue = [$(this).find('.custom-prop-value').val()]
						customPropList.push(customProp);
					}
				}
				if($(this).attr('data-subType')=='radio'){
					if($(this).find('input[type=checkbox]:checked').length>0){
						customProp.searchValue = [];
						$(this).find('input[type=checkbox]:checked').each(function(){
							customProp.searchValue.push($(this).val());
						})
						customPropList.push(customProp);
					}
				}
			}
		});
		if(form_param.tags=='')
			form_param.tags=[];
		else
			form_param.tags=form_param.tags.split(',');
		if(typeof(form_param.sex)=='string')
			form_param.sex=form_param.sex.split();
		var newParams = {
			param:form_param,
			customPropList:customPropList
		};
		return newParams;
	}
	function initUserList(pageNo){
		if(!pageNo){
			pageNo = 1;
		}
		var newParams = initParam(pageNo);
		//初始化表格数据的ajax
		$.ajax({
			url:ctx+"/back/customer/list-customer",
			type:"POST",
			async: false,
			data:JSON.stringify(newParams),
			dataType:"html",
			contentType: "application/json",
	        timeout: 8000,
	        error: function(e){
	        	$.toast("连接异常",1500);
	        },
	        beforeSend:function(){
	        	$("#userList").showLoading();
	        },
	        success: function(userData,textStatus){
	        	$(window).scrollTop(0);
	        	if(BIGAKA.Module.checkState(userData)){
	        		//code = -5    获取location的方式：BIGAKA.location
	        	} else{
	        		
	        	}
	        	$('#userList').hideLoading();
	        	var totalCount = parseInt($($(userData)[0]).attr("data-totalCount"));
        		$("#userList").html(userData);
        		$('#prochekAllBox').removeAttr('checked');
        		CreatePager(pageSize,pageNo,totalCount,1,'userListTable');
        		var selectPageSize = 
        			'&nbsp;&nbsp;&nbsp;&nbsp;<a class="selectPageSize">'+
        				'<span>每页'+pageSize+'条</span>'+
        				'<div class="pageSizeSelect">'+
        					'<div class="pageSizeNum">5</div>'+
        					'<div class="pageSizeNum">10</div>'+
        					'<div class="pageSizeNum">15</div>'+
        					'<div class="pageSizeNum">20</div>'+
        					'<div class="pageSizeNum">25</div>'+
        					'<div class="pageSizeNum">30</div>'+
        					'<div class="pageSizeNum">35</div>'+
        					'<div class="pageSizeNum">40</div>'+
        					'<div class="pageSizeNum">45</div>'+
        					'<div class="pageSizeNum">50</div>'+
        					'<div class="pageSizeNum">100</div>'+
        					'<div class="pageSizeNum">200</div>'+
        					'<div class="pageSizeNum">500</div>'+
        					'<div class="pageSizeNum">1000</div>'+
        					'<div class="pageSizeNum">2000</div>'+
        				'</div>'+
        			'</a>';
        		$('.page_count').append(selectPageSize);
        		$('.page_count').append('<label class="checkedlength">&nbsp;&nbsp;&nbsp;&nbsp;当前选中：<num>'+checkedArr.length+'</num>条</label>');//增加选中条数
        		$('#userListTable tbody').find('.user_check').each(function(){
        			var productId = $(this).siblings('.useId').val();
        			if(checkedArr.indexOf(productId)!=-1 || checkedArr.indexOf(parseInt(productId))!=-1){//判断显式checkbox选中状态
        				$(this).prop('checked','true');
        			}
        		});
        		if($('#userListTable tbody').find('.user_check:checked').length==$('#userListTable tbody tr').length){
        			$('#prochekAllBox').prop('checked','true');
        		}
	        }
		});
	}
	var initCustomeIdParam = initParam();
	initCustomeIdParam.param.allCustomerId=1;
	$.ajax({
		url:ctx+"/back/customer/list-customer",
		type:"POST",
		async: false,
		data:JSON.stringify(initCustomeIdParam),
		dataType:"html",
		contentType: "application/json",
        timeout: 8000,
        error: function(e){
        	$.toast("连接异常",1500);
        },
        beforeSend:function(){
        },
        success: function(userData,textStatus){
        	console.log("getSubUrl=="+$(userData)[1].value);
        	window.allCustomerIdArr = JSON.parse(1);//JSON.parse($(userData)[0].value)
        }
	});
	initUserList();
	// 获取所有门店信息：总店，直营，经销等等
	var allSubStoreMap = new BIGAKA.HashMap();
	var token = BIGAKA.Module.getCookie("token");
	/*var getSubUrl = $("#substore-url").val();
	if(getSubUrl!=null&&getSubUrl!=""){
		$.ajax({
			url: getSubUrl+"?"+"token="+token+"&golbal=true",
			type: "get",
			async:false,
			dataType: "jsonp",
			jsonp: "jsonpCallbackFun",
			success: function(data){
				if(data.result!=null){
					if(data.result.length > 0){
						for(var i = 0; i<data.result.length; i++){
							allSubStoreMap.put(data.result[i].id,data.result[i].shortName);
						}
					}
				}
			},
			error: function(data){
				$.toast("网络异常",1500);
			}
		});
	}*/
	
	//遍历会员列表，显示对应的门店
	var intObj = setInterval(showStore, 500);
	function showStore(){
		var userListTr = $("#userList tr");
		if(!allSubStoreMap.isEmpty()){
			for(var i = 0; i< userListTr.length; i++){
				var storeId = $(userListTr[i]).find(".regist_storeId").val();
				var storeName = allSubStoreMap.get(storeId);
				if(!storeName)
					storeName='已删除'
				$(userListTr[i]).find(".regist-store .store-val").html(storeName);
				if( i == userListTr.length -1){
					clearInterval(intObj);
				}
			}
		}
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
		initUserList(goPageNum);
		showStore();
	});
	//直接选择页数
	$("body").on("click","#page_div li a",function(){
		var pageNo = $(this).attr("curPage");
		initUserList(pageNo);
		showStore();
	});
	/* 搜索条件相关事件 start */
	// 初始化日期控件
	$(".s-time-input#age_min,.s-time-input#age_max").datetimepicker({
		weekStart: 1,
	    todayBtn: 1,
	    autoclose: true,
	    todayHighlight: 1,
	    startView: 4,
	    minView: 2,
	    initialDate: '1989-05-09',
	    forceParse: 0
	});
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
		document.getElementById("normalSearchform").reset();
		document.getElementById("customSearchform").reset();
		document.getElementById("baseUserSearchform").reset();
		document.getElementById("customPropSearchform").reset();
		$('#storeId').val('');//清除注册们店
		$('.label_input.diy_input').val('');//清除标签
		$(".input_c_div").empty();//清除标签
		$(".set_labels").val('');//清除标签
	});
	//点击搜索
	$(".btn-search").on("click",function(){
			initUserList();
			showStore();
	});
	/* 搜索条件相关事件 操作 end */
	//注册会员
	$("body").on("click","#add_member",function(ev){
		ev.stopPropagation();
		window.location.href= ctx + "/back/customer/create";
	});
	//点击会员编号，显示会员详情
	$("body").on("click",".user-table tbody tr .t_user_account",function(ev){
		ev.stopPropagation();
		var custId = $(this).attr('data-id');
		window.location.href= ctx + "/back/customer-detail/"+custId;
	});
	//全选会员列表
	$("#prochekAllBox").on("click", function (){
		var checkBoxBoo = $('#prochekAllBox').prop('checked');
		var curTable = $(this).closest("table");
		if(checkBoxBoo){
			curTable.find("tbody tr").find(".user_check").prop("checked", 'true');
		}else{
			curTable.find("tbody tr").find(".user_check").removeAttr("checked"); 
		}
		$('#userListTable tbody').find('.user_check:checked').each(function(){
			var productId = parseInt($(this).siblings('.useId').val());
			if(checkedArr.indexOf(productId)==-1){
				checkedArr.push(productId);
			}
		});
		$('#userListTable tbody').find('.user_check:not(:checked)').each(function(){
			var productId = parseInt($(this).siblings('.useId').val());
			if(checkedArr.indexOf(productId)!=-1){
				checkedArr.splice(checkedArr.indexOf(productId),1);
			}
		});
		$('.checkedlength num').text(checkedArr.length)
	});
	//全选会员按钮
	$("#select-all").on("click", function (){
		$('#userListTable').find(".user_check").prop("checked", 'true');
		checkedArr=allCustomerIdArr;
		$('.checkedlength num').text(checkedArr.length)
	});
	//取消全选会员按钮
	$('#select-none').on('click', function (){
		$('#userListTable').find(".user_check").removeAttr("checked");
		checkedArr=[];
		$('.checkedlength num').text(checkedArr.length)
	});
	//打标签
	$("#set_label").on("click",function(){
		var checkMemberId = checkedArr;
	/*	$("#userListTable tbody tr").each(function(i,v){
			if($(v).find(".user_check").is(":checked")){
				var curUserId = $(v).attr("data-userId");
				checkMemberId.push(curUserId);
			}
		});*/
		if(checkMemberId.length > 0){
			$("#set_label_modal").find(".result_list label_re_list .list-group").empty();
			$("#set_label_modal").find(".input_c_div").empty();
			$("#set_label_modal").find(".set_labels").val("");
			
			$("#set_label_modal").find("#s_neww_menber_labek").val("");
			$("#set_label_modal").find("#s_neww_menber_labek").attr("data-id","").attr("data-name","");
			$("#set_label_modal").find(".sele_member_count").html(checkMemberId.length);
			$("#set_label_modal").find(".sel_member_ids").val(checkMemberId);
			$("#set_label_modal .modal-body").slimscroll({
		        height: "250px",
			});
			$("#set_label_modal").attr("data-backdrop", "static");
			$("#set_label_modal").modal("show");
		} else{
			$.toast("请选择打标签的会员", 1500);
			return;
		}
		
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
				url: ctx+"/back/tag/save",
				data:{tagName:newLabel},
				async:true,
				success:function(data){
					if(data){
						console.log(data);
						$.toast("添加成功!", 1500);
						curModal.find(".error-msg").html("").hide();
						$("#add_new_modal").find("#new_label").val("");
						$("#add_new_modal").modal("hide");
						//返回新增tag的id
						var curTagList = JSON.parse(sessionStorage.getItem("store-tagList"));
						if(curTagList==null){
							curTagList = new Array(1);
						}
						curTagList.push({tagId: data, name:newLabel, count: 0});
						sessionStorage.setItem('store-tagList', JSON.stringify(curTagList));
					} else{
						$.toast("添加失败!", 1500);
						curModal.find(".error-msg").html("添加失败!").show();
						return false;
					}
				}
			});
		}
		
	});
	//取消新建标签
	$("body").on("click","#cannel_label_btn",function(){
		$("#new_label").val("");
	});
	
	// 刷新标签 将选中的标签加到用户的标签上
	$("#fresh_label").on("click",function(){
		$.toast("刷新标签成功",1500);
		return;
	});
	
	// 确定打标签
	$("body").on("click","#set-member-btn",function(){
		var seleMemberIds = $("#set_label_modal").find(".sel_member_ids").val();
		console.log(seleMemberIds);
		var selLableIds = $("#set_label_modal").find(".set_labels").val();
		if(!selLableIds){
			$.toast("打标签不能为空",1500);
			return;
		}
		$.ajax({
			type:"post",
			url: ctx+"/back/customer-tag/save",
			data:{
				customerIds:seleMemberIds,
				tagIds:selLableIds
			},
			async:true,
			success:function(data){
				if(data){
					initUserList($("#page_div li.active a").attr("curpage"));
					showStore();
					$("#set_label_modal").find(".sele_member_count").html("");
					$("#set_label_modal").find(".sel_member_ids").val("");
					$("#set_label_modal").modal("hide");
				}
			}
		});
	});
	
	// 新增会员
	$("#add_member_q").on("click",function(){
		$("#add_member_modal .modal-body").slimscroll({
	        height: "150px",
		});
		$("#add_member_modal #new_menber_phone").val("");
		$("#add_member_modal").attr("data-backdrop", "static");
		$("#add_member_modal").modal("show");
	});
	
	//取消快速新增
	$("body").on("click","#cannel_menber",function(){
		$("#new_menber_phone").val("");
	});
	
	// 注册会员
	$("body").on("click","#add_menber_btn",function(){
		var curPhone = $.trim($("#new_menber_phone").val());
		if(curPhone == ""){
			$.toast("请输入会员手机号", 1500);
		} else{
			if(!BIGAKA.RegExp.MOBILE.test(curPhone)){
//				$("#new_menber_phone").next(".phone-msg").html("手机格式不正确").show();
				$.toast("请输入正确的手机号", 1500);
			} else{
				$.wxConfirm("您即将为手机号为："+curPhone+"注册成为【"+$("#cur_storeName").val()+"】会员，是否确定？",function(){
					// 用户注册
					$.ajax({
						type:"post",
						url:ctx+"/back/customer/save",
						data:JSON.stringify({username:curPhone}),
						async:true,
						contentType:'application/json',
						dataType:'json',
						success:function(result){
							//后台返回相应的result标志，msg信息：已注册
							if(result.code == 0){ // 注册成功
								$("#new_menber_phone").next(".phone-msg").html("").hide();
								$.toast("注册成功", 1500);
								$("#new_menber_phone").val("");
								$(".modal").modal("hide");
								initUserList(1);
								showStore();
							} else if(result.code == 11010){
//								$("#new_menber_phone").next(".phone-msg").html(result.message).show();
								$.toast(result.message, 1500);
							}else{
								$.toast("注册失败", 1500);
							}
						}
					});
					
				});
				
			}
		}
	});
	// 注册并完善信息
	$("body").on("click","#add_menber_fill_btn",function(){
		var curPhone = $.trim($("#new_menber_phone").val());
		if(curPhone == ""){
			$.toast("请输入会员手机号", 1500);
		} else{
			if(!BIGAKA.RegExp.MOBILE.test(curPhone)){
//				$("#new_menber_phone").next(".phone-msg").html("手机格式不正确").show();
				$.toast("请输入正确的手机号", 1500);
			} else{
				// 用户注册
				var $this = $(this);
				$this.attr('disabled',true);
				$.ajax({
					type:"post",
					url:ctx+"/back/customer/save",
					data:JSON.stringify({username:curPhone}),
					contentType:'application/json',
					async:true,
					success:function(result){
						//后台返回相应的result标志，msg信息：已注册
						if(result.code == 0){ // 注册成功
							$("#new_menber_phone").next(".phone-msg").html("").hide();
							/*$.toast("注册成功", 1500);*/
							$("#new_menber_phone").val("");
							$(".modal").modal("hide");	
							customerId = result.result.customerId;
							location = ctx +"/back/customer/create?id=" + customerId +"&phone=" + curPhone;
						} else if(result.code == 11010){
//							$("#new_menber_phone").next(".phone-msg").html(result.message).show();
							$this.removeAttr('disabled');
							$.toast(result.message, 1500);
						}else{
							$.toast("注册失败", 1500);
							$this.removeAttr('disabled');
						}
					},
					error:function(){
						$this.removeAttr('disabled');
					}
				});
			}
		}
	});
})(jQuery)


// 导出excel
function exportCouponsExcel() {
	jconfirm("即将弹出一个新标签页导出会员信息，可能需要花费几分钟时间，请不要关闭页面；导出过程中您可以切换回本页进行其他操作。确定开始导出吗？",function(){
		window.location.href = ctx + "/back/customer/export/xls";
	});
}
