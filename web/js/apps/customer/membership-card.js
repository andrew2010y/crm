(function($){
	if(openStatus == 0 || openStatus=='undefined'){
		$(".async-wechat").prop("disabled","disabled");
	}
	$(function(){
		var colorVal = $(".sele-color-val").val();
		var colorInput = $(".diy-color-input");
		for(var i = 0; i<BIGAKA.ColorList.length; i++){
			if(colorVal == BIGAKA.ColorList[i].color){
				var str = '<span class="sel_color_span" data-id="'+BIGAKA.ColorList[i].colorVal+'" style="background: '+ BIGAKA.ColorList[i].colorVal+'" data-type="'+BIGAKA.ColorList[i].color+'"></span>';
				$(".sele_color_div").html(str);
				$(".sele_color_div").css({
				    "left": colorInput.position().left,
				    "top":  colorInput.position().top,
				    "margin-left": "0px"
				});
				$(".member_card_top").css("background-color",BIGAKA.ColorList[i].colorVal);
			}
		}
		$("#sendCouponForm").find("input[type='radio'][name='officialAccountsShowStatus']").on("click",function(){
			if($("#sendCouponForm").find("input[type='radio'][name='officialAccountsShowStatus']:checked").val()==1){
				$(".app-field-row.officialAccountsShowStatus").show();
			}else{
				$(".app-field-row.officialAccountsShowStatus").hide();
			}
		})
		$("#sendCouponForm").find("input[type='radio'][name='mallUrlShowStatus']").on("click",function(){
			if($("#sendCouponForm").find("input[type='radio'][name='mallUrlShowStatus']:checked").val()==1){
				$(".app-field-row.mallUrlShowStatus").show();
			}else{
				$(".app-field-row.mallUrlShowStatus").hide();
			}
		})
		$("#sendCouponForm").find("input[type='radio'][name='personalCenterShowStatus']").on("click",function(){
			if($("#sendCouponForm").find("input[type='radio'][name='personalCenterShowStatus']:checked").val()==1){
				$(".app-field-row.personalCenterShowStatus").show();
			}else{
				$(".app-field-row.personalCenterShowStatus").hide();
			}
		})
		$("#mallUrlName").on("keyup",function(){
			$(".mallUrlNameText").text($(this).val());
		});	
		//编辑 保存
		$("body").on("click",".edit-save",function(){
			//可编辑
			if($(this).hasClass("btn-edit")){
				$(this).siblings('.cansel-btn-page').show();
				$(this).removeClass("btn-edit");
				$(this).addClass("btn-save");
				$(this).html("保存");
				$("#sendCouponForm").find('input[readonly],textarea[readonly]').removeAttr("readonly");
				$(".diy_input").prop("readonly","readonly").addClass("h-border");
				$("#sendCouponForm").find("input[type='radio']").removeAttr("disabled");
				if(openStatus==0){//微信配置未开启
					$("#sendCouponForm").find("input[type='radio'][name='officialAccountsShowStatus']").attr('disabled',true);
				}
				if($("#synchro").val() != 1 && openStatus != 0){//未完成微信配置不能勾选，已经勾选了不能取消勾选
					$('#synchroCheck').removeAttr('disabled');
				}
				return;
				//$("#sendCouponForm").find('select[disabled]').removeProp("disabled");
			}
			
			//可保存
			if($(this).hasClass("btn-save")){
				if(!validateForm()){
					$.toast("请填写正确的信息",1500);
					return false;
				} else{
					var reviewStatus=$('#reviewStatus').text();
					var synchroStatus=$('#synchroCheck').prop('checked');
					//$.trim(reviewStatus)=="未创建" &&
					if(synchroStatus){
						$('#num-modal').modal('show');
					}else{
						saveMemberShip();
					}
				}
			}
		});
		
	});
	
	$("body").on("click",".dialog-chanel",function(){
		$('#num-modal').modal('hide');
	});
	
	$("body").on("click",".dialog-save",function(){
		saveMemberShip();
	});
	
	function saveMemberShip(){
		if($('#synchroCheck').prop('checked') && !$('#barCode').prop('checked') && !$('#QrCode').prop('checked')){
			$.toast("请选择会员卡的展示形式",1500);
			return;
		}else{
			var checkedVal = $("input[name='codeTypeRadio']:checked").val();
			$("#codeType").val(checkedVal);
		}
		//提交信息
		if($("#synchroCheck").prop("checked")){
			$("#synchro").val("1");
		}else {
			$("#synchro").val("0");
		}
		if($(".data-switch").prop("checked")){
			$("#cardOpenStatus").val('1');
		}else{
			$("#cardOpenStatus").val('0');
		}
		var form_param = $("#sendCouponForm").serialize();//form serialize
		$.ajax({
			url:ctx+"/back/member-ship-card/save",
			type:"post",
			async:false,
			data:form_param,
			dataType:"json",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(data){
	        	if(data.code==0){
	        		$('#num-modal').modal('hide');
	        		$.toast("保存成功",1500);
		        	$("#membershipCardId").val(data.result);
	        	}else{
	        		$.toast(data.message,1500);
	        	}
	        }
		});
		$(".edit-save").siblings('.cansel-btn-page').hide();
		$(".edit-save").removeClass("btn-save");
		$(".edit-save").addClass("btn-edit");
		$(".edit-save").html("编辑");
		$("#sendCouponForm").find('input').prop("readonly","readonly");
		$(".diy_input").removeClass("h-border");
		$("#sendCouponForm").find('textarea').prop("readonly", "readonly");
		$("#sendCouponForm").find("input[type='checkbox']").prop("disabled","disabled");
	}
	
	function validateForm(){
		var flag = true;
		$(".validate-item").each(function(i,v){
			if($(v).hasClass("sele-color-val")){
				if(!$(v).validateEle_text()){
					$(".error_message").css({
						"left": ($(".diy-color-input").position().left + 350),
						"top": $(".diy-color-input").position().top
					});
					flag = false;
					return false;
				}
			} else{
				if(!$(v).validateEle_text()){
					flag = false;
					return false;
				}
			}
		});
		return flag;
	}
})(jQuery);
//会员卡开关方法
var notChechOpen=false;//切换开关状态时会触发change事件，需要定义一个flag来阻止
function isOpenCard(target){
	if(notChechOpen){
		notChechOpen=false;
		return false;
	}
	if($(target).prop("checked")){//打开开关
		if($('#membershipCardId').val()==""){
			$.toast('请先完善会员卡信息',1500);
			notChechOpen=true;
			$(target).bootstrapSwitch('toggleState');
			return false;
		}
		$(target).val('1');
		//开启会员卡ajax
		$.ajax({
			url:ctx+"/back/member-ship-card/open-or-close",
			type:"post",
			async:false,
			dataType : "json",
			data:{'openStatus':true},
			timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(data){
	        	$.toast(data.message,1500);
	        	if(!data.result){//切换失败还原状态
	        		notChechOpen=true;
	    			$(target).bootstrapSwitch('toggleState');
	    			$(target).val('0');
	        	}
	        }
		});
		
	}else{//关闭开关
		notChechOpen=true;
		$(target).bootstrapSwitch('toggleState');
		jconfirm('您正在关闭您的会员卡配置，关闭会员卡配置后会员将无法使用会员卡，若您的会员卡信息已同步至微信卡包，微信中的同步信息也将会被删除，请谨慎操作！',function(){
			//关闭会员卡ajax
			$.ajax({
				url:ctx+"/back/member-ship-card/open-or-close",
				type:"post",
				async:false,
				dataType : "json",
				data:{'openStatus':false},
				timeout: 8000,
		        error: function(){
		        	$.toast("连接异常",1500);
		        },
		        success: function(data){
		        	if(data.result){//切换成功
			        	notChechOpen=true;
						$(target).bootstrapSwitch('toggleState');
						$(target).val('0');
		        	}
		        	$.toast(data.message,1500);
		        }
			});
		})
	}
}
