<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
	<c:if test="${empty page.result}">
         <tr data-totalCount="${page.totalCount}"><td colspan="12" class="center">暂无数据</td></tr>
    </c:if>
    <c:forEach items="${page.result}" var="goods">
	<tr data-totalCount="${page.totalCount}" class="order_tr" data-id="${goods.id}" data-name="${goods.goodsName}">
		<td>
		<input type="radio" name="briName" id="401" class="sel-good">
		</td>
		<td>${goods.goodsName}</td>
		<td>${goods.id}</td>
		<td>${goods.goodsCode}</td>
		<td>${goods.totalStock}</td>
	</tr>
  </c:forEach> 		