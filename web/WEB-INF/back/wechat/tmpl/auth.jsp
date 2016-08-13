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
		<link rel="shortcut icon" href="${ctx}/img/favicon.ico?v=${v}" >
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/timepicker/bootstrap-datetimepicker.min.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap-switch.min.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/font-awesome.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/ionicons.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/AdminLTE.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/apps/main.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/apps/wechat/tmpl/news.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/apps/app-monitor.css?v=${v}" />
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
		     				<c:if test="${authState == 0}">
		     				<a target="_blank" href="${ctx}/back/wechat/go-author">立即前往授权</a>
		     				<i  style="margin-left:20px;margin-right:5px;"><img src="${ctx}/img/unauth-icon.png"/></i><span style="margin-right:20px;">未授权</span>
		     				</c:if>
		     				<c:if test="${authState == 1}">
		     				<i><img src="${ctx}/img/auth-icon.png"/></i><span style="margin-left:5px;margin-right:20px;">已授权</span>
		     				</c:if>
		     			</span>
		     		</div>
	        		<div class="product-body">
                      	<div class="product-info no-border">
                        	<div class="product-info-title">
                        		<p class="product-info-title-head">
                        			<i><img src="${ctx}/img/wechat-set-tips.png"/></i>
                              		<span class="">为会员提供更佳的用户体验，舞象云集成微信公众号模板消息功能，请前往<a target="_blank" href="https://mp.weixin.qq.com/">微信公众平台</a>开通消息模板功能，并选择 【IT科技/互联网|电子商务，IT科技/IT软件与服务】行业或修改为对应行业，并将您的微信公众号授权给舞象云后，即可配置使用~</span>
                        		</p>
                        		<p class="wechat-news-add">
                        			<img class="mr15" src="${ctx}/img/wx-news-add.png" />
                        			<img src="${ctx}/img/wx-news-hy.png" />
                        		</p>
                        		<p class="tips wechat-news-add"><em>*</em>若您未开通消息模板功能将无法进行模板配置，授权后系统将自动将您的模板库行业设置为对应行业，若无法变更行业则同样无法配置，请谨慎操作！</p>
                        	</div>
                           	<div class="news-path-title"> 
                           		<P>根据微信公众平台管理规范，针对日常业务，舞象云将提供以下消息模板推送内容~</P>
                           		<P class="text-red">请注意：启用配置后，对于已关注公众号的会员，我们将优先通过微信公众号渠道将消息通知会员~其他会员仍可正常收到系统短信通知</P>
							</div>
								<div class="news-mode">
									<c:forEach var="item" items="${settingList}" varStatus="index" >
									<div class="news-mode-list">
										<div class="news-mode-list-content">
										<input type="hidden" class="id" value="${item.type}" />
										<c:choose>
											<c:when test="${item.openStatus}">
											<i><img src="${ctx}/img/set-icon.png"/></i>
											</c:when>
											<c:otherwise>
											<i><img src="${ctx}/img/unset-icon.png"/></i>
											</c:otherwise>
										</c:choose> 
                           				<span>${item.typeName}</span>
                           				<c:if test="${not empty item.examplePic}">
                           				<img src="${ctx}${item.examplePic}" class="news-mode-list-pic"/>
                           				</c:if>
                           				</div>
                           			</div>
									</c:forEach>
								</div>
							<div class="news-btn-box">
								<!-- 未授权 -->
								<c:if test="${authState == 0 }">
								<button class="btn btn-primary" disabled>您还未授权，请先前往授权~</button>
								</c:if>
								<!-- 已授权 -->
								<c:if test="${authState == 1 &&  not tmplMsgState}">
								<a class="btn btn-primary" id="news-setting-btn">立即配置</a>
								</c:if>
							</div>
							<c:if test="${authState == 1 && tmplMsgState}">
							<div class="" style="text-align:center;">
								<button class="btn btn-default" style="margin-right:20px;" id="close-set">关闭配置</button>
								<a class="btn btn-primary" href="${ctx}/back/wechat/tmpl/to-setting">修改配置</a>
							</div>
							</c:if>
						</div>
        			</div>
               	</div>
            </aside>
		</div>
		<!-- 开通模板消息 -->
		<div class="modal fade" id="news-setting-modal" tabindex="99" role="dialog" aria-labelledby="newsSettingModal" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="newsSettingModal"">模板消息</h4>
					 </div>
					<div class="modal-body close-set-content">
						<div class="modal-body-con text-left">
    						<p>
    							<i style="display:inline-block;"><img src="${ctx}/img/tip-icon.png"/></i>
    							<span class="text-red news-setting-tip">对不起，您授权的公众号未开通模板消息功能，或行业模板库与系统要求不符，请仔细阅读模板消息配置帮助，前往微信后台完成对应操作后进行匹配！</span>
    						</p>
						</div>
						<div class="modal-body-operation">
							<button type="button" class="btn btn-info" style="margin-right:20px;"  data-dismiss="modal">我知道了</button>
							<a class="btn btn-default" target="_blank" href="https://mp.weixin.qq.com/">跳转至微信公众平台</a>
						</div>
					</div>
				</div>
			</div>
		</div>
  <!-- 关闭配置弹出框消息 -->
		<div class="modal fade" id="close-set-modal" tabindex="99" role="dialog" aria-labelledby="closeSetModal" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="colseSetModal"">模板消息</h4>
					 </div>
					<div class="modal-body close-set-content">
						<div class="modal-body-con text-left">
    						<div>
    							<i style="display:inline-block;"><img src="${ctx}/img/tip-icon.png"/></i>
    							<div class="news-setting-tip">
    								<p class="text-red">关闭配置后，系统将默认通过短信通知用户，配置信息将会丢失，请慎操作！！</p>
    								<p>
    									<input type="checkbox" id="chioce-btn"/>
    									<label for="chioce-btn">*我已经知道关闭配置的风险，但我仍然要继续</label>
    								</p>
    							</div>
    						</div>
						</div>
						<div class="modal-body-operation">
							<button type="button" class="btn btn-info" id="close-set-btn" style="margin-right:20px;" disabled>关闭配置</button>
							<button class="btn btn-default" data-dismiss="modal">取消</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
    <script type="text/javascript" src="${ctx}/js/apps/wechat/tmpl/news-auth.js?v=${v}"></script>
    
</html>
