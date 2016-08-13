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
	$('#user-list-table tbody').on('change','.user_check',function(event){//记录checkbox选中状态
		event.stopPropagation();
		var productId = $(this).siblings('.useId').val();
		if($(this).prop('checked')){
			checkedArr.push(productId);
		}else{
			checkedArr.splice(checkedArr.indexOf(productId),1);
		}
		$('.checkedlength>num').text(checkedArr.length);
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
	// 初始化table 分页的数据
	var cookieName = window.location.pathname.split('/');
	cookieName = cookieName[cookieName.length-2]+cookieName[cookieName.length-1];
	var pageSize=10,userPageSize=10; // 一页行数 
	if(getCookie(cookieName)){
		userPageSize = getCookie(cookieName)
	}
	
	var type=-1;
	var name="";
	$(function(){
		function initCouponList(pageNo,selectIndex){
			var couponName =$("#couponName").val();
			var sptr='%';
			while (couponName.indexOf(sptr) >= 0){
				couponName = couponName.replace(sptr, '#-');
            }
			var newParams = {type:type,pageNo:1,pageSize:pageSize,status:2,name:couponName};
			if(pageNo){
				newParams.pageNo = parseInt(pageNo);
			}else{
				pageNo = 1;
			}
			//初始化表格数据的ajax
			$.ajax({
				url:ctx+"/back/coupon/coupon-push/list",
				type:"POST",
				async: false,
				data:newParams,
				dataType:"html",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				timeout: 30000,
	        	error: function(){
		        	$.toast("连接异常",1500);
		        	$("#couponList").html('<tr data-totalCount="${page.totalCount}"><td colspan="12" class="center">暂无数据</td></tr>');
	        		CreatePager(pageSize,pageNo,0,1,"coupon-list-table");
		        },
		        success: function(userData,textStatus){		        	
		        	var totalCount = $($(userData)[0]).attr("data-totalCount");
	        		$("#couponList").html(userData);
	        		CreatePager(pageSize,pageNo,totalCount,1,"coupon-list-table");
	        		$('#user-list-table').parent().next('.page_count').append('<label class="checkedlength">&nbsp;&nbsp;&nbsp;&nbsp;当前选中条数：<num>'+checkedArr.length+'</num>条</label>');//增加选中条数
	        		if(selectIndex){
	        			$(".coupon_check").eq(selectIndex).click();
	        		}
		        }
			});
		}
		
		//会员列表 
		function initUserList(pageNo,selectIndex){
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
						if($(this).find('.integral-start').eq(0).val()!='' ||  $(this).find('.integral-start').eq(1).val()!=''){
							customProp.searchValue = [$(this).find('.integral-start').eq(0).val(),$(this).find('.integral-start').eq(1).val()]		
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
						if($(this).find('input[type=radio]:checked').length>0){
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
				form_param.sex=form_param.sex.split()
			var newParams = 
			{
				param:form_param,
				customPropList:customPropList
			};
			
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
		        	$('#userList').hideLoading();
		        	var totalCount = $($(userData)[0]).attr("data-totalCount");
	        		$("#userList").html(userData);
	        		$('#prochekAllBox').removeAttr('checked');
	        		CreatePager(userPageSize,pageNo,totalCount,1,"user-list-table");
	        		if(selectIndex){
	        			$.each(selectIndex,function(){
		        			$(".user_check").eq(this).click();
		        		})
	        		}
	        		var selectPageSize = 
	        			'&nbsp;&nbsp;&nbsp;&nbsp;<a class="selectPageSize">'+
	        				'<span>每页'+userPageSize+'条</span>'+
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
	        		$('.page_count').append('<label class="checkedlength">&nbsp;&nbsp;&nbsp;&nbsp;当前选中条数：<num>'+checkedArr.length+'</num>条</label>');//增加选中条数
	        		$('#user-list-table tbody').find('.user_check').each(function(){
	        			var productId = $(this).siblings('.useId').val();
	        			if(checkedArr.indexOf(productId)!=-1){//判断显式checkbox选中状态
	        				$(this).prop('checked','true');
	        			}
	        		});
	        		if($('#user-list-table tbody').find('.user_check:checked').length==$('#user-list-table tbody tr').length){
	        			$('#prochekAllBox').prop('checked','true');
	        		}
		        }
			});
		}
		initCouponList();
		//initUserList();
		$('body').on('click','.pageSizeNum',function(event){
			event.preventDefault();
			event.stopPropagation();
			setCookie(cookieName,parseInt($(this).text()),1);
			userPageSize=parseInt($(this).text());
			$('.pageSizeSelect').hide();
			initUserList(1);
			showStore();
		});
		$('body').on('click','.selectPageSize',function(event){
			event.preventDefault();
			event.stopPropagation();
			$('.pageSizeSelect').show()
		});
		$('body').on('click',function(){
			$('.pageSizeSelect').hide()
		});
		//输入页数，跳转到某一页
		$("body").on("keypress",".go_page",function(event){
			var pageNo = $(this).val();
			var curTableId = $(this).closest(".row").prev("table").attr("id");
			if(event.keyCode == "13"){
				if(pageNo != ""){
					if(pageNo == 0){
						pageNo = 1;
					}
					if(curTableId == "coupon-list-table"){
						initCouponList(pageNo);
					} else if(curTableId == "user-list-table"){
						initUserList(pageNo);
						showStore();
					}
				};
			}
		});
		$(".search-panel").on("keypress","input:focus",function(event){
			var keywhich = (event.keyCode? event.keyCode:event.which);
			if(keywhich == 13){
				event.preventDefault();
				initUserList(1);
				showStore();
			}
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
    		var curTableId = $(this).closest(".row").prev("table").attr("id");
    		if(curTableId == "coupon-list-table"){
				initCouponList(goPageNum);
			} else if(curTableId == "user-list-table"){
				initUserList(goPageNum);
				showStore();
			}
    	});
		//直接选择页数
		$("body").on("click","#page_div li a",function(){
			var pageNo = $(this).attr("curPage");
			var curTableId = $(this).closest(".row").prev("table").attr("id");
			if(curTableId == "coupon-list-table"){
				initCouponList(pageNo);
			} else if(curTableId == "user-list-table"){
				initUserList(pageNo);
				showStore();
			}
		});
		
		$("#coupon-list-table").on("click","tr",function(event){
			if(!$(event.target).hasClass("coupon_check"))
				$(this).find(".coupon_check").click();
		});
		$("#user-list-table").on("click","tr",function(event){
			if(!$(event.target).hasClass("user_check"))
				$(this).find(".user_check").click();
		})
		
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
		
		//点击搜索
		$(".search_icon").on("click",function(){
			var pageNo = $(this).attr("curPage");
			var curTableBody = $("#coupon-list-table").find("tbody");
			var curPagation = $(this).closest(".row");
			initCouponList(1);
		});
		//enter键搜索
		$("body").on("keypress","#couponName",function(e){
			var keywhich = (event.keyCode? event.keyCode:event.which);
			if(keywhich == 13){
				event.preventDefault();
				$(".search_icon").click();
			}
		});
		//全选优惠券列表
		$("#couChekAllBox").on("click", function allcheck(){
			var checkBoxBoo = $('#couChekAllBox').prop('checked');
			var curTable = $(this).closest("table");
			if(checkBoxBoo){
				curTable.find("tbody tr").find(".coupon_check").prop("checked", 'true');
			}else{
				curTable.find("tbody tr").find(".coupon_check").removeAttr("checked"); 
			}
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
			$('#user-list-table tbody').find('.user_check:checked').each(function(){
				var productId = $(this).siblings('.useId').val();
				if(checkedArr.indexOf(productId)==-1){
					checkedArr.push(productId);
				}
			});
			$('#user-list-table tbody').find('.user_check:not(:checked)').each(function(){
				var productId = (this).siblings('.useId').val();
				if(checkedArr.indexOf(productId)!=-1){
					checkedArr.splice(checkedArr.indexOf(productId),1);
				}
			});
			$('.checkedlength num').text(checkedArr.length)
		});
		
		// 重置step1
		$("body").on("click", "#step1_reset",function(){
			document.ucouponForm.reset();
		});
		//点击下一步
		$("body").on("click", ".btn_next",function(){
			var index = $(this).attr("data-step");
			// 第一步
			if(index == 1){
				$(".search_div").show();
				//记录选中的会员是第几页的第几个
				if($(".body-step2 .pagination li.active a").attr("curpage"))
					window.localStorage.setItem("userSelectPage",$(".body-step2 .pagination li.active a").attr("curpage"));
				var userSelectIndexArray=[];
				$(".user_check:checked").each(function(){
					userSelectIndexArray.push($(".user_check").index($(this)));
				})
				if(userSelectIndexArray.length>0)
					window.localStorage.setItem("userSelectIndex",userSelectIndexArray.join(","));
				initCouponList(window.localStorage.getItem("couponSelectPage"),window.localStorage.getItem("couponSelectIndex"));
			}
			// 第二步
			if(index == 2){
				$(".search_div").hide();
				var checkCouponId = [];
				
				$("#coupon-list-table tbody tr").each(function(i,v){
					if($(v).find(".coupon_check").is(":checked")){
						var curCouponId = $(v).attr("data-couponId");
						checkCouponId.push(curCouponId);
					}
				});
				if(checkCouponId.length <= 0){
					$(".search_div").show();
					$.toast("请选择要发放的优惠券", 1500);
					return false;
				}
				if(checkCouponId.length > 1){
					$(".search_div").show();
					$.toast("只能选择一张优惠券", 1500);
					return false;
				}
			
				if($("#"+checkCouponId[0]+"count").val()==0){
					$(".search_div").show();
					$.toast("您选择的优惠券库存为0", 1500);
					return false;
				}
				//记录选中的优惠券是第几页的第几个
				if($(".body-step1 .pagination li.active a").attr("curpage"))
					window.localStorage.setItem("couponSelectPage",$(".body-step1 .pagination li.active a").attr("curpage"));
				if($(".coupon_check").index($(".coupon_check:checked")))
					window.localStorage.setItem("couponSelectIndex",$(".coupon_check").index($(".coupon_check:checked")));
				//加载会员列表
				var userSelectIndexArray;
				if(window.localStorage.getItem("userSelectIndex"))
					userSelectIndexArray=window.localStorage.getItem("userSelectIndex").split(",");
				initUserList(window.localStorage.getItem("userSelectPage"),userSelectIndexArray);
				//遍历会员列表，显示对应的门店
				window.intObj = setInterval(showStore, 500);
				
			}
			//第三步
			if(index == 3){
				$(".search_div").hide();
				// 验证是否选择优惠券了
				var checkCouponId = [];
				$("#coupon-list-table tbody tr").each(function(i,v){
					if($(v).find(".coupon_check").is(":checked")){
						var curCouponId = $(v).attr("data-couponId");
						checkCouponId.push(curCouponId);
					}
				});
				if(checkCouponId.length <= 0){
					$(".search_div").show();
					$.toast("请选择要发放的优惠券", 1500);
					return false;
				}
				$("#couponId").val(checkCouponId);
				// 验证是否选择会员
				var checkUserId = [];
				$("#user-list-table tbody tr").each(function(i,v){
					if($(v).find(".user_check").is(":checked")){
						var curUserId = $(v).attr("data-userId");
						checkUserId.push(curUserId);
					}
				});
				var checkUserIdLength = checkUserId.length;
				var couponCountLength = $("#"+checkCouponId[0]+"count").val();
				if(checkUserIdLength <= 0){
					$.toast("请选择要发放的会员", 1500);
					return false;
				}else{
					//记录选中的会员是第几页的第几个
					if($(".body-step2 .pagination li.active a").attr("curpage"))
						window.localStorage.setItem("userSelectPage",$(".body-step2 .pagination li.active a").attr("curpage"));
					var userSelectIndexArray=[];
					$(".user_check:checked").each(function(){
						userSelectIndexArray.push($(".user_check").index($(this)));
					})
					if(userSelectIndexArray.length>0)
						window.localStorage.setItem("userSelectIndex",userSelectIndexArray.join(","));
					var url = ctx+"/back/coupon-push/check/"+checkCouponId;
					$.ajax({
						url:url,
						type:"POST",
						 async: true,
						 data:{
							 customerId:checkUserId
						 },
						 dataType:"json",
						 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					        timeout: 30000,
					        error: function(){
					        	$.toast("连接异常",1500);
					        },
					        success: function(data,textStatus){
					        	if(textStatus=="success"){
					        		$("#couponUrl").val(data.url);
					        		$("#couponShortUrl").val(data.shortUrl);
					        		$("#pushId").val(data.pushId);
					        		
					        		if(checkUserIdLength>couponCountLength){
										$.wxConfirm("您选择的优惠券，剩余库存"+couponCountLength+"张小于您所选择的发放的会员数量："+
												checkUserIdLength+"位将会有部分会员无法领取优惠券？",function(){
											
											$("#customerId").val(checkUserId);
											
											$(".body-step").hide();
											$(".body-step" + index).show();
											$(".one-step").removeClass("active");
											$(".one-step.step" + index).addClass("active");
											$(".crose-line").removeClass("active");
											$(".crose-line").eq(index - 1).addClass("active");
										});
										
										return false;
									}
					        	}
					        }
					        
					})
					
				}
				$("#customerId").val(checkUserId);
				//判断微信内容是否定制
				var isCustomWMsg = $("#isCustomWMsg").val();
				if(isCustomWMsg == 1){
					$("#file-upload").removeProp("disabled");
				} else {
					$("#file-upload").attr("disabled","disabled");
				}
			}
			$(window).scrollTop(0);//页面滚动到顶部
			$(".body-step").hide();
			$(".body-step" + index).show();
			$(".one-step").removeClass("active");
			$(".one-step.step" + index).addClass("active");
			$(".crose-line").removeClass("active");
			$(".crose-line").eq(index - 1).addClass("active");
		});
		
		//确认发放优惠券
		$("body").on("click", ".btn_sumit",function(){
			//是否开启微信
			var isOpenWechat = $("#onOpenWechat").val();
			//是否定制微信信息
			var isCustomWechatMsg = 1;//$("#isCustomWMsg").val();
			//是否开启短信
			var isOpenSms = $("#onPhoneMsg").val();
			//是否定制短信信息
			var isCustomPhoneMsg = $("#isPhoneCustomMsg").val();
			
		/*	if(isOpenWechat==0 || isOpenSms==0){
				$.toast("请至少选择一种渠道进行优惠券的发放",1500);
				return false;
			}*/
			
			var media_id = $("#media_id").val();
			
			if(isOpenWechat == 1 ){//&& isCustomWechatMsg == 1
				var curPageTitle = $.trim($("#page_title").val());
				//var curText = $.trim($("#msg_text").val());
				var imgUrl = $("#msg_img").val();
				if(curPageTitle == ""){
					$.toast("请填写页面标题",1500);
					return false;
				}
				if(curPageTitle.length>30){
					$.toast("标题内容不能超过30字！",1500);
					return false;
				}
			/*	if(curText == ""){
					$.toast("请填写发放文案", 1500);
					return false;
				}*/
				if(imgUrl == ""){
					$.toast("请选择信息图片",1500);
					return false;
				}
				if($("#file-upload").val()==''){
					$.toast("请上传图片",1500);
					return false;
				}

				if(media_id == ""){
					$.toast("请等待图片上传成功", 1500);
					return false;
				}
			}
			
			//短信
			if(isOpenSms == 1 && isCustomPhoneMsg == 1){
				var customMsg = $("#phoneMsgText").val();
				if(customMsg == ""){
					$.toast("请填写短信发放文案", 1500);
					return false;
				}else{
					var phoneMsgText=customMsg.replace($("#couponUrl").val(),"");
					if(phoneMsgText.length>100){
						$.toast('发放文案内容不能超过100字！',1500);
						return false;
					}
				}
			}
			
			if(isCustomWechatMsg==0){
				isOpenWechat=0;
			}
			if(isCustomPhoneMsg==0){
				isOpenSms=0;
			}
			if(isOpenSms==0&&isOpenWechat==0){
				$.toast("请填写定制信息",1500); 
				return false;
			}
			//$('#btn-submit').attr('disabled',"true");
			
			// 提交发放优惠券的信息
			$.ajax({
				url:ctx+"/back/coupon-push/push",
				type:"POST",
				async: false,
				data:{
					customerId:$("#customerId").val(),
					couponId:$("#couponId").val(),
					openWechat:isOpenWechat,
					title:$.trim($("#page_title").val()),
					logo:$("#wxUrl").val(),
					//wxContent:$.trim($("#msg_text").val()),
					wxUrl:$("#couponUrl").val(),
					media_id:media_id,
					openSms:isOpenSms,
					smsContent:$("#phoneMsgText").val(),
					smsUrl:$("#couponUrl").val(),
					customerCouponId:$("#pushId").val(),
					remarks:$("#remarks").val()
				},
				dataType:"json",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		        timeout: 10000,
		        error: function(){
		        	$.toast("连接异常",1500);
		        },
		        success: function(data,textStatus){
		        	if(data.code==0){
		        		$.toast('后台推送中！',1500);
		        		setTimeout(function(){
		        			window.location=ctx+'/back/coupon-push';
		        		},1000);
		        	}else if(data.code==3){
		        		$.toast('用户登录信息失效！',1500);
		        	}else if(data.code==-1){
		        		$.toast('微信推送失败:'+data.message,1500);
		        	}
		        }
			})
		});
		
		$('.addGetLink,.blue_a').click(function(){ 
			var phoneMsgText = $("#phoneMsgText").val();
			if(phoneMsgText.length>100){
				$.toast('发放文案内容不能超过100字！',1500);
				return;
			}
			$("#phoneMsgText").val(phoneMsgText+$("#couponShortUrl").val());
			//$("#phoneMsgText").val(phoneMsgText+$("#couponUrl").val());
			//$("#phoneMsgText").insert({"text":$("#couponUrl").val()});  
		});
		 
		// 修改信息标题
		$("body").on("blur", "#page_title", function(){
			$(this).val($.trim($(this).val()));
			var curVal = $(this).val();
			if(curVal == ""){
				return false;
			}
			$(".field_head div").html(curVal);
		});
		
		// 修改文本内容
	/*	$("body").on("blur","#msg_text", function(){
			$(this).val($.trim($(this).val()));
			
			var curVal = $(this).val();
			if(curVal == ""){
				return false;
			}
			$(".field_right .field_text").html(curVal);
		});*/
		
		//上传图片
		$("body").on("change","#file-upload",function(ev){
			 // Get a reference to the fileList
		    var files = !!this.files ? this.files : [];
		    // If no files were selected, or no FileReader support, return
		    if (!files.length || !window.FileReader) return;
		  
		    // Only proceed if the selected file is an image
		    if (/^image/.test( files[0].type)){
		  
		        // Create a new instance of the FileReader
		        var reader = new FileReader();
		  
		        // Read the local file as a DataURL
		        reader.readAsDataURL(files[0]);
		  
		        // When loaded, set image data as background of div
		        reader.onloadend = function(){
			       $(".msg-image").attr("src", this.result);
			       $("#goods_index_img").attr("src", this.result);
			       $("#itemForm").ajaxSubmit({
		    			type : 'post',
		    			url : ctx+'/back/wechat-coupon/upload',
		    			dataType : 'json',
		    			success : function(data) { 
		    				$("#media_id").val(data.result.media_id);
		    				$("#wxUrl").val(data.result.oSSUrl);
		    				$.toast(data.message, 1500);
		    			},
		    			error : function(XMLResponse) {
		    				$.toast("上传失败", 1500);
		    			}
		    		});
		       }
		  
		    }else{
		    	$.toast("该文件不是图片，请选择图片文件",1500);
		    }
		});
	});
	function showStore(){
		var userListTr = $("#userList tr");
		if(!BIGAKA.SubStoreMap.isEmpty()){
			for(var i = 0; i< userListTr.length; i++){
				var storeId = $(userListTr[i]).find(".regist_storeId").val();
				var storeName = BIGAKA.SubStoreMap.get(storeId);
				if(!storeName)
					storeName='已删除'
				$(userListTr[i]).find(".regist-store .store-val").html(storeName);
				if( i == userListTr.length -1){
					clearInterval(intObj);
				}
			}
		}
	}
	window.onbeforeunload=function(){
		window.localStorage.removeItem("couponSelectIndex");
		window.localStorage.removeItem("couponSelectPage");
		window.localStorage.removeItem("userSelectIndex");
		window.localStorage.removeItem("userSelectPage");
	}
})(jQuery);

//微信渠道发放  改变是否定制信息 短信渠道发放
function isCheckMsg(target){
	if($(target).prop("checked")){
		$(target).val("1");
	} else{
		$(target).val("0");
	}
	var curId = $(target).attr("id");
	
	//开启微信发放渠道
	if(curId == "onOpenWechat"){
		if($(target).val() == 1){

			var customerId = $("#customerId").val();
			var strArr = customerId.split(",");
			if(strArr.length==1){
				$(".wechat_item.info_item").hide();
				$.toast("微信暂不支持推送单个会员信息，请重新选择会员或通过短信渠道发送。",1500);
				$("#onOpenWechat").bootstrapSwitch('toggleState');
				$("#onOpenWechat").val(0);
				return;
			}
			
			var url = ctx+"/back/coupon-push/check-openId";
			
			$.ajax({
				url:url,
				type:"POST",
				async: true,
				data:{
					 customerId:customerId
				},
				dataType:"json",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			    timeout: 30000,
			    error: function(){
			        $.toast("连接异常",1500);
			    },
			    success: function(data,textStatus){
			       if(data.code==0){
			    	   $(".wechat_item.info_item").show();
						$(".set_cont_div").find("input").removeAttr("readonly");
						$(".set_cont_div").find("textarea").removeAttr("readonly");
						$("#file-upload").removeProp("disabled");	
			       }else if(data.code==-1){
			    	   $(".wechat_item.info_item").hide();
			    	   $.toast("您选择的会员中已绑定微信账号的少于2个，由于微信限制无法发送，请重新选择。",1500);
			    	   $("#onOpenWechat").bootstrapSwitch('toggleState');
			    	   $("#onOpenWechat").val(0);
			       } 
			    }
			})
		} else{
			$(".wechat_item.info_item").hide();
			$(".set_cont_div").find("input").attr("readonly","readonly");
			$(".set_cont_div").find("textarea").attr("readonly","readonly");
			$("#file-upload").attr("disabled","disabled");
		}
	}
 
	//开启短信发放渠道
	if(curId == "onPhoneMsg"){
		if($(target).val() == 1){
			$(".phoneMsg.info_item").show();
		} else{
			$(".phoneMsg.info_item").hide();
		}
	}
	
	//短信开启定制
	if(curId == "isPhoneCustomMsg"){
		if($(target).val() == 1){
			$(".phoneMsg_ope_div a").show();
			$("#phoneMsgText").removeAttr("readonly");
		} else{
			$(".phoneMsg_ope_div a").hide();
			$("#phoneMsgText").attr("readonly","readonly");
		}
	}
}
