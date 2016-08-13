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
		<link rel="stylesheet" href="${ctx}/css/apps/wechat/wechat-auth.css?v=${v}" />
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
		     			<span class="product-title">微信授权</span>
		     			<span class="tips">*一键授权，更方便、更快捷、更安全！</span>
		     			<span class="b-line float-right"><i style="margin-right:5px;"><img src="${ctx}/img/auth-icon.png"/></i>已授权
						</span>
		     		</div>
	        		<div class="product-body">
                      	<div class="product-info no-border">
                        	<div style="margin-left:30px;">
                        		<div class="wechat-sevice-title">
                        			<i><img src="${ctx}/img/wechat-set-tips.png"/></i>
                              		<span style="margin-left:15px;">您已成功将您的微信公众号授权给舞象云，将可以使用下列功能~</span>
                        		</div>
                              	<div class="wechat-info row" >
                              		<div class="col-xs-8 wechat-info-text">
                              			<p class="wechat-info-text-title">授权绑定信息</p>
                              			<div>
                              				<p>
                              					<span>微信公众号：</span>
                              					<span class="wechat-info-name">${wechatAuthInfo.alias}</span>
                              					<span id="wechat-unbind"><a>解除绑定</a></span>
                              				</p>
                              				<p>
                              					<span>公众号名称：</span>
                              					<span>${wechatAuthInfo.nick_name}</span>
                              				</p>
                              				<p>
                              					<span>公众号类型：</span>
                              					<c:if test="${wechatAuthInfo.verify_type_info.id == -1}">
                              					<span class="wechat-info-name">未认证服务号</span>
                              					<span id="re-allow"><a target="_blank" href="${ctx}/back/wechat/go-author">强烈建议您升级至认证服务号！重新授权</a></span>
                              					</c:if>
                              					<c:if test="${wechatAuthInfo.verify_type_info.id == 0}">
                              					<span class="wechat-info-name">认证服务号</span>
                              					<span id="re-allow"><a target="_blank" href="${ctx}/back/wechat/go-author">使用遇到问题？重新授权</a></span>
                              					</c:if>
                              				</p>
                              			</div>
                              		</div>
                              		<div class="col-xs-3">
                              			<!-- 二维码 -->
                              			<c:if test="${empty wechatAuthInfo.qrcode_url}">
                              			<div class="qrcode-img">
                              				<img class="unqrcode-img" src="${ctx}/img/tip-icon.png"/>
                              				<p class="unqrcode-text">*请您设置微信公众号公开信息中微信号字段，设置完成后系统将 在此处显示公众号二维码。</p>
                              			</div>
                              			</c:if>
                              			<c:if test="${not empty wechatAuthInfo.qrcode_url}">
                              				<img class="qrcode-img" src="${wechatAuthInfo.qrcode_url}" />
                              			</c:if>
                              		</div>
                              	</div>
                        	</div>
                           	<div class="auth-wechat-sevice-list" >
                           		<div class="row wechat-sevice-list1">
                           			<div class="col-lg-4 wechat-sevice-mode1">
                           				<i><img src="${ctx}/img/wechat-set-mall.png"/></i>
                           				<span>商城微信自动登录</span>
                           			</div>
                           			<div class="col-lg-4 wechat-sevice-mode1">
                           				<i><img src="${ctx}/img/wechat-set-cus.png"/></i>
                           				<span>会员微信账号绑定</span>
                           			</div>
                           			<div class="col-lg-4 wechat-sevice-mode2">
                           				<i><img src="${ctx}/img/wechat-set-v.png"/></i>
                           				<span>公众号营销推送</span>
                           			</div>
                           		</div>
                           		<div class="row wechat-sevice-list2">
                           			<div class="col-lg-4 wechat-sevice-mode1">
                           				<i><img src="${ctx}/img/wechat-set-card.png"/></i>
                           				<span>卡券同步微信卡包</span>
                           			</div>
                           			<div class="col-lg-4 wechat-sevice-mode1">
                           				<i><img src="${ctx}/img/wechat-set-new.png"/></i>
                           				<span>微信模板消息</span>
                           			</div>
                           			<div class="col-lg-4 wechat-sevice-mode2">
                           				<i><img src="${ctx}/img/wechat-set-fans.png"/></i>
                           				<span>微信粉丝分组同步</span>
                           			</div>
                           		</div>
						  	</div>
        			</div>
               	</div>
            </aside>
		</div>
		<!-- 解除绑定弹出框消息 -->
		<div class="modal fade" id="add_new_modal" tabindex="99" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="addNewLabel">解除绑定</h4>
					 </div>
					<div class="modal-body close-set-content">
						<div class="modal-body-con text-left">
    						<div>
    							<i style="display:inline-block;"><img src="${ctx}/img/tip-icon.png"/></i>
    							<div class="dialog-text">
    								<p class="text-red">解除授权绑定，或绑定授权新的微信公众号，会造成部分信息丢失！与微信公众号绑定的会员也需重新绑定手机号！请谨慎操作！！</p>
    								<p class="text-red">另：解绑后请前往<a target="_blank" href="https://mp.weixin.qq.com/">微信公众平台</a>进行授权管理变更，或直接授权其他开发者</p>
    								<p>
    									<input type="checkbox" id="chioce-btn"/>
    									<label for="chioce-btn">*我已经知道解除绑定的风险，但我仍然要继续</label>
    								</p>
    							</div>
    						</div>
						</div>
						<div class="modal-body-operation">
							<button type="button" class="btn btn-danger" id="btn-unblind" style="margin-right:20px;" disabled>解除绑定</button>
							<button class="btn btn-primary" data-dismiss="modal">取消</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 重新授权弹出框消息 -->
		<div class="modal fade" id="re_allow_modal" tabindex="99" role="dialog" aria-labelledby="reAllowLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="reAllowLabel"">微信授权</h4>
					 </div>
					<div class="modal-body close-set-content">
						<div class="modal-body-con text-left">
    						<p>
    							<i style="display:inline-block;"><img src="${ctx}/img/tip-icon.png"/></i>
    							<span class="dialog-text">请在新的浏览器窗口中，按步骤完成微信公众号授权，如果您在授权中遇到了任何问题，可以点击重试或直接联系舞象云客服~</span>
    						</p>
						</div>
						<div class="modal-body-operation" style="margin-top:50px;">
							<button type="button" class="btn btn-info" id="allow-success" style="margin-right:20px;" data-dismiss="modal">授权成功</button>
							<a class="btn btn-default allow-agin" target="_blank" href="${ctx}/back/wechat/go-author">授权遇到问题？重试</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui.min.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/apps/wechat/wechat-auth.js?v=${v}"></script>
</html>
