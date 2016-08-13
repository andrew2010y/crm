var  temp_menus={};
var cur_menu_index="0,0,0";/*记录当前选中菜单中，三级的index，逗号分隔  。默认为0,0,0*/
var platformUrl = $("#platform-url").val();
if(getCookie("cur_menu_index")){
		cur_menu_index=getCookie("cur_menu_index");
	 }
var fir_menu_index=parseInt(cur_menu_index.split(",")[0]);
var sec_menu_index=parseInt(cur_menu_index.split(",")[1]);
var thr_menu_index=parseInt(cur_menu_index.split(",")[2]);

function setParentStoreSession(){
var parentStore,storeStockStatus;
/*	$.ajax({
	    type: 'POST',
	    async: false, //同步执行
	    url:ctx+"/back/commonO2O/login-store",
	    dataType: "json",
	    success: function (result) {
	    	storeStockStatus=result.result.storeStockStatus;
	    	parentStore=result.result.storeModel;
	    },
	    error: function (errorMsg) {
	    	$.toast("连接异常",1500);
	    }
	});
	 */
	 
	/*if($('#firstmenu-0-income').length>0 && storeStockStatus=='Y' && parentStore=='N'){//是主商城但是session是进货商城
		$.ajax({//修改session为主商城
			url:modifyLoginParentStore,
			type:'POST',
			async:false
		})
	}else if($('#firstmenu-0-main').length>0 && storeStockStatus=='Y' && parentStore=='Y'){//是进货商城但是session是主商城
		$.ajax({//修改session为主商城
			url:modifyLoginSunStore,
			type:'POST',
			async:false
		})
	}*/
}

$(function(){
	/*$.ajax({
		//url:$("#platform-url").val()+"/login!getUserMenu.do",
		url: platformUrl+"/login!getUserMenu.do",
		type: "get",
		async:false,
		dataType: "jsonp",
		jsonp: "jsonpCallbackFun",
		success: function(res){
			temp_menus=res;
			window.localStorage.setItem("menu_data",JSON.stringify(temp_menus));
			initMenu();
		},
		error: function(data){
			if(window.localStorage.getItem("menu_data")){
				temp_menus=eval("("+window.localStorage.getItem("menu_data")+")");
				initMenu();
			}
		}
	});*/
	/*滚动fixed菜单  */
	$(window).on("scroll",function(){
		$(".menu-first,.menu-secend").css("left","-"+window.scrollX+"px");
	})
	/* 点击一级菜单 */
  	$(".menu-first").on("click",".menu-item",function(){
  		if($(this).attr('id')!='firstmenu-0-income'&&$(this).attr('id')!='firstmenu-0-main'){
	  		fir_menu_index=parseInt($(this).attr("id").split("-")[1]);
	  		setCookie("cur_menu_index",fir_menu_index+",0,0",1);
	  		if(temp_menus.menus[fir_menu_index].name == "CRM"){
	  			var cLink = temp_menus.menus[fir_menu_index].children[0].children[0].link.split("=");
	  			var c2Link = cLink[1].split(".");
	  			var dLink = "";
	  			for(var i = 0;i<c2Link.length; i++){
	  				if(i > 0){
	  					dLink += "/"+c2Link[i];
	  				}
	  			}
	  			window.location.href= ctx +"/back"+ dLink;
	  		} else{
	  			window.location.href= platformUrl+"/"+temp_menus.menus[fir_menu_index].children[0].children[0].link;
	  		}
  		}else if($(this).attr('id')=='firstmenu-0-income'){//进入进货商城
  			setCookie("cur_menu_index","0,0,0",1);
  			window.location.href=loginSunStore;
  		}else if($(this).attr('id')=='firstmenu-0-main'){//返回主商城
  			setCookie("cur_menu_index","0,0,0",1);
  			window.location.href=loginParentStore;
  		}
  	});
	/* 鼠标悬浮一级菜单 */
	$(".menu-first").on("mouseover",".menu-item",function(){
		if($(this).attr('id')!='firstmenu-0-income'&&$(this).attr('id')!='firstmenu-0-main'){
			var $_this=$(this);
			fir_menu_index=parseInt($(this).attr("id").split("-")[1]);
	   	/*	var sec_menu_data=temp_menus.menus[fir_menu_index].children;//当前二级菜单数据
	   		$(".menu-secend .wrappers").html("");
	       	$.each(sec_menu_data,function(index,ele){//拼接二级菜单
	       		if(ele.children && ele.children.length > 0){
		       		var menu_html=
		       			'<a class="menu-item';
		       		if($_this.hasClass("active")&&index==sec_menu_index)//选中当前二级菜单
		       			menu_html+=' active';
		       		menu_html+='" id="secondmenu-'+index+'">'+ele.name+'</a>';
		       		$(".menu-secend .wrappers").append(menu_html);
	       		}
	       	});*/
		}
	});
	/* 鼠标离开一级菜单 */
	$(".wrapper").on("mouseover",function(event){
		fir_menu_index=parseInt(cur_menu_index.split(",")[0]);
		/*var sec_menu_data=temp_menus.menus[fir_menu_index].children;//当前二级菜单数据
		$(".menu-secend .wrappers").html("");
    	$.each(sec_menu_data,function(index,ele){//拼接二级菜单
    		if(ele.children && ele.children.length > 0){
	    		var menu_html=
	    			'<a class="menu-item';
	    		if(index==sec_menu_index)//选中当前二级菜单
	    			menu_html+=' active';
	    		menu_html+='" id="secondmenu-'+index+'">'+ele.name+'</a>';
	    		$(".menu-secend .wrappers").append(menu_html);
    		}
    	});*/
	});
  	/* 点击二级菜单 */
  	$(".menu-secend").on("click",".menu-item",function(){
  		sec_menu_index=parseInt($(this).attr("id").split("-")[1]);
  		setCookie("cur_menu_index",fir_menu_index+","+sec_menu_index+",0",1);
  		
  		if(temp_menus.menus[fir_menu_index].name == "CRM"){
  			var cLink = temp_menus.menus[fir_menu_index].children[sec_menu_index].children[0].link.split("=");
  			var c2Link = cLink[1].split(".");
  			var dLink = "";
  			for(var i = 0;i<c2Link.length; i++){
  				if(i > 0){
  					dLink += "/"+c2Link[i];
  				}
  			}
  			window.location.href= ctx +"/back"+ dLink;
  		} else{
  			window.location.href= platformUrl+"/"+temp_menus.menus[fir_menu_index].children[sec_menu_index].children[0].link;
  		}
  	});
  	/* 点击三级菜单 */
  	$(".menu-third").on("click",".menu-item",function(){
  		thr_menu_index=parseInt($(this).attr("id").split("-")[1]);
  		setCookie("cur_menu_index",fir_menu_index+","+sec_menu_index+","+thr_menu_index,1);
  		if(temp_menus.menus[fir_menu_index].name == "CRM"){
  			var cLink = temp_menus.menus[fir_menu_index].children[sec_menu_index].children[thr_menu_index].link.split("=");
  			var c2Link = cLink[1].split(".");
  			var dLink = "",couponLog = false;
  			for(var i = 0;i<c2Link.length; i++){
  				if(i > 0){
  					dLink += "/"+c2Link[i];
  				}
  				if(c2Link[i] == "coupon-log"){
  					couponLog = true;
  				}
  			}
  			if(couponLog){
  				window.location.href= ctx +"/back"+ dLink + "/";
  			} else {
  				window.location.href= ctx +"/back"+ dLink;
  			}
  		} else{
  			window.location.href= platformUrl+"/"+temp_menus.menus[fir_menu_index].children[sec_menu_index].children[thr_menu_index].link;
  		}
  	});
  	/* 鼠标悬浮在一级菜单时改变图片 */
    $(".menu-first .menu-item").on("mouseover",function(){
		 	if(!$(this).hasClass("active")){
	 		var oldSrc=$(this).find("img").attr("src").split(".")[0]
			if(oldSrc.indexOf("-sel")==-1){
				var newSrc=oldSrc+"-sel.png";
				$(this).find("img").attr("src",newSrc);
			}
		}
	 });
	 $(".menu-first .menu-item").on("mouseleave",function(){
	 	if(!$(this).hasClass("active")){
			var oldSrc=$(this).find("img").attr("src").split(".")[0]
			if(oldSrc.indexOf("-sel")!=-1){
				var newSrc=oldSrc.split("-sel")[0]+".png";
				$(this).find("img").attr("src",newSrc);
			}
		}
	 });
	 $(".user-label,.user-control").on("mouseover",function(){
			$(".user-control").show();
		});
		$(".user-label,.user-control").on("mouseleave",function(){
			$(".user-control").hide();
		});
		//设置弹出层样式
		$(".modal .modal-body:not(.noslim)").slimscroll({
			height: "500px",
	        distance:'10px',
	        alwaysVisible: false,
	        railVisible:true,
	        railColor:'#e1e1e1',
	        railOpacity: 1,
	        size: "6px",
	        color: '#77c2f7',
	        opacity: 1
		});
		// 密码修改modal层样式
		$("#updatepwd .modal-body").slimscroll({
			height: "195px",
	        distance:'10px',
	        alwaysVisible: false,
	        railVisible:true,
	        railColor:'#e1e1e1',
	        railOpacity: 1,
	        size: "6px",
	        color: '#77c2f7',
	        opacity: 1
		});
	   // prompt modal层样式
	   $("#prompt_dialog .modal-body").slimscroll({
	   		height: "60px",
	        distance:'10px',
	        alwaysVisible: false,
	        railVisible:true,
	        railColor:'#e1e1e1',
	        railOpacity: 1,
	        size: "6px",
	        color: '#77c2f7',
	        opacity: 1
	   });
	   //change pwd modal
	   $("#updatepwd").on('show.bs.modal',function(){
		   $("#updatepwdform input:visible").val("");
	   })	
	/*弹出修改密码或者退出登录*/
	$("body").on("click",".user-label",function(){
		$(".user-control").toggle();
	});
	$("body").on("click","#logout-btn",function(ev){
		ev.preventDefault();
		jconfirm("确认退出系统吗？",function(){
			logout();
		})
	});
	$( ".tips-head .close-modal").on("click",function(){
		$(".browserTips").hide();
	});

});

$(window).load(function(){
	var winWidth = $(window).width();
	var browser = navigator.userAgent.toLowerCase();
	if(parseInt($("#mpStatus").val())>=30){
		if(WX.cookieMod.getCookie('this_login_user_id_${this_login_user_id}')==""){
			if (browser.indexOf("msie")>0){ // IE 浏览器
				var browserArr = browser.split(";");
				var ieVersion = browserArr[1].match(/\d+(\.\d+)?/g); 
				if(ieVersion >= 10){
					$(".browserTips .tip-detail").html("您使用的浏览器不是Chrome浏览器，为了使用方便，更好的管理您的数据中心。");
					$(".browserTips").show();
				} else if(ieVersion < 10 ){
					$(".browserTips .tip-detail").html("您使用的IE浏览器版本过低，数据中心后台不支持该浏览器，为了使用方便，更好的管理您的数据中心。");
					$(".browserTips").show();
				}
			} else if(browser.indexOf("rv:11.0")>0){//IE 11
				$(".browserTips .tip-detail").html("您使用的浏览器不是Chrome浏览器，为了使用方便，更好的管理您的数据中心。");
				var left = (winWidth - 500)/2;
				$(".browserTips").css("left", left);
				$(".browserTips").show();
			} else {
				$(".browserTips").hide();
			}
			
			WX.cookieMod.setCookie('this_login_user_id_${this_login_user_id}','${this_login_user_id}',99999);
		}
	}
	$(document).on("click",function(){
		$(".popover.fade").remove();
	});
});
//$(window).on('scroll',function(){
//	if($(window).scrollTop()<=30){
//		$('.head-contacts').removeClass('contacts-hide');
//	}else{
//		$('.head-contacts').addClass('contacts-hide');
//	}
//})
function initMenu(){
	$.each(temp_menus.menus,function(i,obj_i){
		if(obj_i && obj_i.children){
			$.each(obj_i.children,function(j,obj_j){
				if(obj_j && obj_j.children){
					$.each(obj_j.children,function(k,obj_k){
						if(obj_i.name == "CRM"){
							var tempLink=obj_k.link.split("=")[1].split(".");
							var pathLink="";
							$.each(tempLink,function(z,obj_z){
								if(z>0)
		  							pathLink+="/"+obj_z;
							})
		  					pathLink=ctx+"/back"+pathLink
		  				 	if(window.location.pathname==pathLink){
			   					fir_menu_index=i;
			   					sec_menu_index=j;
			   					thr_menu_index=k;
			   					cur_menu_index=fir_menu_index+","+sec_menu_index+","+thr_menu_index;
			   					setCookie("cur_menu_index",cur_menu_index,1);
			   					return;
		  				 	}
						}
					})
				}
			})
		}
 	})
	var firstMenu = '';
	for(var i=0;i<temp_menus.menus.length; i++){
		if(temp_menus.menus[i].type == 'm'){
			
			firstMenu += 	'<div class="menu-item" id="firstmenu-'+i+'">'+
								'<img src="'+ctx+'/img/'+temp_menus.menus[i].ico+'"/>'+
								'<span>'+temp_menus.menus[i].name+'</span>'+
							'</div>';
		}
	}
	//进货商城
	if(storeStockStatus=='Y'&&parentStore=='Y'){
		firstMenu += 	'<div class="menu-item" id="firstmenu-0-income">'+
							'<img src="'+ctx+'/img/income-icon.png"/>'+
							'<span>进货商城</span>'+
						'</div>';
	}
	if(storeStockStatus=='Y'&&parentStore=='N'){
		firstMenu += 	'<div class="menu-item" id="firstmenu-0-main">'+
							'<img src="'+ctx+'/img/back-icon.png"/>'+
							'<span>返回主商城</span>'+
						'</div>';
	}
	
	$(".menu-first .menu-list").html(firstMenu);
	 /*初始化选中菜单  */
	 checkmenu();
}
/*根据cookies中的菜单index设置菜单  */
function checkmenu(){
 	/* 选中当前一级菜单 */
	$("#firstmenu-"+fir_menu_index).addClass("active");
	var oldSrc=$(".menu-first .menu-item.active img").attr("src").split(".")[0]
	var newSrc=oldSrc+"-sel.png";
	$(".menu-first .menu-item.active img").attr("src",newSrc);
	/*var sec_menu_data=temp_menus.menus[fir_menu_index].children;//当前二级菜单数据
	var menu_html = '';
	$.each(sec_menu_data,function(index,ele){//拼接二级菜单
		if(ele.children && ele.children.length > 0){
			menu_html += '<a class="menu-item';
			//选中当前二级菜单
			if(index==sec_menu_index){
				menu_html+=' active';
			}
			menu_html+='" id="secondmenu-'+index+'">'+ele.name+'</a>';
		}
	});*/
	$(".menu-secend .wrappers").html(menu_html);
	var thr_menu_data=temp_menus.menus[fir_menu_index].children[sec_menu_index].children;//当前三级菜单数据
	var menu_html= '';
	$.each(thr_menu_data,function(index,ele){//拼接三级菜单
		menu_html +='<a class="menu-item';
		//选中当前三级菜单
		if(index==thr_menu_index){
			menu_html +=' active';
		}
		menu_html +='" id="thirddmenu-'+index+'"><span>'+ele.name+'</span></a>';
		
	});
	$(".menu-third").html(menu_html);
	$('.menu-contacts').css('top',150+20+$('.menu-third').height()).show();
 }
 function setCookie(name, value, exptime) {
     var now = new Date();
     var time = now.getTime();
     var anhour = (exptime+8)*3600;
     time += anhour * 1000;
     now.setTime(time);
     document.cookie = name+'='+value+';path='+ctx+'/;expires='+now.toUTCString();
 }
function getCookie(name){
     var cArr=document.cookie.split('; ');
	 for(var i=0;i<cArr.length;i++){
	     var cArr2=cArr[i].split('=');
	     if(cArr2[0]==name){
	         return cArr2[1];
	     }
	 }
	 return '';
}
function  logout()
{
    window.location.href = platformUrl+"/logout.do";
}
function modifyPwd(){
	var npwd = $.trim($("#npwd").val());
	var cpwd = $.trim($("#cpwd").val());
	var oldpwd = $.trim($("#oldpwd").val());
	if(oldpwd==""){
		$.toast("请输入旧密码",1500);
		return;
	}else if(oldpwd.length<6){
		$.toast("旧密码不能少于6位",1500);
		return;
	}
	if(npwd==""){
		$.toast("请输入新密码",1500);
		return;
	}else if(npwd.length<6){
		$.toast("新密码不能少于6位",1500);
		return;
	}
	if(cpwd==""){
		$.toast("请确认新密码",1500);
		return;
	}else if(cpwd.length<6){
		$.toast("确认密码不能少于6位",1500);
		return;
	}
	if(npwd != '' && cpwd!=''){
		if(npwd!=cpwd){
			$.toast("新密码输入不一致,请重新输入",1500);
			return;
		}
	}
	$.ajax({
		type:"post",
		url:platformUrl +"/security/modifyPwd.do",
		data:$('#updatepwdform').serialize(),
		dataType:"json",
		success:function(data){
			if(data.result==1){
				$("#updatepwd_btn").click();
				$.toast("修改成功，系统即将退出，请重新登录",1500);
				setTimeout("logout()",1600);
			}else if(data.result==2){
				$.toast(data.msg,1500);
			}else{
				$.toast("修改失败",1500);
			}
		},
		error: function() {
			$.toast("网络异常",1500);
        }
	});
}
function jconfirm(msg,callback){
	if(null==msg){msg="确认操作吗？"}else{$("#confirm_title").html(msg)};
	$("#confirm_dialog").modal("show");
	$("#confirm_ok").unbind();
	$("#confirm_ok").click( function() {
		$("#confirm_dialog").modal("hide");
		if(callback)callback(true);
	})
}
function jprompt(msg,callback){
	$("#prompt_value").val("");
	if(null==msg){msg="请输入值"}else{$("#prompt_title").html(msg)};
	$("#prompt_dialog").modal("show");
	$("#prompt_ok").unbind();
	$("#prompt_ok").click( function() {
		$("#prompt_dialog").modal("hide");
		if(callback)callback(true);
	})
}
