<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<html>
	<head>
		<meta charset="utf-8">
		<!-- IE能够使用最新渲染模式而不是兼容模式 -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!-- 国产浏览器默认采用“高速”模式渲染页面 -->
		<meta name="renderer" content="webkit">
		<!--title上的icon-->
		<link rel="shortcut icon" href="${ctx}/img/favicon.ico" >
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/timepicker/bootstrap-datetimepicker.min.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap-switch.min.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/font-awesome.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/ionicons.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/AdminLTE.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/apps/main.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/apps/app-monitor.css?v=${v}" />
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		    <script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
		    <script src="http://apps.bdimg.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		<title>舞象数据中心</title>
	</head>

	<body class="skin-blue fixed" >
		<!-- include nav.jsp -->
		<jsp:include page="/WEB-INF/include/nav.jsp"></jsp:include>
		 
		<div class="wrapper row-offcanvas row-offcanvas-left">
			<!--三级菜单-->
			<jsp:include page="/WEB-INF/back/menu/menu.jsp"></jsp:include>
			 
			<aside class="right-side">
            	<!--条件搜索-->
               	<div class="box">
               		<div class="product-head">
		     			<span class="product-title">菜单配置</span>
		     			<span class="tips">*请先前往<a href="${ctx}/back/wechat/auth">微信配置</a>，配置完成基础信息后，进行菜单配置</span>
		     			<span style="float:right">微信配置状态：<span id="wechat_config_status"></span></span>
		     		</div>
	        		<div class="product-body goods-body">
       					<!-- hidden start -->
       					<!-- hidden end -->
                         <div class="product-info product-new-info no-border member-card clearfix">
                         	<div class="app-inner clearfix">
								<div class="app-init-container">
									<div class="app__content">
										<div class="app-design clearfix">
											<div class="app-preview">
												<div class="app-header"></div>
												<div class="app-entry no-border-bottom">
													<div class="app-config js-config-region">
														<div class="app-field clearfix">
															<h1>
																<span></span>
															</h1>
														</div>
													</div>
													<div class="app-fields js-fields-region">
														<div class="app-fields ui-sortable">
															
														</div>
													</div>
													<div class="bottom-field">
														<div>
															<ul class="first-menu-ul">
																<li class="key-li"></li>
																<c:forEach var="wechat" items="${WechatMenuList.result}" varStatus="index">
																	<li class="b-menu-item parent-menu-item" data-type="${wechat.type}" data-menuid="${wechat.wechatMenuId}" data-parentid="${wechat.parentId}">
																		<i class="p-icon"></i><span class="menu-text first-menu-text">${wechat.name}</span>
																		<div class="sub-menu-div">
																			<div class="arrow"></div>
																			<ul class="sub-menu-ul" data-parentId="${wechat.wechatMenuId}">
																				<li class="b-menu-item enabled add-menu" data-type="1" <c:if test="${fn:length(wechat.childList) >= 5}">style="display:none;"</c:if>></li>
																				<c:forEach var="wechatSecond" items="${wechat.childList}" varStatus="cIndex">
																					<li class="b-menu-item enabled" data-parentid="${wechatSecond.parentId}" data-type="${wechatSecond.type}" data-menuid="${wechatSecond.wechatMenuId}">
																						<span class="menu-text">${wechatSecond.name}</span>
																					 </li>
																				</c:forEach>
																			</ul>
																		</div>
																	</li>
																</c:forEach>
																<c:if test="${fn:length(WechatMenuList.result) eq 0}">
																	<li class="b-menu-item parent-menu-item add-menu"></li>
																	<li class="b-menu-item parent-menu-item add-menu"></li>
																	<li class="b-menu-item parent-menu-item add-menu"></li>
																</c:if>
																<c:if test="${fn:length(WechatMenuList.result) eq 1}">
																	<li class="b-menu-item parent-menu-item add-menu"></li>
																	<li class="b-menu-item parent-menu-item add-menu"></li>
																</c:if>
																<c:if test="${fn:length(WechatMenuList.result) eq 2}">
																	<li class="b-menu-item parent-menu-item add-menu"></li>
																</c:if>
															</ul>
														</div>
													</div>
												</div>
											</div>
											<div class="app-sidebar arrow-b">
												<div class="arrow"></div>
												<div class="app-sidebar-inner js-sidebar-region">
													<div>
														<form class="form-horizontal" novalidate="" id="wechat-menu-form" method="post" enctype="multipart/form-data">
															<div class="sidebar-header">
																<div class="config-title">菜单信息</div>
																<a class="blue_a delete-m-btn btn">删除菜单</a>
															</div>
															<div class="right-items">
															<c:forEach var="pMenu" items="${WechatMenuList.result}" varStatus="pIndex">
																<!-- 父菜单信息 -->
																<div class="right-item" data-menuid="${pMenu.wechatMenuId}" <c:if test="${pIndex.count-1 eq 0 }">style="display:block;"</c:if>>
																	<div class="parent-item right-m-item" data-menuid="${pMenu.wechatMenuId}"  style="display:block;">
																		<p class="item-tips">已添加子菜单，仅可设置菜单名称。</p>
																		<div class="control-group">
																			<label class="control-label">菜单名称：</label>
																			<div  class="controls">
																				<input type="text" id="menu-title" class="form-control menu-title validate-item" data-type="require" data-inputtype="bytelimit" data-bytelimit="8" value="${pMenu.name}" placeholder="菜单名称">
																			</div>
																			<p class="control-tips">菜单名称长度不超过4个汉字或8个字母</p>
																		</div>
																		<div class="control-group menu-link-div" <c:if test="${pMenu.type eq 0}">style="display:none;"</c:if>>
																			<label class="control-label">菜单链接：</label>
																			<div class="controls">
																				<input type="text" id="menu-link" class="form-control menu-link validate-item" <c:if test="${pMenu.type eq 1}">data-type="require,url"</c:if> value="${pMenu.url }"
																					placeholder="菜单链接">
																			</div>
																			<p class="control-tips">链接格式如：https://www.xxx.com</p>
																		</div>
																	</div>
																	<!-- 子菜单信息 -->
																	<c:forEach var="cMenu" items="${pMenu.childList}" varStatus="cIndex">
																		<div class="child-item right-m-item" data-menuid="${cMenu.wechatMenuId}" data-parentId="${pMenu.wechatMenuId}" style="display:block;">
																			<div class="control-group">
																				<label class="control-label">菜单名称：</label>
																				<div class="controls">
																					<input type="text" id="menu-title" class="form-control menu-title validate-item" data-type="require" data-inputtype="bytelimit" data-bytelimit="16" value="${cMenu.name }" placeholder="菜单名称">
																				</div>
																				<p class="control-tips">菜单名称长度不超过8个汉字或16个字母</p>
																			</div>
																			<div class="control-group">
																				<label class="control-label">菜单链接：</label>
																				<div class="controls">
																					<input type="text" id="menu-link" class="form-control validate-item menu-link" data-type="require,url" value="${cMenu.url }" placeholder="菜单链接">
																				</div>
																			</div>
																		</div>
																	</c:forEach>
																</div>
															</c:forEach>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
                        </div>
                       	<div class="product-buttons clearfix">
        					<button class="btn btn-primary btn-enableSort" style="float:left;margin-left:180px;display:none">菜单排序</button>
        					<button class="btn btn-primary btn-save" style="display:none">保存并发布</button>
        				</div>
        			</div>
               	</div>
            </aside>
		</div>
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui.min.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/Sortable.min.js?v=${v}" ></script>
    <script type="text/javascript" src="${ctx}/js/apps/wechatmenu/wechat-menu-setup.js?v=${v}"></script>
</html>
