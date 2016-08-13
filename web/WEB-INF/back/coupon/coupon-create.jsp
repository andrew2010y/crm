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
			 
		<!--网页内容-->
		<aside class="right-side">
			<!--内容正文-->
						<div class="box">
							<div class="box-body">
								<div class="app-inner clearfix">
									<div class="app-init-container">
										<div class="app__content">
											<div class="app-design clearfix without-add-region">
												<div class="page-promocode">
													<div class="app-preview">
														<div class="app-header"></div>
														<div class="app-entry">
															<div class="app-config js-config-region">
																<div class="app-field clearfix">
																	<h1>
																		<span></span>
																	</h1>
																</div>
															</div>
															<div class="app-fields js-fields-region">
																<div class="app-fields ui-sortable ">
																	<div class="app-field clearfix coupon-field">
																		<div class="field_con clearfix">
																			<div class="field-row text-center">
																				<img class="c-logo" alt="" src="${store.logo}">
																				<p class="store-title">${store.name}</p>
																				<button class="btn btn-primary use-coupon">使用</button>
																			</div>
																		</div>
																		<div class="app-field-row dotted-top">
																			<span class="row-title">折扣券详情</span>
																			<span class="row-arrow-right float-right"></span>
																		</div>
																		<div class="app-field-row no-border">
																			<span class="row-title">公众号</span>
																			<span class="row-arrow-right float-right"></span>
																		</div>
																	</div>
																	<div class="app-field-row user-set-coupon">
																		<span class="row-title">自定义入口（选填）</span>
																		<span class="row-arrow-right float-right"></span>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="app-sidebar">
														<div class="arrow"></div>
														<div class="app-sidebar-inner js-sidebar-region">
															<div>
															<input type="hidden" id="coupon-status" value="${coupon.status }">
																<form class="form-horizontal" novalidate=""	id="add-couon-form" method="post" enctype="multipart/form-data">
																
																	<h1 class="config-title">基础信息</h1>
																	<div class="control-group">
																		<label class="control-label"><em class="required">*</em>优惠券名称：</label>
																		<div class="controls">
																			<input type="hidden" name="couponId" id="couponId" value="${coupon.couponId}">
																			<input type="text" name="infoCoupons.name" id="coupon-name" class="form-control inline" data-type="require" value="${coupon.title}" placeholder="最多支持9个汉字" maxlength="18">
																		</div>
																	</div>
																	<div class="control-group">
																		<label class="control-label">优惠券颜色：</label>
																		<div class="controls" id="color-input">
																			<input type="text" class="form-control inline h-border diy_input diy-color-input" readonly/>
																			<input type="hidden" name="color" id="color" class="sele-color-val" data-type="require" value="${couponExpand.color}" >
																		</div>
																	</div>
																	<div class="control-group">
																		<label class="control-label"><em class="required">*</em>类型：</label>
																		<div class="controls">
																			<div class="controls_div">
																				<input type="radio" id="type-dy" name="coupon-type" value="1"
																				<c:if test="${coupon.type!=2}"> 
																				 checked="checked"
																				</c:if>
																				>
																				<label for="type-dy">抵用券</label>
																			</div>
																			<div class="controls_div">
																				<input type="radio" id="type-zk" name="coupon-type" value="2"
																				<c:if test="${coupon.type==2}"> 
																				 checked="checked"
																				</c:if>
																				> 
																				<label for="type-zk">折扣券</label>
																			</div>
																			<input type="hidden" name="" id="coupon-type" value="" />
																		</div>
																	</div>
																	<div class="control-group">
																		<label class="control-label"><em class="required">*</em>发放量：</label>
																		<div class="controls">
																			<div class="controls_div">
																				<input type="text" name="" class="form-control inline" id="quantity" value="${coupon.quantity}" placeholder=""
																					onkeyup="this.value=this.value.replace(/\D/g, '');if(this.value>100000) this.value=100000; ">
																				<span class="add-on">张</span>
																			</div>
																			<div class="controls_div">
																				<label>会员数：</label><span>${customerCount}人</span>
																				<input id="customerCount" type="hidden" value="${customerCount}">
																			</div>
																		</div>
																	</div>

																	<div class="control-group">																		
																		<div class="controls dy-coupon" style="margin-left:0;
																			<c:if test="${coupon.type==2}"> 
																		 display: none;
																		</c:if>
																		">
																			<label class="control-label"><em class="required">*</em>面额：</label>
																			<div class="controls_div">
																				<input type="text" id="coupon-val" name="" class="form-control inline js-only-float"  
																				<c:if test="${coupon.type==1}"> 
																					value="<fmt:formatNumber type="number" value="${coupon.faceAmount/100}" maxFractionDigits="0"/>"
																				</c:if>
																				maxlength="8">
																				<span class="add-on">元</span>
																			</div>
																			<div class="controls_div" style="display: none;">
																				<input type="checkbox" id="coupon-range" name="coupon_range">
																				<label for="coupon-range">范围内随机</label>
																			</div>
																			<div class="controls_div coupon-range" style="margin-left:100px;margin-top:4px;">
																				<input type="text" id="coupon-sval" name="" class="m-input js-only-float" value="" maxlength="8">
																					<span class="add-on">-</span>
																				<input type="text" id="coupon-eval" name="" class="m-input js-only-float" value="" maxlength="8">元
																			</div>
																			<input type="hidden" id="isValRange" name="" value="" />
																		</div>
																		<div class="controls zk-coupon" style="margin-left:0;
																			<c:if test="${coupon.type==2}"> 
																		 display: inline-block;
																		</c:if>
																		">
																			<label class="control-label"><em class="required">*</em>折扣：</label>
																			<input type="text" id="zk-coupon-val" name="" class="m-input js-only-float" value="${coupon.faceAmount}" maxlength="2">
																			<span class="add-on">%</span>
																		</div>
																	</div>
																	
																	<div class="control-group">
																		<label class="control-label">商家备注：</label>
																		<div class="controls">
																			<input type="text" id="merchant_comment" class="l-input" name="" value="${coupon.notice}"
																				placeholder="填写优惠券的备注，如'新人优惠券'，20字以内" maxlength="20">
																		</div>
																	</div>
																	<h1 class="config-title">条件设置</h1>
																	<div class="control-group">
																		<label class="control-label"><em class="required">*</em>每人限领：</label>
																		<div class="controls">
																			<div class="controls_div">
																				<input type="radio" id="type-nolimit" name="type-limit" value="0" 
																				<c:if test="${coupon.getLimit==0}"> 
																					checked="checked"
																				</c:if>
																				<c:if test="${empty coupon.getLimit}"> 
																					checked="checked"
																				</c:if>
																				>
																				<label for="type-nolimit">不限</label>
																			</div>
																			<div class="controls_div">
																				<input type="radio" id="type-limit" name="type-limit" value="1"
																				<c:if test="${not empty coupon && coupon.getLimit!=0}"> 
																					checked="checked"
																					</c:if>
																				 >
																				<label for="type-limit">限领</label>
																				<input type="text" id="limit_count" class="m-input" name="" 
																				<c:if test="${coupon.getLimit!=0}"> 
																					value="${coupon.getLimit}" 
																					</c:if>
																				 maxlength="6"
																					onkeyup="this.value=this.value.replace(/\D/g, ''); ">
																				<span class="add-on">张</span>
																			</div>
																			<input type="hidden" value="0" id="countLimit" />
																		</div>
																	</div>
																	<div class="control-group">
																		<label class="control-label"><em
																			class="required">*</em>积分兑换：</label>
																		<div class="controls">
																			<div class="controls_div">
																				<input type="radio" id="type-noIntegral" name="type-integral" value="0"
																					<c:if test="${coupon.integral==0}"> 
																					checked="checked"
																					</c:if>
																					<c:if test="${empty coupon.integral}"> 
																					checked="checked"
																					</c:if>
																				>
																				<label for="type-noIntegral">不限</label>
																			</div>
																			<div class="controls_div">
																				<input type="radio" id="type-integral" name="type-integral" value="1" 
																				<c:if test="${not empty coupon && coupon.integral!=0}"> 
																					checked="checked"
																					</c:if>
																				 >
																				<label for="type-integral">积分</label>
																				<input type="text" id="limit_integral" class="m-input"
																					name="" 
																					<c:if test="${coupon.integral!=0}"> 
																					value="${coupon.integral}"
																					</c:if>
																					   maxlength="6" onkeyup="this.value=this.value.replace(/\D/g,''); ">
																				<span class="add-on">分/张</span>
																			</div>
																			<input type="hidden" value="0" id="isUseLitegral" />
																		</div>
																	</div>
																	<div class="control-group">
																		<label class="control-label"><em class="required">*</em>有效时间：</label>
																		<div class="controls">
																			<input type="text" id="start-time"
																			class="shot-time-input <c:if test="${empty coupon }">js-pick-time</c:if>"
																			name=""
																			value="${startTime}" placeholder="开始时间" data-date-format="yyyy-mm-dd" onfocus="this.blur()" onchange="checktime();">
																			<span> - </span> 
																			<input type="text" id="end-time"
																			class="shot-time-input <c:if test="${empty coupon }">js-pick-time</c:if>"
																			name=""
																			value="${endTime}" placeholder="结束时间" data-date-format="yyyy-mm-dd" onfocus="this.blur()" onchange="checktime();">
																		</div>
																	</div>
																	<div class="control-group">
																		<label class="control-label"><em class="required">*</em>订单金额：</label>
																		<div class="controls">
																			<div class="controls_div">
																				<input type="radio" id="type-noPrice" name="type-price" value="0" 
																				<c:if test="${empty coupon || coupon.priceLimit==0}"> 
																					checked="checked"
																					</c:if>
																				>
																				<label for="type-noPrice">不限</label>
																			</div>
																			<div class="controls_div">
																				<input type="radio" id="type-price" name="type-price" value="1"
																				<c:if test="${not empty coupon && coupon.priceLimit!=0}"> 
																					checked="checked"
																					</c:if>
																				>
																				<label for="type-price">满额</label>
																				<input type="text" id="limit_price" class="m-input js-only-float" name="" 
																				<c:if test="${not empty coupon && coupon.priceLimit!=0}"> 
																					value="<fmt:formatNumber type="number" value="${coupon.priceLimit/100}" maxFractionDigits="0"/>"
																				</c:if>
																				  maxlength="6" >
																				<span class="add-on">元</span>
																			</div>
																			<input type="hidden" value="0" id="isFullPrice" />
																		</div>
																	</div>
																	<div class="control-group" style="display: none;">
																		<label class="control-label"><em class="required">*</em>使用数量：</label>
																		<div class="controls">
																			<div class="controls_div">
																				<input type="radio" id="type-noUseCount" name="type-useCount" value="0" checked="checked">
																				<label for="type-noUseCount">不限</label>
																			</div>
																			<div class="controls_div">
																				<input type="radio" id="type-useCount" name="type-useCount" value="1">
																				<label for="type-useCount">每张订单使用</label>
																				<input type="text" id="limit_useCount" class="m-input"
																					name="" value="" maxlength="6"  onkeyup="this.value=this.value.replace(/\D/g, ''); ">
																				<span class="add-on">张</span>
																			</div>
																			<input type="hidden" value="0" id="isLimitCount" />
																		</div>
																	</div>
																	<div class="control-group">
																		<label class="control-label"><em class="required">*</em>使用场景：</label>
																		<div class="controls">
																			<div class="controls_div">
																				<input type="radio" id="type-noScene" name="useScene" value="0" 
																					<c:if test="${coupon.useScene==0}"> 
																					checked="checked"
																					</c:if>
																					<c:if test="${empty coupon.useScene}"> 
																					checked="checked"
																					</c:if>
																				>
																				<label for="type-noScene">不限</label>
																			</div>
																			<div class="controls_div">
																				<input type="radio" id="type-mallScene" name="useScene" 
																				<c:if test="${coupon.useScene==1}"> 
																					checked="checked"
																					</c:if>
																				value="1">
																				<label for="type-mallScene">仅商城</label>
																			</div>
																			<div class="controls_div third_div">
																				<input type="radio" id="type-vPOS" name="useScene"
																					<c:if test="${coupon.useScene==2}"> 
																					checked="checked"
																					</c:if>
																				 value="2">
																				<label for="type-vPOS">仅店客源</label>
																			</div>
																			<input type="hidden" value="0" id="coupon-useScene" />
																		</div>
																	</div>
																	
																	<div class="control-group">
																		<label class="control-label"><em class="required">*</em>适用商品：</label>
																		<div class="controls">
																			<div class="controls_div">
																				<input type="radio" id="type-all" name="type-pro" value="0" class="good-type" checked="checked">
																				<label for="type-all">不限</label>
																			</div>
																			<input type="hidden" value="0" id="coupon-useScene" />
																			<span  style="color:#aaa;">指定商品及商品导航，需要优惠券使用场景为“仅商城”</span>
																		</div>
																		<div class="controls" style="margin-top:10px;">
																			<div class="controls_div width-div">
																				<input type="radio" id="type-brief" name="type-pro" value="1" class="good-type"
																				<c:if test="${not empty productData.name}"> 
																					checked="checked"
																					</c:if>
																				  >
																				<label for="type-brief">指定商品</label>
																			</div>
																			<a href="javascript:;" href="javascript:void(0);" id="a_show_brief">选择商品</a>
																			${productData.name}
																			<a href="javascript:;" id="del-brief" style="display:none;">删除</a>
																		</div>
																		<div class="controls" style="margin-top:10px;">
																			<div class="controls_div">
																				<input type="radio" id="type-vType" name="type-pro" value="2" class="good-type"
																				<c:if test="${not empty categoryData.name}"> 
																					checked="checked"
																					</c:if>
																				>
																				<label for="type-vType">指定商品分类</label>
																				<input type="hidden" id="navId" value="">
																			</div>
																			<a href="javascript:;" id="choose_nav_id">选择分类</a>
																			${categoryData.name}
																			<a href="javascript:;" id="del-nav" style="display:none;">删除</a>
																		</div>
																	</div>
																	<div class="control-group">
																		<label class="control-label"><em
																			class="required">*</em>使用门店：</label>
																		<div class="controls">
																			<div class="controls_div">
																				<input type="radio" id="type-noStore0" name="hasSubStore" value="0" 
																				<c:if test="${empty coupon.hasSubStore}">checked="checked"</c:if>
																				<c:if test="${not coupon.hasSubStore}">checked="checked"</c:if>
																				>
																				<label for="type-noStore">不限</label>
																			</div>
																			<div class="controls_div" id="select_store_div">
																				<input type="radio" id="hasSubStore1" name="hasSubStore" value="1"
																				<c:if test="${coupon.hasSubStore}">checked="checked"</c:if>
																				>
																				<label for="type-useStore">指定门店</label>
																				<a class="select_store">选择门店：已选
																				<c:if test="${empty subStoreData}"><span id="storeCount">0</span></c:if>
																				<c:if test="${not empty subStoreData}">
																					${fn:length(subStoreData) }
																				</c:if>
																				家 </a>
																			</div>
																			<!-- 如果是经销门店，只能选择本门店 -->
																			<div class="controls_div jingxiao-store" style="display:none;">
																				<input type="radio" id="hasSubStore2" name="hasSubStore2" value="0" checked="checked">
																				<label for="type-selfStore">本门店</label>
																			</div>
																			<input type="hidden" value="0" id="coupon-isUseStore" />
																			<input type="hidden" id="coupon-store-list" name="" value="" />
																		</div>
																	</div>
																	<div class="control-group">
																		<label class="control-label">使用说明：</label>
																		<div class="controls">
																			<textarea id="description" class="useDesc" value="" cols="30" rows="2" placeholder="填写优惠券的使用说明，消费者将在优惠券上看到此内容，最多可输入140字"
																				maxlength="140">${coupon.description}</textarea>
																		</div>
																	</div>
																	<h1 class="config-title">发放设置</h1>
																	<div class="control-group">
																		<label class="control-label">商城会员：</label>
																		<div class="controls">
																			<div class="controls_div" style="margin-right: 0;">
																				<input type="checkbox" id="directGrant" name="directGrant"
																					<c:if test="${coupon.directGrant}">checked</c:if>
																				>
																				<label for="store_member">直接加入会员商城个人中心</label>
																				<span class="store_m_tips">优惠券发放量>会员总数</span>
																			</div>
																		</div>
																	</div>
																	
																	<div class="control-group">
																		<label class="control-label">同步发布至：</label>
																		<div class="controls">
																			<div class="controls_div">
																				<input type="checkbox" id="synchWechat" name="synchWechat"
																				<c:if test="${coupon.synchWechat}">checked</c:if>>
																				<label for="type-dy">微信卡包</label> <a class="set_wxgzh" target="_blank" href="${ctx}/back/wechat/auth" style="margin-left: 10px;">前往微信授权</a>
																			</div>
																		</div>
																	</div>
																	<div class="control-group">
																		<div class="controls">
																			<p class="wx_tips">如果您没有设置微信授权的相关信息，本功能将可能失效。同步至微信卡包后，需等待微信审核通过，才能正常领取。</p>
																		</div>
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
							</div>
							<div class="box-footer">
								<div class="row text-center bot_oprate_btns">
									<button class="btn btn-default" id="btn-cancel">取消</button>
									<input type="hidden" id="btnType" />
									<c:if test="${empty coupon.status || coupon.status<3}"> 
										<c:if test="${!coupon.synchWechat}"> 
											<c:if test="${empty coupon.directGrant}"> 
											<button class="btn btn-primary" id="btn-submit-send">生成并生效</button>
											</c:if>
											<button class="btn btn-primary" id="btn-submit">生成优惠券</button>
										</c:if>
										<c:if test="${coupon.synchWechat}"> 
											<c:if test="${coupon.status==2}"> 
											<button class="btn btn-primary" id="btn-submit">生成优惠券</button>
											</c:if>
										</c:if>
									</c:if>
								</div>
							</div>
						</div>
		</aside>
	</div>
	<!--门店选择弹框-->
	<div class="modal fade" id="storeModal" tabindex="99" role="dialog" aria-labelledby="storeModalLabel" aria-hidden="true">
		<div class="modal-dialog-container">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">×</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="storeModalLabel">门店选择</h4>
					</div>
					<div class="store-loaction" style="padding: 15px 20px 0;">
						<div class="store-loac-selects">
							<select id="p1" name="p1" class="form-control inline c-s-select"></select>
							<select id="p2" name="p2" class="form-control inline c-s-select"></select>
							<select id="p3" name="p3" class="form-control inline c-s-select"></select>
						</div>

						<div class="search-div s-search-div pull-right">
							<input id="storeTypeName" type="text"
								class="form-control search_input inline c-s-select" placeholder="门店名称">
							<span class="search_icon" id="sele-store"></span>
						</div>
					</div>
					<div class="modal-body">
						<div class="order_detai_tables">
							<div class="member_info_div">
								<div style="position:relative;">
									<div class="table-head-back" style="top:-1px;"></div>
									<div class="table-panel">
										<table class="table no-border checkbox-table align_table" id="stores_table">
											<thead>
												<tr>
													<th><input type="checkbox"
														class="icheckbox_minimal order_checkbox_all"></th>
													<th>门店名称</th>
													<th>门店地址</th>
												</tr>
											</thead>
											<tbody id="storeList">
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button class="btn btn-primary btn-select">
							已选<span class="seleStoreCount">0</span>家
						</button>
						<input type="hidden" value="" id="checkedStoreId"/> 
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--商品-->
	<div class="modal fade" id="storeBrief" tabindex="99" role="dialog" aria-labelledby="storeBriefLabel" aria-hidden="true">
		<div class="modal-dialog-container">
			<div class="modal-dialog" style="width: 860px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">×</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="storeBriefLabel">商品选择</h4>
					</div>
					<div class="modal-body">
						<div class="order_detai_tables">
							<div class="member_info_div">
								<div class="store-loaction" style="margin-bottom:10px;">
									<div class="store-loac-selects goods-cate-div-container">
										<label for="">商品分类：</label>
										<select id="goods-categrory1" name="" class="form-control inline goodsCategory">
											<option value='0'>-请选择-</option>
										</select>
										<select id="goods-categrory2" name="" class="form-control inline goodsCategory" style="display:none;">
											<option value='0'>-请选择-</option>
										</select>
									</div>
									<div class="search-div pull-right">
										<input id="goodName" type="text"
											class="form-control search_input inline s-search-input" placeholder="商品名称/商品编号/商品编码">
										<span class="search_icon" id="sele-good"></span>
									</div>
								</div>
								<div style="position:relative;">
									<div class="table-head-back" style="top:-1px;"></div>
									<div class="table-panel">
										<table class="table no-border align_table" id="stores_Brief">
											<thead>
												<tr>
													<th></th>
													<th>商品名称</th>
													<th>商品编号</th>
													<th>商品编码</th>
													<th>可用库存</th>
												</tr>
											</thead>
											<tbody id="storeBriefList">
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
	<!--商品分类弹出框-->
	<div class="modal fade" id="nav-modal" tabindex="99" role="dialog" aria-labelledby="nav-modal-abal" aria-hidden="true">
		<div class="modal-dialog-container">
			<div class="modal-dialog" style="width: 698px;">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">
							<span aria-hidden="true">×</span><span class="sr-only">Close</span>
						</button>
						<h4 class="modal-title" id="nav-modal-abal">选择分类导航</h4>
					</div>
					<div class="modal-body">
						<div class="order_detai_tables">
							<div style="height: 415px;width: 100%;min-width:300px;overflow-y: auto;" class="role-content">
	           					<div>
			            	  		Tips:<span style="color:red">红色</span>表示当前选中的，<span style="color:blue">蓝色</span>表示其子有被选中项，双击选中
			            	  		<a id="open_down_tree" href="javascript:void(0)" >展开</a>
			            	  		<a id="close_up_tree" href="javascript:void(0)" >收起</a>
			            		</div>
			               		<ul id="zTree" class="ztree" style="width: 40%;min-width: 100px;"></ul>    
			               	</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
	
	<!-- 优惠券显示形式弹出框消息 -->
		<div class="modal fade" id="num-modal" tabindex="99" role="dialog" aria-labelledby="myLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content" style="height:200px;">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="reAllowLabel"">优惠券在微信上显示形式</h4>
					 </div>
					<div class="modal-body" style="text-align:center;">
						<input type="radio" id="barCode" name="codeTypeRadio" <c:if test="${coupon.codeType == 'CODE_TYPE_BARCODE'}">checked</c:if> value="CODE_TYPE_BARCODE"/>
						<label style="margin-right:50px;">条形码</label>
						<input type="radio" id="QrCode" name="codeTypeRadio" <c:if test="${coupon.codeType == 'CODE_TYPE_QRCODE'}">checked</c:if> value="CODE_TYPE_QRCODE" />
						<label>二维码</label>
						<div style="margin-top:20px;"> 
							<button class="btn btn-primary dialog-save">保存</button>
							<button class="btn btn-defalut dialog-chanel">取消</button>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/timepicker/bootstrap-datetimepicker.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/app.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/cky/jq.page.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/CityUtils.js?v=${v}" ></script>
	<link href="${ctx}/js/libs/zTree_v3/css/zTreeStyle/zTreeStyle.css?v=${v}" rel="stylesheet" type="text/css" ></link>
	<link rel="stylesheet" href="${ctx }/css/apps/cTreeStyle.css?v=${v}" type="text/css">
	<script src="${ctx}/js/libs/zTree_v3/js/jquery.ztree.all-3.5.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/apps/coupon/coupon-add.js?v=${v}" ></script>

</body>
</html>