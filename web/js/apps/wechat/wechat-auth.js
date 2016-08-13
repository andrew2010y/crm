(function($){
	/*解除绑定弹出层*/
	$('body').on('click', '#wechat-unbind', function(){
			$('#add_new_modal .modal-body').slimscroll({
		        height: '300px',
			});
			$('#add_new_modal').modal('show');
	});
	/*勾选切换*/
	$('#chioce-btn').on('click',function(){
		if($(this).prop('checked')==true){
			$('#btn-unblind').removeAttr('disabled');
		}else{
			$('#btn-unblind').attr('disabled','disabled');
		}
	})
	/*弹出层解除绑定按钮*/
	$('#btn-unblind').on('click',function(){
		$.ajax({//微信解绑是否成功
			type : 'POST',
		    asyn:false,
		   	url : ctx + '/back/wechat/unbind',
			success:function(result){
				if(result.code==0){//成功解绑
					$.toast('解绑成功',1500);
					/*跳转到未绑定页面*/
					window.location.reload();
				}else{//解绑失败
					$.toast(result.message,1500);
				}
			}
		});
	})
	/*重新授权弹出层*/
	$('body').on('click', '#re-allow', function(){
			$('#re_allow_modal .modal-body').slimscroll({
		        height: '250px',
			});
			$('#re_allow_modal').modal('show');
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
})(jQuery);
