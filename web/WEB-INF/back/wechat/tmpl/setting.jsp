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
		<link rel="shortcut icon" href="${ctx}/img/favicon.ico?v=${v}">
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/libs/timepicker/bootstrap-datetimepicker.min.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap-switch.min.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/libs/font-awesome.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/libs/ionicons.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/libs/AdminLTE.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/apps/main.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/apps/wechat/tmpl/news.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/apps/app-monitor.css?v=${v}"/>
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
            	<!--条件搜索-->
               	<div class="box">
               		<div class="product-head">
		     			<span class="product-title">模板消息</span>
		     			<span class="tips">*授权公众号，启用模板消息，您即可通过公众号向会员发送业务通知</span>
		     			<span class="float-right">
		     				<a class="btn btn-default" style="margin-right:20px;" href="${ctx}/back/wechat/tmpl/index">取消</a>
		     				<button class="btn btn-primary"  id="save-btn">保存</button>
						</span>
		     		</div>
	        		<div class="product-body" style="position:relative;">
	        			<span class="product-body-title1">会员</span>
	        			<span class="product-body-title2">订单</span> 
	        		<form id="wechat-news-setup">
                      	<table class="wechat-news-content">
                      		<thead>
                        		<tr>
                        			<th class="news-notice"></th>
                              		<th class="news-notice">微信消息推送</th>
                              		<th class="news-notice">系统是否短信通知</th>
                              		<th class="news-notice"></th>
                        		</tr>
                        	</thead>
                           	<tbody>
                           	<c:forEach var="item" items="${accountList}">
                           		<tr>
									<td class="news-notice">
                           				<label >${item.typeName}</label>
                           			</td>
                           			<td class="news-notice" style="width:200px;">
                           				<input type="hidden" class="type-id" value="${item.type}"/>
                           				<input type="hidden"  class="switch-status" value="${item.openStatus}"/>
                           				<input type="checkbox" class="data-switch" value="0"/>
                           			</td>
                           			<td class="news-notice">
                           				<c:if test="${item.sms}">√</c:if>
                           				<c:if test="${not item.sms}">无</c:if>
                           			</td>
                           			<td class="tips" style="width:260px;"><em >*</em>${item.explain}</td>
                           		</tr>
                           	</c:forEach>
							</tbody>
							<tbody>
								<c:forEach var="item" items="${orderList}">
                           		<tr>
									<td class="news-notice">
                           				<label >${item.typeName}</label>
                           			</td>
                           			<td class="news-notice">
                           				<input type="hidden" class="type-id" value="${item.type}"/>
                           				<input type="hidden"  class="switch-status" value="${item.openStatus}"/>
                           				<input type="checkbox" class="data-switch" value="0"/>
                           			</td>
                           			<td class="news-notice">
                           				<c:if test="${item.sms}">√</c:if>
                           				<c:if test="${not item.sms}">无</c:if>
                           				</td>
                           			<td class="tips"><em >*</em>${item.explain}</td> 
                           		</tr>
                           		</c:forEach>
							</tbody>
						</table>
					</form>
        			</div>
               	</div>
            </aside>
		</div>
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
    <script type="text/javascript" src="${ctx}/js/apps/wechat/tmpl/news-setting.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui.min.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/switch/highlight.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/switch/bootstrap-switch.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/switch/main.js?v=${v}"></script>
</html>
