<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page isELIgnored="false"%>
<html>
	<head>
		<meta charset="utf-8">
		<!-- IE能够使用最新渲染模式而不是兼容模式 -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!-- 国产浏览器默认采用“高速”模式渲染页面 -->
		<meta name="renderer" content="webkit">
		<!--title上的icon-->
		<link rel="shortcut icon" href="${ctx}/img/favicon.ico" >
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/timepicker/bootstrap-datetimepicker.min.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/libs/bootstrap-switch.min.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/font-awesome.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/ionicons.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/AdminLTE.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/apps/main.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/apps/app-monitor.css?v=${v}" />
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
			<jsp:include page="/WEB-INF/back/menu/menu.jsp"></jsp:include>
			 
			<aside class="right-side">
            	<!--条件搜索-->
               	<div class="box">
               		<div class="product-head no-title">
               		<!-- 搜索优惠券 start -->
               			<div class="search_div margin_search">
       						<input type="text" name="couponName" id="couponName" class="form-control search_input inline" placeholder="优惠券名称"/>
							<span class="search_icon"></span>
               			</div>
               			<!-- 搜索优惠券 end -->
	        			</span>
	        			<div class="head-step">
	        				<div class="one-step step1 active btn_next" data-step="1">
	        					<i>1</i>
	        					<span>选择优惠券</span>
	        				</div>
	        				<span class="crose-line active"></span>
	        				<div class="one-step step2 btn_next" data-step="2">
	        					<i>2</i>
	        					<span>选择会员</span>
	        				</div>
	        				<span class="crose-line"></span>
	        				<div class="one-step step3 btn_next" data-step="3">
	        					<i>3</i>
	        					<span>选择发放渠道</span>
	        				</div>
	        			</div>
	        		</div>
	        		<div class="product-body goods-body">
        				<form id="sendCouponForm" action="" name="goodsform" enctype="multipart/form-data" method="post" onsubmit="return false">
        					<!-- hidden start -->
        					<input type="hidden" id="customerId" name="" value="" />
        					<input type="hidden" id="couponId" name="" value="" />
        					
        					<!-- hidden end -->
        					<div class="body-step body-step1">
                        		<form id="uCouponForm" name="ucouponForm" >
                            		<div class="product-info no-border product-new-info clearfix">
                            		<!-- 优惠券列表 start -->
					                	<div class="table-panel">
											<table class="table user-table center" style="min-height:200px;" aria-describedby="example2_info" id="coupon-list-table">
												<thead>
													<tr valign="middle">
														<th>选择</th>
														<th>优惠券名称</th>
														<th>类型/场景</th>
														<th>面额/库存</th>
														<th>领取</th>
														<th>使用</th>
														<th>有效期</th>
														<th>门店</th>
													</tr>
												</thead>
												<tbody id="couponList" data-tmp="couponTmp">
													
												</tbody>
											</table>
										</div>
                            			<!-- 优惠券列表 结束 -->
                            		</div>
                            	</form>
                            	<div class="product-buttons">
		        					<button class="btn btn-default rest_form" >重置</button>
		        					<button class="btn btn-primary btn_next" data-step="2">下一步</button>
		        				</div>
                            </div>
                            <div class="body-step body-step2">
                            	<div class="product-info no-border product-new-info clearfix">
                            		<!-- 会员条件搜索 -->
			                   		<div class="search-panel">
			               				<div class="form-group clearfix">
			                   				<div class="inline pull-right">
			                                    <a href="javascript:void(0)" id="more_buttom" class="more-conditions">更多条件<i class="glyphicon glyphicon-chevron-down" id="more_chevron"></i></a>
			                   					<a class="reset-conditions"> 重置 </a>
			                   					<button type="button" class="btn btn-info btn-search" >查询</button>
			                   				</div>
			                   			</div>
			                   			<div class="normal-search-panel">
				                   			<!-- 账号信息 -->
				                   			<form method="post" id="normalSearchform">
				                   			<div class="cus-list-box">
				                   				<p>账号信息</p>
				                       			<div class="form-group inline">
				                                    <label class="search-label inline" for="member_phone">手机号：</label>
				                                    <input type="text" class="form-control inline" placeholder="请输入11位手机号" name="phone" id="member_phone" data-url="" data-param="" data-inputtype="number" maxlength="11">
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="member_NO">会员卡号：</label>
				                                    <input type="text" class="form-control inline" placeholder="会员卡号" name="cardNo" id="member_NO" data-url="" data-param="" data-inputtype="number" maxlength="12">
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="regist_type">注册类型：</label>
				                                    <select name="registerType" class="form-control inline" id='regist_type'>  
										                <option value='-1'>--全部--</option>  
										                <option value='1'>手机号</option>
										                <option value='2'>微信</option>
										            </select>  
				                                </div>
				                            	<div class="form-group inline">
				                                	<label class="search-label inline" for="regist_store">注册门店：</label>
				                                   	<input type="hidden" name="storeId"  value="-1">
				                                    <input type="text" class="form-control inline diy_input sub-store-input" data-url="${storeListUrl}" data-param='{"token":"${store.token }"}' placeholder="注册门店">
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="regist_channel">注册渠道：</label>
				                                    <select name="registerChannel" class="form-control inline" id='regist_channel'>  
										                <option value='-1'>--全部--</option>  
										                <option value='2'>微商城</option>
										                <option value='3'>店客源</option>
										                <option value='1'>创客源</option>
										                <option value='4'>数据中心</option>
										                <option value='5'>创客链接</option>
										            </select>  
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="user_status">会员状态：</label>
				                                    <select name="state" class="form-control inline"  id='user_status'>  
										                <option value='-1'>--全部--</option> 
										                <option value='0'>正常</option>
										                <option value='1'>冻结</option>
										            </select> 
				                                </div>
				                               	<div class="form-group inline">
				                                    <label class="search-label inline">注册时间：</label>
				                                    <input type="text" class="form-control inline s-time-input regist-time" name="minRegisterTime"  id="regist_timeStart" placeholder="开始时间" data-date-format="yyyy-mm-dd" onfocus="this.blur()"/> - 
				                                    <input type="text" class="form-control inline s-time-input regist-time" name="maxRegisterTime"  id="regist_timeEnd" placeholder="结束时间"  data-date-format="yyyy-mm-dd" onfocus="this.blur()"/>
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="integral_start">剩余积分：</label>
				                                    <input type="tel" class="form-control inline integral-start" name="minPoint"  id="integral_start" placeholder="最小积分" data-inputtype="number" maxlength="9" /> - 
				                                    <input type="tel" class="form-control inline integral-start" name="maxPoint"  id="integral_end" placeholder="最大积分" data-inputtype="number" maxlength="9"/>
				                                </div>
				                               	<div class="form-group inline">
				                                    <label class="search-label inline" for="complete_info">完善信息：</label>
				                                    <select name="perfectDegree" class="form-control inline" id='complete_info'>  
										                <option value='-1'>--全部--</option>  
										                <option value='1'>已完善</option>
										                <option value='0'>未完善</option>
										            </select>  
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="follow_wechat">公众号：</label>
				                                    <select name="followPublicNum" class="form-control inline" id='follow_wechat'>  
										                <option value='-1'>--全部--</option>  
										                <option value='1'>已关注</option>
										                <option value='0'>未关注</option>
										            </select>  
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="bind_tel">绑定手机：</label>
				                                    <select name="registerPhone" class="form-control inline" id='bind_tel'>  
										                <option value='-1'>--全部--</option>  
										                <option value='1'>已绑定</option>
										                <option value='0'>未绑定</option>
										            </select>  
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="bind_wx">绑定微信：</label>
				                                    <select name="registerWechat" class="form-control inline" id='bind_wx'>  
										                <option value='-1'>--全部--</option>  
										                <option value='1'>已绑定</option>
										                <option value='0'>未绑定</option>
										            </select>  
				                                </div>
				                   			</div>
				                   			</form>
				                   		</div>
				                   		<div class="more-search-panel" id="more_muen">
				                      		<form method="post" id="customSearchform">
				                            <div class="cus-list-box">	
				                            	<p>消费信息</p>  
				                            	<div class="form-group inline">
				                                    <label class="search-label inline">最近消费：</label>
				                                    <input type="text" class="form-control inline s-time-input consume-time" name="minConsumeTime"  id="consume_timeStart" placeholder="开始时间" data-date-format="yyyy-mm-dd" onfocus="this.blur()"/> - 
				                                    <input type="text" class="form-control inline s-time-input consume-time" name="maxConsumeTime"  id="consume_timeEnd" placeholder="结束时间"  data-date-format="yyyy-mm-dd" onfocus="this.blur()"/>
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="money_min">最近消费：</label>
				                                    <input type="text" class="form-control inline integral-start"  name="minNowCustomerPrice"  id="money_min" placeholder="最低消费金额" data-inputtype="price" maxlength="9"/> - 
				                                    <input type="text" class="form-control inline integral-start" name="maxNowCustomerPrice"  id="money_max" placeholder="最高消费金额" data-inputtype="price" maxlength="9"/>
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="money_min">累计消费：</label>
				                                    <input type="text" class="form-control inline integral-start"  name="minCustomerPrice"  id="money_min" placeholder="最低消费金额" data-inputtype="price" maxlength="9"/> - 
				                                    <input type="text" class="form-control inline integral-start" name="maxCustomerPrice"  id="money_max" placeholder="最高消费金额" data-inputtype="price" maxlength="9"/>
				                                </div> 
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="average_min">单均价：</label>
				                                    <input type="tel" class="form-control inline integral-start" name="minAvgPrice"  id="average_min" placeholder="最低单均价" data-inputtype="price" maxlength="9"/> - 
				                                    <input type="tel" class="form-control inline integral-start" name="maxAvgPrice"  id="average_max" placeholder="最高单均价" data-inputtype="price" maxlength="9" />
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="count_min">消费次数：</label>
				                                    <input type="tel" class="form-control inline integral-start" name="minTotalCount"  id="count_min" placeholder="最低消费次数" data-inputtype="number" maxlength="9"/> - 
				                                    <input type="tel" class="form-control inline integral-start" name="maxTotalCount"  id="count_max" placeholder="最高消费次数" data-inputtype="number" maxlength="9"/>
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="count_min">累计积分：</label>
				                                    <input type="tel" class="form-control inline integral-start" name="minAccrualPoint"  id="count_min" placeholder="最低消费次数" data-inputtype="number" maxlength="9"/> - 
				                                    <input type="tel" class="form-control inline integral-start" name="maxAccrualPoint"  id="count_max" placeholder="最高消费次数" data-inputtype="number" maxlength="9"/>
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline">消费频率：</label>
				                                   	<span>按</span>
				                                    <select name="rate" class="form-control inline" style="width: auto;" id='consume_freq'>  
										                <option value='1'>月</option>
										                <option value='2'>年</option>
										                <option value='3'>日</option>
										            </select>
				                                    <input type="tel" class="form-control inline integral-start" name="minRate"  id="freq_start" placeholder="最低次数" data-inputtype="number" maxlength="9" /> - 
				                                    <input type="tel" class="form-control inline integral-start" name="maxRate"  id="freq_end" placeholder="最高次数" data-inputtype="number" maxlength="9"/>
				                                </div>
				                                <div class="form-group inline">
				                                    <label class="search-label inline" for="user_label">标签：</label>
				                                    <input type="text" class="form-control inline line-input diy_input label_input" data-url="${ctx}/back/tag/customer-cache-list" data-param="" placeholder=""  id="user_label">
				                                	<input type="hidden" class="set_labels" name="tags" />
				                                </div>
				                       		</div>  
				                       		</form>
				                       		<form method="post" id="baseUserSearchform">
				                       		</form>
				                       		<form method="post" id="customPropSearchform">
				                       		</form>
				                            <!-- 基本信息 -->
				                            <%-- <div class="cus-list-box">
				                            	<form method="post" id="baseUserSearchform">
				                           		<p>基本信息</p>   
				                                <div class="form-group inline">
				                                    <label class="search-label inline">昵称：</label>
				                                    <input type="text" class="form-control inline" placeholder="请输入昵称" name="nickName"  id="nick_name" data-url="" data-param="" data-inputtype="bytelimit" data-bytelimit="16">
				                                </div>
				                                <c:forEach items="${storeFormUsingProp.defaultProp }" var="defaultProp" >
				                                	<c:if test="${defaultProp == 'name' }">
				                                	<!-- 姓名 -->
				                                		<div class="form-group inline">
						                                    <label class="search-label inline">姓名：</label>
						                                    <input type="text" class="form-control inline" placeholder="请输入姓名" name="name"  id="member_name" data-url="" data-param="" data-inputtype="bytelimit" data-bytelimit="10">
						                                </div>
				                                	</c:if>
				                                	<c:if test="${defaultProp == 'sex' }">
				                                	<!-- 性别 -->
					                                	<div class="form-group inline">
						                                    <label class="search-label inline">性别：</label>
						                                    <div class="search_ch_item m_ch_item">
							                                    <input type="checkbox" name="sex"  class="img_check genderType" value="1"/>
							                                    <label class="inline check_label" for="gender_male">男</label>
						                                    </div>
						                                    <div class="search_ch_item m_ch_item">
							                                    <input type="checkbox" name="sex" class="img_check genderType" value="2"/>
							                                    <label class="inline check_label" for="gender_female">女</label>
						                                    </div>
						                                </div>
				                                	</c:if>
				                                	<c:if test="${defaultProp == 'birth_date' }">
				                                	<!-- 生日 -->
					                                	<div class="form-group inline">
						                                    <label class="search-label inline" for="count_min">生日：</label>
						                                    <input type="tel" class="form-control inline s-time-input integral-start" name="minBirthDate" readonly id="age_min" data-date-format="yyyy-mm-dd" placeholder="最小出生日期" /> - 
						                                    <input type="tel" class="form-control inline s-time-input integral-start" name="maxBirthDate" readonly id="age_max" data-date-format="yyyy-mm-dd" placeholder="最大出生日期" />
						                                </div>
				                                	</c:if>
				                                	<c:if test="${defaultProp == 'area_code' }">
				                                	<!-- 城市 -->
					                                	<div class="form-group inline">
					                                    	<label class="search-label inline">城市：</label>
					                                    	<div class="city-selects inline">
																<select id="p1" class="form-control inline shot-select"></select>
																<select id="p2" class="form-control inline shot-select" style="display: none;"></select>
																<select id="p3" class="form-control inline shot-select" style="display: none;"></select>
															</div>
					                                    	<input type="hidden" name="cityCode" value="" id="city_val">
						                                </div>
				                                	</c:if>
				                                </c:forEach>
				                                </form>
				                                <form method="post" id="customPropSearchform">
				                                <c:forEach items="${storeFormUsingProp.customProp }" var="customProp" >
				                                <div class="form-group inline custom-props" data-type="${customProp.type }" data-subType="${customProp.subType }" data-storePropId="${customProp.storePropId }">
				                                    <label class="search-label inline">${customProp.labelName }：</label>
				                                    <c:if test="${customProp.type == 'input' }">
				                                    	<c:if test="${customProp.subType == 'date' }">
				                                    		<input type="tel" class="form-control inline s-time-input integral-start" readonly data-date-format="yyyy-mm-dd" placeholder="最小${customProp.labelName }" /> - 
				                                    		<input type="tel" class="form-control inline s-time-input integral-start" readonly data-date-format="yyyy-mm-dd" placeholder="最大${customProp.labelName }" />
				                                    	</c:if>
				                                    	<c:if test="${customProp.subType == 'mail' || customProp.subType == 'text' }">
				                                    		<input type="text" class="form-control inline custom-prop-value" placeholder="请输入${customProp.labelName }">
				                                    	</c:if>
				                                    	<c:if test="${customProp.subType == 'radio' }">
															<c:set value="${ fn:split(customProp.value, ',') }" var="values" />
															<c:forEach items="${ values }" var="value">
															<div class="inline">
							                                    <input type="radio" name="${customProp.name }" value="${value }"/>
							                                    <label class="inline check_label">${value }</label>
						                                    </div>
															</c:forEach>
				                                    	</c:if>
				                                    </c:if>
				                                </div>
				                                <p>storePropId:${customProp.storePropId }</p>
				                                <p>storeId:${customProp.storeId }</p>
				                                <p>name:${customProp.name }</p>
				                                <p>labelName:${customProp.labelName }</p>
				                                <p>type:${customProp.type }</p>
				                                <p>subType:${customProp.subType }</p>
				                                <p>placeholder:${customProp.placeholder }</p>
				                                <p>value:${customProp.value }</p>
				                                <p>limit:${customProp.limit }</p>
				                                <p>required:${customProp.required }</p>
				                                <p>useState:${customProp.useState }</p>
				                                </c:forEach>
				                                </form>
				                           </div>    --%>  
				                      	</div>
			                       	</div>
                            		<!-- 会员列表 -->
				                	<div class="table-panel">
										<table class="table user-table" aria-describedby="example2_info" id="user-list-table">
											<thead>
												<tr valign="middle">
													<th width="25px"><input type="checkbox" class="icheckbox_minimal user_check" id="prochekAllBox" /></th>
													<th width="50px"></th>
													<th>会员卡号</th>
													<th width="100px">昵称/手机号</th>
													<th width="150px">注册</th>
													<th>最近消费</th>
													<th>积分</th>
													<th width="160px">标签</th>
												</tr>
											</thead>
											<tbody id="userList" data-tmp="userListTmp">
												
											</tbody>
										</table>
									</div>
                            	</div>
                            	<div class="product-buttons">
		        					<button class="btn btn-default btn_next" data-step="1">上一步</button>
		        					<button class="btn btn-primary btn_next" data-step="3">下一步</button>
		        				</div>
                            </div>
                            <div class="body-step body-step3">
                            	<div class="product-info product-new-info no-border send_coupon_msg clearfix">
                            		<div class="form-group">
                                        <label class="control-label" for="onOpenWechat">微信渠道发放：</label>
                                        <div class="b-line">
											<div class="check-div">
												<input type="checkbox" class="data-switch" id="onOpenWechat" name="" value="0" onchange="isCheckMsg(this)" style="margin:0;vertical-align: middle;"/>
											</div>
                                        </div>
                                        <p class="b_line_tips">请您先在店铺设置中，设置公众号信息。由于微信限制，我们只能发送给关注您公众号并且账号完成微信绑定的会员。与您的公众号48小时内有过互动的会员将会优先收到推送消息，其他会员将会受到微信次数限制可能无法接收。</p>
                                    </div>
                                    <div class="info_item float_item wechat_item">
                                    	<span class="item_title">定制预览</span>
                                    	<div class="info_content">
                                    		<div class="app-design without-add-region">
	                                    		<div class="app-preview">
													<div class="app-header"></div>
													<div class="app-entry" style="background:#f5f5f5;">
														<div class="app-config js-config-region">
															<div class="app-field clearfix">
																<h1>
																	<span>啦啦啦</span>
																</h1>
															</div>
														</div>
														<div class="app-fields js-fields-region">
															<div class="app-fields ui-sortable">
																<div class="app_arrow"></div>
																<div class="app-field clearfix" style="margin-top: 20px;">
																	<div class="field_head">
																		<div class="ellipsis">请在右侧填写页面标题</div>
																	</div>
																	<div class="field_con clearfix">
																		<img class="msg-image" alt="" src="${ctx}/img/600_300.jpg">
																		<div class="field_bottom">
																			<div class="field_text">请在右侧填写发放文案</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="info_right">
											<!-- 	<div class="form-group inline set_custom">
													<label class="control-label" for="isCustomWMsg">定制信息：</label>
			                                        <div class="b-line">
														<div class="check-div">
															<input type="checkbox" class="data-switch" id="isCustomWMsg" value="0" name="" onchange="isCheckMsg(this);" style="margin:0;vertical-align: middle;"/>
														</div>
			                                        </div>
												</div> -->
												<div class="set_cont_div">
													<div class="form-group">
														<label class="inline">页面标题：</label>
														<input type="text" class="form-control inline" name="" id="page_title" placeholder="请输入发放链接标题，30字以内" maxlength="30" readonly="readonly"/>
													</div>
												<!-- 	<div class="form-group">
														<label class="inline">发放文案：</label>
														<textarea class="form-control inline" placeholder="请输入发放链接文案，100字以内" id="msg_text" readonly="readonly" maxlength="100"></textarea>
													</div> -->
													<div class="form-group product-main-img">
					                               		<label class="inline">上传图片：</label>
					                               		<form name="itemForm"  target="_self" id="itemForm" method="post" 
														    enctype="multipart/form-data" >
							                              	<div class="change_img_div" id="imgdiv">
								                             	<div class="change_img_btn" id="goods_mainPage">
								                             		上传
								                             		<input type="file" name="file" class="upload-i" id="file-upload">
								                             	</div>
								                              	<img id="goods_index_img" class="thumbnail" width="140" height="140" src="${ctx}/img/256.jpg">
															</div>
														</form>    
														<div class="pro-index-required">
															<p>（请上传营销图片，建议上传优惠券相关内容图片，用户在点击公众号推送消息时将自动跳转至优惠券领取页面)</p>
														</div> 
														<input type="hidden" id="wxUrl" name="wxUrl">
														<input type="hidden" id="media_id" name="media_id">
													</div>
												</div>
											</div>
										</div>
                                	</div>
                                	<div class="form-group hidden">
                                        <label class="control-label" for="onPhoneMsg">短信渠道发放：</label>
                                        <div class="b-line">
											<div class="check-div">
												<input type="checkbox" class="data-switch" id="onPhoneMsg" name="" value="0" onchange="isCheckMsg(this)" style="margin:0;vertical-align: middle;"/>
											</div>
                                        </div>
                                    </div>
                               	 	<div class="info_item phoneMsg hidden">
                                   		<div class="info_content">
                                    		<div class="phoneMsg_ope_div">
                                    			<a class="addGetLink blue_a">+加入领取链接</a>
                                    			<div class="form-group inline set_msgCustom">
													<label class="control-label" for="isPhoneCustomMsg">定制信息：</label>
			                                        <div class="b-line">
														<div class="check-div">
															<input type="checkbox" class="data-switch" id="isPhoneCustomMsg" value="0" name="" onchange="isCheckMsg(this);" style="margin:0;vertical-align: middle;"/>
														</div>
			                                        </div>
												</div>
                                    		</div>
                                    		<div class="form-group" style="margin-top: 20px;">
                                    			<label class="inline"> 发放文案：</label>
                                    			<input type="hidden" id="couponUrl">
                                    			<input type="hidden" id="couponShortUrl">
                                    			<input type="hidden" id="pushId">
                                    			
                                    			<textarea class="form-control msg_text" id="phoneMsgText" placeholder="请输入发放链接文案，100字以内" readonly="readonly"></textarea>
                                    		</div>
                                    	</div>
                                    </div> 
                                    <div class="form-group">
                                    	<label class="inline">备注：</label>
                                    	<input type="text" id="remarks" class="form-control inline msg_comment line-input" placeholder="请输入30字以内备注信息" maxlength="30"/>
                                    </div>
                                </div>
                            	<div class="product-buttons">
		        					<button class="btn btn-default btn_next" data-step="2">上一步</button>
		        					<button class="btn btn-primary btn_sumit">确认发放</button>
		        				</div>
                            </div>
        				</form>
        			</div>
               	</div>
            </aside>
		</div>
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/timepicker/bootstrap-datetimepicker.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/cky/jq.page.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/CityUtils.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/insertsome.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/switch/main.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/switch/highlight.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/switch/bootstrap-switch.js?v=${v}"></script>
    <script type="text/javascript" src="${ctx}/js/libs/jquery.form.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/apps/coupon/coupon-send.js?v=${v}" ></script>
    
</html>
