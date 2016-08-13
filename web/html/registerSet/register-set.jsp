<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<!-- IE能够使用最新渲染模式而不是兼容模式 -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!-- 国产浏览器默认采用“高速”模式渲染页面 -->
		<meta name="renderer" content="webkit">
		<!--title上的icon-->
		<link rel="shortcut icon" href="${ctx}/img/favicon.ico" >
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap.css" />
		<link rel="stylesheet" href="${ctx}/css/libs/font-awesome.css" />
		<link rel="stylesheet" href="${ctx}/css/libs/ionicons.css" />
		<link rel="stylesheet" href="${ctx}/css/libs/AdminLTE.css" />
		<link rel="stylesheet" type="text/css"  href="${ctx}/css/libs/jQueryUI/jquery-ui-1.11.4.css" />
		<link rel="stylesheet" type="text/css" href="${ctx}/css/libs/jQueryUI/jquery-ui-timepicker-addon.css"/>
		<link rel="stylesheet" href="${ctx}/css/apps/main.css" />
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		    <script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
		    <script src="http://apps.bdimg.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		<title>舞象数据中心</title>
	</head>
	<body class="skin-blue fixed">
		<!-- include nav.jsp -->
		<jsp:include page="/WEB-INF/include/nav.jsp"></jsp:include>
		<div class="wrapper row-offcanvas row-offcanvas-left">
			<!--三级菜单-->
			<jsp:include page="/WEB-INF/back/menu/menu.jsp"></jsp:include>
			<aside class="right-side">
               	<div class="box">
               		<div class="product-head">
		     			<span class="product-title">注册设置</span>
		     			<span class="tips"><em>*</em>您可以通过会员注册，为会员注册登录提供独特体验。若您未启用设置，系统将提供默认功能</span>
		     			<button class="btn btn-primary pull-r">立即设置</button>
		     		</div>
		     		<div class="product-body goods-body">
		     			<div style="margin-bottom:20px;">
		     				<p style="padding:20px 0;"><span><span>您可以为会员注册/登录页面设计背景样式，并通过后台配置，会员在注册/登录时将会浏览到个性化的会员界面~</p>
		     				<div style="text-align: center;">
								<img src="" style="width:200px;height:300px;margin-right:150px;"/>
								<img src="" style="width:200px;height:300px;"/>		     				
		     				</div>
		     			</div>
		     			<div style="margin-bottom:20px;">
		     				<p style="padding:20px 0;"><span><span>通过<a>会员信息</a>完成信息字段定义后，配置完毕会员完成手机号输入后将可以跳转至信息完善页面~</p>
		     				<div style="text-align: center;">
								<img src="" style="width:200px;height:300px;margin-right:150px;"/>
								<img src="" style="width:200px;height:300px;"/>		     				
		     				</div>
		     			</div>
		     			<div style="margin-bottom:20px;">
		     				<p style="padding:20px 0;"><span><span>您可以进行<a>积分设置</a>，引导会员完善信息，奖励会员~</p>
		     				<div style="text-align: center;">
								<img src="" style="width:200px;height:300px;margin-right:150px;"/>
								<img src="" style="width:200px;height:300px;"/>		     				
		     				</div>
		     			</div>
	                </div>
	            </div>
	        </aside>
	    </div>
	</body>
	
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/app.js" ></script>
	<script  type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui-i18n.js"></script>
	<script type="text/javascript" src="${ctx}/js/apps/registerSet/register-set.js" ></script>
</html>