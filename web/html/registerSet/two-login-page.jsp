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
		<link rel="stylesheet" href="${ctx}/css/apps/app-monitor.css" />
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
		     		</div>
		     		<div class="product-body goods-body">
		     			<div style="margin:20px 0;">
		     				<div class="inline title-arrow ">
		     					<span>设置注册页面</span>
		     					<div class="inline title-arrow-icon" ></div>
		     				</div>
		     				<div class="inline title-arrow">
		     					<span>设置登录页面</span>
		     					<div class="inline title-arrow-icon" ></div>
		     				</div>
		     				<div class="inline title-arrow-un  ">
		     					<span>设置忘记密码页面</span>
		     					<div class="inline title-arrow-icon-un " ></div>
		     				</div>
		     				<div class="inline title-arrow-un  ">
		     					<span>注册流程设置</span>
		     					<div class="inline title-arrow-icon-un " ></div>
		     				</div>
		     				<div class="inline title-arrow-un  ">
		     					<span>完成</span>
		     					<div class="inline title-arrow-icon-un " ></div>
		     				</div>
		     			</div>
		     			<div class="row" style="padding-top:20px;padding-left:50px;">
		     				<div class="col-lg-5" >
		     					<div class="app-design without-add-region">
	                                    		<div class="app-preview">
													<div class="app-header"></div>
													<div class="app-entry" style="background:#f5f5f5;">
														<div class="app-config js-config-region">
															<div class="app-field clearfix">
																<h1>
																	<span>注册</span>
																</h1>
															</div>
														</div>
														<div class="app-fields js-fields-region">
															<div class="login_regist">
			<img src="base/img/login_bg.png" />
			<div class="input username_input" style="margin-top:10px;">
				<label>账号：</label>
				<input type="tel" placeholder="请输入手机号码" name="loginName" id="username"/>
			</div>
			<div class="input">
				<label>密码：</label>
				<input type="password" placeholder="请输入密码" name="loginPass" id="password"/>
			</div>
			<p class="remember_pwd"><input type="checkbox" disabled checked>记住密码</p>
			<button id="login_btn" class="button btn-orange btn_ajax" disabled>
				<span>登录</span>
			</button>
			<div class="forget clearfix">
				<a class="text-gray pull-l" id="register_link">我要注册</a>
				<a class="text-gray pull-r" id="password_link">找回密码</a>
			</div>
		</div>
		     											</div>
		     										</div>
		     									</div>
		     								</div>
		     				</div>
		     				<div class="col-lg-7">
		     					<div class="form-group">
		     						<input type="checkbox" value="0"/ >
		     						<label>使用默认配置</label>
		     					</div>
		     					<div class="form-group">
		     						<button class="btn btn-info" style="width:130px;">上传顶部图</button>
		     						<a href="javascript:void(0);">清除</a>
		     						<span style="color;">√</span>
		     						<span class="tips"><em>*</em>图片尺寸比例建议（待定） 大小建议小于20KB</span>
		     					</div>
		     					<div class="form-group">
		     						<button class="btn btn-info" style="width:130px;">上传底部图</button>
		     						<a href="javascript:void(0);">清除</a>
		     						<span style="color;">√</span>
		     						<span class="tips"><em>*</em>图片尺寸比例建议（待定） 大小建议小于20KB</span>
		     					</div>
		     					<div class="form-group">
									<label class="inline">按钮颜色：</label>
									<input type="text" class="form-control inline diy_input diy-color-input"/>
									<input type="hidden" class="sele-color-val validate-item" id="color" name="color" value=""  data-type="require"><em class="required">*</em>
								</div>
								<div class="form-group" style="text-align: center;margin-top:150px;">
									<button class="btn btn-default" style="width:71px;margin-right:30px;">取消</button>
									<button class="btn btn-primary">下一步</button>
								</div>
		     				</div>
		     			</div>
		     		</div>
	            </div>
	        </aside>
	    </div>
	</body>
	
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/app.js" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui.min.js"></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui-i18n.js"></script>
	<script type="text/javascript" src="${ctx}/js/apps/registerSet/one-register-page.js" ></script>
</html>