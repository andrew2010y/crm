(function($){
	// 初始化table 分页的数据
	var pageSize=20; // 一页行数
	var name="";
	$(function(){
		//初始化会员状态icon
		var customerId=$('#customerId').val();
		var storeId=$('#regist_store').val();
		$.ajax({
			url:ctx+"/back/customer-detail/customer-expand/icon",
			type:"POST",
			 async: false,
			 data:{customerId:customerId,storeId:storeId},
		        timeout: 3000,
		        error: function(){
		        	$.toast("连接异常",1500);
		        },
		        success: function(data){
		        	if(data.result.perfectDegree ==100){
		        		$('.info-complet-icon').show();
		        	}
		        	if(data.result.followPublicNum ==0){
		        		$('.follow-wx-icon').hide();
		        		$('.unfollow-wx-icon').show();
		        	}else{
		        		$('.follow-wx-icon').show();
		        		$('.unfollow-wx-icon').hide();
		        	}
		        	if(data.result.openId){
		        		$('.bind-wx-icon').show();
		        		$('.unbind-wx-icon').hide();
		        	}else{
		        		$('.bind-wx-icon').hide();
		        		$('.unbind-wx-icon').show();
		        	}
		        	if(data.result.state ==1){
		        		$('.freeze-icon').show();
		        		$('.unfreeze-icon').hide();
		        	}else{
		        		$('.freeze-icon').hide();
		        		$('.unfreeze-icon').show();
		        	}
		        }
		 });
		// 初始化城市选择
		var options={
				province	:'p1',			//	省/直辖市
				city		:'p2',			//	市
				county		:'p3',			//	县/区
				defaultCitys:''
			};
	    
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
		//显示用户的城市
		var city_val=$('input[name="areaCode"]').val();
		if(city_val!=0 && city_val!=null){
			options.defaultCitys=city_val;
			WX.cityUtils.init(options);
			$("#p1").prepend("<option value=''>---请选择---</option>");
			if(city_val.length==6){
				$("#p2").show();
				$("#p3").show();
			}
		}else{
			options.defaultCitys='';
			WX.cityUtils.init(options);
			$("#p1").prepend("<option value=''>---请选择---</option>").val("");
		}
		//显示会员注册的门店名称
		if($("#regist_store").val() != ""){
			function initStore(){
				if(!BIGAKA.SubStoreMap.isEmpty()){
					$(".sub-store-input").val(BIGAKA.SubStoreMap.get($("#regist_store").val()));
				}
				clearInterval(interObj);
			}
			var interObj = setInterval(initStore,500);
		}
		//显示会员详细地址
		if($("#address-table").find("tr td .form-group .add_info").length > 0){
			var cityCode = $("#address-table").find(".addr_details_p").attr("data-cityCode");
			var addr =  $("#address-table").find(".addr_details_p").attr("data-addr");
			var address = WX.cityUtils.getAddr(cityCode) + addr;
			$("#address-table").find(".addr_details_p").html(address);
		}
		//初始化用户的消费记录
		function initUserList(pageNo,channel,startTime,endTime){
			customerId= $("#customerId").val();
			//初始化表格数据的ajax
			$.ajax({
				url:ctx+"/back/consume-log/consume-log",
				type:"POST",
				 async: false,
				 data:{customerId:customerId,pageNo:pageNo,pageSize:pageSize,channel:channel,startTime:startTime,endTime:endTime},
				 dataType:"html",
				 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			        timeout: 30000,
			        error: function(){
			        	$.toast("连接异常",1500);
			        },
			        success: function(userConData){
			        	var totalCount = $($(userConData)[0]).attr("data-totalCount");
			        	var customerCustomerPrice = $($(userConData)[0]).attr("data-customer-customerPrice");
			        	var customerTotalCount =$($(userConData)[0]).attr("data-customer-totalCount");
			        	var customerYearCount =$($(userConData)[0]).attr("data-customer-yearCount");
			        	var customerMonthCount =$($(userConData)[0]).attr("data-customer-monthCount");
			        	var customerDayCount =$($(userConData)[0]).attr("data-customer-dayCount");
			        	var customerConsumeTime =$($(userConData)[0]).attr("data-customer-consumeTime");
			        	var customerPayType =$($(userConData)[0]).attr("data-customer-payType");
			        	customerCustomerPrice  = (customerCustomerPrice*1).toFixed(2);
			        	$("#customerCustomerPrice").html(customerCustomerPrice+"元");
			        	$("#customerTotalCount").html(customerTotalCount+"次");
			        	$("#customerYearCount").html(customerYearCount+" 次/年");
			        	$("#customerMonthCount").html(customerMonthCount+" 次/月");
			        	$("#customerDayCount").html(customerDayCount+" 次/日");
//			        	$("#customerCustomerPrice").html(customerCustomerPrice+"元");
			        	$("#customerConsumeTime").html(customerConsumeTime);
			        	if(customerTotalCount !=0){
			        		$("#avgPrice").html((customerCustomerPrice/customerTotalCount).toFixed(2));
			        	}else {
			        		$("#avgPrice").html(0.0);
						}
			        	if(customerPayType && customerPayType.length>0){
			        		for(var i = 0;i<customerPayType.length;i++){
			        			if(customerPayType[i]==1){
			        				$("#weixin").removeClass("pay_flag");
			        				$("#weixin").addClass("pay_flag checked");
			        			}
			        			if (customerPayType[i]==2) {
			        				$("#zhifubao").removeClass("pay_flag");
			        				$("#zhifubao").addClass("pay_flag checked");
								}
			        			if(customerPayType[i]==3){
									$("#other").removeClass("pay_flag");
			        				$("#other").addClass("pay_flag checked");
								}
			        		}
			        	}
			        	$("#userList").html(userConData);
			        	CreatePager(pageSize,pageNo,totalCount,1,'userListTable');
			        }
			});
		}
		initUserList(1,"","","");
		//冻结或者解冻
		$(".modal_ope_item.isFrozen").on("click",function(){
			var custId = $("input[name='customerId']").val();
			var state = null;
			var memPhone=$('#memPhone').attr("data");
			//未绑定手机号
			if(memPhone.length==11){
				if($(this).hasClass("frozen")){
					state=0;
				} else{ // 冻结状态
					state=1;
				}
				$.ajax({
					type:"post",
					url: ctx+"/back/customer/state",
					data:{
						customerId:custId,
						state:state
					},
					async:true,
					success:function(data){
						if(data){ //true
							if(state==1){ //进行冻结操作,操作完成后，添加frozen的calss
								$(".modal_ope_item.isFrozen").addClass("frozen");
								$(".modal_ope_item.isFrozen").html("解冻");
								$(".form-group .u_state").html("冻结");
								$.toast("冻结成功", 1500);
								$('.freeze-icon').show();
				        		$('.unfreeze-icon').hide();
							}else if(state==0){ //进行解冻操作,操作完成后，去掉frozen的calss
								$(".modal_ope_item.isFrozen").removeClass("frozen");
								$(".modal_ope_item.isFrozen").html("冻结");
								$(".form-group .u_state").html("正常");
								$.toast("解冻成功", 1500);
								$('.freeze-icon').hide();
				        		$('.unfreeze-icon').show();
							}
						}else{
							$.toast("操作失败", 1500);
						}
					}
				});
			}else{
				$.toast('该会员暂未绑定手机，无法冻结',1500);
			}
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
		//编辑客户信息
		$(".modal_ope_item.isEdit").on("click",function(){
			//可编辑状态
			if($(this).hasClass("edit")){
				$(this).removeClass("edit");
				$(this).addClass("save");
				$(this).html("保存");
				$("#user_info_table,#user_info_other_table").addClass("edit");
				$("#user_info_table,#user_info_other_table").find('input[readonly]').removeProp("readonly");
				$("#user_info_table,#user_info_other_table").find('input[disabled]').removeProp("disabled");
				$("#s_neww_menber_labek").removeProp("readonly");
				$("#user_info_table,#user_info_other_table").find('select[disabled]').removeProp("disabled");
				$('.ridio-check').show();
				$('.ridio-value').hide();
			} else if($(this).hasClass("save")){ // 正在编辑 可以保存
				//保存个人信息，提交$("#userInfoForm")里面的数据
				//城市选择
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
				if(code !=0 && code.length<6){
					$.toast("请选择完整的城市", 1500);
					return false;
				}
				$("#city_val").val(code);
				//邮箱
				var mem_mail;
				var email=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
				$('.custom-props').each(function(index,obj){
					if($(this).attr('data-subType')=='mail'){
						mem_mail = $(this).find('.custom-prop-value').val()
					}
				})	
				if(mem_mail && !email.test(mem_mail)){
						$.toast("请输入正确的邮箱", 1500);
						return false;
				}
				//性别选择
				$("#gender_val").val($(".genderType:checked").val());
				$('.genderType').removeAttr('name');
				var form_param1 = $("#editUserForm").serializeObject();//form serialize
				var editUserForm1 = $("#editUserForm1").serializeObject();//form serialize
				var editUserForm2 = $("#editUserForm2").serializeObject();//form serialize
				var form_param;
				form_param = $.extend({},form_param1,editUserForm1,editUserForm2);
				var customPropList = [];
				$('.custom-props').each(function(index,obj){
					var customProp =   {
						storePropId: $(this).attr('data-storePropId'),
						customerId:$('#customerId').val()
			        };
					if($(this).attr('data-type')=='input'){
						if($(this).attr('data-subType')=='date'){
							if($(this).find('.time-input').val()!=''){
								customProp.value = $(this).find('.time-input').val().replace(/-/g,'')+'000000';	
								customPropList.push(customProp);
							}
						}
						if($(this).attr('data-subType')=='mail' || $(this).attr('data-subType')=='text'){
								customProp.value = $(this).find('.custom-prop-value').val()
								customPropList.push(customProp);
						}
						if($(this).attr('data-subType')=='radio'){
								customProp.value = $(this).find('input[type=radio]:checked').val()
								if(!customProp.value){
									customProp.value="";
								}
								customPropList.push(customProp);
						}
					}
				});
				var newParams=form_param;
					newParams.customerProps=customPropList;
				/*var birthDate = $("input[name='birthDate']").val();*/
				$.ajax({
					type:"post",
					url: ctx+"/back/customer/update",
					data:JSON.stringify(newParams),
					async:true,
					contentType:'application/json',
					success:function(data){
						if(data){
							$(".modal_ope_item.isEdit").addClass("edit");
							$(".modal_ope_item.isEdit").removeClass("save");
							$(".modal_ope_item.isEdit").html("编辑");
							$("#user_info_table").removeClass("edit");
							$("#user_info_table").find('input').prop("readonly","readonly");
							$("#user_info_other_table").find('input[type="text"]').prop("readonly","readonly");
							$("#user_info_other_table").find('input[type="tel"],input[type="radio"]').prop("disabled","disabled");
							$("#s_neww_menber_labek").attr("readonly","readonly");
							$("#user_info_table,#user_info_other_table").find('select').attr("disabled","disabled");
							$.toast("编辑成功", 1500);
							/*$(".age").html(formartAge(birthDate));*/
							$('.genderType').prop('name',"genderType");
						}else{
							$.toast("编辑失败", 1500);
						}
					}
				});
			}
		});
		/*function formartAge(birthDate){   
			var r = birthDate.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);     
	        if(r==null)return false;     
	        var d= new Date(r[1],r[3]-1,r[4]);     
	        if (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]){   
	            var year = new Date().getFullYear();  
	            return year-r[1];
	        }         
		} */ 
		//更多地址
		$(".more_addr").on("click",function(ev){
			ev.preventDefault();
			$("#more_addr_modal").attr("data-backdrop", "static");
			$("#more_addr_modal").find(".addr_item_info").each(function(i,v){
				var cityCode = $(v).attr("data-cityCode");
				var addr =  $(v).attr("data-addr");
				var address = WX.cityUtils.getAddr(cityCode) + addr;
				$(v).html(address);
			});
			
			$("#more_addr_modal").modal("show");
		});
		//清空标签
		$(".clear_label").on("click",function(ev){
			ev.preventDefault();
			var custId = $("input[name='customerId']").val();
			$.ajax({
				type:"post",
				url: ctx+"/back/customer-tag/clear",
				data:{customerId:custId},
				async:true,
				success:function(data){
					if(data){ //true
						$.toast("清空成功", 1500);
					}else{
						$.toast("清空失败", 1500);
					}
				}
			});
			$(".uLabel_div").empty();
		});
		//删除标签
		$("body").on("click", ".uLabel_div .del_label_item", function(){
			var custId = $("input[name='customerId']").val();
			var curTagItem = $(this).closest(".sel_label_item");
			$.ajax({
				type:"post",
				url: ctx+"/back/customer-tag/delete",
				data:{userId:custId,tagId:curTagItem.find(".sel_label_span").attr("data-id")},
				async:true,
				success:function(data){
			var data = true;
					if(data){ //true
						$.toast("删除成功", 1500);
						curTagItem.remove();
					}else{
						$.toast("删除失败", 1500);
					}
				}
			});
		});
		// 新建标签
		$("body").on("click", "#add_label", function(){
			$("#add_new_modal .modal-body").slimscroll({
		        height: "250px",
			});
			$("#add_new_modal").attr("data-backdrop", "static");
			$("#add_new_modal").find(".error-msg").html("").hide();
			$("#add_new_modal").find("#new_label").val("");
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
							$.toast("添加成功", 1500);
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
		// 刷新标签 将选中的标签加到用户的标签上
		$("#fresh_label").on("click",function(){
			// 打标签对应的input中选择的标签
			var selLableIds = $(".set_labels").val();
			$.ajax({
				type:"post",
				url:"",
				data: "",
				async:true,
				success: function(data){
					$.toast("刷新成功",1500);
				}
			});
		});
		//打新标签
		$("body").on("click","#set_new_label",function(){
			var labelIds = $(".set_labels").val();
			var custId = $("input[name='customerId']").val();
			if(!labelIds){
				$.toast("打标签不能为空",1500);
				return;
			}
			$.ajax({
				type:"post",
				url: ctx+"/back/customer-tag/save",
				data:{
					customerIds:custId,
					tagIds:labelIds
				},
				async:true,
				success:function(data){
					if(data){ //true
						//如果添加成功后建议将input选择的标签，通过和上面已有的标签进行比对，将没有重复直接添加上去
						var seleTags = $(".input_c_div .sel_label_item");
						var oriTags = $(".uLabel_div .sel_label_item");
						if(seleTags.length > 0){
							for(var i = 0; i<seleTags.length; i++){
								var flag = true;
								if(oriTags.length > 0){
									for(var j = 0; j<oriTags.length; j++){
										if(parseInt($(seleTags[i]).find(".sel_label_span").attr("data-id")) == parseInt($(oriTags[j]).find(".sel_label_span").attr("data-id")) ){
											flag = false;
										}
									}
									if(flag){
										$(".uLabel_div .sel_label_item:last").after($(seleTags[i]));
									}
								}else{
									$(".uLabel_div .clear_label").before($(seleTags[i]));
								}
							}
						}
						$(".uLabel_div .clear_label").show();
						$("#s_neww_menber_labek").val("");
						$(".input_c_div").empty();
						$(".set_labels").val("");
							
					}else{
						//添加失败后的提示
					}
				
				}
			});
		});
		// 重置标签
		$("#clear_label_btn").on("click",function(){
			$("#s_neww_menber_labek").attr("date-id", "").attr("date-name", "");
			$("#s_neww_menber_labek").prev(".result_list").find(".list-group").empty();
			$(".input_c_div").empty();
			$(".set_labels").val("");
		});
		//积分信息获取
		function getPoint(pageNo){
			var ope_type =$("#ope_type").val();
			
			var customerId=$("#customerId").val();
			var consumeChannel =$("#channel_type").val();
			var start_time=$("#point_start_time").val();
			var end_time=$("#point_end_time").val();
			var newParams = {pageNo:pageNo,pageSize:pageSize,consumeChannel:consumeChannel,opera:ope_type,
					startTime:start_time,endTime:end_time,customerId:customerId}
			
			if(!pageNo){
				pageNo = 1;
			}
			$.ajax({
				type:"post",
				url:ctx+"/back/point-log/point",
				data:newParams,
				async:true,
				success:function(pointData){
					var pint=pointData.result.point.point;
					$("#paint").html(pint);            //剩余积分
					$("#paint-all").html(pointData.result.point.accrualPoint);  //累计积分
					$(".integral_item").find("#deduction").html("可抵扣"+(pint*0.01).toFixed(2)+"元");
					var obj=[];
					obj=pointData.result.pointLog.result;
					if(obj!=null&&obj.length>0){	
						
						var parameter,operation,value,channel,time,orderNo;
						
						for(var i=0;i<obj.length;i++){
						   if(obj[i].consumeChannel!=null){
								if(obj[i].consumeChannel==1){
									channel="微商城"
								}
								if(obj[i].consumeChannel==2){
									channel="店客源"
								}
								if(obj[i].consumeChannel==3){
									channel="创客源 "
								}
								if(obj[i].consumeChannel==4){
									channel="创客链接"
								}
								if(obj[i].consumeChannel==5){
									channel="数据中心"
								}
						   }else{
							   channel="-"
						   }
							if(obj[i].operation==true){
								operation='累计';
								value="+"+obj[i].value;
							}else{
								operation='抵扣';
								value="-"+obj[i].value;
							}	
							
							if(obj[i].value==0){
								value=0;
							}
							
							if(i==0){
								parameter="<tr><td>";
							}else{
								parameter=parameter+"<tr><td>";
							}
							
							time=obj[i].createTime+"";
							time=time.substr(0, 4) + "-" + time.substr(4, 2) + "-"+ time.substr(6, 2)+" "+time.substr(8, 2)+":"+time.substr(10, 2)+":"+time.substr(12, 2);
							orderNo=obj[i].orderNo;
							if(orderNo==null){
								orderNo="-";
							}
							parameter=parameter+time+"</td><td>"+orderNo+"</td>"+"<td>"+operation+"</td><td>"+channel+"</td><td>"
							  +value+"</td></tr>";
							
						}
						$(".integral_item").find("#userIntList").html(parameter);
						CreatePager(pageSize,pageNo,pointData.result.pointLog.totalCount,1,"userIntTable");
					}else{
	        			$(".integral_item").find("#userIntList").html("<tr><td colspan='12'>暂无数据</td></tr>");
	        			CreatePager(pageSize,pageNo,0,1,"userIntTable");
	        		} 
					
				}
			});
			
			$(".d_item.integral_item").show();
		}
		
		//优惠券
		function getCouponPage(pageNo){
			var couponName =$("#couponName").val();
			var sptr='%';
			while (couponName.indexOf(sptr) >= 0){
				couponName = couponName.replace(sptr, '#-');
            }
			
			var status =$("#coupon_status").val();
			var customerId= $("#customerId").val();
			var startTime=$("#con_uptimeStart").val();
			var endTime=$("#con_uptimeEnd").val();
			if(!pageNo){
				pageNo = 1;
			}
			var newParams = {status:status,pageNo:pageNo,pageSize:pageSize,name:couponName,startTime:startTime,endTime:endTime}
			$.ajax({
				type:"post",
				url:ctx+"/back/customer-detail/coupon-list/"+customerId,
				data:newParams,
				async:true,
				success:function(data){
					$("#receivedCount").html(data.receivedCount);
		        	$("#spendCount").html(data.spendCount);
		        	$("#usableCount").html(data.usableCount);
		        	
		        	var obj=data.page.result;
		        	if(obj.length>0){
		        		var status,time,orderNo;
						for(var i=0;i<obj.length;i++){
							
							if(obj[i].status==1){
								status="已领取";
							}else if(obj[i].status==2){
								status="已失效";
							}else if(obj[i].status==3){
								status="已核销";
							}
							time=obj[i].closeTime;
						//	time =time.substr(0, 4) + "-" + time.substr(4, 2) + "-"+ time.substr(6, 2);
							
							var a = time+"";
        					time = a.substring(0,4)+"-"+a.substring(4,6)
        					+"-"+a.substring(6,8)
        					+" "+a.substring(8,10)
        					+":"+a.substring(10,12)
        					+":"+a.substring(12,14);
        					
        					orderNo=obj[i].orderNo;
							if(orderNo=="0"){
								orderNo="-";
							}
     
							if(i==0){
								parameter="<tr><td>";
							}else{
								parameter=parameter+"<tr><td>";
							}
							parameter=parameter+obj[i].title+"</td><td>"+status+"</td>"+"<td>"+time+"</td><td>"+orderNo+"</td></tr>";
						}
						var totalCount=data.page.totalCount;
						CreatePager(pageSize,pageNo,totalCount,1,"userCouTable");
	        			$(".coupon_item").find("#userCouList").html(parameter);
		        	}else{
		        		$(".coupon_item").find("#userCouList").html("<tr><td colspan='12'>暂无数据</td></tr>");
		        		CreatePager(pageSize,pageNo,0,1,"userCouTable");
		        	}
	        		
				}
			});
			$(".d_item.coupon_item").show();
		}
		/*搜索相关事件 start*/
		// 搜索会员消费列表
		$("#search_consume_btn").on("click",function(){
			var channel = $("#regist_type option:selected").val();
			var startTime = $("#consume_timeStart").val();
			var endTime = $("#consume_timeEnd").val();
			initUserList(1, channel, startTime, endTime);
		});
		// 搜索会员积分列表
		$("#search_int_btn").on("click",function(){
			
			getPoint(1);
		});
		// 搜索会员优惠券列表
		$("#search_coupon_btn").on("click",function(){
			getCouponPage(1);
		});
		
		//enter键搜索
		$("body").on("keypress","#couponName",function(e){
			var keywhich = (event.keyCode? event.keyCode:event.which);
			if(keywhich == 13){
				event.preventDefault();
				getCouponPage(1);
			}
		});
		
		// 初始化日期控件
		$(".time-input").datetimepicker({
	        dateFormat: "yy-mm-dd",
	        showTimepicker:false,
		    autoclose: true,
	        changeYear:true,
	        changeMonth: true,
	        yearRange: "-50:+50",
		});
		$("#member_birth").datetimepicker({
			dateFormat:"yy-mm-dd",
			showTimepicker:false,
		    autoclose: true,
		    yearRange: "-100:+0",
		    changeYear:true,
	        changeMonth: true,
		});
		/*搜索相关事件 end*/
		$(".u_nav_list .u_nav_item").on("click",function(){
			var curItem = $(this);
			if($(this).hasClass("active")){
				return;
			}else{
				$(".u_nav_list .u_nav_item").removeClass( "active");
				$(this).addClass("active");
				//消费
				$(".d_item").hide();
				if($(this).hasClass("consume")){
					$(".d_item.consume_item").show();
					initUserList(1,"","","");
				}
				//积分
				if($(this).hasClass("integral")){
					getPoint();
				}
				//优惠券
				if($(this).hasClass("coupon")){
					getCouponPage();
				}
			}
		});
		
		//输入页数，跳转到某一页
		$("body").on("keypress",".go_page",function(event){
			var pageNo = $(this).val();
			var curTableId = $(this).closest(".table-panel").find("table").attr("id");
			if(event.keyCode == "13"){
				if(pageNo != ""){
					if(pageNo == 0){
						pageNo = 1;
					}
					if(curTableId == "userListTable"){ //消费
						var channel = $("#regist_type option:selected").val();
						var startTime = $("#consume_timeStart").val();
						var endTime = $("#consume_timeEnd").val();
						initUserList(pageNo,channel,startTime,endTime);
						
					} else if(curTableId == "userIntTable"){//积分
						getPoint(pageNo);
						
					} else if(curTableId == "userCouTable"){//优惠券
						getCouponPage(pageNo);
					}
					
					
				};
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
    		var curTableId = $(this).closest(".table-panel").find("table").attr("id");
    		if(curTableId == "userListTable"){ //消费
				var channel = $("#regist_type option:selected").val();
				var startTime = $("#consume_timeStart").val();
				var endTime = $("#consume_timeEnd").val();
				initUserList(goPageNum,channel,startTime,endTime);
			} else if(curTableId == "userIntTable"){//积分
				getPoint(goPageNum);
			} else if(curTableId == "userCouTable"){//优惠券
				getCouponPage(goPageNum);
			}
    	});
		//直接选择页数
		$("body").on("click","#page_div li a",function(){
			var pageNo = $(this).attr("curPage");
			var curTableId = $(this).closest(".table-panel").find("table").attr("id");
			if(curTableId == "userListTable"){ //消费
				var channel = $("#regist_type option:selected").val();
				var startTime = $("#consume_timeStart").val();
				var endTime = $("#consume_timeEnd").val();
				initUserList(pageNo,channel,startTime,endTime);
			} else if(curTableId == "userIntTable"){//积分
				getPoint(pageNo);
			} else if(curTableId == "userCouTable"){//优惠券
				getCouponPage(pageNo);
			}
		});
		
	});
})(jQuery)
