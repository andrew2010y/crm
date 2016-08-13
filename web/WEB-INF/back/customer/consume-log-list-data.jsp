<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
	<c:if test="${empty page.result}">
         <tr data-totalCount="${page.totalCount}" data-consumeLogId="${consume.consumeLogId }"
         data-customer-customerPrice="${count.customerPrice }"
		 data-customer-totalCount="${count.totalCount }" data-customer-yearCount="${count.yearCount }"
		 data-customer-monthCount="${count.monthCount }" data-customer-dayCount="${count.dayCount }"
		 data-customer-consumeTime="${wxcrm:formatDate(count.consumeTime)}" data-customer-payType="${payType }" ><td colspan="7" class="center">暂无数据</td></tr>
        </c:if>
	 <c:forEach items="${page.result}" var="consume">
		 <tr data-consumeLogId="${consume.consumeLogId }" data-totalCount="${page.totalCount}"
		 data-customer-customerPrice="${count.customerPrice }"
		 data-customer-totalCount="${count.totalCount }" data-customer-yearCount="${count.yearCount }"
		 data-customer-monthCount="${count.monthCount }" data-customer-dayCount="${count.dayCount }"
		 data-customer-consumeTime="${wxcrm:formatDate(count.consumeTime)}" data-customer-payType="${payType }">
			<td>
				${consume.orderNo }
			</td>
			<td class="date_td">
				<span>${wxcrm:formatDate(consume.createTime)}</span>
			</td>
			<td>
				<c:if test="${consume.consumeChannel == 1 }">
					微商城
				</c:if>
				<c:if test="${consume.consumeChannel == 2 }">
					店客源
				</c:if>
				<c:if test="${consume.consumeChannel == 3 }">
					创客源
				</c:if>
				<c:if test="${consume.consumeChannel == 4 }">
					创客链接
				</c:if>
			</td>
			<td>
				<c:if test="${consume.payType == 1 }">
					微信支付
				</c:if>
				<c:if test="${consume.payType == 2 }">
					支付宝支付
				</c:if>
				<c:if test="${consume.payType == 3 }">
					其他
				</c:if>
			</td>
			<td>
				<c:if test="${consume.state == 1 }">
					待付款
				</c:if>
				<c:if test="${consume.state == 2 }">
					待发货
				</c:if>
				<c:if test="${consume.state == 3 }">
					待收货
				</c:if>
				<c:if test="${consume.state == 4 }">
					已签收
				</c:if>
				<c:if test="${consume.state == 7 }">
					待自提
				</c:if>
				<c:if test="${consume.state == 8 }">
					已自提
				</c:if>
			</td>
			<td>
				${consume.price + consume.couponPrice}
			</td>
			<td>
				${consume.price}
			</td>
		</tr>
	</c:forEach> 