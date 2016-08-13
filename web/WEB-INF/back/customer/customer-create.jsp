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
		<link rel="shortcut icon" href="${ctx}/img/favicon.ico" >
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/font-awesome.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/ionicons.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/AdminLTE.css?v=${v}" />
		<link rel="stylesheet" type="text/css"  href="${ctx}/css/libs/jQueryUI/jquery-ui-1.11.4.css?v=${v}" />
		<link rel="stylesheet" type="text/css" href="${ctx}/css/libs/jQueryUI/jquery-ui-timepicker-addon.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/apps/main.css?v=${v}" />
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
		<!-- include nav.jsp -->
		<jsp:include page="/WEB-INF/include/nav.jsp"></jsp:include>
		<div class="wrapper row-offcanvas row-offcanvas-left">
			<!--三级菜单-->
			<div class="menu-third">
				<a class="menu-item active" id="thirddmenu-0"
				href="${ctx}/back/customer/list" 
				><span>会员列表</span></a>
				<a class="menu-item" id="thirddmenu-3"
				href="${ctx}/back/customer/create" 
				><span>创建会员</span></a>
				<!-- <a class="menu-item" id="thirddmenu-2"><span>会员审核</span></a>
				<a class="menu-item" id="thirddmenu-4"><span>会员卡设置</span></a>
			 -->
			</div>
			<jsp:include page="/WEB-INF/back/menu/menu.jsp"></jsp:include>
			<aside class="right-side">
               	<div class="box">
               		<div class="product-head">
		     			<span class="product-title">注册会员</span>
		     			<span class="tips">*数据中心为会员完成加入后，系统将会生成默认密码发送至会员手机，会员将可用手机号+默认密码登录商城</span>
		     		</div>
		     		<div class="product-body goods-body">
	                	<form id="addUserForm" name="addUserForm" enctype="multipart/form-data" method="post">
		            	<div class="row mt20">	
		            		<div class="col-xs-2" style="text-align:center;">
								<div class="change_img_div " id="imgdiv">
									<img id="goods_index_img" class="thumbnail store-logo-modle" src="${ctx}/img/list-cus-icon.png"/>
								</div>
							</div>
		            		<div class="info_div col-xs-10">
		            		<table class="info_table" id="user_info_table">
									<tbody>
				        				<tr>
				        					<td>
				        						<div class="form-group">
				        							<label class="search-label inline">昵称：</label>
				                        			<input type="text" class="form-control inline" id="customerNick" name="nickName" value="" placeholder="请输入会员昵称" data-inputtype="bytelimit" data-bytelimit="16">  
				        						</div>
				        					</td>
				        					<td>
		            						<div class="form-group">
		            							<label class="search-label inline" for="regist_store">注册门店：</label>
                                    			<input type="hidden" name="storeId" id="regist_store" value="1">
									            <input type="text" id="storeName" name="" class="form-control inline diy_input sub-store-input"  data-url="${storeListUrl}" data-param='{"token":"${store.token }","getDirect":"1"}' placeholder="注册门店" >
									            <em class="required">*</em>
		            						</div>
		            					</td>
				        				</tr>
				        				<tr>
				        					<td>
		            						<div class="form-group">
		            							<label class="search-label inline" for="member_phone">手机号码：</label>
		            							<c:choose>
		            								<c:when test="${!empty phone}">
                                    					${phone }
                                    				</c:when>
                                    				<c:otherwise>
                                    					<input type="text" class="form-control inline" maxlength="11" placeholder="请输入11位会员手机号" name="username" id="member_phone" >
                                    					<em class="required">*</em>
                                    				</c:otherwise>
		            							</c:choose>
		            						</div>
		            					</td>
				        					<td>
				        						<div class="form-group">
				        							<label class="search-label inline" >会员类型：</label>
				                        			<span class="uinfo_span"><!-- disabled="disabled" -->
				                        				<select class="form-control inline shot-select" >
				                        				<!-- <select name="channel" class="form-control inline s-input" > -->
											                <option>车友会员</option>
											                <option>VIP卡会员</option>
											            </select>
				                        			</span>
				        						</div>
				        					</td>
				        				</tr>
				        			</tbody>
								</table>
							</div>
						</div>
						</form>
		            	<div class="info_item">
                		<div class="info_div info_table" id="user_info_other_table" style="padding-top:15px;">
                			<form id="defaultPropform" name="addUserForm" enctype="multipart/form-data" method="post">
                			<c:forEach var="item" items="${storeFormUsingProp.defaultProp }" >
                				<c:if test="${item=='vip_card_no'}">
                				<div class="form-group inline">
				        			<label class="inline search-label" >关联实卡：</label>
				                    <span class="uinfo_span">
				                        <input type="text" class="form-control inline"  name="vipCardNo" value="" id="link_memCard" placeholder="请输入实体卡号关联" maxlength:/>
				                    </span>
				        		</div>
                				</c:if>
                				<c:if test="${item=='name'}">
                				<div class="form-group inline">
				        			<label class="inline search-label" >姓名：</label>
				                    <span class="uinfo_span"><input type="text" name="name" class="form-control inline"  value="" placeholder="请输入姓名" /></span>
				        		</div>
                				</c:if>
                				<c:if test="${item=='sex'}">
                				<div class="form-group inline">
                                    <label class="search-label inline">性别：</label>
                                    <div class="search_ch_item m_ch_item">
                                    	<span class="uinfo_span">
	                                    	<input type="radio" id="gender_male"  name="genderType" class="img_check genderType" value="1"/>
	                                    	<label class="inline check_label" for="gender_male">男</label>
                                   		</span>
                                    </div>
                                    <div class="search_ch_item m_ch_item">
                                    	<span class="uinfo_span">
	                                    	<input type="radio" id="gender_female" name="genderType" class="img_check genderType" value="2"/>
	                                    	<label class="inline check_label" for="gender_female">女</label>
                                    	</span>
                                    </div>
                                    	<input type="hidden" name="sex" id="gender_val"/>
                                </div>
                				</c:if>
                				<c:if test="${item=='birth_date'}">
                				<div class="form-group inline">
				        			<label class="inline search-label" >生日：</label>
				                    <span class="uinfo_span">
				                        <input type="text" class="form-control inline birth-date"  placeholder="请选择会员生日" name="birthDate" id="member_birth" onfocus="this.blur()" />
				                     </span>
				        		</div>
                				</c:if>
                				<c:if test="${item=='area_code'}">
                				<div class="form-group inline">
	                            	<label class="search-label inline">城市：</label>
	                            	<div class="city-selects inline">
	                            		<span class="uinfo_span">
											<select id="p1" class="form-control inline shot-select"></select>
											<select id="p2" class="form-control inline shot-select" style="display: none;"></select>
											<select id="p3" class="form-control inline shot-select" style="display: none;"></select>
										</span>
									</div>
	                            	<input type="hidden" name="areaCode" value="" id="city_val">
		                        </div>
                				</c:if>
                			</c:forEach>
                			</form>
                                <c:forEach items="${storeFormUsingProp.customProp }" var="customProp" >
                                <div class="form-group inline custom-props" data-type="${customProp.type }" data-subType="${customProp.subType }" data-storePropId="${customProp.storePropId }">
                                    <label class="search-label inline">${customProp.labelName }：</label>
                                    <c:if test="${customProp.type == 'input' }">
                                    	<c:if test="${customProp.subType == 'date' }">
                                    	<span class="uinfo_span">
                                    		<input type="tel" class="form-control inline time-input" data-date-format="yyyy-mm-dd" placeholder="请选择${customProp.labelName }" onfocus="this.blur()"/> 
                                    	</span>
                                    	</c:if>
                                    	<c:if test="${customProp.subType == 'mail' || customProp.subType == 'text' }">
                                    	<span class="uinfo_span">	
                                    		<input type="text" class="form-control inline custom-prop-value" placeholder="请输入${customProp.labelName }" >
                                    	</span>
                                    	</c:if>
                                    	<c:if test="${customProp.subType == 'radio' }">
											<c:set value="${ fn:split(customProp.value, ',') }" var="values" />
											<c:forEach items="${ values }" var="value">
											<div class="inline">
												<span class="uinfo_span">	
			                                    	<input type="radio" name="radio${customProp.name }" value="${value }"/>
			                                    	<label class="inline check_label">${value }</label>
			                                    </span>
		                                    </div>
											</c:forEach>
                                    	</c:if>
                                    </c:if>
                                </div>
                                </c:forEach>
                           <form method="post" id="defaultPropformRemark">
                            <c:forEach var="item" items="${storeFormUsingProp.defaultProp}">
                                <c:if test="${item=='remark'}">
                                <div class="form-group inline">
				        			<label class="search-label inline">备注：</label>
				                   	 <span class="uinfo_span"><input type="text" name="remark" class="form-control inline" style="width:500px;" value="${cust.name}" placeholder="请输入会员备注信息，30字以内" /></span>
                				</div>
                                </c:if>
                            </c:forEach>
                            </form>
                		</div>
                		</div>
		            	<div class="form-group user_operate" style="text-align: center;">
		            		<input type="reset" class="btn btn-info" value="重置" />
		            		<button class="btn btn-info" style="margin-left:20px;"id="addUserBtn">注册</button>
		            	</div>
	        		</div>
               	</div>
            </aside>	
		</div>
		<!--会员创建成功模态对话框-->
		<div class="modal fade" id="user_done_modal" tabindex="99"	role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="addNewLabel">
						  	<c:choose>
			     				<c:when test="${!empty customerId}">完善会员信息成功</c:when>
			     				<c:otherwise>添加会员成功</c:otherwise>
			     			</c:choose>  
					    </h4>
					 </div>
					<div class="modal-body">
						<div class="modal-body-con text-left">
							<h3>成功为【商户X】创建一名新会员！</h3>
							<c:if test="${empty customerId}">
								<div class="form-group no_m_bottom">
									<label class="inline">会员手机：</label>
									<p class="modal-val men_mobile"></p>
								</div>
								<div class="form-group no_m_bottom">
									<label class="inline">会员编号：</label>
									<p class="modal-val mem_NO"></p>
								</div>
							</c:if>
						</div>
						<div class="modal-body-operation">
							<button class="btn btn-info" id="con_add_btn"> 继续添加 </button>
							<button class="btn btn-info" id="view_memList_btn">查看会员列表</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--会员创建成功模态对话框结束-->
		<input type="hidden" value="${customerId}" name="customerId"/>
	</body>
	
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/app.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui.min.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui-timepicker-addon.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui-timepicker-zh-CN.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui-i18n.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/CityUtils.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/apps/customer/customer-add.js?v=${v}" ></script>
</html>