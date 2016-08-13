(function($){
	// 初始化日期控件
	$("#member_birth").datetimepicker({
		dateFormat:"yy-mm-dd",
		showTimepicker:false,
	    autoclose: true,
	    yearRange: "-100:+0",
	    changeYear:true,
        changeMonth: true,
	});
	$(".time-input").datetimepicker({
        dateFormat: "yy-mm-dd",
        showTimepicker:false,
	    autoclose: true,
        changeYear:true,
        changeMonth: true,
        yearRange: "-50:+50",
	});
	// 初始化城市选择
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
	$("body").on("click", "input[type='reset']", function() {
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
	//确认添加会员
	$("#addUserBtn").on("click",function(){
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
		
		$("#city_val").val(code);
		//性别选择
		$("#gender_val").val($(".genderType:checked").val());
		$('.genderType').removeAttr('name');
		//拼接数据
		var form_param1 = $("#addUserForm").serializeObject();//form serialize
		var defaultPropform = $("#defaultPropform").serializeObject();//form serialize
		var defaultPropformRemark = $("#defaultPropformRemark").serializeObject();
		var form_param;
		form_param = $.extend({},form_param1,defaultPropform,defaultPropformRemark);
		var customPropList = [];
		$('.custom-props').each(function(index,obj){
			var customProp =   {
				storePropId: $(this).attr('data-storePropId'),
	        };
			if($(this).attr('data-type')=='input'){
				if($(this).attr('data-subType')=='date'){
					if($(this).find('.time-input').val()!=''){
						customProp.value = $(this).find('.time-input').val().replace(/-/g,'')+'000000';	
						customPropList.push(customProp);
					}
				}
				if($(this).attr('data-subType')=='mail'|| $(this).attr('data-subType')=='text'){
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
		var mem_mobile= $("input[name='username']").val();
		var customer_id= $("input[name='customerId']").val();
		var store_id = $("#regist_store").val();
		var regist_store = $("#storeName").val();
			var request_url = '';
			var tit_content = '';
			var tel=/^1\d{10}$/;
			var mem_mail;
			var email=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
			if(customer_id){
				if(store_id==-1){
					$.toast("请选择注册门店222", 1500);
					return false;
				}
				request_url = ctx + "/back/customer/update"
				tit_content = '完善信息失败';
			}else{
				if(mem_mobile == ""){
					$.toast("请填写会员手机号", 1500);
					return false;
				} else{
					if(!tel.test(mem_mobile)){
						$.toast("请输入正确的手机号", 1500);
						return false;
					}
				}
				if(store_id==-1){
					$.toast("请选择注册门店333", 1500);
					return false;
				}
				
				$('.custom-props').each(function(index,obj){
					if($(this).attr('data-subType')=='mail'){
						mem_mail = $(this).find('.custom-prop-value').val()
					}
				})	
				if(code !=0 && code.length<6){
					$.toast("请选择完整的城市", 1500);
					return false;
				}
				if(mem_mail && !email.test(mem_mail)){
						$.toast("请输入正确的邮箱", 1500);
						return false;
				}
				request_url = ctx + "/back/customer/save"
				tit_content = '注册失败';
			}
		 
			$.ajax({
				type:"post",
				url: request_url,
				data:JSON.stringify(newParams),
				async:true,
				contentType:'application/json',
				dataType:'json',
				success:function(result){
					// 添加成功
					$("#user_done_modal .modal-body").slimscroll({
				       height: "250px",
					});
					//后台返回相应的result标志，msg信息：已注册
					if(result.code == 0){ // 注册成功
						var cust = result.result;
						$("#user_done_modal").attr("data-backdrop", "static");
						if(customer_id){
							$("#user_done_modal").find(".modal-body-con h3").html("完善会员信息成功！");
						}else{
							$("#user_done_modal").find(".modal-body-con h3").html("成功为【"+ regist_store +"】创建一名新会员！");
							$("#user_done_modal").find(".modal-body-con .men_mobile").html(cust.phone);
							$("#user_done_modal").find(".modal-body-con .mem_NO").html(cust.customerId);
						}
						$("#user_done_modal").modal("show");
						$('.genderType').prop('name',"genderType");
					} else if(result.code == 11010){
						$.toast(result.message, 1500);
					}else{
						$.toast(tit_content, 1500);
					}
				}
			});
 	});
	// 继续添加会员
	$("body").on("click","#con_add_btn",function(){
		window.location.href= ctx + "/back/customer/create";
	});
	// 查看会员列表
	$("body").on("click","#view_memList_btn",function(){
		window.location.href= ctx + "/back/customer/list"; 
	});
	//重置
	$('input[type="reset"]').on("click",function(){
		document.getElementById("addUserForm").reset();
		document.getElementById("defaultPropform").reset();
		document.getElementById("defaultPropformRemark").reset();
		$('.custom-props').find('input').val('');
		$('.custom-props').find('input[type="radio"]').removeAttr('checked');
	});
})(jQuery);
