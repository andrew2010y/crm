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
               		<div class="present-edit-content">
               			<input type="hidden" id="presentId" value="${customerPresent.presentId}" />
               			<div class="form-group">
               				<label class="search-label inline" for="sendnewsname" >礼遇名称：</label>
               				<input type="text" class="form-control inline" value="${customerPresent.name }" name="sendnewsname" placeholder="请输入礼遇名称，10字以内"  id="sendnewsscope" data-inputtype="bytelimit" data-bytelimit="20" />
               			</div>
                   		<div class="form-group present-content-setting">
                   			<span class="search-label inline" for="presentType" >礼遇内容：</span>
                   			<input type="radio" id="coupon" name="present-type" <c:if test="${customerPresent.type==0 || empty customerPresent.type}">checked</c:if> />
                   			<label for="coupon" class="label-content">优惠券</label>
                   			<input type="radio" id="richtext" name="present-type" <c:if test="${customerPresent.type==1 }">checked</c:if> />
                   			<label for="richtext" class="label-content">自定义页面</label>
                   			<input type="radio" id="link" name="present-type" <c:if test="${customerPresent.type==2 }">checked</c:if> />
                   			<label for="link" class="label-content">外部链接</label>
                   			<input type="text" class="form-control inline add-link" value="${customerPresent.presentUrl }" placeholder="请粘贴入链接地址http://" style="display:none;" />
                        </div>
                        <div class="add-coupon" style="display:none;">
                        	<p class="clearfix">
                        		<span class="tips">请添加优惠券，若添加有多张优惠券，会员在领取礼遇时会一并领取。</span>
                        		<button class="btn btn-info float-right" id="addCoupon">添加优惠券</button>
                        	</p>
                        	<div class="table-panel">
                        		<table class="table dataTable" aria-describedby="example2_info" id="presentListTable">
                        			<thead>
                        				<tr>
                        					<th>优惠券名称</th>
                        					<th>优惠券种类</th>
                        					<th>优惠券面额</th>
                        					<th>库存</th>
                        					<th>有效期</th>
                        					<th>操作</th>
                        				</tr>
                        			</thead>
                        			<tbody>
                        				<c:if test="${empty customerPresent.coupon || fn:length(customerPresent.coupon)==0}">
                        				<tr><td colspan="6" class="center">暂无数据</td></tr>
                        				</c:if>
                        				<c:forEach items="${customerPresent.coupon}" var="coupon">
                        				<tr>
                        				<input type="hidden" value="${coupon.couponId}" class="coupon-id" />
                        					<td style="text-align:center;">${coupon.title }</td>
                        					<td>
                        					<c:if test="${coupon.type==1 }" >抵用券</c:if>
                        					<c:if test="${coupon.type==2 }" >折扣券</c:if>
                        					</td>
                        					<td>${coupon.faceAmount }</td>
                        					<td>${coupon.remainingAmount }</td>
                        					<td>${fn:substring(wxcrm:formatDate(coupon.startTime),0,10)}  ——  ${fn:substring(wxcrm:formatDate(coupon.endTime),0,10)}</td>
                        					<td><a class="delete-btn" href="javascript:void(0);">删除</a></td>
                        				</tr>
                        				</c:forEach>
                        			</tbody>
                        		</table>
                        	</div>
                        </div>
                        <div class="add-richtext" style="display:none;">
                        	<input type="hidden" id="richtextId" value="${customerPresent.presentArticle.presentId}" />
                        	<div>
								<label>页面名称：</label>  
								<input type="text" class="form-control inline" id="richTextName" value="${customerPresent.presentArticle.name }" placeholder="请输入礼遇名称，10字以内" data-inputtype="bytelimit" data-bytelimit="20" />                      	
                        	</div>
                        	<div id="uecontent" class="uecontent-box" style="height:400px;">
	              				<textarea style="display: none;" name="entity.richText_url" id="rich_text_html">${customerPresent.presentArticle.content }</textarea>
	              			</div>
                        </div>
                        <div class="present-scope">
                        	<div class="clearfix">
                       			<span>选择礼遇范围</span>
                       			<span class="tips present-scope-tips">标签内的会员将在个人中心收到礼遇提醒。</span>
                       			<span class="float-right present-cus-total">当前可领取会员<span class="num">${customerPresent.countNum }</span></span>
                       			<span class="float-right counting">统计中...</span>
                       		</div>
                       		<div class="tags-box">
                       			<c:if test="${empty customerPresent.tag || fn:length(customerPresent.tag)==0 }">
                       			<p style="text-align:center;">暂无数据</p>
                       			</c:if>
                       			<c:forEach var="tag" items="${customerPresent.tag }">
                       				<input type="hidden" class="tag-id" value="${tag.tagId }" />
                       				<c:if test="${tag.select==1 }">
                       					<span class="checked-label-span ellipsis">${tag.name }</span>
                       				</c:if>
                       				<c:if test="${tag.select==0 }">
                       					<span class="unchecked-label-span ellipsis">${tag.name }</span>
                       				</c:if>
                       			</c:forEach>
                       		</div>
                       </div>
                       <div class="center"> 
                       		<a class="btn btn-default btn-cancel" href="${ctx}/back/customer/present/list">取消</a>
                       		<button class="btn btn-primary" id="btn-save" style="width:84px;">保存</button>
                       </div>
                    </div>
           		</div>
      		</aside>
		</div>
		<!-- 添加优惠券弹框 -->
        <div class="modal fade" id="couponModal" tabindex="99"	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content" style="height:450px;">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="myModalLabel">选择优惠券</h4>
					 </div>
					<div class="modal-body" style="height:400px;">
						<div class="clearfix">
							<div class="float-right">
								<label class="inline">查询：</label>
								<input type="search" class="form-control input-search inline" placeholder="输入优惠券名称" id="searchInput"/>
							</div>
						</div>
						<div class="table-panel" style="margin-top:10px;">
							<table class="table dataTable table-bordered" aria-describedby="example2_info" id="couponListTable">
								<thead>
									<tr>
										<th class="center">优惠券名称</th>
										<th>种类</th>
										<th>面额</th>
										<th>剩余库存</th>
										<th class="center">操作</th>
									</tr>						
								</thead>
								<tbody id="couponTable">
								</tbody>
							</table>
						</div>	
					</div>
				</div>
			</div>
		</div>
		<input type="hidden" value="${customerPresent.presentId }" id="presentId" />
		<input type="hidden" value="${customerPresent.storeId }" id="storeId" />
 	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/timepicker/bootstrap-datetimepicker.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/cky/jq.page.js?v=${v}"></script>
	<script src="${ctx}/js/libs/ueditor/ueditor.config.js?v=${v}"></script>
    <script src="${ctx}/js/libs/ueditor/ueditor.all.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/apps/present/creat-present.js?v=${v}" ></script>
</html>