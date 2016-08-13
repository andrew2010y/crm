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
		<title>会员详情</title>
	</head>
	<body class="skin-blue fixed">
		<!-- include nav.jsp -->
		<jsp:include page="/WEB-INF/include/nav.jsp"></jsp:include>
		<div class="wrapper row-offcanvas row-offcanvas-left">
			<!--三级菜单-->
			<jsp:include page="/WEB-INF/back/menu/menu.jsp"></jsp:include>
			
				<aside class="right-side">
               	<div class="box">
               		<div class="product-head">
		     			<span class="product-title">会员详情	</span> 
		     			<div class="modal_operate_div">
		     				<!-- frozen： 冻结状态  -->
							<a class="modal_ope_item blue_a isFrozen <c:if test='${cust.state==1 }'>frozen</c:if>" href="javascript:void(0);">
								<c:choose>
									<c:when test="${cust.state==0 }">
										冻结
									</c:when>
									<c:when test="${cust.state==1 }">
										解冻
									</c:when>
								</c:choose>
							</a>
							<a class="modal_ope_item blue_a isEdit edit" href="javascript:void(0);">编辑</a>
							<a class="modal_ope_item blue_a re_list" href="${ctx}/back/customer/list">返回列表</a>
						</div>
		     		</div>
					<!-- 会员详情 -->
                	<div class="info_item row" style="border:none;">
                		<div class="col-xs-2" style="text-align:center;">
                			<div class="info-logo">
							<c:choose>
							<c:when test="${not empty cust.logo}">
								<img class="logo-img" src="${cust.logo}"/>
							</c:when>
							<c:otherwise>
								<img class="logo-img" src="${ctx}/img/list-cus-icon.png" />
							</c:otherwise>
							</c:choose>
							<span class="info-complet-icon"><img src="${ctx}/img/info-icon.png" title="会员信息已完善"/></span>
							</div>
							<p class="info-state-icon">
								<img class="follow-wx-icon" src="${ctx}/img/follow-wx-icon.png" title="已关注公众号"/>
								<img class="unfollow-wx-icon" src="${ctx}/img/unfollow-wx-icon.png" title="未关注公众号"/>
								<img class="bind-wx-icon" src="${ctx}/img/bind-wx-icon.png" title="已绑定微信"/>
								<img class="unbind-wx-icon" src="${ctx}/img/unbind-wx-icon.png" title="未绑定微信"/>
								<img class="freeze-icon" src="${ctx}/img/freeze-icon.png" title="已冻结"/>
								<img class="unfreeze-icon" src="${ctx}/img/unfreeze-icon.png" title="未冻结"/>
							</p>
							<p class="info-points">${cust.point}分</p>
						</div>
						<div class="info_div col-xs-10">
							<form id="editUserForm" action="" name="editUserForm" enctype="multipart/form-data" method="post" onsubmit="return false">
								<table class="info_table normal_tabel" id="user_info_table">
									<tbody>
				        				<tr>
				        					<td>
				        						<div class="form-group">
				        							<label class="inline search-label">昵称：</label>
				                        			<input type="text" class="form-control inline" id="custNickName" name="nickName" value="${cust.nickName}" readonly="readonly" data-inputtype="bytelimit" data-bytelimit="16" placeholder="未设置"/>  
				        						</div>
				        					</td>
				        					<td>
				        						<div class="form-group">
				        							<label class="inline search-label">会员编号：</label>
				                        			<span class="uinfo_span">${cust.customerId}</span>
				                        			<input type="hidden" id="customerId" name="customerId" value="${cust.customerId}" />  
				        						</div>
				        					</td>
				        				</tr>
				        				<tr>
				        					<td>
				        						<div class="form-group">
				        							<label class="inline search-label">手机号：</label>
													<span class="uinfo_span" id="memPhone" data="${cust.phone}">
														<c:choose>
															<c:when test="${cust.phone==0||cust.phone==null}">
																<c:out value="未绑定" />
															</c:when>
															<c:otherwise>
																<c:out value="${cust.phone}" />
															</c:otherwise>
														</c:choose>
													</span>
				        						</div>
				        					</td>
				        					<td>
				        						<div class="form-group">
				        							<label class="inline search-label">会员卡号：</label>
				                        			<span class="uinfo_span">${cust.cardNo}</span>
				                        			<input type="hidden" id="cardNo"  value="${cust.cardNo}" />  
				        						</div>
				        					</td>
				        				</tr>
				        				<tr>
				        					<td>
												<div class="form-group">
			            							<label class="inline search-label" for="regist_store">注册门店：</label>
	                                    			<input type="hidden" name="storeId" id="regist_store" value="${cust.storeId }">
			            							<input type="text"  class="form-control inline diy_input sub-store-input" value="" data-url="${storeListUrl}" data-param='{"token":"${store.token }","getDirect":"1"}' placeholder="注册门店" readonly="readonly">
		            							</div>
				        					</td>
				        					<td>
				        						<div class="form-group">
				        							<label class="inline search-label">注册时间：</label>
				                        			<span class="uinfo_span">${wxcrm:formatDate(cust.createTime)}</span>
				        						</div>
				        					</td>
				        				</tr>
				        				<tr>
				        					<td>  
				        						<div class="form-group">
				        							<label class="inline search-label">注册渠道：</label>
				                        			<span class="uinfo_span">
											            <c:if test="${cust.registerChannel==2}">微商城</c:if>
											            <c:if test="${cust.registerChannel==3}">店客源</c:if>
											            <c:if test="${cust.registerChannel==1}">创客源</c:if>
											            <c:if test="${cust.registerChannel==4}">数据中心</c:if>
											            <c:if test="${cust.registerChannel==5}">创客链接</c:if>
				                        			</span>
				        						</div>
				        					</td>
				        					<td>
				        						<div class="form-group">
				        							<label class="inline search-label">注册类型：</label>
				                        			<span class="uinfo_span">
											            <c:if test="${cust.registerType==1}">手机号</c:if>
											            <c:if test="${cust.registerType==2}">微信</c:if>
													</span>
				        						</div>
				        					</td>
				        				</tr>
				        			</tbody>
								</table>
							</form>
						</div>
						<table class="info_table normal_tabel" id="address-table">
								<tbody>
									<tr class="address_tr">
			        					<td colspan="2">
			        						<div class="form-group">
			        							<c:if test="${fn:length(addresses)>0}"><label class="float-left inline" >收货地址：</label>
						                       		<c:forEach var="address" items="${addresses }" varStatus="index">
													<c:if test="${index.count==1 }">
						                       			<div class="add_info">
						                        			<p style="display:none;">
																<span>${address.remark}</span>
															</p>
															<p class="addr-user-info">
						                        				<span>${address.name}</span>
						                        				<span>${address.phone}</span>
						                        				<span>${address.cardNo}</span>
						                        				<c:if test="${address.isDefault}">
																<span class="addr-tag">默认</span>
															</c:if>
						                        			</p>
						                        			<p class="addr_details_p" data-cityCode="${address.cityCode }" data-addr="${address.address}">${address.address}</p>
						                       			</div>
						                       		</c:if>
						                       		</c:forEach>
						                       		<c:if test="${fn:length(addresses)>1}">
				                       					<a class="more_addr blue_a" href="javascript:void(0);">更多</a>
				                       				</c:if>
				                       			</c:if>
				       						</div>
			        					</td>
			        				</tr>
								</tbody>
							</table>
                	</div>
                	<div class="info_item">
                		<div class="info_div info_table normal_tabel" id="user_info_other_table" style="padding-top:15px;">
                			<form id="editUserForm1" method="post">
				        		<c:forEach var="item" items="${formStoreUsingProp.defaultProp}" >
				        			<c:if test="${item=='vip_card_no'}">
				        			<div class="form-group inline">
				        				<label class="inline search-label" >关联实卡：</label>
				                   		<span class="uinfo_span">
				                        	<input type="text" class="form-control inline"  name="vipCardNo" value="${cust.vipCardNo}" readonly="readonly" id="link_memCard" placeholder=<c:if test="${empty cust.vipCardNo}">未绑定</c:if>>
				                    	</span>
				        			</div>
				        			</c:if>
				        			<c:if test="${item=='name'}">
				        			<div class="form-group inline">
				        				<label class="inline search-label" >姓名：</label>
				                   		<span class="uinfo_span"><input type="text" name="name" class="form-control inline" readonly="readonly" value="${cust.name}" placeholder=<c:if test="${empty cust.name}">真实姓名</c:if> /></span>
				        			</div>
				        			</c:if>
				        			<c:if test="${item=='sex'}">
				        			<div class="form-group inline">
                                    	<label class="search-label inline">性别：</label>
                                   		<div class="search_ch_item m_ch_item">
                                   			<span class="uinfo_span pay_item">
	                                    	<input type="radio" id="gender_male" name="genderType" class="img_check genderType " <c:if test='${cust.sex==1}'>checked</c:if> value="1"  disabled/>
	                                    	<label class="inline check_label" for="gender_male">男</label>
                                    	</span>
                                    	</div>
                                    	<div class="search_ch_item m_ch_item">
                                    	<span class="uinfo_span">
	                                     	<input type="radio" id="gender_female" name="genderType" class="img_check genderType" <c:if test='${cust.sex==2}'>checked</c:if> value="2"  disabled/>
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
				                        	<input type="tel" class="form-control inline birth-date" value="${fn:substring(wxcrm:formatDate(cust.birthDate), 0, 10)}" placeholder="请选择会员生日" name="birthDate" id="member_birth" disabled onfocus="this.blur()">
				                     	</span>
				        			</div>
				        			</c:if>
				        			<c:if test="${item=='area_code'}">
                					<div class="form-group inline">
	                            		<label class="search-label inline">城市：</label>
	                            		<div class="city-selects inline">
	                            			<span class="uinfo_span">
												<select id="p1" class="form-control inline shot-select" disabled></select>
												<select id="p2" class="form-control inline shot-select" disabled style="display:none;"></select>
												<select id="p3" class="form-control inline shot-select" disabled style="display:none;"></select>
											</span>
										</div>
	                            		<input type="hidden" name="areaCode" value="${cust.areaCode}" id="city_val">
		                        	</div>
                					</c:if>
				        		</c:forEach>
				        	</form>
				        	<c:forEach items="${formStoreUsingProp.customProp }" var="customProp" >
                                <div class="form-group inline custom-props" data-type="${customProp.type }" data-subType="${customProp.subType }" data-storePropId="${customProp.storePropId }">
                                    <label class="search-label inline">${customProp.labelName }：</label>
                                    <c:if test="${customProp.type == 'input' }">
                                    	<c:if test="${customProp.subType == 'date' }">
                                    	<span class="uinfo_span">
                                    		<input type="tel" class="form-control inline time-input" data-date-format="yyyy-mm-dd" placeholder="请选择${customProp.labelName}" disabled onfocus="this.blur()" value="<c:forEach items="${cust.customerProps }" var="item"><c:if test="${item.storePropId==customProp.storePropId }">${fn:substring(wxcrm:formatDate(item.value), 0, 10)}</c:if></c:forEach>" /> 
                                    	</span>
                                    	</c:if>
                                    	<c:if test="${customProp.subType == 'mail' || customProp.subType == 'text' }">
                                    	<span class="uinfo_span">	
                                    		<input type="text" class="form-control inline custom-prop-value" placeholder="请输入${customProp.labelName }" readonly="readonly"  value="<c:forEach items="${cust.customerProps }" var="item"><c:if test="${item.storePropId==customProp.storePropId }">${item.value}</c:if></c:forEach>" />
                                    	</span>
                                    	</c:if>
                                    	<c:if test="${customProp.subType == 'radio' }">
											<div class="inline ridio-check">
												<c:set value="${ fn:split(customProp.value, ',') }" var="values" />
											<c:forEach items="${ values }" var="value">
											<div class="inline">
												<span class="uinfo_span">	
			                                    	<input type="radio" name="${customProp.name }" value="${value}" disabled  
			                                    		<c:forEach items="${cust.customerProps }" var="item">
			                                    			<c:if test="${item.storePropId==customProp.storePropId }">
			                                    				<c:if test="${ item.value==value}">checked</c:if>
			                                    			</c:if>
			                                    		</c:forEach>/>
			                                    	<label class="inline check_label">${value}</label>
			                                    </span>
		                                    </div>
											</c:forEach>
											</div>
											
                                    	</c:if>
                                    </c:if>
                                </div>
                                </c:forEach>
                            <form id="editUserForm2" method="post">
				        		<c:forEach var="item" items="${formStoreUsingProp.defaultProp}" >
				        			<c:if test="${item=='remark'}">
				        			<div class="form-group inline">
				        				<label class="search-label inline">备注：</label>
				                    	<span class="uinfo_span"><input type="text" name="remark" class="form-control inline" style="width:500px;" readonly="readonly" value="${cust.remark}" placeholder=<c:if test="${empty cust.remark}">备注</c:if> /></span>
                					</div>
				        			</c:if>
				        		</c:forEach>	
                			</form>
                		</div>
                	</div>
                	<div class="info_item">
						<span class="item_title">标签</span>
						<div class="info_div">
							<div class="uLabel_div">
								<c:forEach items="${tags}" var="tag">
									<div class="sel_label_item">
										<span class="sel_label_span" data-id="${tag.tagId }" data-name="${tag.name }">${tag.name }</span>
										<span class="del_label_item">×</span>
									</div>
								</c:forEach>
								<a class="clear_label blue_a" <c:if test="${fn:length(tags)==0}">style="display:none"</c:if>>清空</a>
							</div>
							<div class="uSet_label_div">
								<div class="form-group set_label_div">
									<label class="modal-label inline" for="s_neww_menber_labek">打标签：</label>
									<input type="text" class="form-control inline diy_input label_input" data-url="${ctx}/back/tag/customer-cache-list" data-param="" placeholder="" id="s_neww_menber_labek" />
									<input type="hidden" class="set_labels" name="" />
									<a class="common_a" id="fresh_label" href="javascript:void(0);">刷新</a>
									<a class="common_a" id="add_label" href="javascript:void(0);">新建标签</a>
								</div>
								<div class="uSet_operate">
									<button class="btn btn-info" id="clear_label_btn">重置</button>
									<button class="btn btn-info" id="set_new_label">打新标签</button>
								</div>
							</div>
						</div>
					</div>
                	<div class="user_detail_div">
                		<div class="u_nav_tab">
                			<div class="u_nav_list">
								<div class="u_nav_item consume active">
									<span>消费</span>
								</div>
								<div class="u_nav_item integral">
									<span>积分</span>
								</div>
								<div class="u_nav_item coupon">
									<span>优惠券</span>
								</div>
							</div>
                		</div>
                		<div class="user_detail_list">
                			<!--
                            	消费列表
                            -->
                			<div class="d_item consume_item">
                				<div class="top_panal">
                					<table class="normal_tabel u_top_table">
                						<tr>
                							<td width="16.6%">累计消费：</td>
                							<td width="33.2%" id="customerCustomerPrice"></td>
                							<td width="16.6%">消费次数：</td>
                							<td id="customerTotalCount"></td>
                						</tr>
                						<tr>
                							<td>单均价：</td>
                							<td id="avgPrice"></td>
                							<td>消费频次：</td>
                							<td rowspan="3">
                								<div class="ave_item">
                									<span>月均</span>
                									<span id="customerMonthCount"></span>
                								</div>
                								<div class="ave_item">
                									<span>日均</span>
                									<span id="customerDayCount"></span>
                								</div>
                								<div class="ave_item">
                									<span>年均</span>
                									<span id="customerYearCount"></span>
                								</div>
                							</td>
                						</tr>
                						<tr>
                							<td>最近消费时间：</td>
                							<td id="customerConsumeTime"></td>
                						</tr>
                						<tr>
                							<td>已使用支付方式：</td>
                							<td colspan="3">
                								<div class="pay_type_div">
                									<div class="pay_item">
                										<span id="other" class="pay_flag"></span>
                										<span>其他</span>
                									</div>
                									<div class="pay_item">
                										<span id="weixin" class="pay_flag"></span>
                										<span>微信支付</span>
                									</div>
                									<div class="pay_item">
                										<span id="zhifubao" class="pay_flag"></span>
                										<span>支付宝支付</span>
                									</div>
                								</div>
                							</td>
                						</tr>
                					</table>
                				</div>
                				<div class="mid_panal">
                					<form class="search-form" id="filterConsumeForm" method="post">
                						<div class="search-panel">
			                                <div class="form-group inline">
			                                    <label class="search-label inline" for="regist_type">消费渠道：</label>
			                                    <select name="" class="form-control inline" id='regist_type'>  
									                <option value=''>--全部--</option>  
									                <option value='1'>微商城</option>
									                <option value='2'>店客源</option>
									                <option value='3'>创客源</option>
									                <option value='4'>创客链接</option>
									            </select>  
			                                </div>
			                                <div class="form-group inline">
			                                    <label class="search-label l-label inline">消费时间：</label>
			                                    <input type="text" class="form-control inline s-time-input consume-time" name=""  id="consume_timeStart" placeholder="开始时间" onfocus="this.blur()"/> - 
			                                    <input type="text" class="form-control inline s-time-input consume-time" name=""  id="consume_timeEnd" placeholder="结束时间"  onfocus="this.blur()"/>
			                                </div>
			                                <button type="button" class="btn btn-info" id="search_consume_btn">查询</button>
				                       	</div>
                					</form>
                				</div>
                				<div class="bot_panal">
                					<div class="table-head-back"></div>
				                	<div class="table-panel">
										<table class="table u_top_table" aria-describedby="example2_info" id="userListTable">
											<thead>
												<tr valign="middle">
													<th>订单编号</th>
													<th>消费时间</th>
													<th>消费渠道</th>
													<th>支付方式</th>
													<th>订单状态</th>
													<th>订单金额</th>
													<th>实付金额</th>
												</tr>
											</thead>
											<tbody id="userList" data-tmp="template1">
												
											</tbody>
										</table>
									</div>
                				</div>
                			</div>
                			<!--

                            	积分列表

                            -->
                			<div class="d_item integral_item">
                				<div class="top_panal">
                					<div class="form-group">
                						<div class="int-item" >
                							<label >剩余积分：</label>
	                						<span id="paint" ></span>
	                						<span id="deduction" class="inter-m">可抵扣10元</span>
                						</div>
                						<div class="int-item">
                							<label>累计积分：</label>
                							<span id="paint-all"></span>
                						</div>
                					</div>
                				</div>
                				<div class="mid_panal">
                					<form class="search-form" id="filterIntegralForm" method="post">
                						<div class="search-panel">
			                                <div class="form-group inline">
			                                    <label class="search-label inline n_s_label" for="ope_type">操作：</label>
			                                    <select name="" class="form-control inline shottime" id='ope_type'>  
									                <option value='-1'>--全部--</option>  
									                <option value='1'>累计</option>
									                <option value='0'>抵扣</option>
									            </select>  
			                                </div>
			                                <div class="form-group inline">
			                                    <label class="search-label inline n_s_label" for="channel_type">渠道：</label>
			                                    <select name="" class="form-control inline shottime" id='channel_type'>  
									                <option value='-1'>--全部--</option>  
									                <option value='1'>微商城</option>
									                <option value='2'>店客源</option>
									                <option value='3'>创客源</option>
									                <option value='4'>创客链接</option>
									                <option value='5'>数据中心</option>
									            </select>  
			                                </div>
			                                <div class="form-group inline">
			                                    <label class="search-label l-label inline">更新时间：</label>
			                                    <input type="text" class="form-control inline shottime s-time-input update-time" name=""  id="point_start_time" placeholder="开始时间" onfocus="this.blur()"/> - 
			                                    <input type="text" class="form-control inline shottime s-time-input update-time" name=""  id="point_end_time" placeholder="结束时间" onfocus="this.blur()"/>
			                                </div>
			                                <button type="button" class="btn btn-info" id="search_int_btn">查询</button>
				                       	</div>
                					</form>
                				</div>
                				<div class="bot_panal">
                					<div class="table-head-back"></div>
				                	<div class="table-panel">
										<table class="table u_top_table" aria-describedby="example2_info" id="userIntTable">
											<thead>
												<tr valign="middle">
													<th>更新时间</th>
													<th>订单编号</th>
													<th>操作</th>
													<th>渠道</th>
													<th>积分变化</th>
													
												</tr>
											</thead>
											<tbody id="userIntList" data-tmp="template2">
												
												
											</tbody>
										</table>
									</div>
                				</div>
                			</div>
                			<!--

                            	优惠券列表

                            -->
                			<div class="d_item coupon_item">
                				<div class="top_panal">
                					<div class="form-group">
                						<div class="int-item-t">
                							<label >可用优惠券：</label>
	                						<span id="usableCount">0</span>张
                						</div>
                						<div class="int-item-t">
                							<label >已使用优惠券：</label>
	                						<span id="spendCount">0</span>张
                						</div>
                						<div class="int-item-t">
                							<label>已领取优惠券：</label>
                							<span id="receivedCount">0</span>张
                						</div>
                					</div>
                				</div>
                				<div class="mid_panal">
                					<form class="search-form" id="filterCouponForm" method="post">
                						<div class="search-panel">
			                                <div class="form-group inline">
			                                    <label class="search-label inline n_s_label " for="coupon_status">状态：</label>
			                                    <select name="" class="form-control inline shottime" id='coupon_status'>  
									                <option value=''>--全部--</option>  
									                <option value='1'>已领取</option>
									                <option value='2'>已失效</option>
									                <option value='3'>已使用</option>
									            </select>  
			                                </div>
			                                <div class="form-group inline">
			                                    <label class="search-label l-label inline">更新时间：</label>
			                                    <input type="text" class="form-control inline s-time-input shottime coupon-time" name=""  id="con_uptimeStart" placeholder="开始时间" onfocus="this.blur()"/> - 
			                                    <input type="text" class="form-control inline s-time-input shottime coupon-time" name=""  id="con_uptimeEnd" placeholder="结束时间" onfocus="this.blur()"/>
			                                </div>
			                                <div class="form-group inline">
			                                    <label class="search-label n_s_label  inline" for="con_name">名称：</label>
			                                    <input type="text" class="form-control inline shottime " name="couponName"  id="couponName" placeholder="优惠券名称" />
			                                </div>
			                                <button type="button" class="btn btn-info" id="search_coupon_btn">查询</button>
				                       	</div>
                					</form>
                				</div>
                				<div class="bot_panal">
                					<div class="table-head-back"></div>
				                	<div class="table-panel">
										<table class="table u_top_table" aria-describedby="example2_info" id="userCouTable">
											<thead>
												<tr valign="middle">
													<th>优惠券名称</th>
													<th>状态</th>
													<th>更新时间</th>
													<th>关联订单</th>
												</tr>
											</thead>
											<tbody id="userCouList" data-tmp="template3">
												
											</tbody>
										</table>
									</div>
                				</div>
                			</div>
                		</div>
                	</div>
                	
               	</div>
            </aside>
		</div>
		<!--新建标签模态对话框-->
		<div class="modal fade" id="add_new_modal" tabindex="99"	role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="addNewLabel">新建标签</h4>
					 </div>
					<div class="modal-body">
						<div class="modal-body-con text-left">
							<div class="form-group">
								<label class="modal-label search-label inline" for="new_label">新建标签</label>
								<input type="text" class="form-control inline" id="new_label" maxlength="10"/>
							</div>
							<p class="error-msg text-center">已存在</p>
							<p class="tips-p">新建完成后请点击刷新，获取最新的标签列表</p>
						</div>
						<div class="modal-body-operation">
							<button type="button" class="btn btn-info" id="add_label_btn"> 确定 </button>
							<button class="btn btn-default" data-dismiss="modal">取消</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--新建标签模态对话框结束-->
		<!--更多收货地址模态对话框-->
		<div class="modal fade" id="more_addr_modal" tabindex="99"	role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="addNewLabel">会员收货地址列表</h4>
					 </div>
					<div class="modal-body">
						<form id="moreAddrForm" method="post">
							<div class="modal-body-con text-left">
								<div class="info_item">
									<span class="item_title">收货地址</span>
									<c:forEach var="address" items="${addresses }" varStatus="index">
										<div class="addr_item">
											<label class="addr_i_title">收货地址${index.count}：</label>
											<div class="addr_details">
												<p style="display:none;">
													<span>${address.remark}</span>
												</p>
												<p class="addr-user-info">
			                        				<span>${address.name}</span>
			                        				<span>${address.phone}</span>
			                        				<span>${address.cardNo}</span>
			                        				<c:if test="${address.isDefault}">
														<span class="addr-tag">默认</span>
													</c:if>
			                        			</p>
												<p class="addr_item_info" data-addr="${address.address}" data-cityCode="${address.cityCode}">${address.address}</p>
											</div>
										</div>
									</c:forEach>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/app.js?v=${v}" ></script>
	<script  type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui.min.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui-timepicker-addon.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui-timepicker-zh-CN.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/jQueryUI/jquery-ui-i18n.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/cky/jq.page.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/CityUtils.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/apps/customer/customer-detail.js?v=${v}" ></script>
</html>