<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page isELIgnored="false"%>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="Cache-Control" content="no-store"/>
        <meta http-equiv="Pragma" content="no-cache"/>
        <meta http-equiv="Expires" content="0"/>
		<!-- IE能够使用最新渲染模式而不是兼容模式 -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!-- 国产浏览器默认采用“高速”模式渲染页面 -->
		<meta name="renderer" content="webkit">
		<!--title上的icon-->
		<link rel="shortcut icon" href="${ctx}/img/favicon.ico" >
		<link rel="stylesheet" href="${ctx}/css/apps/main.css?v=${v}" />
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		    <script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
		    <script src="http://apps.bdimg.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		<title>舞象数据中心</title>
	</head>
	<body class="skin-blue fixed">
		<div style="text-align:center;width:1000px;height:400px;background-color:#fff;margin:0 auto;margin-top:80px;padding-top:30px;">
			<img src="${ctx}/img/wxy-logo.png" style="width:200px;"/>
			<p style="margin-top:30px;"><img src="${ctx}/img/wechat-ok.png" style="width:80px;"/></p>
			<p style=font-size:40px;color:#44b549;">恭喜，授权成功<P>
			<p id="page-tips"></p>
		<div>
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/jquery-1.11.1.min.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/apps/wechat/wechat-auth-suc.js?v=${v}"></script>
</html>
