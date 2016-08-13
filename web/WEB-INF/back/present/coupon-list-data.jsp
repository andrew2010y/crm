<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<c:if test="${empty page.result || fn:length(page.result) == 0}">
    <tr data-totalCount="${page.totalCount}"><td colspan="5" class="center">暂无数据</td></tr>
</c:if>
<c:forEach items="${page.result}" var="data">
	<tr valign="middle" data-totalCount="${page.totalCount}">
	<input type="hidden" class="coupon-id" value="${data.couponId }" />
	<input type="hidden" class="start-time" value="${fn:substring(wxcrm:formatDate(data.startTime), 0, 10)}" />
	<input type="hidden" class="end-time" value="${fn:substring(wxcrm:formatDate(data.endTime), 0, 10)}" />
		<td>${data.title}</td>
		<td>
			<c:if test="${data.type==1}">抵用券</c:if>
			<c:if test="${data.type==2}">折扣券</c:if>
		</td>
		<td>
			<c:if test="${data.type==1}">${data.faceAmount}元</c:if>
			<c:if test="${data.type==2}">${data.faceAmount}%</c:if>
		</td>
		<td>${data.remainingAmount }</td>
		<td class="center"><input type="checkbox" class="check-btn" data-switch-no-init /></td>
	</tr>
</c:forEach>
