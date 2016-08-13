<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
		<link rel="stylesheet" href="${ctx}/css/apps/coupon-style.css?v=${v}" />
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
			 
			<aside class="right-side hidden-print">
				<!--内容正文-->
				<div class="box">
					<div style="padding: 20px 20px 0px;">
						<div class="form-group">
							<label class="control-label inline">开启注册审核：</label>
							<input type="checkbox" class="data-switch" id="openState" <c:if test="${setting.openState eq true }">checked</c:if> name="openState" onchange="changeState(this)"/>
						</div>
						<div class="form-group">
							<label class="control-label inline">申请提示信息：</label>
							<input type="text" style="width:700px;" disabled class="form-control inline apply_introduct" value="${setting.tipContent }" placeholder="请输入申请提示信息，200字以内" maxlength="200">
							<button class="btn btn-default edit_apply">编辑</button>
							<button class="btn btn-primary save_apply" style="display:none;">保存</button>
						</div>
					</div>
					<div class="nav-tabs-custom examine_navs">
						<ul class="nav nav-tabs">
							<li class="active examine-li" data-type="0"><a>待审核</a></li>
							<li class="examine-li" data-type="2"><a>已驳回</a></li>
							<li class="examine-li" data-type="1"><a>已通过</a></li>
						</ul>
					</div>
					<form id="searchform">
						<div class="search-panel">
							<div class="form-group inline">
	                            <label class="search-label inline" id="examine_phone" for="member_phone">手机号：</label>
	                            <input type="text" class="form-control inline" placeholder="请输入11位手机号" name="username" id="" data-url="" data-param="" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="11">
	                        </div>
	                        <div class="form-group inline">
	                            <label class="search-label inline">申请时间：</label>
	                            <input type="text" class="form-control inline s-time-input regist-time" name="startTime"  id="regist_timeStart" placeholder="开始时间" data-date-format="yyyy-mm-dd" onfocus="this.blur()"/> - 
	                            <input type="text" class="form-control inline s-time-input regist-time" name="endTime"  id="regist_timeEnd" placeholder="结束时间"  data-date-format="yyyy-mm-dd" onfocus="this.blur()"/>
	                        </div>
	                        <div class="inline pull-right">
	           					<a href="javascript:void(0);" class="reset-conditions"> 重置 </a>
	           					<button type="button" class="btn btn-info btn-search" >查询</button>
	           				</div>
						</div>
					</form>
					<div style="position:relative;">
						<div class="table-head-back" style="top:-1px;"></div>
						<div class="table-panel">
							<table class="table checkbox-table examine-table" id="examineListTable" data-table-type="0">
								<thead>
									<tr valign="middle">
										<th width="100px">注册手机号</th>
										<th width="150px">申请时间</th>
										<th>申请信息</th>
										<th width="180px">操作</th>
									</tr>
								</thead>
								<tbody id="examineList">
									
									<!--加载数据-->
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</aside>
		</div>
		<!--领取链接弹出框-->
		<div class="modal fade" id="examineDetailModal" tabindex="99" role="dialog" aria-labelledby=""examineDetailModal"" aria-hidden="true">
			<div class="modal-dialog-container">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
							<h4 class="modal-title">申请详情</h4>
						</div>
						<div class="modal-body noslim" style="height:300px;">
							<div class="form-group">
								<strong>注册手机号</strong>
								<span class="modal-user-name float-right">15800985625</span>
							</div>
							<div class="form-group">
								<p><strong>申请信息</strong></p>
								<p id="applyContent">申请信息申请信息申请信息申请信息申请信息申请信息申请信息申请信息申请信息申请信息</p>
								<input type="hidden" id="applyId">
							</div>
						</div>
						<div class="modal-footer examinr-footer0">
							<button class="btn btn-success agree_examine">同意</button>
							<button class="btn btn-danger reject_examine">驳回</button>
						</div>
						<div class="modal-footer examinr-footer2">
							<button class="btn btn-success agree_examine">通过</button>
							<button class="btn btn-danger delete_examine">删除</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--领取链接弹出框结束-->
		<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
		<script type="text/javascript" src="${ctx}/js/libs/timepicker/bootstrap-datetimepicker.js?v=${v}"></script>
		<script type="text/javascript" src="${ctx}/js/libs/cky/jq.page.js?v=${v}"></script>
		<script type="text/javascript" src="${ctx}/js/libs/switch/main.js?v=${v}"></script>
	    <script type="text/javascript" src="${ctx}/js/libs/switch/highlight.js?v=${v}"></script>
	    <script type="text/javascript" src="${ctx}/js/libs/switch/bootstrap-switch.js?v=${v}"></script>
		<script type="text/javascript" src="${ctx}/js/apps/customer/customer-examine.js?v=${v}" ></script>
	</body>
</html>