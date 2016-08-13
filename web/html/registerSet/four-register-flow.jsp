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
		     				<div class="inline title-arrow">
		     					<span>设置注册页面</span>
		     					<div class="inline title-arrow-icon"></div>
		     				</div>
		     				<div class="inline title-arrow">
		     					<span>设置登录页面</span>
		     					<div class="inline title-arrow-icon"></div>
		     				</div>
		     				<div class="inline title-arrow">
		     					<span>设置忘记密码页面</span>
		     					<div class="inline title-arrow-icon"></div>
		     				</div>
		     				<div class="inline title-arrow">
		     					<span>注册流程设置</span>
		     					<div class="inline title-arrow-icon"></div>
		     				</div>
		     				<div class="inline title-arrow-un">
		     					<span>完成</span>
		     					<div class="inline title-arrow-icon-un"></div>
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
															<div class="regist step_first">
																<img src="${ctx}/img/regist_step.png" style="margin-top:30px;width:100%;">
																<div class="input phone_input">
																<!-- <label>手机号码</label> -->
																	<input type="tel" placeholder="请输入手机号码" id="mphoneNumber"/>
																</div>
																<div class="input code_input">
               														<div>
               															<input type="tel" name="checkCode" class="form-control" id="checkCodeId" placeholder="请输入验证码"/>
               															<div class="checkCodeDiv">
				 															图形验证码
               															</div>
               														</div>
            													</div>
																<div class="input">
																	<input type="tel" placeholder="请输入验证码" style="width: 100px;" name="theValidaCode" id="theValidaCode"/>
																	<button class="pull-r btn-code" id="getValidacode">获取验证码<em></em></button>
																</div>
																<div class="input">
																	<input type="password" placeholder="请设置登录密码" id="userPass">
																</div>
																<button class="btn-orange btn-step btn_ajax" disabled>
																	<span>注册</span>
																</button>
																<div class="forget">
																	<a class="text-gray" id="login_link">已有账号？立即登录</a>
																</div>
															</div>
		     											</div>
		     										</div>
		     									</div>
		     								</div>
		     				</div>
		     				<div class="col-lg-7">
		     					<div class="form-group">
		     						<p class="inline">完成手机号注册后是否需要会员完善个人信息？</p>
		     						<p class="inline"><a href="">配置会员信息</a></p>
		     						<p class="tips"><em>*</em>会员完成注册后系统将为会员生成商城账号，选择以下配置定义手机号注册完成后的跳转</p>
		     					</div>
		     					<div class="form-group">
		     						<input type="radio" value="" name="nextPage"/>
		     						<label>使用默认配置，跳转至商城</label>
		     					</div>
		     					<div class="form-group">
		     						<input type="radio" value="" name="nextPage"/>
		     						<label>跳转至个人中心完善页面</label>
		     					</div>
		     					<div class="form-group">
		     						<input type="radio" value="" name="nextPage"/>
		     						<label>注册完成后将提示会员完善个人信息，跳转至商城</label>
		     					</div>	
		     					<div class="form-group" style="text-align: center;margin-top:150px;">
									<button class="btn btn-default" style="width:71px;margin-right:30px;">上一步</button>
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