(function($){
	/*编辑按钮*/
	$('.head-edit-btn').on('click',function(){
		$(this).hide();
		$('.head-operate-btn').show();
		$('.unedit-box').hide();
		$('.edit-box').show();
	})
	/*取消按钮*/
	$('#head-cancel-btn').on('click',function(){
		window.location.reload();
	})
	/*保存弹出层*/
	$('body').on('click', '#head-save-btn', function(){
		$('#save_modal .modal-body').slimscroll({
		       height: '250px',
		});
		$('#save_modal').modal('show');
	});
	//点击一行选中
	$(".edit-box").on("click","tr",function(event){
		if(!$(event.target).hasClass("user_check")){
			$(this).find(".user_check").click();
		}
	})
	/*添加 修改 弹出层*/
	$('#stateEditBtn').on('click',function(){
		$('#stateEdit_modal .modal-body').slimscroll({
	        height: '350px',
		});
		$('#stateEdit_modal').modal('show');
		$('textarea').text($(this).parent('td').find('span').text().replace(/\|/g,'\n'));
	})
	//输出弹出层确定按钮此版本写固定的
	$('body').on('click', '#edit-save-btn', function(){
		var textContent=$.trim($('#editTextarea').val()).replace(/\n/g,'|');
		var textContentLen=textContent.split('|').length;
		if(textContentLen>5){
			$('.edit-modal-tip').show();
			return false;
		}else{
			$('.edit-modal-tip').hide();
			$('#stateEdit_modal').modal('hide');
		}
		if(textContent){
			$('#unusedTable .stateValue').text(textContent);
			$('#stateEditBtn').text('修改');
		}else{
			$('#unusedTable .stateValue').text(textContent);
			$('#stateEditBtn').text('添加');
		}
	})
	//初始化按钮状态
	if($('#unusedTable').find('input[type=checkbox]').length==0){
		$('#upBtn').prop('disabled','disabled');
	}
	if($('#usingTable').find('input[type=checkbox]').length==0){
		$('#downBtn').prop('disabled','disabled');
	}
	//点击上移
	moveBtn('#upBtn','#unusedTable','#usingTable');
	//点击下移
	moveBtn('#downBtn','#usingTable','#unusedTable');
	function moveBtn(btn,obj,target){
		$('body').on('click', btn, function(){
			if($(obj).find('input[type=checkbox]:checked').length==0){
				$.toast('请选择需要移动的行',1000);
			}
			$.each($(obj).find('input[type=checkbox]'),function(){
				if($(this).is(':checked')){
					var trContent="<tr>"+ $(this).parents('tr').html()+"</tr>";
					//未填写输入内容项
					if($(this).parents('tr').find('span').text()==''){
						$.toast('请填写输入内容项',1500);
					}else{
						$(target).find('tbody').append(trContent);
						$(this).parents('tr').remove();
					}
				}
			})
			if($('#unusedTable').find('input[type=checkbox]').length==0){
				$('#upBtn').prop('disabled','disabled');
				$('#downBtn').removeAttr('disabled');
			}else{
				$('#upBtn').removeAttr('disabled');
			}
			if($('#usingTable').find('input[type=checkbox]').length==0){
				$('#downBtn').prop('disabled','disabled');
				$('#upBtn').removeAttr('disabled');
			}else{
				$('#downBtn').removeAttr('disabled');
			}
			$('#usingTable').find('a').hide();
			$('#unusedTable').find('a').show();
			$('#stateEditBtn').on('click',function(){
				$('#stateEdit_modal .modal-body').slimscroll({
			        height: '300px',
				});
				$('#stateEdit_modal').modal('show');
				$('textarea').text($(this).parent('td').find('span').text().replace(/\|/g,'\n'));
			})
		})
	}
})(jQuery);
//保存设置
function save(e) { 
  e.preventDefault();
  /*获取默认字段*/
  var usingDefaultProp=[];
  $('#usingTable .label-name').each(function(i,obj){
	  usingDefaultProp.push($(obj).val());
  })
  var unusedDefaultProp=[];
   $('#unusedTable .label-name').each(function(i,obj){
	   unusedDefaultProp.push($(obj).val());
   })
   /*获取自定义字段id*/
   var usingCustomProp=[];
    $('#usingTable .storePropId').each(function(i,obj){
    	if($(obj).parents('tr').find('.edit-value').length >0){
    		var data= {
                    "storePropId": $(obj).val(),
                    "value": $(obj).parents('tr').find('.edit-value').text().replace(/\|/g,',')
                };
    	}else{
    		var data= {
                    "storePropId": $(obj).val()
                };
    	}
    	usingCustomProp.push(data);
    })
    var unusedCustomProp=[];
    $('#unusedTable .storePropId').each(function(i,obj){
    	if($(obj).parents('tr').find('.edit-value').length >0){
    		var data= {
                    "storePropId": $(obj).val(),
                    "value": $(obj).parents('tr').find('.edit-value').text().replace(/\|/g,',')
                };
    	}else{
    		var data= {
                    "storePropId": $(obj).val()
                };
    	}
    	unusedCustomProp.push(data);
    })
  var saveJson={
		    "using": {
		        "defaultProp": usingDefaultProp,
		        "customProp": usingCustomProp
		    },
		    "unused": {
		        "defaultProp":unusedDefaultProp,
		        "customProp": unusedCustomProp
		    }
		}
      $.ajax({
    	  //提交地址
        url: ctx + "/back/form-store-prop/edit",
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
