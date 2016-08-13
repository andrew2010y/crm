<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<!-- IE能够使用最新渲染模式而不是兼容模式 -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!-- 国产浏览器默认采用“高速”模式渲染页面 -->
		<meta name="renderer" content="webkit">
		<!--title上的icon-->
		<link rel="shortcut icon" href="${ctx}/img/favicon.ico?v=${v}" >
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/font-awesome.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/ionicons.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/AdminLTE.css?v=${v}" />
		<link rel="stylesheet" type="text/css"  href="${ctx}/css/libs/jQueryUI/jquery-ui-1.11.4.css?v=${v}" />
		<link rel="stylesheet" type="text/css" href="${ctx}/css/libs/jQueryUI/jquery-ui-timepicker-addon.css"/>
		<link rel="stylesheet" href="${ctx}/css/apps/main.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/apps/form/form-store-prop.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/city-selector.css?v=${v}" />
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		    <script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
		    <script src="http://apps.bdimg.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		<title>舞象数据中心</title>
	</head>
	<body class="skin-blue fixed">
		<jsp:include page="/WEB-INF/include/nav.jsp"></jsp:include>
		<div class="wrapper row-offcanvas row-offcanvas-left">
			<!--三级菜单-->
			<jsp:include page="/WEB-INF/back/menu/menu.jsp"></jsp:include>
			<aside class="right-side">
               	<div class="box cus-info-set-box">
               		<div class="product-head">
		     			<span class="product-title">会员信息设置</span>
		     			<span class="tips">*请选择您所需的字段，会员信息字段将作为会员信息数据基础，选中保存后请勿随意移除</span>
		     			<span class="float-right head-edit-btn">
		     				<button class="btn btn-primary">编辑</button>
		     			</span>
		     			<span class="float-right head-operate-btn" style="display:none;">
		     				<button id="head-cancel-btn" class="btn btn-default" style="margin-right:10px;">取消</button>
		     				<button id="head-save-btn" class="btn btn-primary">保存</button>
		     			</span>
		     			
		     		</div>
		     		<div class="cus-info-set-body box-body">
		     			<div class="must-field">
		     				<div>
		     					<span>基本字段:</span>
		     					<p class="must-field-words">
		     						<span>头像</span>
		     						<span>手机号</span>
		     						<span>昵称</span>
		     						<span>注册门店</span>
		     						<span>注册类型</span>
		     						<span>注册渠道</span>
		     						<span>收货地址</span>
		     					</p>
		     				</div>
		     				<p class="must-field-tip tips">*基础字段为支持舞象云系统正常运转必选字段，无法修改</p>
		     			</div>
		     			<div class="other-field">
		     				<div class="other-field-head">
		     					<span>可选字段:</span>
		     					<span class="other-field-tip tips">*请点击编辑后，从下方备选字段中选择所需字段，会员在个人中心将可以维护选中信息，备注（商户填写）除外</sapn>
		     				</div>
		     			</div>	
		     		</div>
		     		<!-- 不可编辑状态字段列表 -->
		     		<div class="unedit-box">
		     			<div class="table-head-back" style="margin-top: -1px;"></div>
		     			<div class="table-panel">
							<table class="table user-table" aria-describedby="example2_info" id="">
								<thead>
									<tr valign="middle">
										<th width="35px">排序</th>
										<th width="300px">指标名称</th>
										<th width="300px">输入方式</th>
										<th>输入内容</th>
									</tr>
								</thead>
								<tbody id="usingList" data-tmp="template1">
								<!-- 默认字段列表 -->
								<c:forEach var="item" items="${using.defaultProp}" varStatus="status" >
									<c:if test="${item =='vip_card_no'}">
									<tr>
										<td width="35px">
											<span>${status.index+1}</span>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>关联实卡</td>
										<td>文本框</td>
										<td><span>32字以内</span></td>
									</tr>
									</c:if>
									<c:if test="${item =='name'}" >
									<tr>
										<td width="35px">
											<span>${status.index+1}</span>
											<input type="hidden" class="label-name" value="${item}"/> 
										</td>
										<td>姓名</td>
										<td>文本框</td>
										<td><span>10字以内</span></td>
									</tr>
									</c:if>
									<c:if test="${item == 'sex'}" >
									<tr>
										<td width="35px">
											<span>${status.index+1}</span>
											<input type="hidden" class="label-name" value="${item}"/> 
										</td>
										<td>性别</td>
										<td>单选框</td>
										<td><span>男 | 女</span></td>
									</tr>
									</c:if>
									<c:if test="${item == 'birth_date'}" >
									<tr>
										<td width="35px">
											<span>${status.index+1}</span>
											<input type="hidden" class="label-name" value="${item}"/> 
										</td>
										<td>生日</td>
										<td>日期框</td>
										<td><span>-</span></td>
									</tr>
									</c:if>
									<c:if test="${item == 'area_code'}" >
									<tr>
										<td width="35px">
											<span>${status.index+1}</span>
											<input type="hidden" class="label-name" value="${item}"/> 
										</td>
										<td>城市</td>
										<td>城市框</td>
										<td><span>-</span></td>
									</tr>
									</c:if>
									<c:if test="${item == 'remark'}" >
									<tr>
										<td width="35px">
											<span>${status.index+1}</span>
											<input type="hidden" class="label-name" value="${item}"/> 
										</td>
										<td>备注</td>
										<td>文本框</td>
										<td><span>30字以内</span></td>
									</tr>
									</c:if>
								</c:forEach>
								<!-- 可选字段列表 -->
								<c:forEach var="item" items="${using.customProp}" varStatus="status" >
									<!-- 预产期 -->
									<c:if test="${item.name == 'edc'}">
									<tr>
										<td>${fn:length(using.defaultProp)+status.index+1}</td>
										<td>${item.labelName}</td>
										<td>日期框</td>
										<td><span>-</span></td>
									</tr>
									</c:if>
									<!-- 个人状态 -->
									<c:if test="${item.name == 'state'}">
									<tr>
										<td>${fn:length(using.defaultProp)+status.index+1}</td>
										<td>${item.labelName}</td>
										<td>单选框</td>
										<td>
											<span class="stateValue">${fn:replace(item.value,',','|')}</span>
										</td>
									</tr>
									</c:if>
									<!-- 宝宝生日 -->
									<c:if test="${item.name == 'baby_birth_date'}">
									<tr>
										<td>${fn:length(using.defaultProp)+status.index+1}</td>
										<td>${item.labelName}</td>
										<td>日期框</td>
										<td><span>-</span></td>
									</tr>
									</c:if>
									<!-- 邮箱 -->
									<c:if test="${item.name == 'email'}">
									<tr>
										<td>${fn:length(using.defaultProp)+status.index+1}</td>
										<td>${item.labelName}</td>
										<td>输入框</td>
										<td><span>30字以内</span></td>
									</tr>
									</c:if>
								</c:forEach>
								</tbody>
							</table>
						</div>
		     		</div>	
		     		<!-- 编辑状态 --> 
		     		<div class="edit-box" style="display:none;">
		     			<div class="table-head-back" style="margin-top: -1px;"></div>
		     			<div class="table-panel">
		     			<!-- 使用中的字段 -->
							<table class="table user-table" aria-describedby="example2_info" id="usingTable"> 
								<thead>
									<tr valign="middle">
										<th width="35px">选择</th>
										<th width="300px">指标名称</th>
										<th width="300px">输入方式</th>
										<th>输入内容</th> 
									</tr>
								</thead>
								<tbody data-tmp="template1">
								<!-- 默认字段列表 -->
								<c:forEach var="item" items="${using.defaultProp}" varStatus="status" >
									<c:if test="${item =='vip_card_no'}" >
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>关联实卡</td>
										<td>文本框</td>
										<td><span>32字以内</span></td>
									</tr>
									</c:if>
									<c:if test="${item =='name'}" >
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>姓名</td>
										<td>文本框</td>
										<td><span>10字以内</span></td>
									</tr>
									</c:if>
									<c:if test="${item == 'sex'}" >
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>性别</td>
										<td>单选框</td>
										<td><span>男 | 女</span></td>
									</tr>
									</c:if>
									<c:if test="${item == 'birth_date'}" >
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>生日</td>
										<td>日期框</td>
										<td><span>-</span></td>
									</tr>
									</c:if>
									<c:if test="${item == 'area_code'}" >
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>城市</td>
										<td>城市框</td>
										<td><span>-</span></td>
									</tr>
									</c:if>
									<c:if test="${item == 'remark'}" >
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>备注</td>
										<td>文本框</td>
										<td><span>30字以内</span></td>
									</tr>
									</c:if>
								</c:forEach>
								<!-- 可选字段列表 -->
								<c:forEach var="item" items="${using.customProp}" varStatus="status" >
									<!-- 预产期 -->
									<c:if test="${item.name == 'edc'}">
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="storePropId" value="${item.storePropId}" />
										</td>
										<td>${item.labelName}</td>
										<td>日期框</td>
										<td><span>-</span></td>
									</tr>
									</c:if>
									<!-- 个人状态 -->
									<c:if test="${item.name == 'state'}">
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="storePropId" value="${item.storePropId}" />
										</td>
										<td>${item.labelName}</td>
										<td>单选框</td>
										<td>
											<span class="edit-value stateValue">${fn:replace(item.value,',','|')}</span>
											<a id="stateEditBtn" style="display:none;white-space:nowrap"> 修改 </a>
										</td>
									</tr>
									</c:if>
									<!-- 宝宝生日 -->
									<c:if test="${item.name == 'baby_birth_date'}">
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="storePropId" value="${item.storePropId}" />
										</td>
										<td>${item.labelName}</td>
										<td>日期框</td>
										<td><span>-</span></td>
									</tr>
									</c:if>
									<!-- 邮箱 -->
									<c:if test="${item.name == 'email'}">
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="storePropId" value="${item.storePropId}" />
										</td>
										<td>${item.labelName}</td>
										<td>输入框</td>
										<td><span>30字以内</span></td>
									</tr>
									</c:if>
								</c:forEach>
								</tbody>
							</table>
						</div>
						<div style="text-align:center;margin:30px 0;">
							<button class="btn btn-info" id="upBtn" style="margin-right:20px;">上移 </button>
							<button class="btn btn-info" id="downBtn" > 下移 </button>
						</div>
						<!-- 未设置列表 -->
						<div class="table-head-back" style="margin-top: -1px;"></div>
		     			<div class="table-panel">
							<table class="table user-table" aria-describedby="example2_info" id="unusedTable">
								<thead>
									<tr valign="middle">
										<th width="35px">选择</th>
										<th width="300px">指标名称</th>
										<th width="300px">输入方式</th>
										<th >输入内容</th>
									</tr>
								</thead>
								<tbody id="" data-tmp="template1">
								<!-- 默认字段列表 -->
								<c:forEach var="item" items="${unused.defaultProp}" varStatus="status">
									<c:if test="${item =='vip_card_no'}" >
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>关联实卡</td>
										<td>文本框</td>
										<td><span>32字以内</span></td>
									</tr>
									</c:if>
									<c:if test="${item =='name'}" >
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>姓名</td>
										<td>文本框</td>
										<td><span>10字以内</span></td>
									</tr>
									</c:if>
									<c:if test="${item == 'sex'}" >
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>性别</td>
										<td>单选框</td>
										<td><span>男 | 女</span></td>
									</tr>
									</c:if>
									<c:if test="${item == 'birth_date'}" >
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>生日</td>
										<td>日期框</td>
										<td><span>-</span></td>
									</tr>
									</c:if>
									<c:if test="${item == 'area_code'}" >
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>城市</td>
										<td>城市框</td>
										<td><span>-</span></td>
									</tr>
									</c:if>
									<c:if test="${item == 'remark'}" >
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="label-name" value="${item}"/>
										</td>
										<td>备注</td>
										<td>文本框</td>
										<td><span>30字以内</span></td>
									</tr>
									</c:if>
								</c:forEach>
								<!-- 未设置的可选字段列表 -->
								<c:forEach var="item" items="${unused.customProp}" varStatus="status" >
									<!-- 预产期 -->
									<c:if test="${item.name == 'edc'}">
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="storePropId" value="${item.storePropId}" />
										</td>
										<td>${item.labelName}</td>
										<td>日期框</td>
										<td><span>-</span></td>
									</tr>
									</c:if>
									<!-- 个人状态 -->
									<c:if test="${item.name == 'state'}">
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="storePropId" value="${item.storePropId}" />
										</td>
										<td>${item.labelName}</td>
										<td>单选框</td>
										<td>
											<span class="edit-value stateValue">${fn:replace(item.value,',','|')}</span>
											<c:if test="${not empty item.value}">
											<a id="stateEditBtn" style="white-space:nowrap"> 修改 </a>
											</c:if>
											<c:if test="${empty item.value}">
											<a id="stateEditBtn"> 添加</a>
											</c:if>
										</td>
									</tr>
									</c:if>
									<!-- 宝宝生日 -->
									<c:if test="${item.name == 'baby_birth_date'}">
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="storePropId" value="${item.storePropId}" />
										</td>
										<td>${item.labelName}</td>
										<td>日期框</td>
										<td><span>-</span></td>
									</tr>
									</c:if>
									<!-- 邮箱 -->
									<c:if test="${item.name == 'email'}">
									<tr>
										<td>
											<input type ="checkbox" class="check-box user_check"/>
											<input type="hidden" class="storePropId" value="${item.storePropId}" />
										</td>
										<td>${item.labelName}</td>
										<td>输入框</td>
										<td><span>30字以内</span></td>
									</tr>
									</c:if>
								</c:forEach>
								</tbody>
							</table>
						</div>
					</div>			
		    	</div>
			</aside>
		</div>
		<!-- 个人状态修改弹出层 -->
		<div class="modal fade" id="stateEdit_modal" tabindex="99" role="dialog" aria-labelledby="stateEdit" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="stateEdit"">*直接输入，每行一个，最多5个</h4>
					 </div>
					<div class="modal-body dialog-content">
						<div class="modal-body-con text-left">
    						<textarea rows="10" cols="20" id="editTextarea"></textarea>
    						<div class="edit-modal-tip text-red">最多只能输入5个</div>
						</div>
						<div class="modal-body-operation">
							<button type="button" class="btn btn-default" data-dismiss="modal" style="margin-right:20px;">取消</button>
							<button class="btn btn-info" id="edit-save-btn">确定</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 保存设置弹出层 -->
		<div class="modal fade" id="save_modal" tabindex="99" role="dialog" aria-labelledby="saveLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="saveLabel"">保存修改</h4>
					 </div>
					<div class="modal-body close-set-content">
						<div class="modal-body-con text-left">
    						<div>
    							<i><img src="${ctx}/img/tip-icon.png"/></i>
    							<span class="text-red dialog-text">请确认会员信息设置内容，会员信息设置将会影响到其他功能使用，切勿随意更改！</span>
    						</div>
						</div>
						<div class="modal-body-operation" style="margin-top:50px;">
							<button type="button" class="btn btn-default" style="margin-right:20px;" onclick="save(event)">保存</button>
							<button class="btn btn-info" data-dismiss="modal">再考虑一下？</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/app.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui.min.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui-timepicker-addon.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui-timepicker-zh-CN.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui-i18n.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/apps/form/form-store-prop.js?v=${v}" ></script>
</html>