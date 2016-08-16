<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
	<c:if test="${empty page.result}">
         <tr data-totalCount="${page.totalCount}"><td colspan="12" class="center">暂无数据</td></tr>
    </c:if>
	<c:forEach items="${page.result}" var="cust">
	<c:if test="${! empty cust.allCustomerId }">
		<input type="hidden" id="allCustomeId" value="${cust.allCustomerId }"/>
	</c:if>
 	<tr data-userId="${cust.customerId}" data-totalCount="${page.totalCount}">
		<td>
			<input type="hidden" class="useId" value ="${cust.customerId}" />
			<input type="checkbox" class="user_check" value="1"/>
		</td>
		<!-- 头像 -->
		<td>
			<div style="position:relative;">
				<c:if test="${empty cust.logo}">
					<img class="" style="width:50px;height:50px;border-radius:50px;" src="${ctx }/img/list-cus-icon.png" />
				</c:if>
				<c:if test="${! empty cust.logo}">
					<img class="" style="width:50px;height:50px;border-radius:50px;" src="${cust.logo }" />
				</c:if>
				<c:if test="${cust.perfectDegree == 100 }">
					<img class="" style="width:15px;height:15px;position:absolute;top:0;right:0;" src="${ctx}/img/info-icon.png"/>
				</c:if>
			</div>
		</td>
		<!-- 会员卡号 -->
		<td style="text-align:left">
			<a class="t_user_account text-left" data-id="${cust.customerId}">${cust.cardNo}</a>
			<!-- 各种icon -->
			<p class="text-left">
				<c:if test="${cust.followPublicNum!=null}">
						<c:if test="${cust.followPublicNum == '0' }">
							<!-- 未关注公众号 -->
							<img alt="未关注" src="${ctx }/img/unfollow-wx-icon.png" title="未关注公众号" />
						</c:if>
						<c:if test="${cust.followPublicNum == '1' }">
							<!-- 已关注公众号 -->
							<img alt="已关注" src="${ctx }/img/follow-wx-icon.png" title="已关注公众号" />
						</c:if>
				</c:if>
				<c:if test="${cust.followPublicNum==null}">
					<!-- 未关注公众号 -->
					<img alt="未关注" src="${ctx }/img/unfollow-wx-icon.png" title="未关注公众号" />
				</c:if>
			
				<c:if test="${empty cust.openId }">
					<!-- 未绑定微信 -->
					<img alt="未绑定" src="${ctx }/img/unbind-wx-icon.png" title="未绑定微信" />
				</c:if>
				<c:if test="${! empty cust.openId }">
					<!-- 已绑定微信 -->
					<img alt="已绑定" src="${ctx }/img/bind-wx-icon.png" title="已绑定微信" />
				</c:if>
				<c:if test="${cust.state == '0' }">
					<!-- 正常 -->
					<img alt="正常" src="${ctx }/img/unfreeze-icon.png" title="正常" />
				</c:if>
				<c:if test="${cust.state == '1' }">
					<!-- 冻结 -->
					<img alt="冻结" src="${ctx }/img/freeze-icon.png" title="冻结" />
				</c:if>
			</p>
		</td>
		<td>
		<!-- 昵称 -->
		<a class="t_user_account text-left" data-id="${cust.customerId}">
		<c:choose>
			<c:when test="${empty cust.nickName}"> 
				<p>-</p>
			</c:when>
			<c:otherwise> 
				<p>${cust.nickName}</p>
			</c:otherwise>
		</c:choose>
		<!-- 手机号 -->
		<c:choose>
			<c:when test="${cust.username==0}"> 
				<p>手机未绑定</p>
			</c:when>
			<c:otherwise> 
				<p>${cust.username}</p>
			</c:otherwise>
		</c:choose>
		</a>
		</td>
		<!-- 注册门店 -->
		<td class="regist-store">
			<input type="hidden" value="${cust.storeId}" class="regist_storeId"/>
			<p class="store-val"></p>
			<p><%-- ${wxcrm:formatDate(cust.createTime)} --%>
			</p>
			<c:if test="${cust.customerType==0 || empty cust.customerType}"> 
				车友会员
			</c:if>
			<c:if test="${cust.customerType==1}"> 
				VIP卡会员
			</c:if>
		</td>
		<!-- 最近消费 -->
		<td>
		<c:choose>
			<c:when test="${cust.customerType==0}"> 
				<c:if test="${not empty cust.purchaseAmount}"> 
				<p>${cust.purchaseAmount}万</p>
				</c:if>
			</c:when>
			<c:otherwise> 
				<p>10万</p>
			</c:otherwise>
		</c:choose>
		</td>
		<td>
		 ${cust.sellAmount}
		</td>
		<!-- 积分 -->
		<%-- <td>
			</p>剩余：${cust.point}</p>
			</p>累计：${cust.accrualPoint}</p>
		</td> --%>
		<!-- 标签 -->
		<td class="label_td">
		${cust.createTime}
			<c:set var="custTagSize" value="${fn:length(custTagMap[cust.customerId]) }"></c:set>
			<c:if test="${custTagSize<=4}">
				 <c:forEach items="${custTagMap[cust.customerId]}" var="tag"> 
				 	<span class="label-span ellipsis" data-label-id="${tag.tagId }" >${tag.name }</span>
				 </c:forEach>
			</c:if>
			<c:if test="${custTagSize>4}">
				<span class="label-span ellipsis" data-label-id="${custTagMap[cust.customerId][0].tagId }" >${custTagMap[cust.customerId][0].name }</span>
				<span class="label-span ellipsis" data-label-id="${custTagMap[cust.customerId][1].tagId }" >${custTagMap[cust.customerId][1].name }</span>
				<span class="label-span ellipsis" data-label-id="${custTagMap[cust.customerId][2].tagId }" >${custTagMap[cust.customerId][2].name }</span>
				<span class="label-span ellipsis elli-label" data-label-id="0" >更多</span>
			</c:if>
		</td>	
	</tr>
</c:forEach> 
