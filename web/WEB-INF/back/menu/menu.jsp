<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<div class="menu-third">
</div>
<div class="menu-contacts">
	<div class="qq-contact one-contact">
		<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2844377940&site=qq&menu=yes">
			<img alt="" src="${ctx }/img/qq-white.png">热情
		</a>
		<a class="contact-toast contact-toast-qq" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=2844377940&site=qq&menu=yes">点击联系客服</a>
	</div>
	<div class="weixin-contact one-contact">
		<img alt="" src="${ctx }/img/weixin-white.png">
		<a class="contact-toast contact-toast-weixin">个人
			<img alt="" src="${ctx }/img/contact-weixin-qrcode.jpg">
		</a>
	</div>
	<div class="tel-contact one-contact">
		<img alt="" src="${ctx }/img/tel-white.png">
		<a class="contact-toast contact-toast-tel">客服热线：400-7676-015</a>
	</div>
</div>
<script src="${ctx}/js/libs/jquery-1.11.1.min.js" type="text/javascript"></script>

<!-- Cdn fail refers to local library -->
<script type="text/javascript">
    if (typeof jQuery == 'undefined') {
    	document.write(unescape("%3Cscript src='${ctx}/js/libs/jquery-1.11.1.min.js' type='text/javascript'%3E%3C/script%3E"));
    }
    var ctx = "${ctx}";
    var wechatSetting='${wechatSetting.result.openStatus}';
    var storeStockStatus='${crmParamModel.storeStockStatus}';//是否开通进货商城
    var parentStore='${crmParamModel.storeModel}';//是否是上级管理门店
    var loginSunStore='${crmParamModel.loginSunStore}'; //进货商城路径
    var loginParentStore='${crmParamModel.loginParentStore}';//主商城路径
    var loginStaticLoad='${crmParamModel.loginStaticLoad}';//获取当前商城类型session的ajax
    var modifyLoginParentStore='${crmParamModel.modifyLoginParentStore}';//修改session为主商城ajax
    var modifyLoginSunStore='${crmParamModel.modifyLoginSunStore}';//修改session为主商城ajax 
    

</script>
<script type="text/javascript" src="${ctx}/js/libs/slimScroll.js?v=${v}" ></script>
<script type="text/javascript" src="${ctx}/js/modules/modules.js?v=${v}" ></script>
<script type="text/javascript" src="${ctx}/js/apps/menu.js?v=${v}" ></script>