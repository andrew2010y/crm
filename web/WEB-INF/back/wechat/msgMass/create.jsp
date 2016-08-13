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
		     			<span class="b-line float-right"><i style="margin-right:5px;"><img src="${ctx}/img/auth-icon.png"/></i>已授权</span>
		     		</div>
               		<div class="content-box">
               			<div class="send-news-name form-group">
               				<label class="search-label inline" for="sendnewsname" >推送名称：</label>
               				<input type="text" class="form-control inline" name="sendnewsname" placeholder="请输入推送名称，10字以内"  id="sendnewsscope" data-inputtype="bytelimit" data-bytelimit="20" />
               				<span class="tips ">推送名称仅供数据中心操作记录查询，您推送的会员将不会看到此信息。</span>
               			</div>
                   		<div class="send-news-mode form-group">
                   			<span class="search-label inline">素材选择：</span>
                   			<div class="send-news-mode-btn inline" id="addModelBtn">
                   				<div class="add-material">
                   					<span style="font-size:120px;font-weight:100;">+</span>
                   					<p style="color:#a4a4a4;margin-top:-35px;">添加微信素材</p>
                   				</div>
                   				<div class="exist-material">
                   					<div id="material" class="clearfix"></div>
                   				</div>
                   			</div>
                   			<span class="tips inline">所有推送素材均来自微信公众平台，您可以到<a target="_blank" href="https://mp.weixin.qq.com/">微信公众平台</a>进行维护更新素材。</span>
                        </div>
                        <div class="send-range-setting">
                       		<div class="send-range-check">
                       			<span class="inline">选择推送范围</span>
                            	<input type="radio" class="" id="allSend" style="margin-left:20px;" name="sendnewsscope" checked/>
                            	<label>全体推送</label>
                                <input type="radio" class="" id="partSend" style="margin-left:20px;" name="sendnewsscope" />
                                <label>精准推送</label>
                                <span class="send-range-setting-total">预计推送数量<span class="num">0</span><span class="tips">（关注微信公众号用户）</span></span>
                            	<span class="counting">统计中...</span>
                            </div>
                       		<div class="tags-box">
                       			<c:if test="${empty tagList || fn:length(tagList)==0 }">
                       			<p style="text-align:center;">暂无数据</p>
                       			</c:if>
                       			<c:forEach var="tag" items="${tagList}" >
                       			<div class="tag" style="display:inline-block;">
                       				<input type="hidden" class="tag-id" value="${tag.tagId}" />
                       				<span class="unchecked-label-span ellipsis tag-name" >${tag.name}</span>
                       			</div>	
                       			</c:forEach>
                       		</div>
                       </div>
                       <div style="text-align:center;margin-top:45px;"> 
                       		<a class="btn btn-default" href="${ctx}/back/wechat/msg-mass/list" style="margin-right:54px;width:84px;">返回</a>
                       		<button class="btn btn-primary" id="sendBtn" style="width:84px;">推送</button>
                       </div>
                    </div>
           		</div>
      		</aside>
		</div>
		<!-- 素材选择框 -->
		<div class="modal fade" id="add_modal" tabindex="99" role="dialog" aria-labelledby="">
			<div class="modal-dialog" style="width:1026px;height:600px;top:-125px;">
				<div class="modal-content" style="height:600px; position:relative">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title">微信消息素材</h4>
					</div>
					<div class="modal-body">
						<div id="addNewsContent" >
						</div>
					</div>
					<div class="modal-body-operation btn-box">
							<button class="btn btn-primary" style="width:84px;" data-dismiss="modal" id="cannelBtn">取消</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 素材选择框结束 -->
		<!--推送确认对话框-->
		<div class="modal fade" id="send_modal" tabindex="99"	role="dialog" aria-labelledby="">
			<div class="modal-dialog"  style="width:355px;height:500px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" style="text-align:center;font-size:18px;">推送确认</h4>
					</div>
					<div class="modal-body" style="text-align:center;">
						<div id="sendLastContent" class="clearfix">
						</div>
						<p>向<span class="number"></span>名粉丝推送</p>
						<div class="modal-body-operation">
							<button class="btn btn-primary" data-dismiss="modal" id="confrimBtn" style="width:84px;margin-right:20px;">确定</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--推送确认对话框结束-->
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/timepicker/bootstrap-datetimepicker.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/app.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/cky/jq.page.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/masonry.pkgd.min.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/apps/wechat/msgMass/creat.js?v=${v}" ></script>
</html>