<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
	<c:if test="${empty page.result}">
         <tr data-totalCount="${page.totalCount}"><td colspan="12" class="center">暂无数据</td></tr>
    </c:if>
    <c:forEach items="${page.result}" var="store">
	<tr class="order_tr" data-totalCount="${page.totalCount}" data-id="${store.id}" data-name="${store.shortName}">
		<td>
			<input type="checkbox" id="${store.id}" class="icheckbox_minimal order_checkbox" value="${store.id}">
		</td>
		<td>${store.shortName}</td>
		<td>${store.address}</td>																																												
	</tr>
  </c:forEach> 		