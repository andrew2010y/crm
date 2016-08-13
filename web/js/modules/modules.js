 /*
	作者：835710406@qq.com
	时间：2015-11-20
	描述：
		封装的方法；统一放在全局变量BIGAKA.Module中。
		jquery扩展的方法。
		全局的变量；正则表达式等。
*/
(function($){
	window.BIGAKA=window.BIGAKA||{};//初始化BIGAKA
	// 初始化js验证的正则表达式
	BIGAKA.RegExp = {
		EMAIL:new RegExp("^[a-z0-9._%-]+@([a-z0-9-]+\\.)+[a-z]{2,4}$"),
		NUMBER: new RegExp("^\\-?\\d+(\\.\\d+)?$"),
		URL: new RegExp("^((http|ftp|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?"),
		//URL:new RegExp("^(http|https|ftp)\\:\\/\\/[a-z0-9\\-\\.]+\\.[a-z]{2,3}(:[a-z0-9]*)?\\/?([a-z0-9\\-\\._\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$"),
		MOBILE:new RegExp("^1\\d{10}$"),
		ZIPCODE:new RegExp("^\\d{6}$"),
		INT:new RegExp("^[0-9]+$"),
		FLOAT: new RegExp("^\\d+(\\.\\d{1,2})?$")//浮点数。最多两位小数
	};
	BIGAKA.ValiPrompt={
		radio: "请选择一个选项",
		checkbox: "请选择一个选项",
		select: "请选择列表中的一项",
		email: "电子邮件地址不正确",
		url:"链接格式不正确",
		tel: "手机号码不正确",
		empty: "请填写此字段",
		int: "请输入正整数",
		float: "最多两位小数位",
		price: "最多不能超过一亿"
	};
	BIGAKA.location="";
	BIGAKA.Module={
		setCookie: function(name, value, exptime) {
            var now = new Date();
            var time = now.getTime();
            time += 1000*60*60*exptime;
            now.setTime(time);
            document.cookie = name+'='+value+';path='+ctx+'/;expires='+now.toUTCString();
        },
        getCookie: function (name){
            var cArr=document.cookie.split('; ');
            for(var i=0;i<cArr.length;i++){
                var cArr2=cArr[i].split('=');
                if(cArr2[0]==name){
                    return cArr2[1];
                }
            }
            return '';
        },
        removeCookie:function (name){
            WX.cookieMod.setCookie(name, 1, -9);
        },
        checkState:function(data){
        	if(data.code == '-5'){
        		BIGAKA.location = data.result;
        		return true;
        	}else{
        		return false;
        	}
        }
	}
	
	//colorList
	BIGAKA.ColorList =[
		{
			colorVal: "#63b359",
			color:"Color010"
		},
		{
			colorVal: "#2C9F67",
			color:"Color020"
		},
		{
			colorVal: "#509FC9",
			color:"Color030"
		},
		{
			colorVal: "#5885CF",
			color:"Color040"
		},
		{
			colorVal: "#9062C0",
			color:"Color050"
		},
		{
			colorVal: "#D09A45",
			color:"Color060"
		},
		{
			colorVal: "#E4B138",
			color:"Color070"
		},
		{
			colorVal: "#EE903C",
			color:"Color080"
		},
		{
			colorVal: "#DD6549",
			color:"Color090"
		},
		{
			colorVal: "#CC463D",
			color:"Color100"
		},
		{
			colorVal: "#cf3e36",
			color:"Color101"
		},
		{
			colorVal: "#5E6671",
			color:"Color102"
		}
	];
	BIGAKA.HashMap = function(){  
	    //定义长度  
	    var length = 0;  
	    //创建一个对象  
	    var obj = new Object();  
	  
	    /** 
	    * 判断Map是否为空 
	    */  
	    this.isEmpty = function(){  
	        return length == 0;  
	    };  
	  
	    /** 
	    * 判断对象中是否包含给定Key 
	    */  
	    this.containsKey=function(key){  
	        return (key in obj);  
	    };  
	  
	    /** 
	    * 判断对象中是否包含给定的Value 
	    */  
	    this.containsValue=function(value){  
	        for(var key in obj){  
	            if(obj[key] == value){  
	                return true;  
	            }  
	        }  
	        return false;  
	    };
	    
	  /**
	   *  判断对象中的value是否含有某个关键字
	   *  value
	   */
	   this.containsSomeValue=function(value){  
	        for(var key in obj){  
	            if(obj[key].indexOf(value) >= 0){  
	                return true;  
	            }  
	        }  
	        return false;  
	    };  
	    /** 
	    *向map中添加数据 
	    */  
	    this.put=function(key,value){  
	        if(!this.containsKey(key)){  
	            length++;  
	        }  
	        obj[key] = value;  
	    };  
	  
	    /** 
	    * 根据给定的Key获得Value 
	    */  
	    this.get=function(key){  
	        return this.containsKey(key)?obj[key]:null;  
	    };  
	  
	    /** 
	    * 根据给定的Key删除一个值 
	    */  
	    this.remove=function(key){  
	        if(this.containsKey(key)&&(delete obj[key])){  
	            length--;  
	        }  
	    };  
	  
	    /** 
	    * 获得Map中的所有Value 
	    */  
	    this.values=function(){  
	        var _values= new Array();  
	        for(var key in obj){  
	            _values.push(obj[key]);  
	        }  
	        return _values;  
	    };  
	  
	    /** 
	    * 获得Map中的所有Key 
	    */  
	    this.keySet=function(){  
	        var _keys = new Array();  
	        for(var key in obj){  
	            _keys.push(key);  
	        }  
	        return _keys;  
	    };  
	  
	    /** 
	    * 获得Map的长度 
	    */  
	    this.size = function(){  
	        return length;  
	    };  
	  
	    /** 
	    * 清空Map 
	    */  
	    this.clear = function(){  
	        length = 0;  
	        obj = new Object();  
	    };  
	};
	BIGAKA.SubStoreMap = new BIGAKA.HashMap();
	/*
	 * 获取门店列表
	 */
	function getSubStore(){
		var token = BIGAKA.Module.getCookie("token");
		var getSubUrl = $("#substore-url").val();
		var oriParams,params = "";
		if($(".sub-store-input").length > 0){
			var $_this = $($(".sub-store-input")[0]);
			//getSubUrl = $_this.attr("data-url");
			
			if($_this.attr("data-param")){
				oriParams=JSON.parse($_this.attr("data-param"));
				 for (var key in oriParams)
				    {
					 params += "&"+key+"="+oriParams[key];
				    }
			}
			//var keyVal = $_this.val();
			if(params != ""){
				params = params = params.substring(1);
				//params = params + "&keyVal="+keyVal;
				params = params + "&keyVal=";
			} else{
				//params = "keyVal="+keyVal
				params = "keyVal=";
			}

			//console.log("getSubUrl=="+getSubUrl+"aa");
			//console.log("params=="+params);
			//console.log(getSubUrl+"?"+params);
			// jsonp 需要定义callback函数，在后台action中需要先用request.getParameter("jsonpCallbackFun")。然后再将其返回，data作为参数
			/*if(getSubUrl!=null&&getSubUrl!=""){
				$.ajax({
					url: getSubUrl+"?"+params,
					type: "get",
					async:false,
					dataType: "jsonp",
					jsonp: "jsonpCallbackFun",
					success: function(data){
							if(data.result!=null){
								if(data.result.length > 0){
									for(var i = 0; i<data.result.length; i++){
										BIGAKA.SubStoreMap.put(data.result[i].id,data.result[i].shortName);
									}
								}
							}

							if(data.result.length == 0){
								sessionStorage.setItem("subStore", "[]");
							}
					},
					error: function(data){
						$.toast("网络异常",1500);
					}
				});
			}*/

		}
	}
	//如果获取门店的input存在，就获取子门店信息
	//if($(".sub-store-input").length > 0){
	$(function(){
		getSubStore();
	})
	//}
	/*
	 * jQuery showLoading plugin v1.0
	 * 给div增加loading效果
	 * Dual licensed under the MIT and GPL licenses.
	 */
	jQuery.fn.showLoading = function(options) {
	    var indicatorID;
	    var settings = {
	        'addClass': '',
	        'beforeShow': '',
	        'afterShow': '',
	        'hPos': 'center',
	        'vPos': 'center',
	        'indicatorZIndex': 5001,
	        'overlayZIndex': 5000,
	        'parent': '',
	        'marginTop': 0,
	        'marginLeft': 0,
	        'overlayWidth': 1078,
	        'overlayHeight': null,
	        'left':15
	    };
	    jQuery.extend(settings, options);
	    var loadingDiv = jQuery('<div></div>');
	    var overlayDiv = jQuery('<div></div>');
	    if (settings.indicatorID) {
	        indicatorID = settings.indicatorID;
	    } else {
	        indicatorID = jQuery(this).attr('id');
	    }
	    jQuery(loadingDiv).attr('id', 'loading-indicator-' + indicatorID);
	    jQuery(loadingDiv).addClass('loading-indicator');
	    if (settings.addClass) {
	        jQuery(loadingDiv).addClass(settings.addClass);
	    }
	    jQuery(overlayDiv).css('display', 'none');
	    jQuery(document.body).append(overlayDiv);
	    jQuery(overlayDiv).attr('id', 'loading-indicator-' + indicatorID + '-overlay');
	    jQuery(overlayDiv).addClass('loading-indicator-overlay');
	    if (settings.addClass) {
	        jQuery(overlayDiv).addClass(settings.addClass + '-overlay');
	    }
	    var overlay_width;
	    var overlay_height;
	    var border_top_width = jQuery(this).css('border-top-width');
	    var border_left_width = jQuery(this).css('border-left-width');
	    border_top_width = isNaN(parseInt(border_top_width)) ? 0 : border_top_width;
	    border_left_width = isNaN(parseInt(border_left_width)) ? 0 : border_left_width;
	    var overlay_left_pos = jQuery(this).offset().left + parseInt(border_left_width)-settings.left;
	    var overlay_top_pos = jQuery(this).offset().top + parseInt(border_top_width);
	    if (settings.overlayWidth !== null) {
	        overlay_width = settings.overlayWidth;
	    } else {
	        overlay_width = parseInt(jQuery(this).width()) + parseInt(jQuery(this).css('padding-right')) + parseInt(jQuery(this).css('padding-left'));
	    }
	    if (settings.overlayHeight !== null) {
	        overlay_height = settings.overlayWidth;
	    } else {
	        overlay_height = parseInt(jQuery(this).height()) + parseInt(jQuery(this).css('padding-top')) + parseInt(jQuery(this).css('padding-bottom')) + 100;
	    }
	    jQuery(overlayDiv).css('width', overlay_width.toString() + 'px');
	    jQuery(overlayDiv).css('height', overlay_height.toString() + 'px');
	    jQuery(overlayDiv).css('left', overlay_left_pos.toString() + 'px');
	    jQuery(overlayDiv).css('position', 'absolute');
	    jQuery(overlayDiv).css('top', overlay_top_pos.toString() + 'px');
	    jQuery(overlayDiv).css('z-index', '998');
	    if (settings.overlayCSS) {
	        jQuery(overlayDiv).css(settings.overlayCSS);
	    }
	    jQuery(loadingDiv).css('display', 'none');
	    jQuery(document.body).append(loadingDiv);
	    jQuery(loadingDiv).css('position', 'absolute');
	    jQuery(loadingDiv).css('z-index', '999');
	    var indicatorTop = overlay_top_pos;
	    if (settings.marginTop) {
	        indicatorTop += parseInt(settings.marginTop);
	    }
	    var indicatorLeft = overlay_left_pos;
	    if (settings.marginLeft) {
	        indicatorLeft += parseInt(settings.marginTop);
	    }
	    if (settings.hPos.toString().toLowerCase() == 'center') {
	        jQuery(loadingDiv).css('left', (indicatorLeft + ((jQuery(overlayDiv).width() - parseInt(jQuery(loadingDiv).width())) / 2)).toString() + 'px');
	    } else if (settings.hPos.toString().toLowerCase() == 'left') {
	        jQuery(loadingDiv).css('left', (indicatorLeft + parseInt(jQuery(overlayDiv).css('margin-left'))).toString() + 'px');
	    } else if (settings.hPos.toString().toLowerCase() == 'right') {
	        jQuery(loadingDiv).css('left', (indicatorLeft + (jQuery(overlayDiv).width() - parseInt(jQuery(loadingDiv).width()))).toString() + 'px');
	    } else {
	        jQuery(loadingDiv).css('left', (indicatorLeft + parseInt(settings.hPos)).toString() + 'px');
	    }
	    if (settings.vPos.toString().toLowerCase() == 'center') {
	        jQuery(loadingDiv).css('top', (indicatorTop + ((jQuery(overlayDiv).height() - parseInt(jQuery(loadingDiv).height())) / 2)).toString() + 'px');
	    } else if (settings.vPos.toString().toLowerCase() == 'top') {
	        jQuery(loadingDiv).css('top', indicatorTop.toString() + 'px');
	    } else if (settings.vPos.toString().toLowerCase() == 'bottom') {
	        jQuery(loadingDiv).css('top', (indicatorTop + (jQuery(overlayDiv).height() - parseInt(jQuery(loadingDiv).height()))).toString() + 'px');
	    } else {
	        jQuery(loadingDiv).css('top', (indicatorTop + parseInt(settings.vPos)).toString() + 'px');
	    }
	    if (settings.css) {
	        jQuery(loadingDiv).css(settings.css);
	    }
	    var callback_options = {
	        'overlay': overlayDiv,
	        'indicator': loadingDiv,
	        'element': this
	    };
	    if (typeof(settings.beforeShow) == 'function') {
	        settings.beforeShow(callback_options);
	    }
	    jQuery(overlayDiv).show();
	    jQuery(loadingDiv).show();
	    if (typeof(settings.afterShow) == 'function') {
	        settings.afterShow(callback_options);
	    }
	    return this;
	};
	jQuery.fn.hideLoading = function(options) {
	    var settings = {};
	    jQuery.extend(settings, options);
	    if (settings.indicatorID) {
	        indicatorID = settings.indicatorID;
	    } else {
	        indicatorID = jQuery(this).attr('id');
	    }
	    jQuery(document.body).find('#loading-indicator-' + indicatorID).remove();
	    jQuery(document.body).find('#loading-indicator-' + indicatorID + '-overlay').remove();
	    return this;
	};
	
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	//生成uuid
	Math.uuid = function (len, radix) {
	    var chars = CHARS, uuid = [], i;
	    radix = radix || chars.length;
	    if (len) {
	      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	    } else {
	      var r;
	      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	      uuid[14] = '4';
	      for (i = 0; i < 36; i++) {
	        if (!uuid[i]) {
	          r = 0 | Math.random()*16;
	          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	        }
	      }
	    }
	    return uuid.join('');
	};
	//系统消息
	/*
	 * 页面提示效果
	 * 使用方法：$.toast(message,time)
	 * message必填，提示的文字内容
	 * time可填，提示显示的时间
	 * */
	var isshow;
	$.toast=(function(msg,time){
		var default_time=1500;
		if(msg){
			if(isshow){
				if(time){
					if(!isNaN(time)){
						default_time=time;
					}
				}
				$("#"+isshow).stop("true");
				$("#"+isshow).find("div").html(msg);
				$("#"+isshow).animate({top:'0px',opacity: 'show'},300).delay(default_time).animate({top:'-40px',opacity: 'hide'},500,function(){$(this).remove();});
			}else{
				if(time){
					if(!isNaN(time)){
						default_time=time;
					}
				}
				var a=Math.uuid();
				isshow=a;
				$('body').append('<div class="sys_msg" id='+a+'><div>'+msg+'</div></div>');
				$("#"+a).animate({top:'0',opacity: 'show'},300).delay(default_time).animate({top:'-40px',opacity: 'hide'},500,function(){$(this).remove();isshow=null});
			}
		}
	});
	
	/*
	 * 页面提示效果
	 * 使用方法：$.wxConfirm(message,callbackFunc)
	 * message 可以为空，提示的文字内容；若为null，则提示“确认操作吗？”
	 * callbackFunc 确认的回调函数
	 * */
	//var isConfirmShow;
	var confirmStr = 	'<div class="modal fade simple-modal" id="confirm_dialog" tabindex="100" role="dialog" aria-labelledby="myConfirmLabel" aria-hidden="true">'+
						  	'<div class="modal-dialog" style="width: 350px;">'+
						  		'<div class="modal-content" style="width: 350px;;filter:Alpha(opacity=50);margin-top: 50%;">'+
							  		'<div class="modal-header">'+
								        '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
								        '<h4 class="modal-title" id="myConfirmLabel"><i class="glyphicon glyphicon-warning-sign"></i> <span id="confirm_title">确认操作吗？</span> </h4>'+
							        '</div>'+
							        '<div class="modal-footer" style="margin-top: 0px;border-top: 0px;padding: 15px 5px;text-align:center;">'+
								        '<button type="button" class="btn btn-danger" style="width: 44%;margin: 0px;display: inline-block;margin-left:3%;float:left" id="confirm_ok"> 确认 </button>'+
								        '<button type="button" class="btn btn-success" style="width: 44%;margin: 0px;display: inline-block;margin-right:3%;float:right" id="confirm_cance" data-dismiss="modal">取消</button>'+
							      	'</div>'+
						  		'</div>'+
						  	'</div>'+
						'</div>';
		$.wxConfirm = (function(msg,callback){
			$("#confirm_dialog").modal("hide");
			$("body").append(confirmStr);
			var confirmModal = $("#confirm_dialog");
			if($(".modal").length>0){
				confirmModal.css("z-index","1050");
			}
        	if(null==msg){msg="确认操作吗？"}else{confirmModal.find("#confirm_title").html(msg)};
        	confirmModal.attr("data-backdrop", "static");
        	confirmModal.modal("show");
        	confirmModal.find("#confirm_ok").unbind();
        	confirmModal.find("#confirm_ok").click( function() {
        		confirmModal.modal("hide");
        		if(callback)callback(true);
        	})
      	});
      	
      	/*
		 * input focus 检索所有，输入内容，根据内容检索，显示结果为list
		 * 使用方法：在需要检索的input中，class添加diy_input
		 * 			如果是标签的话，class添加label_input
		 * 后台返回数据格式：
		 * */
		var diy_input={
			delete_icon:'<i class="fa fa-fw fa-times clear_diyinput_value" style="display: none;position: absolute;width:0;height:0;"></i>',
			result_list:'<div class="result_list" style="position: absolute;display:none;z-index:1050;box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5)">'+
                            '<div class="list-group" style="overflow-x: hidden;overflow-y: auto; max-height: 200px;border-bottom: 1px solid #ddd;margin-bottom:0px">'+
							'</div>'+
                   		'</div>',
   			label_result_list:'<div class="result_list label_re_list" style="position: absolute;display:none;z-index:1050;box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5)">'+
		                            '<div class="list-group" style="overflow-x: hidden;overflow-y: auto; max-height: 400px;border-bottom: 1px solid #ddd;margin-bottom:0px">'+
									'</div>'+
		                   		'</div>',
		    label_input_div:'<div class="input_c_div"></div>',    
		    color_result_list:'<div class="result_list color_re_list" style="position: absolute;display:none;z-index:1050;box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5)">'+
				           		'<div class="list-group" style="overflow-x: hidden;overflow-y: auto; max-height: 400px;border-bottom: 1px solid #ddd;margin-bottom:0px">'+
								'</div>'+
					   		'</div>',
	   		color_select_div:'<div class="sele_color_div"></div>',
			skip_blur:false,
			query:function(obj){
				//$_this.attr("data-param")的格式：{"key1":"value1","key2":"value2"}
				var $_this = obj;
    			if($_this.is(":disabled") || $_this.attr("readonly")){
    				if(!$_this.hasClass("h-border")){
    					return;
    				}
				}
				var oriParams,params = "";
				if($_this.attr("data-param")){
					oriParams=JSON.parse($_this.attr("data-param"));
					 for (var key in oriParams)
					    {
						 params += "&"+key+"="+oriParams[key];
					    }
				}
				var keyVal=$_this.val();
				if(params != ""){
					params = params = params.substring(1);
					params = params + "&keyVal="+keyVal;
				} else{
					params = "keyVal="+keyVal
				}
				if($_this.prev().hasClass("label_re_list")){//加载公共标签
					$.ajax({
						dataType: "json",
						type: "post",
						async:false,
						url:ctx+"/back/tag/customer-cache-list",
				        success: function(data){
				        	// 将所有的标签放置在sessionStorage里
				        	sessionStorage.setItem('store-tagList', JSON.stringify(data));
				        }
					});
					
					var listData = JSON.parse(sessionStorage.getItem('store-tagList'));
					$_this.prev().find(".list-group").html("");
					if(keyVal == ""){ //关键字为空
						if(listData.length > 0){
							for(var i=0;i<listData.length;i++){
								if(listData[i].name=="")
									continue;
								var a='<a class="list-group-item ellipsis" style="" data-id="'+listData[i].tagId+'" data-name="'+listData[i].name+'">'+listData[i].name+'</a>';
								$_this.prev().find(".list-group").append(a);
							}
							
						} else{
							$_this.prev().find(".list-group-item").last().css("border-bottom",0);
							if(listData.length==0){
								$_this.prev().find(".list-group").append('<span style="border-radius:0;color:#B6B4AF;text-align:center;background-color:#fff;height: 30px;display: block;line-height: 30px;word-wrap:break-word;word-break:break:all; font-size:12px;"><font disabled>搜索无结果</font></span>');
							}
						}
					}else {
						if(listData.length > 0){
							var curTagList = [];
							for(var i=0;i<listData.length;i++){
								if(listData[i].name.indexOf(keyVal) >= 0){
									var a='<a class="list-group-item ellipsis" style="" data-id="'+listData[i].tagId+'" data-name="'+listData[i].name+'">'+listData[i].name+'</a>';
									$_this.prev().find(".list-group").append(a);
									curTagList.push(listData[i]);
								}
							}
							$_this.prev().find(".list-group-item").last().css("border-bottom",0);
							if(curTagList.length == 0){
								$_this.prev().find(".list-group").append('<span style="border-radius:0;color:#B6B4AF;text-align:center;background-color:#fff;height: 30px;display: block;line-height: 30px;word-wrap:break-word;word-break:break:all; font-size:12px;"><font disabled>搜索无结果</font></span>');
							}
						} else{
							$_this.prev().find(".list-group-item").last().css("border-bottom",0);
							if(listData.length==0){
								$_this.prev().find(".list-group").append('<span style="border-radius:0;color:#B6B4AF;text-align:center;background-color:#fff;height: 30px;display: block;line-height: 30px;word-wrap:break-word;word-break:break:all; font-size:12px;"><font disabled>搜索无结果</font></span>');
							}
						}
					}
					
					$_this.prev().show();
				}else if($_this.hasClass("sub-store-input")){
					var userKeys = BIGAKA.SubStoreMap.keySet();
					var storeList = JSON.parse(sessionStorage.getItem('subStore'));
					if(keyVal == ""){
						$("input[name='storeId']").val("-1");
					}
					if(document.activeElement==$_this[0]){
						$_this.prev().find(".list-group").html("");
						if(keyVal == ""){ //关键字为空
							if(!BIGAKA.SubStoreMap.isEmpty()){
								for(var i in userKeys){
									if(userKeys[i]=="")
										continue;
									var a='<a class="list-group-item" style="border-radius:0;" data-id="'+userKeys[i]+'" data-name="'+BIGAKA.SubStoreMap.get(userKeys[i])+'">'+BIGAKA.SubStoreMap.get(userKeys[i])+'</a>';
									$_this.prev().find(".list-group").append(a);
								}
								$_this.prev().find(".list-group-item").last().css("border-bottom",0);
							}
							if(BIGAKA.SubStoreMap.isEmpty()){
								$_this.prev().find(".list-group").append('<span style="border-radius:0;color:#B6B4AF;text-align:center;background-color:#fff;height: 30px;display: block;line-height: 30px;word-wrap:break-word;word-break:break:all; font-size:12px;"><font disabled>搜索无结果</font></span>');
							}
						} else{//关键字不为空
							if(!BIGAKA.SubStoreMap.isEmpty()){
								var count = 0;
								var cFlag = true;
									for(var i in userKeys){
										if(BIGAKA.SubStoreMap.get(userKeys[i]).indexOf(keyVal) >= 0){
											var a='<a class="list-group-item" style="border-radius:0;" data-id="'+userKeys[i]+'" data-name="'+BIGAKA.SubStoreMap.get(userKeys[i])+'">'+BIGAKA.SubStoreMap.get(userKeys[i])+'</a>';
											$_this.prev().find(".list-group").append(a);
											count+=1;
											//cFlag = true;
										}
										
									}
									if(count == 0){
										$_this.prev().find(".list-group").append('<span style="border-radius:0;color:#B6B4AF;text-align:center;background-color:#fff;height: 30px;display: block;line-height: 30px;word-wrap:break-word;word-break:break:all; font-size:12px;"><font disabled>搜索无结果</font></span>');
										
									}
							} else{
								$_this.prev().find(".list-group").append('<span style="border-radius:0;color:#B6B4AF;text-align:center;background-color:#fff;height: 30px;display: block;line-height: 30px;word-wrap:break-word;word-break:break:all; font-size:12px;"><font disabled>搜索无结果</font></span>');
							}
							$_this.prev().find(".list-group-item").last().css("border-bottom",0);
							
						}
						$_this.prev().show();
					}
				} else if($_this.hasClass("diy-color-input")){ //颜色
					
					$_this.prev().find(".list-group").html("");
					if(keyVal == ""){ //关键字为空
						if(BIGAKA.ColorList.length > 0){
							for(var i=0;i<BIGAKA.ColorList.length;i++){
								var a='<a class="list-group-item" style="background:'+BIGAKA.ColorList[i].colorVal+'" data-id="'+BIGAKA.ColorList[i].colorVal+'" data-type="'+BIGAKA.ColorList[i].color+'"></a>';
								$_this.prev().find(".list-group").append(a);
							}
							
						} else{
							$_this.prev().find(".list-group-item").last().css("border-bottom",0);
							if(BIGAKA.ColorList.length==0){
								$_this.prev().find(".list-group").append('<span style="border-radius:0;color:#B6B4AF;text-align:center;background-color:#fff;height: 30px;display: block;line-height: 30px;word-wrap:break-word;word-break:break:all; font-size:12px;"><font disabled>搜索无结果</font></span>');
							}
						}
					}else {
						if(BIGAKA.ColorList.length > 0){
							for(var i=0;i<BIGAKA.ColorList.length;i++){
								if(BIGAKA.ColorList[i].colorVal.toLowerCase().indexOf(keyVal.toLowerCase()) >= 0){
									var a='<a class="list-group-item" style="background:'+BIGAKA.ColorList[i].colorVal+'" data-id="'+BIGAKA.ColorList[i].colorVal+'" data-type="'+BIGAKA.ColorList[i].color+'"></a>';
									$_this.prev().find(".list-group").append(a);
								}
							}
							$_this.prev().find(".list-group-item").last().css("border-bottom",0);
							if(BIGAKA.ColorList.length == 0){
								$_this.prev().find(".list-group").append('<span style="border-radius:0;color:#B6B4AF;text-align:center;background-color:#fff;height: 30px;display: block;line-height: 30px;word-wrap:break-word;word-break:break:all; font-size:12px;"><font disabled>搜索无结果</font></span>');
							}
						} else{
							$_this.prev().find(".list-group-item").last().css("border-bottom",0);
							if(BIGAKA.ColorList.length==0){
								$_this.prev().find(".list-group").append('<span style="border-radius:0;color:#B6B4AF;text-align:center;background-color:#fff;height: 30px;display: block;line-height: 30px;word-wrap:break-word;word-break:break:all; font-size:12px;"><font disabled>搜索无结果</font></span>');
							}
						}
					}
					
					$_this.prev().show();
				}else{
					// jsonp 需要定义callback函数，在后台action中需要先用request.getParameter("jsonpCallbackFun")。然后再将其返回，data作为参数
					
					$.ajax({
						url: $_this.attr("data-url")+"?"+params,
						type: "get",
						dataType: "jsonp",
						jsonp: "jsonpCallbackFun",
						success: function(data){
							if(document.activeElement==$_this[0]){
								$_this.prev().find(".list-group").html("");
								if(data.result.length > 0){
									for(var i=0;i<data.result.length;i++){
										if(data.result[i].shortName=="")
											continue;
										var a='<a class="list-group-item" style="border-radius:0;" data-id="'+data.result[i].id+'" data-name="'+data.result[i].shortName+'">'+data.result[i].shortName+'</a>';
										$_this.prev().find(".list-group").append(a);
									}
									$_this.prev().find(".list-group-item").last().css("border-bottom",0);
								}
								
								if(data.result.length == 0){
									$_this.prev().find(".list-group").append('<span style="border-radius:0;color:#B6B4AF;text-align:center;background-color:#fff;height: 30px;display: block;line-height: 30px;word-wrap:break-word;word-break:break:all; font-size:12px;"><font disabled>搜索无结果</font></span>');
								}
								$_this.prev().show();
							}
						},
						error: function(data){
							$.toast("网络异常",1500);
						}
					});
				}
			},
			init:function(){
	    		$(".diy_input").each(function(){
    				diy_input.add_search($(this));
    				$(this).attr("autocomplete","off");
	    		});
			},
			add_search: function(obj){
				var $_this = obj;
				$_this.attr("autocomplete","off");
				if($_this.prev().hasClass("result_list")){
					$_this.prev().remove();
					$_this.next().remove();
				}
				$_this.after(diy_input.delete_icon);
				if($(obj).hasClass("label_input")){ //如果是标签
					$_this.before(diy_input.label_result_list);
					if($_this.next().next().hasClass("input_c_div")){
						
					}else{
						$_this.next().after(diy_input.label_input_div);
					}
				} else if($(obj).hasClass("diy-color-input")){ //如果是选择颜色
					$_this.before(diy_input.color_result_list);
					if($_this.next().next().hasClass("sele_color_div")){
						
					}else{
						$_this.next().after(diy_input.color_select_div);
					}

				}else {
					$_this.before(diy_input.result_list);
				}
				$_this.prev().hide();
				$_this.bind("input propertychange",function(){
		    		$(this).attr("data-id","");
		    		diy_input.query($_this);
		    	});
				$_this.next().next(".input_c_div").on("click",function(event){
					$_this.focus();
				})
				$_this.on("focus",function(){
		    		$(this).css("padding-right","32px");
		    		//$(this).next().css("display", "inline-block");
		    		$(this).next().css("display", "none");
		    		$(this).next().css("z-index","3000");
		    		$(this).next().css("left",$(this).position().left+$(this).outerWidth()-25);
		    		$(this).next().css("margin-left",$(this).css("margin-left"));
		    		$(this).next().css("top",$(this).position().top+($(this).outerHeight()-15)/2);
		    			
		    		$(this).prev().css("left",$(this).position().left);
		    		$(this).prev().css("top",$(this).position().top+$(this).outerHeight());
		    		$(this).prev().css("width",$(this).outerWidth()+"px");
		    		$(this).prev().css("margin-left",$(this).css("margin-left"));
		    		$(this).next().next('.sele_color_div,.input_c_div').css("left",$(this).position().left);
		    		$(this).next().next('.sele_color_div,.input_c_div').css("top",$(this).position().top);
		    		$(this).next().next('.sele_color_div,.input_c_div').css("margin-left",$(this).css("margin-left"));
		    		diy_input.query($(this));
		    	});
	    		$_this.prev(".result_list").on("click",".list-group-item",function(e){
	    			e.preventDefault();
	    			if($_this.prev(".result_list").hasClass("label_re_list")){ //选择标签
	    				$_this.unbind("input propertychange");
	    				var inputCDiv = $_this.next().next(".input_c_div");
	    				var inputSpan = '<div class="sel_label_item">'+
	    									'<span class="sel_label_span" data-id="'+$(this).attr("data-id")+'" data-name="'+$(this).attr("data-name")+'">'+$(this).attr("data-name")+'</span>'+
	    									'<span class="del_label_item">&times;</span>'+
	    								'</div>';
	    				var text = $(this).text();
	    				var curParentDiv = $_this.parent().find(".set_labels");
	    				var selLablesId = [];
	    				var curParDivVal;
	    				if(curParentDiv.length > 0){
	    					if(curParentDiv.val() != ""){
	    						curParDivVal = curParentDiv.val().split(",");
	    						selLablesId = curParDivVal;
	    					}
	    				}
	    				for(var i = 0; i<selLablesId.length;i++ ){
	    					if(selLablesId[i] == $(this).attr("data-id")){
	    						$(this).parents(".result_list").hide();
		    					$(this).parents(".result_list").next().next().hide();
		    					return false;
		    				}
	    				}
	    				var curWidth_before = inputCDiv.outerWidth();
	    				inputCDiv.append(inputSpan);
	    				var curWidth = inputCDiv.outerWidth();
	    				var curHeight = inputCDiv.outerHeight();
	    				if(curWidth >= $(obj).outerWidth()||curHeight >= $(obj).outerHeight()){
	    					inputCDiv.css("max-width", $(obj).outerWidth());
	    					$(obj).height(inputCDiv.height()-5);
	    				}
    					selLablesId.push($(this).attr("data-id"));
    					curParentDiv.val(selLablesId);
		    			$(this).parents(".result_list").next().attr("data-id",$(this).attr("data-id"));
		    			$(this).parents(".result_list").next().attr("data-name",$(this).attr("data-name"));
		    			$(this).parents(".result_list").next().css("padding-right","12px");
		    			$(this).parents(".result_list").hide();
		    			$(this).parents(".result_list").next().next().hide();
		    			$_this.bind("input propertychange",function(){
		    				$(this).attr("data-id","");
		    				diy_input.query($(this));
		        		});
		    			var callback=$(this).parents(".result_list").next().attr("data-callback");
		    			if(callback){
		    				eval(callback);
		    			}
	    			} else if($_this.prev(".result_list").hasClass("color_re_list")){ // 选择颜色值
	    				$_this.unbind("input propertychange");
	    				var selectCDiv = $_this.next().next(".sele_color_div");
	    				var inputSpan = '<span class="sel_color_span" data-id="'+$(this).attr("data-id")+'" style="background: '+ $(this).attr("data-id")+'" data-type="'+$(this).attr("data-type")+'"></span>';
	    				selectCDiv.empty();
	    				selectCDiv.append(inputSpan);
	    				$_this.parent().find(".sele-color-val").val($(this).attr("data-type"));
	    				$(".member_card_top").css("background-color", $(this).attr("data-id"));
		    			$(this).parents(".result_list").next().attr("data-id",$(this).attr("data-id"));
		    			$(this).parents(".result_list").next().css("padding-right","12px");
		    			$(this).parents(".result_list").hide();
		    			$(this).parents(".result_list").next().next().hide();
		    			$_this.bind("input propertychange",function(){
		    				$(this).attr("data-id","");
		    				diy_input.query($(this));
		        		});
		    			var callback=$(this).parents(".result_list").next().attr("data-callback");
		    			if(callback){
		    				eval(callback);
		    			}
	    				
	    			}else{ // 选择下拉列表中的数据
	    				$_this.unbind("input propertychange");
		    			var text = $(this).text();
		    			$(this).parents(".result_list").next().val(text);
		    			$(this).parents(".result_list").prev().val($(this).attr("data-id"));
		    			$(this).parents(".result_list").next().attr("data-id",$(this).attr("data-id"));
		    			$(this).parents(".result_list").next().attr("data-name",$(this).attr("data-name"));
		    			$(this).parents(".result_list").next().css("padding-right","12px");
		    			$(this).parents(".result_list").hide();
		    			$(this).parents(".result_list").next().next().hide();
		    			$_this.bind("input propertychange",function(){
		    				$(this).attr("data-id","");
		    				diy_input.query($(this));
		        		});
		    			var callback=$(this).parents(".result_list").next().attr("data-callback");
		    			if(callback){
		    				eval(callback);
		    			}
	    			}
	    		});
	    		$_this.prev(".result_list").on("mousedown",function(e){
	    			if(!$.contains($(this).find(".list-group")[0],e.target)){
	    				diy_input.skip_blur = true;
	    			}
	    		});
	    		$_this.prev(".result_list").on("mouseup",function(e){
	    			diy_input.skip_blur = false;
	    		});
	    		$_this.prev(".result_list").on("mouseover",".list-group-item",function(){
	    			$_this.unbind("blur");
	    		});
	    		$_this.prev(".result_list").on("mouseout",".list-group-item",function(){
	    			$_this.bind("blur",function(){
	    				if(diy_input.skip_blur){
	    					diy_input.skip_blur=false;
	    					$_this.focus();
	    					return;
	    				}
	    				$(this).css("padding-right","12px");
	    				$(this).next().hide();
	    				$(this).prev().hide();
	    			});
	    		});
	    		$_this.bind("blur",function(){
	    			if(diy_input.skip_blur){
    					diy_input.skip_blur=false;
    					$_this.focus();
    					return;
    				}
	    			$(this).css("padding-right","12px");
	    			$(this).next().hide();
	    			$(this).prev().hide();
	    		});
	    		$(".input_search").css({"cursor":"pointer"});
	    		$("body").on("click",".input_search",function(ev){
	    			ev.preventDefault();
	    			ev.stopPropagation();
	    			if($(this).next(".input_c_div")){
	    				$(this).next(".input_c_div").empty();
	    				$(this).next().next().val("");
	    				$(this).prev().attr("data-id","");
		    			diy_input.query($(this).prev());
	    			} else{
	    				$(this).prev().val("");
		    			$(this).prev().attr("data-id","");
		    			diy_input.query($(this).prev());
	    			}
	    			
	    		});
	    		$_this.next().next(".input_c_div").on("click",".del_label_item",function(ev){
	    			ev.stopPropagation();
	    			ev.preventDefault();
	    			var curItem = $(this).closest(".sel_label_item");
	    			var curId = $(this).prev().attr("data-id");
	    			var curIds =[],curIdsVal;
	    			curIdsVal = curItem.parent(".input_c_div").next().val();
	    			if(curIdsVal.indexOf(",") > 0){
	    				curIds = curIdsVal.split(",");
	    			}
	    			curIds.pop(curId);
	    			var curItemParent=curItem.parent(".input_c_div");
	    			curItemParent.next().val(curIds);
	    			curItem.remove();
	    			if(curItemParent.height()>0){
	    				$(obj).height(curItemParent.height()-5);
	    			}
	    		});
			}
	};
	$(function(){
		diy_input.init();
	});
	$.add_search=function(obj){
		diy_input.add_search(obj);
	};
	
	
	//validate默认参数
	$.default_validate_options=
	{
		window_scroll:false,//错误时是否滚动到错误元素位置
		scroll_position:200,//错误时滚动到离顶部的距离
		$_radioContainer:$(document)//容器元素
	}
	$.fn.extend({
		/*
			验证插件，可用于input，select
			使用方法：
				给需要验证的元素增加data-type属性，多个属性用逗号分隔
				require标示必填或必选
				调用$(obj).validateEle_text(options)或者$(obj).validateEle_sprite(options)验证，通过返回true，不通过返回false
				可以通过这两个方法为基础拓展表单验证，指定元素验证等方法。
		*/
		validateEle_text:function(options){//验证单个input，在input后显示错误信息
			options=$.extend($.default_validate_options,options);//合并参数
			var errorJson=$(this).validateEle(options.$_radioContainer);//验证，返回验证信息
			if(errorJson&&errorJson.errorObj){//有错误信息
				errorJson.errorObj.showError(errorJson.errorMsg);//显示错误信息
				if(options.window_scroll){//屏幕滚动到错误信息的位置
					$(window).scrollTop(errorJson.errorObj.offset().top-options.scroll_position);
				}
				return false;
			}else{
				return true;
			}
		},
		validateEle_sprite:function(options){//验证单个input，闪烁提示
			options=$.extend($.default_validate_options,options);//合并参数
			var errorJson=$(this).validateEle(options.$_radioContainer);//合并参数
			if(errorJson&&errorJson.errorObj){//有错误信息
				errorJson.errorObj.spritError();//闪烁提示
				$.toast(errorJson.errorMsg);//提示错误信息
				if(options.window_scroll){//屏幕滚动到错误信息的位置
					$(window).scrollTop(errorJson.errorObj.offset().top-options.scroll_position);
				}
				return false;
			}else{
				return true;
			}
		},
		validateEle: function($_radioContainer){//验证单个input，返回错误的对象和错误信息。如果是radio，需要传入容器$_radioContainer
			var data_type = [];
			var errorMessage="";
			if($(this).data("type")!=null)
				data_type = $(this).data("type").split(",");
			if($(this).attr("type")=="radio"&&data_type[0]=="require"){//验证radio
				var radio_name = $(this).attr("name");
				var radio_pass = false;
				$_radioContainer.find("input[name="+radio_name+"]").each(function(){
					if($(this).is(":checked")){
						radio_pass = true;
					}
				});
				if(radio_pass){
					$_radioContainer.find("input[name="+radio_name+"]").eq(0).next(".error_message").remove();
					return true;
				}else{
					if($(this).prev().is("label"))
						errorMessage="请输入"+$(this).prev("label").text().split("：")[0].replace(" ","");
					else
						errorMessage=BIGAKA.ValiPrompt.radio;
					return {errorObj:$_radioContainer.find("input[name="+radio_name+"]").eq(0).next(),errorMsg:errorMessage};
				}
			}
			if($(this).is("select")&&data_type[0]=="require"){//必选的select
				if($(this).val()==""||$(this).val()=="-1"){
					if($(this).prev().is("label"))
						errorMessage="请输入"+$(this).prev("label").text().split("：")[0].replace(" ","");
					else
						errorMessage=BIGAKA.ValiPrompt.select;
					return {errorObj:$(this),errorMsg:errorMessage};;
				}else
					return true;
			}
			if(data_type[0]=="require"){//验证非空
				if($.trim($(this).val())==""){
					if($(this).prev().is("label"))
						errorMessage="请输入"+$(this).prev("label").text().split("：")[0].replace(" ","");
					else
						errorMessage=BIGAKA.ValiPrompt.empty;
					return {errorObj:$(this),errorMsg:errorMessage};
				}else{
					$(this).next(".error_message").remove();
					if(data_type.length==1)
						return true;
				}
			}
			if(data_type[0]=="email"||data_type[1]=="email"){//验证email格式
				var reg = BIGAKA.RegExp.EMAIL;
				if(!reg.test($(this).val().toLowerCase())){
					if($(this).prev().is("label"))
						errorMessage="请输入"+$(this).prev("label").text().split("：")[0].replace(" ","");
					else
						errorMessage=BIGAKA.ValiPrompt.email;
					return {errorObj:$(this),errorMsg:errorMessage};
				}else{
					$(this).next(".error_message").remove();
					return true;
				}
			}
			if(data_type[0]=="num"||data_type[1]=="num"){//验证整数格式
				var reg = BIGAKA.RegExp.INT;
				if(!reg.test($(this).val())){
					if($(this).prev().is("label"))
						errorMessage="请输入"+$(this).prev("label").text().split("：")[0].replace(" ","");
					else
						errorMessage=BIGAKA.ValiPrompt.int;
					return {errorObj:$(this),errorMsg:errorMessage};
				}else{
					$(this).next(".error_message").remove();
					return true;
				}
			}
			if(data_type[0]=="float"||data_type[1]=="float"){//验证浮点数格式
				var reg = BIGAKA.RegExp.FLOAT;
				if(!reg.test($(this).val())){
					if($(this).prev().is("label"))
						errorMessage="请输入"+$(this).prev("label").text().split("：")[0].replace(" ","");
					else
						errorMessage=BIGAKA.ValiPrompt.float;
					return {errorObj:$(this),errorMsg:errorMessage};
				}
				else{
					$(this).next(".error_message").remove();
					return true;
				}
			}
			if(data_type[0]=="price"||data_type[1]=="price"){//验证价格
				var reg = BIGAKA.RegExp.FLOAT;
				if(!reg.test($(this).val())){
					if($(this).prev().is("label"))
						errorMessage="请输入"+$(this).prev("label").text().split("：")[0].replace(" ","");
					else
						errorMessage=BIGAKA.ValiPrompt.float;
					return {errorObj:$(this),errorMsg:errorMessage};
				}else{
					var text = parseInt($(this).val());
					if(text>100000000){
						errorMessage=BIGAKA.ValiPrompt.price;
						return {errorObj:$(this),errorMsg:errorMessage};
					}else{
						$(this).next(".error_message").remove();
						return true;
					}
				}
			}
			if(data_type[0]=="phone"||data_type[1]=="phone"){//验证手机号格式
				var reg = BIGAKA.RegExp.TEL;
				if(!reg.test($(this).val())){
					if($(this).prev().is("label"))
						errorMessage="请输入"+$(this).prev("label").text().split("：")[0].replace(" ","");
					else
						errorMessage=BIGAKA.ValiPrompt.tel;
					return {errorObj:$(this),errorMsg:errorMessage};
				}else{
					$(this).next(".error_message").remove();
					return true;
				}
			}
			if(data_type[0]=="url"||data_type[1]=="url"){//验证地址链接格式
				var reg = BIGAKA.RegExp.URL;
				if(!reg.test($(this).val())){
					if($(this).prev().is("label"))
						errorMessage="请输入"+$(this).prev("label").text().split("：")[0].replace(" ","");
					else
						errorMessage=BIGAKA.ValiPrompt.url;
					return {errorObj:$(this),errorMsg:errorMessage};
				}else{
					$(this).next(".error_message").remove();
					return true;
				}
			}
		},
		showError: function(errorMessage){
			var $_this = $(this);
			var defaults = {
				html: "<div class='error_message' style='border-radius:3px;max-width: 280px; border: 1px solid #ccc; color: red; font-size: 12px; padding: 5px 10px; z-index: 996; m background-color: #fff;position:absolute;white-space: nowrap;'>"+errorMessage+"</div>",
				arrow: "<div style='width: 6px; left: -6px; height: 12px; text-indent: 0px; overflow: hidden; position: absolute; top: 25%;'>"+
							"<before style='border-color: transparent #ccc transparent transparent; border-style:dashed solid dashed dashed; right: 0px; width: 0px; height: 0px; overflow: hidden; border-width: 6px; position: absolute;'></before>"+
							"<after style='border-color: transparent #fff transparent transparent; border-style: dashed solid dashed dashed; right: -2px; width: 0px; height: 0px; overflow: hidden; border-width: 6px; position: absolute;'></after>"+
						"</div>",
				left: $_this.position().left+$_this.outerWidth(true),
				top: $_this.position().top+($_this.outerHeight(true)-29)/2,
			};
			if($_this.next().hasClass("error_message")){
				$_this.next().remove();
			}
			$_this.after(defaults.html);
			var $_messageBox = $_this.next();
			$_messageBox.css({"left":defaults.left,"top":defaults.top,"marginLeft":"10px"});
			$_messageBox.append(defaults.arrow);
		},
		spritError: function(){
			$_this = $(this);
			setTimeout(function () { 
				$_this.css("border-color","red");
		    }, 100);
			setTimeout(function () { 
				$_this.css("border-color","#ccc");
		    }, 300);
			setTimeout(function () { 
				$_this.css("border-color","red");
		    }, 500);
			setTimeout(function () { 
				$_this.css("border-color","#ccc");
		    }, 700);
			setTimeout(function () { 
				$_this.css("border-color","red");
		    }, 900);
			$_this.on("focus",function(){
				$(this).css("border-color","#367fa9")
			});
			$_this.on("blur",function(){
				$(this).css("border-color","#ccc")
			})
		}
	});
	/*
	 * 限制input输入类型
	 * data-inputtype='number'只能输入数字
	 * */
	$(function(){
		//所有input禁止输入的字符
		$(document).on("keypress","input",function(evt){
			evt = (evt) ? evt : window.event;
			var specialKey = "$%\^*\'\"\+#|\\";//Specific Key list
		    var realkey = String.fromCharCode(evt.keyCode);
			if (specialKey.indexOf(realkey) >= 0) {
		        return false;
		    }
		    return true;
		});
		/*只能输入数字*/
		//不能输入英文
		$(document).on("keypress","input[data-inputtype='number']",function(event){
			var k = event.keyCode || event.which
	        if(((k >= 48) && (k <= 57)) || k == 8 || k == 0){
	        
	        }else{
	        	event.preventDefault();
	        }
		})
		//不能输入非数字
		$(document).on("keyup","input[data-inputtype='number']",function(event){
			var k = event.keyCode || event.which
	        if(((k >= 48) && (k <= 57))|| k == 8 || k == 0){
	        
	        }else{
	        	if($(this).val().match(/[^\d]/)){
	        		$(this).val($(this).val().replace(/[^\d]/g,''));
	        		event.preventDefault();
	        	}
	        }
		})
		/*价格*/
		//不能输入英文
		$(document).on("keypress","input[data-inputtype='price']",function(event){
			var k = event.keyCode|| event.which
	        if(((k >= 48) && (k <= 57)) || k == 8 || k == 0 || k==46){
	        
	        }else{
	        	event.preventDefault();
	        }
		})
		//只能输入数字和小数点
		$(document).on("keyup","input[data-inputtype='price']",function(event){
			var k = event.keyCode|| event.which
	        if(((k >= 48) && (k <= 57)) || k == 8 || k == 0 || k==46){
	        
	        }else{
	        	if($(this).val().match(/[^\d.]/)){
	        		$(this).val($(this).val().replace(/[^\d.]/g,''));
	        		event.preventDefault();
	        	}
	        }
		})
		$(document).on("blur","input[data-inputtype='price']",function(){
			var value = $(this).val();
			value = value.replace(/[^0-9.]*/g,'');
			if($.trim(value)!=''){
				value = parseFloat(value);
				//处理.
				if(!value)
					value = 0;
				var maxvalue=99999999.99;
				if(maxvalue&&value>maxvalue)	
					value=maxvalue;
				var tofixed=2;
				if($(this).attr("data-tofixed"))
					tofixed=parseInt($(this).attr("data-tofixed"));
				$(this).val(value.toFixed(tofixed));
			}
		})
		//限制字节数
		$(document).on("keyup","input[data-inputtype='bytelimit']",function(event){
			var maxLen=parseInt($(this).attr("data-bytelimit"));
			WidthCheck(this, maxLen);
		});
		$(document).on("change","input[data-inputtype='bytelimit']",function(event){
			var maxLen=parseInt($(this).attr("data-bytelimit"));
			WidthCheck(this, maxLen);
		});
		function WidthCheck(str, maxLen) {
		  var w = 0;
		  var tempCount = 0;
		  //length 获取字数数，不区分汉子和英文 
		  for (var i = 0; i < str.value.length; i++) {
		    //charCodeAt()获取字符串中某一个字符的编码 
		    var c = str.value.charCodeAt(i);
		    //单字节加1  
		    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
		      w++;
		    } else {
		      w += 2;
		    }
		    if (w > maxLen) {
		      str.value = str.value.substr(0, i);
		      break;
		    }
		  }
		}
	});
})(jQuery)
