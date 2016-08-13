<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
	<c:if test="${empty page.result || fn:length(page.result) == 0}">
         <tr data-totalCount="${page.totalCount}"><td colspan="12" class="center">暂无数据</td></tr>
    </c:if>
	<c:forEach items="${page.result}" var="data">
	<tr valign="middle" data-totalCount="${page.totalCount}">
		<td>${data.title}</td>
		<td>${wxcrm:formatDate(data.pushTime)}</td>
		<td>
		<c:if test="${data.scope==0 }">全体推送</c:if>
		<c:if test="${data.scope==1 }">
			<c:set var="tagSize" value="${fn:length(data.tagList)}"></c:set>
			<c:if test="${tagSize<=3}">
				<c:forEach items="${data.tagList}" var="tag">
				<span class="label-span ellipsis">${tag}</span>
				</c:forEach>
			</c:if>
			<c:if test="${tagSize>3}">
				<span class="label-span ellipsis" >${data.tagList[0]}</span>
				<span class="label-span ellipsis" >${data.tagList[1]}</span>
				<span class="label-span ellipsis more-tags">更多</span>
			</c:if>
			<div class="all-tags">
				<c:forEach items="${data.tagList}" var="tag">
				<span class="checked-label-span ellipsis">${tag}</span>
				</c:forEach>
			</div>
		</c:if>  
		</td>
		<td>${data.pushCount }</td>
		<td>
		<c:if test="${not empty data.sentCount }">${data.sentCount }</c:if>
		<c:if test="${empty data.sentCount }">-</c:if>
		</td>
		<td <c:if test="${data.status !=0 && data.status !=1}">class="text-red"</c:if> >${data.statusMsg}</td>
	</tr>
	</c:forEach>
