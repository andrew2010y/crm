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
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/timepicker/bootstrap-datetimepicker.min.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/libs/font-awesome.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/ionicons.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/AdminLTE.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/apps/main.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/apps/present/present.css?v=${v}" />
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
		     			<span class="product-title">会员礼遇</span>
		     		</div>
		     		<div class="add-present">
                 		<a href="${ctx}/back/customer/present/to-save" class="btn btn-info"> 新增礼遇 </a>
                 	</div>
					<!-- 礼遇列表 -->
               		<div class="table-head-back" style="margin-top: -1px;"></div>
               		<div class="table-panel">
						<table class="table user-table" aria-describedby="example2_info" id="presentListTable">
							<thead>
								<tr valign="middle">
									<th width="150px">礼遇名称</th>
									<th width="300px">礼遇对象</th>
									<th width="250px">礼遇内容</th>
									<th>领取人数</th>
									<th>
										<span>礼遇优先级调整</span>
										<i class="tips-icon" id="tips-icon" data-toggle="popover" data-container="body" data-placement="top" data-content="当同一用户满足多个礼遇条件时显示优先级高的礼遇，列表排序越靠上礼遇优先级越高">
											<img src="${ctx}/img/tips-icon.png"/>
										</i>
									</th>
									<th >操作</th>
								</tr>
							</thead>
							<tbody id="presentList" data-tmp="template1">
							
							</tbody>
						</table>
					</div>
           		</div>
      		</aside>
		</div>
		<!-- 查看全部标签弹出层 -->
		<div class="modal fade" id="tags_modal" tabindex="99"	role="dialog" aria-labelledby="tagsLabel">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" style="text-align:center;">推送范围</h4>
					 </div>
					<div class="modal-body">
						<div class="more-tags-content">
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 查看全部标签弹出层结束 -->
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/timepicker/bootstrap-datetimepicker.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/app.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/cky/jq.page.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/apps/present/present-list.js?v=${v}" ></script>
</html>