$(function(){
	//编辑状态
	$('#points-edit-btn').on('click',function(){
		$(this).hide();
		$('#points-edit').show();
		$('.point-give input[type="text"]').removeAttr('readonly');
		$('.point-give input[type="checkbox"]').bootstrapSwitch('toggleDisabled');
	})
	//取消按钮
	$('#points-cancel').on('click',function(){
		/*刷新页面*/
		window.location.reload();
	})
})
//保存设置
function save(e) { 
  e.preventDefault();
  //注册
  if ($("#registerPointsBtn").prop("checked") == true) {
	  var num = $("#register-points").val();
	  if(num.length == 0){
		  $.toast('请设置积分数',1500);
		  return false;
	  }
    $("#registerPointsStatus").val("1");
  } else {
    $("#registerPointsStatus").val("0");
  }
  //关注公众号
  if ($("#followPointsBtn").prop("checked") == true) {
	  var num = $("#follow-points").val();
	  if(num.length == 0){
		  $.toast('请设置积分数',1500);
		  return false;
	  }
    $("#followPointsStatus").val("1");
  } else {
    $("#followPointsStatus").val("0");
  }
  //绑定微信
  if ($("#bindwxPointsBtn").prop("checked") == true) {
	  var num = $("#bindwx-points").val();
	  if(num.length == 0){
		  $.toast('请设置积分数',1500);
		  return false;
	  }
    $("#bindwxPointsStatus").val("1");
  } else {
    $("#bindwxPointsStatus").val("0");
  }
  //消费   
  if ($("#spendPointsBtn").prop("checked") == true) {
	  var num = $("#spend-points").val();
	  if(num.length == 0){
		  $.toast('请设置积分数',1500);
		  return false;
	  }
	    $("#spendPointsStatus").val("1");
  } else {
	    $("#spendPointsStatus").val("0");
  }
  // 完善信息
  if ($("#infoPointsBtn").prop("checked") == true) {
	  var num = $("#info-points").val();
	  if(num.length == 0){
		  $.toast('请设置积分数',1500);
		  return false;
	  }
	    $("#infoPointsStatus").val("1");
  } else {
	    $("#infoPointsStatus").val("0");
  }
  if ($(".error").length > 0) {
	  $.toast("请填写正确的积分设置信息",1000);
    return false;
  } else {
    var saveJson =[
                   {
                	"pointSettingId":$('#pointSettingId0').val(),
                	"state":$('#registerPointsStatus').val(),
                	"point":$('#register-points').val(),
       				"channel":0,
       				"operation":1,
                   },
                   {
                	"pointSettingId":$('#pointSettingId1').val(),
                   	"state":$('#followPointsStatus').val(),
                   	"point":$('#follow-points').val(),   
       				"channel":1,
       				"operation":1,
                   },
                   {
                	"pointSettingId":$('#pointSettingId2').val(),
                   	"state":$('#bindwxPointsStatus').val(),
                   	"point":$('#bindwx-points').val(),
       				"channel":2,
       				"operation":1,
                   },
                   {	
                	"pointSettingId":$('#pointSettingId3').val(),
                   	"state":$('#spendPointsStatus').val(),
                   	"point":$('#spend-points').val(),
          			"channel":3,
          			"operation":1,
                   },
                   {	
                	"pointSettingId":$('#pointSettingId4').val(),
                   	"state":$('#infoPointsStatus').val(),
                   	"point":$('#info-points').val(),
          			"channel":4,
          			"operation":1,
                   }
               ];
      $.ajax({
    	  //提交地址
        url: ctx + "/back/store-point-setting/save",
        type: "post",
        async: false,
        data: JSON.stringify(saveJson),
        dataType: "json",
        contentType: "application/json",
        timeout: 30000,
        error: function() {
        	$.toast("连接异常",1500);
        },
        success: function(result, textStatus) {
           if (textStatus == "success") {
        	   $.toast("保存成功",1500);
                setTimeout(function(){
                	window.location.reload();
                },1000);
            }
        }
      });
  }
}
//按钮切换
//注册
function zuBtn() {
	var num = $("#register-points").val();
	if ($("#registerPointsBtn").prop("checked") == true){
		if(num.length == 0){
			$.toast('请设置积分数',1500);
			$("#registerPointsBtn").bootstrapSwitch('toggleState');
			return false;
		}
	}
}
//关注公众号
function guBtn() {
	var num = $("#follow-points").val();
	var  wechatStatus = $("#wechatStatus").val();
	if ($("#followPointsBtn").prop("checked") == true){
		//微信未授权
		if(wechatStatus!= 'true'){
			$("#followPointsBtn").bootstrapSwitch('toggleState');
			$.toast('对不起，您的公众号未完成授权，无法获取微信相关信息',1500);
			return false;
		}
		if(num.length == 0){
			$("#followPointsBtn").bootstrapSwitch('toggleState');
			$.toast('请设置积分数',1500);
			return false;
		 }
	}
}
//绑定微信
function baBtn() {
	var num = $("#bindwx-points").val();
	var  wechatStatus = $("#wechatStatus").val();
	if ($("#bindwxPointsBtn").prop("checked") == true){
		//微信未授权
		if(wechatStatus!= 'true'){
			$("#bindwxPointsBtn").bootstrapSwitch('toggleState');
			$.toast('对不起，您的公众号未完成授权，无法获取微信相关信息',1500);
			return false;
		}
		if(num.length == 0){
			$("#bindwxPointsBtn").bootstrapSwitch('toggleState');
			$.toast('请设置积分数',1500);
			return false;
		 }
	}
}
//消费      
function xiBtn() {
	var num = $("#spend-points").val();
	if ($("#spendPointsBtn").prop("checked") == true){
		if(num > 9999 || num.length == 0){
			$.toast('请设置积分数',1500);
			$("#spendPointsBtn").bootstrapSwitch('toggleState');
			return false;
		 }
	}
}
//完善信息
function waBtn() {
	var num = $("#info-points").val();
	if ($("#infoPointsBtn").prop("checked") == true){
		if(num.length == 0){
			$.toast('请设置积分数',1500);
			$("#infoPointsBtn").bootstrapSwitch('toggleState');
			return false;
		 }
	}
}
$(function() {
  //开关状态初始化
  var registerPointsStatus = $("#registerPointsStatus").val();
  if (registerPointsStatus == 1) {
    $("#registerPointsBtn").prop("checked", "checked");
  }
  var followPointsStatus = $("#followPointsStatus").val();
  if (followPointsStatus == 1) {
    $("#followPointsBtn").prop("checked", "checked");
  }
  var bindwxPointsStatus = $("#bindwxPointsStatus").val();
  if (bindwxPointsStatus == 1) {
    $("#bindwxPointsBtn").prop("checked", "checked");
  }
  var spendPointsStatus = $("#spendPointsStatus").val();
  if (spendPointsStatus == 1) {
    $("#spendPointsBtn").prop("checked", "checked");
  } 
  var infoPointsStatus = $("#infoPointsStatus").val();
  if (infoPointsStatus == 1) {
    $("#infoPointsBtn").prop("checked", "checked");
  }
});



