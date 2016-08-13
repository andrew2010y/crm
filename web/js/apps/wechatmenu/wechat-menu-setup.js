(function($){
	$.ajax({//微信配置是否开启
		type : "POST",
	    asyn:false,
	   	url : ctx + "/back/social-setting/get-status",
	   	dataType : "json", // 返回数据形式为json
		success:function(result){
			console.log(result.result)
			if(result.result==0){//未开启
				$("#wechat_config_status").addClass("text-red").removeClass("text-green").html("未完成");
				window.settingStatus=0;
			}else if(result.result==1){//已开启
				$("#wechat_config_status").addClass("text-green").removeClass("text-red").html("已完成");
				window.settingStatus=1;
			}
			$(".btn-save,.btn-enableSort").show();
		}
	});
	//点击菜单排序
	$(".btn-enableSort").on("click",function(){
		if($(this).hasClass("btn-sortOk")){//排序完成
			$(this).removeClass("btn-sortOk");
			$(".first-menu-ul").removeClass("ui-sortable");
			$(".sub-menu-ul").removeClass("ui-sortable");
			$(".btn-save,.app-sidebar").show();
			$(".first-menu-ul.ui-sortable,.sub-menu-ul.ui-sortable").removeClass("ui-sortable");
			$(".first-menu-ul .b-menu-item").removeClass("sortable ui-sortable-handle")
			$(this).html("菜单排序");
		}else if($(".first-menu-ul .parent-menu-item ").length >0){//开启排序
			$(".btn-save,.app-sidebar").hide();
			$(".bottom-field ul li.b-menu-item").each(function(i,v){
				if(!$(v).hasClass("add-menu")){
					$(v).addClass("sortable");
				}
			});
			$(".first-menu-ul").addClass("ui-sortable");
			$(".sub-menu-ul").addClass("ui-sortable");
			$(this).html("排序完成");
			$(this).addClass("btn-sortOk")
			/*排序*/
			//主菜单排序
			$(".bottom-field .first-menu-ul.ui-sortable").sortable({
				items: "li.parent-menu-item:not(.add-menu)",
				axis:"x",
				stop:function(ev){
				}
			});
			//子菜单排序
			$('.bottom-field .sub-menu-ul.ui-sortable').sortable({
				axis:"y",
				items: "li.b-menu-item:not(.add-menu)",
				stop:function(ev){
				}
			});
			
			return;
		} else{
			$.toast("您还没有添加任何菜单，请添加菜单后，再选择菜单排序", 1500);
		}
	});
	
	//check form表单数据
	function validateForm(){
		var flag = true;
		$("body #wechat-menu-form").find("input[data-type*='require']").each(function(i,v){
			if(!$(v).validateEle_sprite()){
				flag = false;
				var error_menuid=$(v).parents(".right-m-item").attr("data-menuid");
				var error_parentid=$(v).parents(".right-m-item").attr("data-parentid");
				if(error_parentid){
					$(".b-menu-item[data-menuid="+error_parentid+"]").click();
					$(".b-menu-item[data-parentid="+error_parentid+"][data-menuid="+error_menuid+"]").click();
				}else{
					$(".b-menu-item[data-menuid="+error_menuid+"]").click();
				}
				return flag;
			}
		});
		return flag;
	}
	
	
	
	//编辑或者保存发布
	$("body").on("click",".btn-save",function(ev){
		ev.stopPropagation();
		var code;
		var $_this=$(this);
		if(settingStatus==0){
			$.toast("请先前往微信配置，配置完成基础信息后，进行菜单配置", 1500);
			return false;
		}
		if($("li.parent-menu-item:not(.add-menu)").length==0){
			$.toast("您还没有添加任何菜单", 1500);
			return false;
		}
		if(validateForm()){
			var data = '';
			$(".first-menu-ul .parent-menu-item").each(function(index,obj){//遍历一级菜单
				var menuDataStr = "";
				var menuId=$(obj).attr("data-menuid");//一级菜单id
				if($(obj).attr("data-type")==1){//如果没有子菜单
					menuDataStr+=
						'"wechatMenuId":'+$(obj).attr("data-menuid")+
						',"name":"'+$(".parent-item[data-menuid="+menuId+"]").find(".menu-title").val()+
						'","sort":'+(index+1)+
						',"url":"'+$(".parent-item[data-menuid="+menuId+"]").find(".menu-link").val()+
						'","parentId":null'+
						',"type":1~';
				}else if($(obj).attr("data-type")==0){//如果有子菜单
					menuDataStr+=
						'"wechatMenuId":'+$(obj).attr("data-menuid")+
						',"name":"'+$(".parent-item[data-menuid="+menuId+"]").find(".menu-title").val()+
						'","sort":'+(index+1)+
						',"url":null'+
						',"parentId":null'+
						',"type":0~';
					$(obj).find(".sub-menu-ul .b-menu-item").each(function(index_c,obj_c){//遍历子菜单
						if(!$(obj_c).hasClass("add-menu")){
							var menuCId=$(obj_c).attr("data-menuid");//子菜单id
							menuDataStr+=
								'"wechatMenuId":'+$(obj_c).attr("data-menuid")+
								',"name":"'+$(".child-item[data-parentid="+menuId+"][data-menuid="+menuCId+"]").find(".menu-title").val()+
								'","sort":'+index_c+
								',"url":"'+$(".child-item[data-parentid="+menuId+"][data-menuid="+menuCId+"]").find(".menu-link").val()+
								'","parentId":'+menuId+
								',"type":1~';
						}
					});
				}
				data += menuDataStr;
			})
			
			$_this.attr("disabled",true);
			$_this.text("保存中");
			$.ajax({
				type : "POST",
			    asyn:false,
			   	url : ctx + "/back/wechat-menu/update",
			   	data:{"menu":data},
			   	dataType : "json", // 返回数据形式为json
				success:function(result){
					code = result.code;
					if(code==0){
						 setTimeout(function () { 
							  window.location.reload();//刷新当前页面
						    }, 2000);
					}
					$.toast(result.message, 1500);
					$_this.removeAttr("disabled");
					$_this.text("保存并发布");
				},
				error:function(){
					$.toast("保存失败", 1500);
					$_this.removeAttr("disabled");
					$_this.text("保存并发布");
				}
			});
		}
	});
	//点击左侧菜单
	$("body").on("click", ".b-menu-item", function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		var curUl = $(this).closest("ul");
		var parentId=$(this).parents("ul").attr("data-parentid");
		//添加菜单
		if($(this).hasClass("add-menu")){
			var $_this=$(this);
			if($(".btn-enableSort").hasClass("btn-sortOk")){//正在排序中
				$.toast("请完成排序后再新增菜单", 1500);
				return false;
			}
			if($_this.parent().hasClass("sub-menu-ul")){//添加子菜单
				var parentId=$_this.parent().attr("data-parentid");
				var subMenuId=2000;
				if($_this.siblings().length>0){
					$_this.siblings().each(function(i,v){
						if(parseInt($(v).attr("data-menuid"))>subMenuId)
							subMenuId=parseInt($(v).attr("data-menuid"));
					})
				}
				subMenuId++;
				//菜单html
				var subMenuItem='<li class="b-menu-item enabled" data-parentid="'+parentId+'" data-type="1" data-menuid="'+subMenuId+'"><span class="menu-text">菜单名称</span></li>'
				$_this.after(subMenuItem);//添加子菜单到页面上
				//菜单编辑html
				var subMenuInput=
					'<div class="child-item right-m-item" data-parentid="'+parentId+'" data-menuid="'+subMenuId+'" style="display:block;">'+
						'<div class="control-group">'+
							'<label class="control-label">菜单名称：</label>'+
							'<div class="controls">'+
								'<input type="text" id="menu-title" class="form-control menu-title validate-item" data-type="require"  placeholder="菜单名称" data-inputtype="bytelimit" data-bytelimit="16" >'+
							'</div>'+
							'<p class="control-tips">菜单名称长度不超过8个汉字或16个字母</p>'+
						'</div>'+
						'<div class="control-group">'+
							'<label class="control-label">菜单链接：</label>'+
							'<div class="controls">'+
								'<input type="text" id="menu-link" class="form-control validate-item menu-link" data-type="require,url" value="" placeholder="菜单链接" >'+
							'</div>'+
						'</div>'+
					'</div>';
				$(".right-item[data-menuid="+parentId+"] .right-m-item").hide();//隐藏其他的编辑栏
				$(".right-item[data-menuid="+parentId+"]").append(subMenuInput);//根据parentid拼接到对应的右侧编辑栏位置
				$(".b-menu-item[data-menuid="+parentId+"]").attr("data-type", 0);//修改对应的一级菜单状态为有子菜单
				if($(".b-menu-item[data-menuid="+parentId+"] .sub-menu-ul .b-menu-item:not(.add-menu)").length>=5)
					$(".b-menu-item[data-menuid="+parentId+"] .sub-menu-ul .b-menu-item.add-menu").hide();
				$_this.next().click();
			}else if($_this.parent().hasClass("first-menu-ul")){//添加主菜单
				var subMenuId=1000;
				if($_this.siblings().length>0){
					$(".parent-menu-item").each(function(i,v){
						if($(v).attr("data-menuid")&&parseInt($(v).attr("data-menuid"))>subMenuId)
							subMenuId=parseInt($(v).attr("data-menuid"));
					})
				}
				subMenuId++;
				//菜单html
				var subMenuItem=
					'<i class="p-icon"></i><span class="menu-text first-menu-text">菜单名称</span>'+
					'<div class="sub-menu-div">'+
						'<div class="arrow"></div>'+
						'<ul class="sub-menu-ul" data-parentid="'+subMenuId+'">'+
							'<li class="b-menu-item enabled add-menu"></li>'+
						'</ul>'+
					'</div>';
				$_this.attr("data-menuid",subMenuId).attr("data-type",1).removeClass("add-menu").html(subMenuItem);//添加菜单到页面上
				//菜单编辑html
				var subMenuInput=
					'<div class="right-item" data-menuid="'+ subMenuId +'" style="display:block;">'+
						'<div class="parent-item right-m-item" data-menuid="'+subMenuId+'" style="display:block;">'+
							'<p class="item-tips">已添加子菜单，仅可设置菜单名称。</p>'+
							'<div class="control-group">'+
								'<label class="control-label">菜单名称：</label>'+
								'<div class="controls">'+
									'<input type="text" id="menu-title" class="form-control menu-title validate-item" data-type="require"  placeholder="菜单名称" data-inputtype="bytelimit" data-bytelimit="8">'+
								'</div> '+
								'<p class="control-tips">菜单名称长度不超过4个汉字或8个字母</p>'+
							'</div>'+
							'<div class="control-group menu-link-div">'+
								'<label class="control-label">菜单链接：</label>'+
								'<div class="controls">'+
									'<input type="text" id="menu-link" class="form-control menu-link validate-item" data-type="require,url" value="" placeholder="菜单链接" >'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
				$(".right-items .right-item").hide();
				$(".right-items").append(subMenuInput);
				$_this.click();
			}
		} else{//选中菜单
			$(".right-items .right-item").hide();
			//主菜单
			if(curUl.hasClass("first-menu-ul")){
				
				var cType = $(this).attr("data-type");
				var cMenuId = $(this).attr("data-menuid");
				
				var curRight = $(".right-items .right-item[data-menuid='"+cMenuId+"']");
				if(cType == 0){ //有子菜单
					curRight.find(".parent-item .item-tips").show();
					curRight.find(".parent-item .menu-link-div").hide();
					curRight.find(".parent-item .menu-link-div .menu-link").val("").removeAttr("data-type");
					//curRight.find(".parent-item .menu-link-div").find(".menu-link").val("");
				} else if(cType == 1){ // 无子菜单
					curRight.find(".parent-item .item-tips").hide();
					curRight.find(".parent-item .menu-link-div").show();
					curRight.find(".parent-item .menu-link-div .menu-link").attr("data-type","require,url");
				}
				curRight.find(".child-item").hide();
				$(".sub-menu-div").hide();
				$(this).find(".sub-menu-div").show();
				curRight.find(".parent-item").show();
				curRight.show();
				
			} else if(curUl.hasClass("sub-menu-ul")){ //子菜单
				var cSort = $(this).attr("data-sort");
				var cMenuId = $(this).attr("data-menuid");
				
				var parentLi = curUl.closest("li.b-menu-item"); //主菜单对象
				var pType = parentLi.attr("data-type"); // 主菜单的type
				var pSort  = parentLi.attr("data-sort"); // 主菜单的排序值
				var pMenuId = parentLi.attr("data-menuid"); // 主菜单的MenuId
				
				var curRight = $(".right-items .right-item[data-menuid='"+pMenuId+"']");
				curRight.find(".parent-item").hide();
				curRight.find(".child-item").hide();
				curRight.find(".child-item[data-menuid='"+cMenuId+"']").show();
				curRight.show();
			}
			if(!pMenuId)
				pMenuId="";
			$("body .delete-m-btn").attr("data-menuid", cMenuId).attr("data-parentid",pMenuId).show();
			$(".b-menu-item.selected").removeClass("selected");
			$(this).addClass("selected");
		}
	});
	
	
	//修改菜单标题
	$("body").on("blur",".menu-title",function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		$(this).val($.trim($(this).val()));
		var curVal = $(this).val();
		if(curVal != ""){
			var menuId=$(this).parents(".right-m-item").attr("data-menuid");
			var parentId=$(this).parents(".right-item").attr("data-menuid")
			if(menuId==parentId)
				$(".b-menu-item[data-menuid="+menuId+"]>.menu-text").text(curVal);
			else
			$(".b-menu-item[data-parentid="+parentId+"][data-menuid="+menuId+"]>.menu-text").text(curVal);
		}
	});
	
	//删除菜单
	$("body").on("click",".delete-m-btn",function(){
		var menuId = $(this).attr("data-menuid");
		var parentId=$(this).attr("data-parentid");
		$.wxConfirm("您确定要删除该菜单吗？",function(){
			if(menuId&&parentId&&menuId!=parentId){//删除子菜单
				$(".sub-menu-ul .b-menu-item[data-parentid="+parentId+"][data-menuid="+menuId+"]").remove();//删除菜单项
				$(".child-item[data-parentid="+parentId+"][data-menuid="+menuId+"]").remove();//删除菜单的编辑栏
				//如果没有了子菜单
				if($(".parent-menu-item[data-menuid="+parentId+"] .sub-menu-ul .b-menu-item").length==1){
					$(".parent-menu-item[data-menuid="+parentId+"]").click();//选中一级菜单
					$(".parent-menu-item[data-menuid="+parentId+"]").attr("data-type",1);//修改一级菜单是否有子菜单的状态
					var curRight = $(".right-items .right-item[data-menuid='"+parentId+"']");//显示一级菜单的url输入框
					curRight.find(".parent-item .item-tips").hide();
					curRight.find(".parent-item .menu-link-div").show();
					curRight.find(".parent-item .menu-link-div .menu-link").attr("data-type","require,url");
				}else{
					$(".parent-menu-item[data-menuid="+parentId+"] .sub-menu-ul .b-menu-item").last().click();//选中最底下的同级菜单
				}
				$(".b-menu-item[data-menuid="+parentId+"] .sub-menu-ul .b-menu-item.add-menu").show();
			}else{//删除一级菜单
				$(".parent-menu-item[data-menuid="+menuId+"]").html("").removeAttr("data-type").removeAttr("data-menuid").removeAttr("data-parentid").addClass("add-menu");
				$(".right-item[data-menuid="+menuId+"]").remove();
				if($("li.parent-menu-item:not(.add-menu)").length>0)
					$("li.parent-menu-item:not(.add-menu)").eq(0).click()
				else
					$(".parent-menu-item").removeClass("selected");
			}
		});
	});
	
})(jQuery);
