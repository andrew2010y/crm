(function($){
	/*一键授权按钮弹出层*/
	$('body').on('click', '#wechat-allow,#wechat-allow-btn,#allow-flew', function(){
			$('#wechat-allow-modal .modal-body').slimscroll({
		        height: '250px',
			});
			$('#wechat-allow-modal').modal('show');
	});
	/*授权成功按钮*/
	$('#allow-success').on('click',function(){
		$.ajax({//微信授权是否成功
			type : 'POST',
		   	url : ctx +'/back/wechat/check-auth',
			success:function(result){
				if(result.code==0){//成功授权
					$.toast('授权成功',1500);
					window.location.reload();
				}else{
					$.toast('您未完成公众号授权，请重试或直接联系舞象客服',1500);
				}
			},
			error: function(){
				$.toast('授权失败',1500);
		     }
		});
	})
	/*老用户微信授权弹出层*/
	$('#user-allow-modal .modal-body').slimscroll({
        height: '250px',
	});
	$('#user-allow-modal').modal('show');
	/*马上授权按钮*/
	$('#allow-flew').on('click',function(){
		window.open(ctx+'/back/wechat/go-author','_blank');
	})
})(jQuery);
