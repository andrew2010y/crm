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
		<link rel="stylesheet" href="${ctx}/css/apps/wechat/msgmass.css?v=${v}" />
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
		     			<span class="product-title">微信推送</span>
		     			<span class="tips">*将<a target="_blank" href="https://mp.weixin.qq.com/">微信公众平台</a>的图文素材，通过<a target="_blank" href="${ctx}/back/tag/list" >会员标签</a>分类投放，实现精准投放</span>
		     			<!-- 未授权隐藏 -->
		     			<c:if test="${authState==1}">
		     			<span class="b-line float-right"><i style="margin-right:5px;"><img src="${ctx}/img/auth-icon.png"/></i>已授权</span>
		     			</c:if>
		     		</div>
               		<div class="search-panel">
            			<div class="form-group clearfix">
                 			<div class="inline float-right">
                 				<a href="${ctx}/back/wechat/msg-mass/create" class="btn btn-info"> 新建微信推送 </a>
                 				<button  class="btn btn-info btn-search" style="margin:0 30px;" >查询</button>
                   				<button  class="btn btn-info reset"> 重置 </button>
                   			</div>
                   		</div>
                   		<div class="normal-search-panel">
                   			<form method="post" id="sendNewsSearchform">
                   			<div class="">
                   				<div class="form-group inline">
                                    <label class="search-label inline" for="sendnews_time">推送时间：</label>
                                    <input type="text" class="form-control inline" name="queryDate"  id="sendnews_time" placeholder="请选择推送时间" data-date-format="yyyy-mm-dd" onfocus="this.blur()"/> 
                                </div>
                                <div class="form-group inline">
                                    <label class="search-label inline" for="sendnews_name">推送名称：</label>
                                    <input type="text" class="form-control inline" placeholder="请输入推送名称" name="title" id="sendnews_name" data-inputtype="bytelimit" data-bytelimit="20">
                                </div>
                                <div class="form-group inline">
                                    <label class="search-label inline" for="sendnews_status" style="width:120px;">微信审核状态：</label>
                                    <select name="status" class="form-control inline" id='sendnews_status'>  
						                <option value=''>--全部--</option>  
						                <option value='0'>推送中</option>
						                <option value='1'>推送成功</option>
						                <option value='2'>推送失败</option>
						            </select>  
                                </div>
                   			</div>
                   			</form>
                   		</div>
                    </div>
					<!-- 推送信息列表 -->
               		<div class="table-head-back" style="margin-top: -1px;"></div>
               		<div class="table-panel">
						<table class="table user-table" aria-describedby="example2_info" id="sendNewsListTable">
							<thead>
								<tr valign="middle">
									<th>推送名称</th>
									<th width="150px">推送时间</th>
									<th width="270px">推送范围</th>
									<th>推送人数</th>
									<th>推送成功人数</th>
									<th style="text-align: right;">微信审核反馈</th>
								</tr>
							</thead>
							<tbody id="sendNewsList" data-tmp="template1">
								
							</tbody>
						</table>
					</div>
           		</div>
      		</aside>
		</div>
		<!--授权状态对话框-->
		<c:if test="${authState==0}">
		<div class="modal fade" id="unauth_modal" tabindex="99"	role="dialog" aria-labelledby="unauthLabel" style="display:block;">
			<div class="modal-dialog">
				<div class="modal-content" style="height:300px;">
					<div class="modal-header">
					    <h4 class="modal-title">请先进行微信授权</h4>
					 </div>
					<div class="modal-body">
						<div class="form-group auth-mode-content">
							<i class="inline"><img src="${ctx}/img/tip-icon.png" /></i>
							<span class="auth-mode-content-text">微信推送功能可以将微信公众平台的图文素材，指定推送给关注公众号的特定的粉丝（每个粉丝每个月只能接收服务号的4次推送消息）。
       										本功能需要微信公众平台授权后才可以使用。
       						</span>
						</div>
						<div class="modal-body-operation">
							<button class="btn btn-default" id="authSuc" style="margin-right:20px;">授权完成</button>
							<a class="btn btn-info" id="auth-btn" target="_blank" href="${ctx}/back/wechat/go-author">前往授权</a>
						</div>
						<p class="text-red unauth-tips">授权尚未成功，请先进行微信授权</p>
					</div>
				</div>
			</div>
		</div>
		</c:if>
		<!--授权状态对话框结束-->
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
		<input type="hidden" id="authStatus" value="${authState}" />
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/timepicker/bootstrap-datetimepicker.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/app.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/cky/jq.page.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/CityUtils.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/apps/wechat/msgMass/list.js?v=${v}" ></script>
</html>