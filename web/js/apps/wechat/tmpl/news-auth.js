(function($){
	/*模板图片hove显示*/
	$('.news-mode-list-content').hover(function(){
		$(this).children('.news-mode-list-pic').show();
	},function(){
		$(this).children('.news-mode-list-pic').hide();
	})
	/*立即配置按钮*/
	$('body').on('click','#news-setting-btn', function(){
		$.ajax({
	        url: ctx + '/back/wechat/tmpl/check',
	        type: 'post',
	        async: false,
	        error: function() {
	            $.toast('连接异常',1500);
	          },
	          success: function(result) {
	            if (result.code == 0) {
	              setTimeout(function(){
	            	  window.location.href=ctx+'/back/wechat/tmpl/to-setting';
	              },1000);
	            }else{
	            	$('#news-setting-modal .modal-body').slimscroll({
	        	        height: '250px',
	        		});
	        		$('#news-setting-modal').modal('show');
	            }
	          }
		})
	})
	/*关闭配置弹出层*/
	$('body').on('click', '#close-set', function(){
			$('#close-set-modal .modal-body').slimscroll({
		        height: '250px',
			});
			$('#close-set-modal').modal('show');
	});
	/*checkbox切换*/
	$('#chioce-btn').on('click',function(){
		if($(this).prop('checked')==true){
			$('#close-set-btn').removeAttr('disabled');
		}else{
			$('#close-set-btn').attr('disabled','disabled');
		}
	})
	/*关闭配置按钮*/
	$('body').on('click', '#close-set-btn', function(){
		$.ajax({
	        url: ctx + '/back/wechat/tmpl/on-off?state=0',
	        type: 'post',
	        async: false,
	        error: function() {
	            $.toast('连接异常',1500);
	          },
	          success: function(result, textStatus) {
	            if (textStatus == "success") {
	            	$.toast('保存成功',1500);
	              setTimeout(function(){
	            	  window.location.reload();
	              },1000);
	            }
	          }
		})
		
	})
})(jQuery);
