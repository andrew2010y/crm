<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
	<c:if test="${empty page.result || fn:length(page.result) == 0}">
         <tr data-totalCount="${page.totalCount}"><td colspan="12" class="center">暂无数据</td></tr>
    </c:if>
	<c:forEach items="${page.result}" var="data">
 	<tr valign="middle" data-totalCount="${page.totalCount}">
 	<input type="hidden" class="present-id" value="${data.presentId}" />
 	<input type="hidden" class="level" value="${data.level}" />
		<td style="text-align:left;">${data.name}</td>
		<td>
			<c:set var="tagSize" value="${fn:length(data.targetList)}"></c:set>
			<c:if test="${tagSize<=3}">
				<c:forEach items="${data.targetList}" var="tag">
				<span class="label-span ellipsis">${tag}</span>
				</c:forEach>
			</c:if>
			<c:if test="${tagSize>3}">
				<span class="label-span ellipsis" >${data.targetList[0]}</span>
				<span class="label-span ellipsis" >${data.targetList[1]}</span>
				<span class="label-span ellipsis more-tags">更多</span>
			</c:if>
			<div class="all-tags">
				<c:forEach items="${data.targetList}" var="tag">
				<span class="checked-label-span ellipsis">${tag}</span>
				</c:forEach>
			</div> 
		</td>
		<td style="text-align:left;padding-left:30px;">
			<c:if test="${data.type==0 }" ><i class="present-icon">惠</i><span class="ellipsis sign-present-title">${data.content}</span></c:if>
			<c:if test="${data.type==1 }" ><i class="present-icon">页</i><span class="ellipsis sign-present-title">${data.content}</span></c:if>
			<c:if test="${data.type==2 }" ><i class="present-icon">链</i><a target="_blank" href="${data.content}" class="ellipsis sign-present-title">${data.content}</a></c:if>
		</td>
		<td>
		<c:if test="${data.type==0  }">
			<c:if test="${not empty data.count }">${data.count }</c:if>
		</c:if>
		<c:if test="${data.type==1 || data.type==2 }">-</c:if>
		</td>
		<td >
		<i class="glyphicon glyphicon-arrow-up arrow-icon mr25" title="上移"></i>
		<i class="glyphicon glyphicon-arrow-down arrow-icon" title="下移"></i>
		</td>
		<td>
			<a  class="mr20 to-edit">编辑</a>
			<a href="javascript:void(0);" class="to-delete">删除</a>
		</td>
	</tr>
	</c:forEach>
