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

	<body class="skin-blue fixed">
		<!-- include nav.jsp -->
		<jsp:include page="/WEB-INF/include/nav.jsp"></jsp:include>
		 
		<div class="wrapper row-offcanvas row-offcanvas-left">
			<!--三级菜单-->
			<jsp:include page="/WEB-INF/back/menu/menu.jsp"></jsp:include>
			 
			<aside class="right-side">
            	<!--条件搜索-->
               	<div class="box">
               		<div class="product-head">
		     			<span class="product-title">会员卡设置</span>
		     			<div class="b-line float-right">
							<div class="check-div">
								<input type="checkbox" class="data-switch" id="onOpenCard" value="${card.openStatus }" <c:if test="${card.openStatus == 1}">checked</c:if> onchange="isOpenCard(this)" style="margin:0;vertical-align: middle;"/>
							</div>
						</div>
		     		</div>
		     		
	        		<div class="product-body goods-body">
        				<form id="sendCouponForm" action="create" name="goodsform" enctype="multipart/form-data" method="post" onsubmit="return false">
        					<!-- hidden start -->
        						<input type="hidden" id="cardOpenStatus" name="openStatus" >
        					<!-- hidden end -->
                            	<div class="product-info product-new-info no-border member-card clearfix">
                                    <div class="info_item float_item">
                                    	<div class="info_content">
                                    		<div class="app-design without-add-region">
	                                    		<div class="app-preview">
													<div class="app-header"></div>
													<div class="app-entry" style="background:#f5f5f5;">
														<div class="app-config js-config-region">
															<div class="app-field clearfix">
																<h1>
																	<span>会员卡设置</span>
																</h1>
															</div>
														</div>
														<div class="app-fields js-fields-region">
															<div class="app-fields ui-sortable member_card_main">
																<div class="member_card_top">
																	<div class="member_card">
																		<p class="member_card_shop">
																			<img class="member_card_shop_logo" src="${store.logo}">
																			<span class="member_card_shop_name">${store.name }</span>
																			<span class="text-green float-right">会员卡</span>
																		</p>
																		<div class="member_card_info">
																			<p class="member_card_code">XXXX XXXX XXXX XXXX
																			<img class="member_card_img float-right" src="${ctx}/img/wx_code.png"></p>
																		</div>
																		<div class="member_card_bar"></div>
																	</div>
																</div>
																<div class="app-field-row">
																	<span class="row-title">会员卡详情</span>
																	<span class="row-arrow-right float-right"></span>
																</div>
																<div class="app-field-row officialAccountsShowStatus" <c:if test="${card.officialAccountsShowStatus != 1}">style="display:none;"</c:if>>
																	<span class="row-title">公众号</span>
																	<span class="float-right"></span>
																</div>
																<div class="app-field-row mallUrlShowStatus" <c:if test="${card.mallUrlShowStatus != 1}">style="display:none;"</c:if>>
																	<span class="row-title">前往商城</span>
																	<span class="float-right mallUrlNameText">${card.mallUrlName }</span>
																</div>
																<div class="app-field-row personalCenterShowStatus" <c:if test="${card.personalCenterShowStatus != 1}">style="display:none;"</c:if>>
																	<span class="row-title">会员中心</span>
																	<span class="float-right"></span>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="info_right">
												<div class="set_cont_div">
													<div class="form-group">
														<label class="inline">商户简称：</label>
														<span>${store.name }</span>
														<input type="hidden" id="brandName" name="brandName" value="${store.name }">
														<input type="hidden" id="membershipCardId" name="membershipCardId" value="${card.membershipCardId }">
														
													</div>
													<div class="form-group">
														<label class="inline">商户logo：</label>
														<img class="card-store-logo" src="${store.logo}">
														<input type="hidden" id="logoUrl" name="logoUrl" value="${store.logo }">
														<span class="text-light"><em class="required">*</em>如更换logo，请前往账户中心更新</span>
													</div>
													<div class="form-group color-input-box">
														<label class="inline">会员卡颜色：</label>
														<input type="text" class="form-control inline diy_input diy-color-input" readonly="readonly"/>
														<input type="hidden" class="sele-color-val validate-item" id="color" name="color" value="${card.color }"  data-type="require"><em class="required">*</em>
													</div>
													<div class="form-group">
														<label class="inline">会员卡标题：</label>
														<input type="text" class="form-control inline validate-item" value="${card.title }" id="title" name="title" data-type="require" placeholder="建议填写商家名、会员卡服务内容，9字以内" maxlength="9" readonly="readonly"/><em class="required">*</em>
													</div>
													<div class="form-group">
														<label class="inline">商城链接：</label>
														<div class="radio-container">
															<div class="radio-div">
																<input type="radio" value="1" disabled <c:if test="${card.mallUrlShowStatus == 1}">checked</c:if> name="mallUrlShowStatus"/><label>显示</label>
															</div>
															<div class="radio-div">
																<input type="radio" value="0" disabled <c:if test="${card.mallUrlShowStatus != 1}">checked</c:if> name="mallUrlShowStatus"/><label>不显示</label>
															</div>
														</div>
														<span class="tips radio-tips">*需先完成<a target="blank" href="${ctx}/back/wechat/auth">微信授权</a></span>
													</div>
													<div class="form-group">
														<label class="inline"></label>
														<input type="text" class="form-control inline" value="${card.mallUrlName }" id="mallUrlName" name="mallUrlName" data-type="require" placeholder="填写商城引导语，8字以内" maxlength="8" readonly/>
													</div>
													<div class="form-group">
														<label class="inline">个人中心：</label>
														<div class="radio-container">
															<div class="radio-div">
																<input type="radio" value="1" disabled <c:if test="${card.personalCenterShowStatus == 1}">checked</c:if> name="personalCenterShowStatus"/><label>显示</label>
															</div>
															<div class="radio-div">
																<input type="radio" value="0" disabled <c:if test="${card.personalCenterShowStatus != 1}">checked</c:if> name="personalCenterShowStatus"/><label>不显示</label>
															</div>
														</div>
													</div>
													<div class="form-group">
														<label class="inline">客服电话：</label>
														<input type="text" class="form-control inline validate-item" value="${card.servicePhone }" id="servicePhone" name="servicePhone" data-type="require" placeholder="请输入手机号或固定电话" onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"  maxlength="12" readonly="readonly"/>
													</div>
													<!-- <div class="form-group">
														<label class="inline">商户服务：</label>
														<div class="controls">
															<div class="controls_div">
																<input type="checkbox" id="service-wifi" name="special" value="免费wifi" disabled="disabled">
																<label for="service-wifi">免费wifi</label>
															</div>
															<div class="controls_div">
																<input type="checkbox" id="service-pet" name="special" value="可带宠物" disabled="disabled">
																<label for="service-pet">可带宠物</label>
															</div>
															<div class="controls_div">
																<input type="checkbox" id="service-park" name="special" value="免费停车" disabled="disabled">
																<label for="service-park">免费停车</label>
															</div>
															<div class="controls_div">
																<input type="checkbox" id="service-send" name="special" value="可外卖" disabled="disabled">
																<label for="service-send">可外卖</label>
															</div>
														</div>
													</div> -->
													<div class="form-group">
														<label class="inline" for="member-privilege">特权说明：</label>
														<textarea class="form-control inline validate-item" placeholder="此内容为建议参考,请按实际情况填写
1. 使用会员卡买单专享*折优惠;
2. 消费每满*元可享*积分;
3. 积分可用作消费抵扣,每*积分可抵*元;
4. 会员生日到店消费可获赠精美礼品。300字以内。" id="member-privilege" name="prerogative" onkeyup="if(this.value.length>300){this.value=this.value.slice(0,300)}" data-type="require" readonly="readonly">${card.prerogative }</textarea><em class="required">*</em>
													</div>
													<div class="form-group">
														<label class="inline" for="operate-tips">操作提示：</label>
														<input type="text" class="form-control inline validate-item" data-type="require" value="${card.notice }" name="notice" id="operate-tips" placeholder="建议引导用户到店出示会员卡，16字以内" maxlength="16" readonly="readonly"/><em class="required">*</em>
													</div>
													<div class="form-group">
														<label class="inline" for="card-comment">使用须知：</label>
														<textarea class="form-control inline validate-item" name="description" data-type="require" placeholder="此内容为建议参考,请按实际情况填写
1. 到店告知会员卡绑定的手机号也可使用,可不出示手机;
2. 每笔消费积分抵扣上限为*元;
3. 积分有效期为*年,过期清零。
300字以内。" id="card-comment" onkeyup="if(this.value.length>300){this.value=this.value.slice(0,300)}" readonly="readonly">${card.description }</textarea>
													</div>
													<div class="form-group">
														<label class="inline"></label>
														<input type="checkbox" id="synchroCheck" disabled <c:if test="${card.synchro == 1}">checked</c:if>/>同步至微信卡券
														<input type="hidden" id="synchro" name="synchro" value="${card.synchro }">
													</div>
													<div class="form-group">
														<label class="inline"></label>
														<span>
															微信审核状态：
															<span id="reviewStatus">
																<c:if test="${empty card.wechatCardId || card.wechatStatus == 0}">未创建</c:if>
																<c:if test="${!empty card.wechatCardId && card.wechatStatus == 1 }">审核中</c:if>
																<c:if test="${!empty card.wechatCardId && card.wechatStatus == 2}">审核通过</c:if>
																<c:if test="${!empty card.wechatCardId && card.wechatStatus == 3}">审核不通过</c:if>
															</span>
														</span>
													</div>
												</div>
											</div>
										</div>
                                	</div>
                                </div>
                            	<div class="product-buttons">
                            		<input type="hidden" id="openStatus" value="${openStatus }">
                            		<input type="hidden" id="codeType" name="codeType" value="${card.codeType}">
                            		<a class="btn btn-default cansel-btn-page" href="${ctx }/back/member-ship-card/create" style="margin-right:20px;display:none;">取消</a>
		        					<button class="btn btn-primary edit-save btn-edit">编辑</button>
		        					<!-- <button class="btn btn-primary async-wechat">同步至微信卡券</button> -->
		        				</div>
        				</form>
        			</div>
               	</div>
            </aside>
		</div>
		<!-- 会员卡号显示形式弹出框消息 -->
		<div class="modal fade" id="num-modal" tabindex="99" role="dialog" aria-labelledby="myLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content" style="height:200px;">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="reAllowLabel"">会员卡号在微信上显示形式</h4>
					 </div>
					<div class="modal-body" style="text-align:center;">
						<input type="radio" id="barCode" name="codeTypeRadio" <c:if test="${card.codeType == 'CODE_TYPE_BARCODE'}">checked</c:if> value="CODE_TYPE_BARCODE"/>
						<label style="margin-right:50px;">条形码</label>
						<input type="radio" id="QrCode" name="codeTypeRadio" <c:if test="${card.codeType == 'CODE_TYPE_QRCODE'}">checked</c:if> value="CODE_TYPE_QRCODE" />
						<label>二维码</label>
						<div style="margin-top:20px;"> 
							<button class="btn btn-primary dialog-save">保存</button>
							<button class="btn btn-default dialog-chanel">取消</button>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	</body>
	<script>
	var openStatus = ${openStatus };//是否开启了微信授权，0未开启1开启
	</script>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/switch/main.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/switch/highlight.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/switch/bootstrap-switch.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/apps/customer/membership-card.js?v=${v}"></script>
    
</html>
