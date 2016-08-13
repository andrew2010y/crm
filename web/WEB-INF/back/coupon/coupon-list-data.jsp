<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
	<c:if test="${empty page.result}">
         <tr data-totalCount="${page.totalCount}"><td colspan="12" class="center">暂无数据</td></tr>
    </c:if>
    <c:forEach items="${page.result}" var="coupon">
	<tr class="order_tr" data-objid="${coupon.couponId}" data-totalCount="${page.totalCount}">
		<td>
			<input type="checkbox" class="icheckbox_minimal order_checkbox" id="${coupon.couponId}" 
		 synchWechat="${coupon.synchWechat}" flg="${coupon.status}" wechatStatus="${coupon.wechatStatus}">
		</td>
		<td>
			<p><span class="text-light-blue show_coupon_info">${coupon.title}</span></p>
			<p>
			<span class="coupon-status ongoing">
				<c:if test="${coupon.status==1}">
		 				<c:if test="${coupon.synchWechat}">
		 					<c:if test="${coupon.wechatStatus!=1}"> 
								微信创建中
							</c:if>
							<c:if test="${coupon.wechatStatus==1}"> 
								未生效
							</c:if>
		 				</c:if>
		 				<c:if test="${not coupon.synchWechat}">
		 					未生效
		 				</c:if>
					</c:if>
					<c:if test="${coupon.status==2}"> 
						进行中
					</c:if>
					<c:if test="${coupon.status==3}"> 
						已结束
					</c:if>
			</span>
			<!-- 是否同步微信卡券 同步为active 没有同步没有active -->
			<c:if test="${coupon.synchWechat}">
		 		<span class="syn-icon active"></span> 
		 	</c:if>
			</p>
		</td>
		<td>
			<p>
						<c:if test="${coupon.type==1}"> 
							抵用券
						</c:if>
						<c:if test="${coupon.type==2}"> 
							折扣券
						</c:if>
			</p>
			<p>
			<c:if test="${coupon.useScene==0}"> 
				不限
			</c:if>
			<c:if test="${coupon.useScene==1}"> 
				仅商城
			</c:if>
			<c:if test="${coupon.useScene==2}"> 
				仅店客源
			</c:if>
			</p>
		</td>
		<td>
			<c:if test="${coupon.type==1}"> 
			<p><fmt:formatNumber type="number" value="${coupon.faceAmount/100}" maxFractionDigits="0"/>元</p>
			</c:if>
			<c:if test="${coupon.type==2}"> 
			<p>${coupon.faceAmount}%</p>
			</c:if>
			<p>${coupon.remainingAmount}</p>
		</td>
		<td>
			<p>
				<c:if test="${coupon.getLimit==0}"> 
							不限
						</c:if>
						<c:if test="${coupon.getLimit!=0}"> 
							每人限领${coupon.getLimit}张
						</c:if>
			</p>
			<p>已领：${coupon.getQuantity}张</p>
		</td>
		<td>
			<p>
			<c:if test="${coupon.priceLimit==0}"> 
							不限
			</c:if>
			<c:if test="${coupon.priceLimit!=0}"> 
					订单满<fmt:formatNumber type="number" value="${coupon.priceLimit/100}" maxFractionDigits="0"/>元可用
			</c:if>
			</p>
			<p>已用：${coupon.closeQuantity}张</p>
		</td>
		<td class="deadline-td">
			<p>${coupon.startTimeStr}</p>
			<p>-</p>
			<p>${coupon.endTimeStr}</p>
		</td>
		<td>
			<p>
			<c:if test="${coupon.hasSubStore}"> 
				<c:if test="${fn:length(coupon.subStoreDataList)== 1}">
					<c:forEach items="${coupon.subStoreDataList}" var="subStoreData">
						${subStoreData.name}
					</c:forEach>
				</c:if>
				<c:if test="${fn:length(coupon.subStoreDataList)>1}">
					${fn:length(coupon.subStoreDataList)}家门店
				</c:if>
			</c:if>
			<c:if test="${not coupon.hasSubStore}"> 
				所有门店
			</c:if>
			</p>
			<p>
				<a class="coupon_action action_getLink" onclick="setCurrentCouponName(this);getListCardByCouponsId(1,'${coupon.couponId}')">领取链接</a>
				<a class="coupon_action action_edit">
					<c:if test="${coupon.status==1}"> 
						<c:if test="${coupon.synchWechat}"> 
							<c:if test="${coupon.wechatStatus==1}"> 
							编辑
							</c:if>
							<c:if test="${coupon.wechatStatus!=1}"> 
							查看
							</c:if>
						</c:if>
						<c:if test="${not coupon.synchWechat}"> 
						编辑
						</c:if>
					</c:if>
					<c:if test="${coupon.status==2||coupon.status==3}"> 
						查看
					</c:if>
				</a>
				<c:if test="${coupon.status==3}"> 
					<a class="coupon_action" onclick="delCoupon('${coupon.couponId}')">删除</a>
				</c:if>
				 
			</p>
		</td>
	</tr>
	</c:forEach> 		