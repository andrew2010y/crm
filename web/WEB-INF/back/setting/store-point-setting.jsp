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
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap.css" />
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap-switch.min.css" />
		<link rel="stylesheet" href="${ctx}/css/libs/AdminLTE.css" />
		<link rel="stylesheet" href="${ctx}/css/apps/main.css" />
		<link rel="stylesheet" href="${ctx}/css/apps/setting/store-point-setting.css" />
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
		     			<span class="product-title">积分设置</span>
		     			<button id="points-edit-btn" class="btn btn-primary float-right">编辑</button>
		     			<div id="points-edit" class="float-right" style="display:none;">
		     				<button id="points-cancel" class="btn btn-default mr15">取消</button>
		     				<button id="points-save" class="btn btn-primary" onclick="save(event)">保存</button>
		     			</div>
		     		</div>
		     		<div class="box-body">
		     			<div class="point-content">
		     				<div class="point-give">
		     					<p class="point-give-title">积分发放</p>
								<div class="line">
									<div class="form-group">
										<input type="hidden" id="pointSettingId0" value="${storePointSetting.storePoint[0].pointSettingId}" />
										<label class="control-label">注册送积分：</label>
										<div class="b-line">
											<div class="check-div">
												<input type="checkbox" class="data-switch" id="registerPointsBtn" onchange="zuBtn()"  value="0" disabled/>
											</div>
											<div class="fen-div">
												<label for="register-points">用户注册完成赠送积分</label> 
												<c:if test="${storePointSetting.storePoint ==null}"> 
													<input	type="text"  class="form-control inline midwidth" id="register-points" placeholder="请输入赠送积分"
															value="" readonly="readonly" maxlength="4" data-inputtype="number">
												</c:if>
												<c:if test="${storePointSetting.storePoint!=null}"> 
													<input	type="text"  class="form-control inline midwidth" id="register-points" placeholder="请输入赠送积分"
															readonly="readonly" value="${storePointSetting.storePoint[0].point}" maxlength="4" data-inputtype="number">
												</c:if>
												<span>积分</span>
											</div>
									  	 </div>
								    </div>
								</div>
								<div class="line">
									<div class="form-group">
									<input type="hidden" id="pointSettingId1" value="${storePointSetting.storePoint[1].pointSettingId}" />
										<label class="control-label">关注公众号送积分：</label>
										<div class="b-line">
											<div class="check-div">
												<input type="checkbox" class="data-switch" id="followPointsBtn" onchange="guBtn()" value="0" disabled/>
											</div>
											<div class="fen-div">
												<label for="follow-points">用户首次关注公众号赠送积分</label>
												<c:if test="${storePointSetting.storePoint==null}"> 
													<input	type="text" class="form-control inline midwidth" id="follow-points" placeholder="请输入赠送积分"
															value="" readonly="readonly" maxlength="4" data-inputtype="number">
												</c:if>
												<c:if test="${storePointSetting.storePoint!=null}">
													<input	type="text" class="form-control inline midwidth" id="follow-points" placeholder="请输入赠送积分"
															value="${storePointSetting.storePoint[1].point}" readonly="readonly" maxlength="4" data-inputtype="number">
												</c:if>
												<span>积分</span>
												<c:if test="${not storePointSetting.wechatStatus}">
												<span><i class="unauth-icon"><img src="${ctx}/img/unauth-icon.png" /></i>未授权</span>	
												</c:if>		
											</div>
										</div>
									</div>
								</div>
								<div class="line">
									<div class="form-group">
										<input type="hidden" id="pointSettingId2" value="${storePointSetting.storePoint[2].pointSettingId}" />
										<label class="control-label">绑定微信送积分：</label>
										<div class="b-line">
											<div class="check-div">
												<input type="checkbox" class="data-switch" id="bindwxPointsBtn" onchange="baBtn()" value="0" disabled/>
											</div>
											<div class="fen-div">
												<label for="bindwx-points">用户首次绑定微信赠送积分</label> 
												<c:if test="${storePointSetting.storePoint==null}">
													<input	type="text" class="form-control inline midwidth"  id="bindwx-points" placeholder="请输入赠送积分"
															value="" readonly="readonly" maxlength="4" data-inputtype="number">
												</c:if>
												<c:if test="${storePointSetting.storePoint!=null}">
													<input	type="text" class="form-control inline midwidth"  id="bindwx-points" placeholder="请输入赠送积分"
															value="${storePointSetting.storePoint[2].point}" readonly="readonly" maxlength="4" data-inputtype="number">
												</c:if>
												<span>积分</span>
												<c:if test="${not storePointSetting.wechatStatus}">
												<span><i class="unauth-icon"><img src="${ctx}/img/unauth-icon.png" /></i>未授权</span>	
												</c:if>	
											</div>
										</div>
									</div>
								</div>
								<!-- 微信未授权时显示 -->
								<c:if test="${not storePointSetting.wechatStatus}">
								<div class="tips-line">
									<div class="form-group tips-div">
										<p>
										<em>*</em>您的公众号尚未授权，请先前往<a target="_blank" href="${ctx}/back/wechat/go-author">微信授权</a>完成后进行关注公众号配置，
										建议在页面中提示用户关注公众号/微信绑定可以获得积分另外,当前完成公众号授权后，会员在微信环境下绑定手机号或已使用手机号登录，系统将会自动赠送配置积分
										</p>
									</div>
								</div>
								</c:if> 
								<div class="line">
									<div class="form-group">
										<input type="hidden" id="pointSettingId3" value="${storePointSetting.storePoint[3].pointSettingId}" />
										<label class="control-label">消费赠送积分：</label>
										<div class="b-line">
											<div class="check-div">
												<input type="checkbox" class="data-switch" id="spendPointsBtn" onchange="xiBtn()" value="0" disabled/>
											</div>
											<div class="fen-div">
												<label for="spend-points">消费送积分： 每消费1元送</label> 
												<c:if test="${storePointSetting.storePoint==null}">
													<input	type="text" class="form-control inline midwidth" readonly="readonly" id="spend-points" placeholder="请输入赠送积分" 
													value="" maxlength="4" data-inputtype="number">
												</c:if>
												<c:if test="${storePointSetting.storePoint!=null}">
														<input	type="text" class="form-control inline midwidth" readonly="readonly" id="spend-points" placeholder="请输入赠送积分" 
															value="${storePointSetting.storePoint[3].point}" maxlength="4" data-inputtype="number">
												</c:if>
												<span>积分</span>
											</div>
										</div>
									</div>
								</div>
								<div class="tips-line">
									<div class="form-group tips-div">
										<p>
											<em>*</em>消费送积分设置开启后，消费者在微商城或店客源消费后可获得实付金额按设置比例换算后的对应积分。如设置每消费1元送1积分，
											则表示88元订单赠送88积分,100元订单赠送100积分，133元订单赠送133积分。（积分抵扣时，比例固定为1积分抵扣0.01元）
										</p>
									</div>
								</div>
								<div class="line">
									<div class="form-group">
										<input type="hidden" id="pointSettingId4" value="${storePointSetting.storePoint[4].pointSettingId}" />
										<label class="control-label">完善会员信息送积分：</label>
										<div class="b-line">
											<div class="check-div">
												<input type="checkbox" class="data-switch" id="infoPointsBtn" onchange="waBtn()" value="0" disabled/>
											</div>
											<div class="fen-div">
												<label for="info-points">会员首次填写完会员信息赠送积分</label> 
												<c:if test="${storePointSetting.storePoint==null}">
													<input	type="text" class="form-control inline midwidth" readonly="readonly" id="info-points" placeholder="请输入赠送积分" 
															value="" maxlength="4" data-inputtype="number">
												</c:if>
												<c:if test="${storePointSetting.storePoint!=null}">
													<input	type="text" class="form-control inline midwidth" readonly="readonly" id="info-points" placeholder="请输入赠送积分" 
															value="${storePointSetting.storePoint[4].point}" maxlength="4" data-inputtype="number">
												</c:if>
												<span>积分</span>
											</div>
										</div>
									</div>
								</div>
								<div class="tips-line">
									<div class="form-group tips-div">
										<p>
											<em>*</em>前往<a href="${ctx}/back/form-store-prop/list">会员信息</a><span>配置需要会员完善的信息内容</span>
											<span style="display:block;">如您选择了4个会员信息字段，当会员填写了1个信息时，完善度为20%；填写了2个信息时，完善度为50%；完全填写则为100%。</span>
										</p>
									</div>
								</div>
								<div class="point-other">			
		     						<span>您还可以<span>
		     						<ul class="point-other-a">
		     							<!-- 商品列表 -->
		     							<li><a target="_blank" href="${platformCtx}/goods/toGoodsList.do">• 设置指定商品购买后赠送额外积分</a></li>
		     							<!-- 促销活动列表页 -->
		     							<li><a target="_blank" href="${platformCtx}/goodsPromotion/toPromotionList.do">• 设置指定营销活动参与后赠送额外积分</a></li>
		     						</ul>
		     					</div>
		     					<input type="hidden" id="wechatStatus" value="${storePointSetting.wechatStatus}">
		     					<input type="hidden" id="registerPointsStatus" value="${storePointSetting.storePoint[0].state}">
		     					<input type="hidden" id="followPointsStatus" value="${storePointSetting.storePoint[1].state}">
		     					<input type="hidden" id="bindwxPointsStatus" value="${storePointSetting.storePoint[2].state}">
		     					<input type="hidden" id="spendPointsStatus" value="${storePointSetting.storePoint[3].state}">
		     					<input type="hidden" id="infoPointsStatus" value="${storePointSetting.storePoint[4].state}">
						</div>
		     			<div class="point-use">
		     				<p class="point-use-title">积分消耗</p>
		     				<ul>
		     					<!-- 商品列表 -->
		     					<li><a target="_blank" href="${platformCtx}/goods/toGoodsList.do">• 设置指定商品购买时可用积分抵扣部分金额</a></li>
		     					<!-- 促销活动列表页 -->
		     					<li><a target="_blank" href="${platformCtx}/goodsPromotion/toPromotionList.do">• 设置指定营销活动可使用积分抵扣部分金额</a></li>
		     					<!-- 营销活动菜单页 -->
		     					<li><a target="_blank" href="${platformCtx}/market-activity/full-frame-scenario.do">• 设置使用积分获取活动参与机会</a></li>
		     					<!-- 新建优惠券 -->
		     					<li><a target="_blank" href="${ctx}/back/coupon/create">• 设置使用积分兑换优惠券</a></li>
		     				</ul>
		     			</div>
		     		</div>
	        	</div>
	        </aside>
	      </div>
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui.min.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/Sortable.min.js?v=${v}" ></script>
    <script type="text/javascript" src="${ctx}/js/apps/setting/store-point-setting.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/switch/highlight.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/switch/bootstrap-switch.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/switch/main.js?v=${v}"></script>
</html>
