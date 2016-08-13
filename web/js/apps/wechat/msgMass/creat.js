(function($){
	// 素材弹出层
	$('body').on('click', '#addModelBtn', function(){
		$('.box-mask span').text('选择素材');
		$("#add_modal .modal-body").slimscroll({
	        height: "470px",
		});
		$("#add_modal").modal("show");
	})	
	//全体推送
	var allTagIds=[];
	var allTagIdsNum;
			$('.tag-id').each(function(){
				var allTagId=$(this).val();
				allTagIds.push(allTagId);
			})
	$.ajax({
			url:ctx+"/back/wechat/msg-mass/tag-count",
			type:"POST",
			async: false,
			data:JSON.stringify(allTagIds),
			contentType: "application/json",
			timeout: 8000,
			error: function(){
			    $.toast("连接异常",1500);
			},
			success: function(data){
			     if(data.code==0){
			    	 allTagIdsNum=data.result;
			        $('.send-range-setting-total').find('.num').html(data.result); 
			        $('.send-range-setting-total').show();
			      }
			 }
	});
			
			
			var $container = $('#masonry');
	        $container.masonry({
	                itemSelector: '.box',
	                columnWidth: 272,
	                isAnimated: true,
	            });
		//显示素材列表
		var pageNo=1;
		var pageSize=20;
		$.ajax({
			url:ctx+"/back/wechat/msg-mass/materials-data?pageNo="+pageNo+"&pageSize="+pageSize,
			type:"POST",
			async: false,
			dataType:"html",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        timeout: 8000,
	        error: function(){
	        	$.toast("连接异常",1500);
	        },
	        success: function(data,textStatus){
	        	$('#addNewsContent').hideLoading();
	        	var totalCount = parseInt($($(data)[0]).attr("data-totalCount"));
	        	$("#addNewsContent").html(data);
	        }
		});
	
		//选择素材
		$('.list-box').hover(function(){
			$(this).find('.box-mask').show();
		},function(){
			$(this).find('.box-mask').hide();
		});
		$('.list-box').on('click',function(){
			var mediaId=$(this).find('.media-id').val();
			var content=$(this).clone();
			$('.add-material').hide();
			$('#material').html('').append(content);
			$('.box-mask span').text('替换素材');
			$('.box-mask').hide();
			$('#add_modal').modal('hide');
		})
		//替换素材遮罩层
		$('#material').hover(function(){
			$('.box-mask').show();
		},function(){
			$('.box-mask').hide();
		})
		
		
		
		
		
	//推送弹出层
	$('body').on('click', '#sendBtn', function(){
		if($.trim($('#sendnewsscope').val()).length==0){
			$.toast('请输入推送标题', 1500);
			return false;
		}
		if($('#material').html()==''){
			$.toast('请选择推送素材', 1500);
			return false;
		}
		var sendLastContent=$('#material').html();
		$('.box-mask').hide();
		$("#sendLastContent").html('').append(sendLastContent);
		$('.number').text($('.send-range-setting-total .num').text());
		$("#send_modal .modal-body").slimscroll({
	        height: "450px",
		});
		$("#send_modal").modal("show");
	})
	
	
	//推送范围选择
	function sendScope(){
		if($('#partSend').prop('checked')){
			$(".tags-box").show();
			tagsTotalNum();
		}else{
			$(".tags-box").hide();
			$('.send-range-setting-total').find('.num').html(allTagIdsNum); 
		}
	}
	sendScope();
	$('.send-range-setting').find('input[type="radio"]').on('click',function(){
		sendScope();
	});
	//推送范围选择标签
	$('.tags-box .tag').on('click',function(){ 
		if($(this).children('span').hasClass('checked-label-span')){
			$(this).children('span').removeClass('checked-label-span').addClass('unchecked-label-span');
		}else{
			$(this).children('span').removeClass('unchecked-label-span').addClass('checked-label-span');
		}
		$('.send-range-setting-total').hide();
		$('.counting').show();
	})
	//选中标签统计人数
	function tagsTotalNum(){
			var tagIds=[];
			$('.checked-label-span').each(function(){
				var tagId=$(this).prev('.tag-id').val();
				tagIds.push(tagId);
			})
			if(tagIds.length==0){
				/*$.toast("推送范围不能为空",1500);*/
        		$('.counting').hide();
        		$('.send-range-setting-total').find('.num').html('0');
        		$('.send-range-setting-total').show();
				return false;
			}else{
				$.ajax({
					url:ctx+"/back/wechat/msg-mass/tag-count",
					type:"POST",
					async: false,
					data:JSON.stringify(tagIds),
					contentType: "application/json",
			        timeout: 8000,
			        error: function(){
			        	$.toast("连接异常",1500);
			        },
			        success: function(data){
			        	if(data.code==0){
			        		$('.send-range-setting-total').find('.num').html(data.result); 
			        		$('.send-range-setting-total').show();
			        		$('.counting').hide();
			        	}
			        }
				});
			}
	}
	//2S后计算标签人数
	var timer;
	$('.tags-box span').on('mouseup',function(){
		clearTimeout(timer);
		timer = setTimeout(function(){tagsTotalNum()},2000);
	})
	//推送保存
	$('body').find('#confrimBtn').on('click',function(){
		var title=$.trim($('#sendnewsscope').val());
		var mediaId;
		if($('#material').html()!=''){
			mediaId=$('#material').find('.media-id').val();  
		}else{
			$.toast('请选择推送素材', 1500);
		}
		var scope=$('#allSend').prop('checked');
		var num=$('.num').text();
		var tagArrays=[];
		var tagId;
		var name;
		var data;
		if($('#allSend').prop('checked')){
			scope=0;
		}
		if($('#partSend').prop('checked')){
			scope=1;
		}
		$('.tags-box').find('.checked-label-span').each(function(i,obj){
			tagId=$(this).prev('.tag-id').val();
			name=$(this).text();
			tagArrays.push({tagId:tagId,name:name});
		})
		data={	title:title,
				mediaId:mediaId,
				scope:scope,
				tagArrays:tagArrays
			}
		$.ajax({
			type : 'POST',
			data:JSON.stringify(data),
			contentType:'application/json',
		   	url : ctx +'/back/wechat/msg-mass/save',
			success:function(result){
				if(result.code==0){//成功推送
					$.toast('推送成功',1500);
					window.location.href=ctx+"/back/wechat/msg-mass/list";
				}else if(result.code==46001){
					$.toast("推送用户不能少于一人",1500);
				}
			},
			error: function(){
				$.toast('推送失败',1500);
		     }
		});
	})
	
	

	
	
})(jQuery)

/*$(document).ready(function(){
    var $container = $('#addNewsContent');    
    $container.imagesLoaded(function(){
        $container.masonry({
            itemSelector: '.list-box',
            columnWidth: 5 //每两列之间的间隙为5像素
        });
    });
    
});*/

