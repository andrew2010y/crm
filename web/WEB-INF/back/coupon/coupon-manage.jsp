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
						<div class="nav-tabs-custom coupon_navs">
							<ul class="nav nav-tabs">
								<li class="active coupon-li" data-type=""><a>所有优惠券</a></li>
								<li class="coupon-li" data-type="1"><a>未生效</a></li>
								<li class="coupon-li" data-type="2"><a>已生效</a></li>
								<li class="coupon-li" data-type="3"><a>已失效</a></li>
							</ul>
						</div>
						<div class="batch_operation buttons-panel">
								<button class="btn btn-warning" onclick="toCouponAdd();">新建优惠券</button>
								<button class="btn btn-primary btn-all-push">批量生效</button>
								<button class="btn btn-primary btn-all-loseE">批量失效</button>
								<span id="nouseCouponTips" class="tips" style="display:none;">*系统将在30天后自动删除已失效的优惠券中未领取的优惠券码</span>
								<div class="pull-right search-div">
									<input type="text" class="form-control search_input inline" placeholder="优惠券名称" id="inputName">
									<span class="search_icon"></span>
								</div>
						</div>
						<div style="position:relative;">
						<div class="table-head-back" style="top:-1px;"></div>
						<div class="table-panel">
							<table class="table checkbox-table coupon-table" id="couponListT" data-table-type="0">
								<thead>
									<tr valign="middle">
										<th width="25px">
											<input type="checkbox" class="icheckbox_minimal order_checkbox_all">
										</th>
										<th>优惠券名称</th>
										<th>类型/场景</th>
										<th>面额/库存</th>
										<th>领取</th>
										<th>使用</th>
										<th>有效期</th>
										<th>门店/操作</th>
									</tr>
								</thead>
								<tbody id="storeList">
									<!--加载数据-->
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</aside>
		</div>
		<!--领取链接弹出框-->
		<div class="modal fade" id="getCouponLinkModal" tabindex="99" role="dialog" aria-labelledby="getCouponLinkLabel" aria-hidden="true">
			<div class="modal-dialog-container">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
							<h4 class="modal-title" id="getCouponLinkLabel">优惠券详情</h4>
						</div>
						<div class="modal-body" style="height: 530px;">
							<div class="order_detai_tables">
								<div class="couponTableHeader">
									<input type="text" id="couponsUrl" class="link_input form-control inline_block" readonly="readonly" value=""/>
									<div class="modal_table_actions">
										<button class="btn btn-primary btn-copyLink" data-clipboard-target="couponsUrl">复制链接</button>
										<a class="btn btn-primary btn-saveQRCode" id="aCode" download="code" >保存二维码</a>
									</div>
									
								</div>
								<table class="table no-border coupon_link_table" id="coupon_link_table" data-id="">
									<thead>
										<tr>
											<th>优惠券编码</th>
											<th>状态</th>
											<th>会员</th>
											<th>更新时间</th>
										</tr>
									</thead>
									<tbody id="cardList">
									</tbody>
								</table>
							</div>
						</div>
						<div class="modal-footer">
							<button class="btn btn-primary btn-coupon-opera"></button>
							<button class="btn btn-primary btn-export">导出Excel</button>
							<button type="button" class="btn btn-default" data-dismiss="modal">关闭 </button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--领取链接弹出框结束-->
		<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
		<script type="text/javascript" src="${ctx}/js/libs/timepicker/bootstrap-datetimepicker.js?v=${v}"></script>
		<script type="text/javascript" src="${ctx}/js/libs/cky/jq.page.js?v=${v}"></script>
		<script type="text/javascript" src="${ctx}/js/apps/coupon/coupon-manage.js?v=${v}" ></script>
	</body>
</html>