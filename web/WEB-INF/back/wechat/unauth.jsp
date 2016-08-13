<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page isELIgnored="false"%>
<html>
	<head>
		<meta charset="utf-8" />
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
		     			<span class="float-right" id="wechat-allow">
		     				<!-- 跳转地址 -->
							<a class="btn-wx" target="_blank" href="${ctx}/back/wechat/go-author"><img src="${ctx}/img/wechat-icon.png" style="margin-right:10px;">我有微信公众号，立即授权</a>
						</span>
		     		</div>
	        		<div class="product-body ">
                      	<div class="wechat-setup-sevice no-border" >
                        	<div class="wechat-setup-title clearfix">
                              	<i><img src="${ctx}/img/wechat-set-cloud.png"/></i>
                              	<span class="">为深度集成商城+微信、CRM+微信等功能，舞象云邀请您授权体验~</span>
                              	<span class="float-right" style="margin-right:25px;">您还没有微信公众号？<a target="_blank" href="https://mp.weixin.qq.com/">立即申请</a></span>
                        	</div>
                           	<div class="wechat-sevice-list">
                           		<div class="row wechat-sevice-list1">
                           			<div class="col-xs-4 wechat-sevice-mode1">
                           				<i><img src="${ctx}/img/wechat-set-mall.png"/></i>
                           				<span>商城微信自动登录</span>
                           			</div>
                           			<div class="col-xs-4 wechat-sevice-mode1">
                           				<i><img src="${ctx}/img/wechat-set-cus.png"/></i>
                           				<span>会员微信账号绑定</span>
                           			</div>
                           			<div class="col-xs-4 wechat-sevice-mode2">
                           				<i><img src="${ctx}/img/wechat-set-v.png"/></i>
                           				<span>公众号营销推送</span>
                           			</div>
                           		</div>
                           		<div class="row wechat-sevice-list2">
                           			<div class="col-xs-4 wechat-sevice-mode1">
                           				<i><img src="${ctx}/img/wechat-set-card.png"/></i>
                           				<span>卡券同步微信卡包</span>
                           			</div>
                           			<div class="col-xs-4 wechat-sevice-mode1">
                           				<i><img src="${ctx}/img/wechat-set-new.png"/></i>
                           				<span>微信模板消息</span>
                           			</div>
                           			<div class="col-xs-4 wechat-sevice-mode2">
                           				<i><img src="${ctx}/img/wechat-set-fans.png"/></i>
                           				<span>微信粉丝分组同步</span>
                           			</div>
                           		</div>
						  	</div>
						</div>
                        <div class="wechat-setup-tips">
                            <div class="wechat-setup-title">
                            	<i><img src="${ctx}/img/wechat-set-tips.png"/></i>
	                           	<span class="" style="margin-left:8px;">授权绑定小贴士</span>
                            </div>
                            <div class="wechat-setup-tips-list">
                            	<ul class="tips-box clearfix">
                            		<li class="float-left">
                            			<p>一个微信公众号同一时间只能授权给一个第三方平台</p>
                            		</li>
                            		<li class="float-left">
                            			<p>为保证您能正常使用舞象云的所有功能，请使用<span class="text-red">认证服务号</span>完成授权</p>
                            		</li>
                            		<li class="float-left">
                            			<p>为保证您在舞象云中的所有功能正常使用，授权时请按提示操作，将公众号权限统一授权给舞象云</p>
                            		</li>
                            		<li class="float-left">
                            			<p>任何对微信公众号授权的更改，都将有可能影响到您的功能使用，请谨慎操作，或直接咨询 舞象云</p>
                            		</li>
                            	</ul>
                             </div>
                             <div class="wechat-setup-path">
                             	<div class="wechat-setup-title">您即将进行的操作将有几个关键步骤，请认真阅读以下内容：</div>
                             	<div class="wechat-setup-step-list">
                             		<div class="wechat-setup-step">
                              			<i>1</i>
                              			<span>请前往微信公众平台申请微信公众号（推荐服务号），并认证通过。微信公众号申请之后会需要1-2天的审核时间，耐心等待哦~</span>
                            		</div >
                            		<div class="wechat-setup-step">
                              			<i>2</i>
                              			<span>点击“我有微信公众号，立即授权”按钮</span>
                              			<span class="b-line float-right" id="wechat-allow-btn">
                              				<!-- 跳转地址 -->
											<a class="btn-wx" target="_blank" href="${ctx}/back/wechat/go-author"><img src="${ctx}/img/wechat-icon.png" style="margin-right:10px;">我有微信公众号，立即授权</a>
										</span>
                            		</div>
                            		<div class="wechat-setup-step">
                              			<i>3</i>
                              			<span>进入公众号登录授权页面，通过公众号关联的管理员微信扫描二维码，扫描成功后PC端界面将更新</span>
                              			<div class="row wechat-setup-step-pic">
                              				<p class="col-xs-6" style="text-align:center;">
                              					<img class="wechat-step-pic" src="${ctx}/img/wx-pic1.png"/>
                              				</p>
                              				<p class="col-xs-3" style="text-align:center;">
                              					<img class="wechat-step-pic" src="${ctx}/img/wx-pic2.png"/>
                              				</p>
                              			</div>
                            		</div>
                            		<div class="wechat-setup-step">
                              			<i>4</i>
                              			<span>若管理员微信关联了多个微信公众号，请选择正确公众号进行授权，点击授权</span>
                            			<div class="row wechat-setup-step-pic">
                              				<p class="col-xs-6" style="text-align:center;">
                              					<img class="wechat-step-pic" src="${ctx}/img/wx-pic3.png"/>
                              				</p>
                              				<p class="col-xs-3" style="text-align:center;">
                              					<img class="wechat-step-pic" src="${ctx}/img/wx-pic4.png"/>
                              				</p>
                              			</div>
                            		</div>
                            		<div class="wechat-setup-step">
                              			<i>5</i>
                              			<span>授权完成后，您将看到手机授权成功提示，完成授权~</span>
                              			<div class="row wechat-setup-step-pic">
                              				<p class="col-xs-6" style="text-align:center;">
                              					<img class="wechat-step-pic" src="${ctx}/img/wx-pic5.png"/>
                              				</p>
                              			</div>
                            		</div>
                             	</div>
                             </div>
                         </div>
        			</div>
               	</div>
            </aside>
		</div>
		<!-- 微信授权弹出框消息 -->
		<div class="modal fade" id="wechat-allow-modal" tabindex="99" role="dialog" aria-labelledby="reAllowLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="reAllowLabel"">微信授权</h4>
					 </div>
					<div class="modal-body close-set-content">
						<div class="modal-body-con text-left">
    						<div>
    							<i style="display:inline-block;"><img src="${ctx}/img/auth-tip-icon.png"/></i>
    							<span class="dialog-text">请在新的浏览器窗口中，按步骤完成微信公众号授权，如果您在授权中遇到了任何问题，可以点击重试或直接联系舞象云客服~</span>
    						</div>
						</div>
						<div class="modal-body-operation" style="margin-top:50px;">
							<button type="button" class="btn btn-info" id="allow-success" style="margin-right:20px;" data-dismiss="modal">授权成功</button>
							<a class="btn btn-default allow-agin" target="_blank" href="${ctx}/back/wechat/go-author">授权遇到问题？重试</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 老用户微信授权弹出框消息 -->
		<c:if test="${authState == -1}">
		<div class="modal fade" id="user-allow-modal" tabindex="9" role="dialog" aria-labelledby="userAllowModal" style="display:block;">
			<div class="modal-dialog">
				<div class="modal-content" style="height:300px;">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="userAllowModal"">微信授权</h4>
					 </div>
					<div class="modal-body close-set-content">
						<div class="modal-body-con text-left">
    						<div>
    							<i style="display:inline-block;"><img src="${ctx}/img/auth-tip-icon.png"/></i>
    							<div class="dialog-text">
    								<p>亲爱的用户，舞象云刚刚升级了微信授权方式，为方便您使用更多微信功能，舞象云邀请您授权微信公众号</p>
    								<p class="text-red">• 请注意：授权时请使用原微信配置中对应的公众号</p>
    							</div>
    						</div>
						</div>
						<div class="modal-body-operation" style="margin-top:40px;">
							<a data-dismiss="modal" class="btn btn-info" id="allow-flew" style="margin-right:20px;">马上授权</a>
							<button class="btn btn-default" data-dismiss="modal">我想看看授权教程</button>
						</div>
					</div>
				</div>
			</div>
		</div> 
		</c:if>
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
    <script type="text/javascript" src="${ctx }/js/libs/zeroClipboard/ZeroClipboard.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/switch/main.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/switch/highlight.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/switch/bootstrap-switch.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/apps/wechat/wechat-unauth.js?v=${v}"></script>
</html>
