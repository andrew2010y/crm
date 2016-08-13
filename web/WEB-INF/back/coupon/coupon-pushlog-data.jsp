<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
	<c:if test="${empty page.result}">
         <tr data-totalCount="${page.totalCount}"><td colspan="12" class="center">暂无数据</td></tr>
    </c:if>
    <c:forEach items="${page.result}" var="couponPush">
		 <input id="currentId" type="hidden" value="${couponPush.customerCouponId}"/>
         <li data-id="${couponPush.customerCouponId}" data-index="0" data-totalCount="${page.totalCount}">
 			<div class="l_left">${couponPush.couponTitle}</div>
 			<div class="l_right">
 				<span>
 					<fmt:formatNumber type="percent" value="${couponPush.consumeCount/couponPush.pushCount}" />
 				</span>
 				<span class="del-icon-flag"></span>
				<a class="del-icon" title="删除"></a>
 			</div>
          </li>      					
	</c:forEach> 		