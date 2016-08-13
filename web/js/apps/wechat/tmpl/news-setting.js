$(function(){
	//开关状态初始化
	var switchStatus = [];
	$('.switch-status').each(function(i,obj){
		if($(obj).val()=='true'){
			$(obj).next('.data-switch').prop('checked', 'checked');
		}
	})
	/*保存设置*/
	$('body').on('click','#save-btn',function(){
		var data=[];
		$('.data-switch').each(function(i,obj){
			data.push({"openStatus":$(obj).prop('checked'),"type":$(obj).parents('.news-notice').children('.type-id').val()});
		})
		$.ajax({
	        url: ctx + '/back/wechat/tmpl/save',
	        type: 'post',
	        async: false,
	        data: JSON.stringify(data),
	        dataType:'json',
	        contentType: "application/json",
	        error: function() {
	            $.toast('连接异常',1500);
	          },
	        success: function(result, textStatus) {
	            if (textStatus == "success") {
	            	$.toast('保存成功',1500);
	              setTimeout(function(){
	            	  window.location.href=ctx+'/back/wechat/tmpl/index';
	              },1000);
	            }
	        }
		})
	})
});
