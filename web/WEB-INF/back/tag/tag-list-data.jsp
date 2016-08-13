<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
	<c:if test="${empty page.userList.result}">
         <tr data-totalCount="${page.userList.totalCount}" data-tagId="${page.tagId }" data-tagName="${page.tagName }">
         <td colspan="6" class="center">
         <input type="hidden" id="tagName" value="${page.tagName }"/>
         <input type="hidden" id="tagId" value="${page.tagId }"/>
         	暂无数据</td></tr>
        </c:if>
	 <c:forEach items="${page.userList.result}" var="user">
	 <tr data-userId="${user.customerId}" data-totalCount="${page.userList.totalCount}" data-tagId="${page.tagId }" data-tagName="${page.tagName }">
		<td>
			<input type="hidden" id="tagName" value="${page.tagName }"/>
	        <input type="hidden" id="tagId" value="${page.tagId }"/>
			<input type="hidden" class="useId" value ="${user.customerId}" />
			<a class="t_user_account">${user.customerId}</a>
		</td>
		<td>
			${user.name}
		</td>
		<td>
		<c:choose>
			<c:when test="${user.phone==0}"> 
					-
			</c:when>
			<c:otherwise> 
				${user.phone}
			</c:otherwise>
		</c:choose>
		</td>
		<td>
		<c:if test="${user.state==0}"> 
			正常
		</c:if>
		<c:if test="${user.state==1}"> 
			冻结
		</c:if>
		</td>
		
		<td class="label_td">
			<c:set var="custTagSize" value="${fn:length(user.tagList) }"></c:set>
			<c:if test="${custTagSize<=4}">
				 <c:forEach items="${user.tagList}" var="tag"> 
				 	<span class="label-span ellipsis" data-label-id="${tag.tagId }" >${tag.name }</span>
				 </c:forEach>
			</c:if>
			<c:if test="${custTagSize>4}">
				<span class="label-span ellipsis" data-label-id="${user.tagList[0].tagId }" >${user.tagList[0].name }</span>
				<span class="label-span ellipsis" data-label-id="${user.tagList[1].tagId }" >${user.tagList[1].name }</span>
				<span class="label-span ellipsis" data-label-id="${user.tagList[2].tagId }" >${user.tagList[2].name }</span>
				<span class="label-span ellipsis elli-label" data-label-id="0" >...... </span>
			</c:if>
		</td>
		<td>
			<a class="remove-icon removeUser"></a>
			<div class="multi-sele-div">
				<input class="useId" value="1" type="hidden">
				<input class="user_check" value="1" type="checkbox">
			</div>
		</td>
		<!-- <td>
			<input type="checkbox" class="user_check" value="1"/>
		</td>	 -->
	</tr>
</c:forEach> 