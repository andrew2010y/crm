<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
	<c:if test="${empty page.result}">
         <tr data-totalCount="${page.totalCount}"><td colspan="12" class="center">暂无数据</td></tr>
        </c:if>
	 <c:forEach items="${page.result}" var="coupon">
		 <tr data-couponId="${coupon.couponLogId}" data-totalCount="${page.totalCount}" 
		 data-receivedCount="${receivedCount}" data-spendCount="${spendCount}" 
		 data-usableCount="${usableCount}">
		 
			<td>
				<input type="hidden" class="couponId" value ="${coupon.couponLogId}" />
				<span class="text-light-blue">${coupon.title}</span>
			</td>
			<td>
				<c:if test="${coupon.state==1}"> 
							未领取
				</c:if>
				<c:if test="${coupon.state==2}"> 
							已领取
				</c:if>
				<c:if test="${coupon.state==3}"> 
							已消费
				</c:if>
			</td>
			<td class="date_td">
				<span>${wxcrm:formatDate(coupon.updateTime)}</span>
			</td>
			<td>
				${coupon.orderId}
			</td>
		</tr>
	</c:forEach> 