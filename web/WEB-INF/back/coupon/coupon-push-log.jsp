<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ include file="/WEB-INF/include/taglib.jsp"%>
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
		<title>发放历史</title>
	</head>
	<body class="skin-blue fixed">
		<!-- include nav.jsp -->
		<jsp:include page="/WEB-INF/include/nav.jsp"></jsp:include>		 
		 
		<div class="wrapper row-offcanvas row-offcanvas-left">
			<!--三级菜单-->
			<jsp:include page="/WEB-INF/back/menu/menu.jsp"></jsp:include>
			 
			<aside class="right-side">
               	<div class="box table-box">
               		<div class="label_m_col lable_list">
               			<div class="m_col_t_div">
               				<div class="m_title">所有历史</div>
               				<div class="m_r_div oran_text">
               					<span id="changeSortType">有效转化↑↓</span>
               				</div>
               			</div>
               			<div class="labels_list">
               				<ul class="labels_ul" id="labels-ul" data-totalCount="">
               				</ul>
               			</div>
               		</div>
               		<div class="label_m_col funnel_col">
               			<div class="curLabel-ope">
           					<input type="hidden" id="curLableId"  value="1"/>
           					<span class="coupon_name ellipsis" id="curLableName"></span>
               			</div>
               			<div class="curLabel-date">
               				<span class="ope_center" id="curCouponStatus">已发放</span>
           					<div class="ope_right">
           						<label>发送时间：</label>
           						<span class="cou_send_time"></span>
           					</div>
           				</div>
           				<div class="transform-div ">
           					<div class="transform-left">
           						<div class="transform-line">
           							<span class="tf-icon goal-icon"></span>
           							<label>目标会员：</label>
           							<span class="tf-val goal-count"></span>
           						</div>
           						<div class="transform-line">
           							<span class="tf-icon real-icon"></span>
           							<label>核销会员：</label>
           							<span class="tf-val real-count"></span>
           						</div>
           					</div>
           					<div class="transform-right">
           						<div  class="chart transform-dashboard" id="transformChart">
           						</div>
           					</div>
           				</div>
	               		<div class="">
	                        <div class="box-body chart-responsive">
	                            <div class="chart" id="couponChart" style="height: 400px;width: 99%;"></div>
	                        </div>
	               		</div>
	               		<div class="msg_div">
	               			<div class="msg_item wechat">
	               				<div class="msg-title">
	               					<label>发放渠道：</label>
	               					<span class="msg-type">微信</span>
	               				</div>
	               				<div class="msg_item_info">
	               					<div class="msg-img-div">
	               						<img class="msg_img" src="${ctx}/img/256.jpg" />
	               					</div>
               						<div class="msg_info">
               							<div class="msg_line">
               								<label>页面标题：</label>
               								<span class="msg_title"></span>
               							</div>
               							<div class="msg_line">
               								<label>发放文案：</label>
               								<span class="msg_content"></span>
               							</div>
               						</div>
               					</div>
               					<span class="msg-icon wechat"></span>
             				</div>
	               			<div class="msg_item phone">
	               				<div class="msg-title">
	               					<label>发放渠道：</label>
	               					<span class="msg-type">短信</span>
	               				</div>
               					<div class="msg_item_info">
               						<div class="msg_info">
               							<div class="msg_line">
               								<label>发放文案：</label>
               								<span class="msg_content"></span>
               							</div>
               							<div class="msg_line">
		               						<label>备注：</label>
		        							<span class="msg_comm_info"></span>
		               					</div>
               						</div>
               					</div>
	               				<span class="msg-icon msg"></span>
	               			</div>
	               		</div>
               		</div>
               	</div>
            </aside>
		</div>
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/cky/jq.page.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/echarts/echarts.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/apps/coupon/coupon-history.js?v=${v}" ></script>
</html>