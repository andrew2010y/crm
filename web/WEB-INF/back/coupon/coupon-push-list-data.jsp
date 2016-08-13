<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
	<c:if test="${empty page.result}">
         <tr data-totalCount="${page.totalCount}"><td colspan="12" class="center">暂无数据</td></tr>
        </c:if>
	 <c:forEach items="${page.result}" var="coupon">
		 <tr data-couponId="${coupon.couponId}" data-totalCount="${page.totalCount}">
			<td>
				<input type="hidden" class="couponId" value ="${coupon.couponId}" />
				<input type="checkbox" class="coupon_check" value="1"/>
				<input type="hidden" id="${coupon.couponId}" value="${coupon.couponUrl}" >
				<input type="hidden" id="${coupon.couponId}count" value="${coupon.remainingAmount}" >
			</td>
			<td>
				<p>
					<span class="text-light-blue">${coupon.title}</span>
				</p>
			<%-- 	<p><span>同步微信卡券</span>
					<%if (list[i].isLinkWechat == 0){%>
						-
					<% } %>
					<%if (list[i].isLinkWechat != 0) {%>
						<span>同步微信卡券</span>
					<% } %>
				</p> --%>
			</td>
			<td>
				<p>
					<span>
						<c:if test="${coupon.type==1}"> 
							抵用券
						</c:if>
						<c:if test="${coupon.type==2}"> 
							折扣券
						</c:if>
					</span>
				</p>
				<p>
					<span>
						<c:if test="${coupon.useScene==0}"> 
							不限
						</c:if>
						<c:if test="${coupon.useScene==1}"> 
							仅微商城
						</c:if>
						<c:if test="${coupon.useScene==2}"> 
							仅店客源
						</c:if>
						<c:if test="${coupon.useScene==3}"> 
							仅微POS
						</c:if>
					</span>
				</p>
			</td>
			<td>
				<p>
					<span>
						<c:if test="${coupon.type==1}"> 
							<fmt:formatNumber type="number" value="${coupon.faceAmount/100}" maxFractionDigits="0"/>元
						</c:if>
						<c:if test="${coupon.type==2}"> 
						${coupon.faceAmount}%
						</c:if>
						<%-- <%if (list[i].ccouponType == 1){%>
							<%=list[i].couponVal%>元
						<% } %>
						<%if (list[i].ccouponType == 2) {%>
							<%=list[i].couponVal%>%
						<% } %> --%>
					</span>
				</p>
				<p>
					<span>${coupon.remainingAmount}</span>
				</p>
			</td>
			<td>
				<p>
					<span>
						<c:if test="${coupon.getLimit==0}"> 
							不限领
						</c:if>
						<c:if test="${coupon.getLimit!=0}"> 
							每人限领${coupon.getLimit}张
						</c:if>
					</span>
				</p>
				<p>
					<span>
						已领： ${coupon.getQuantity}张
					</span>
				</p>
			</td>
			<td>
				<p>
					<span>
						<c:if test="${coupon.priceLimit==0}"> 
							不限
						</c:if>
						<c:if test="${coupon.priceLimit!=0}"> 
							订单满<fmt:formatNumber type="number" value="${coupon.priceLimit/100}" maxFractionDigits="0"/>元可用
						</c:if>
					</span>
				</p>
				<p>
					<span>
						已用：${coupon.closeQuantity}张
					</span>
				</p>
			</td>
			<td class="date_td">
				<p>
					<span>${coupon.startTimeStr}</span>
				</p>
				<p class="t_link_p">-</p>
				<p>
					<span>
						${coupon.endTimeStr}
					</span>
				</p>
			</td>
			<td>
				<p>
					<span>
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
					</span>
				</p>
			</td>
		</tr>
	</c:forEach> 