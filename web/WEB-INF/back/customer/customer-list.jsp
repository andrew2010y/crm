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
		<link rel="stylesheet" href="${ctx}/css/libs/timepicker/bootstrap-datetimepicker.min.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx}/css/libs/font-awesome.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/ionicons.css?v=${v}" />
		<link rel="stylesheet" href="${ctx}/css/libs/AdminLTE.css?v=${v}" />
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
               	<div class="box no-border">
               		<!--隐藏的店铺信息-->
               		<input type="hidden" id="cur_storeId" name="" value="${store.id}" />
               		<input type="hidden" id="cur_storeName" name="" value="${store.name}" />
               		<!-- 条件搜索 -->
               		<div class="search-panel">
            			<div class="form-group clearfix">
                 			<div class="inline float-right">
                            	<a href="javascript:void(0)" id="more_buttom" class="more-conditions">更多条件<i class="glyphicon glyphicon-chevron-down" id="more_chevron"></i></a>
                   				<a href="javascript:void(0);" class="reset-conditions"> 重置 </a>
                   				<!-- <button type="button" class="btn btn-info btn-search"  onclick="exportCouponsExcel();">导出所有会员信息</button>
                   				 -->
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
                                    <input type="text" class="form-control inline" placeholder="会员卡号" name="cardNo" id="member_NO" data-url="" data-param="" data-inputtype="number" maxlength="20">
                                </div>
                               <!--  <div class="form-group inline">
                                    <label class="search-label inline" for="regist_type">注册类型：</label>
                                    <select name="registerType" class="form-control inline" id='regist_type'>  
						                <option value='-1'>--全部--</option>  
						                <option value='1'>手机号</option>
						                <option value='2'>微信</option>
						            </select>  
                                </div> -->
                                <div class="form-group inline">
                                    <label class="search-label inline" for="regist_type">会员类型：</label>
                                    <select name="registerType" class="form-control inline" id='regist_type'>  
						                <option value='-1'>--全部--</option>  
						                <option value='1'>车友会员</option>
						                <option value='2'>VIP卡会员</option>
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
                               	<div class="form-group inline date-box">
                                    <label class="search-label inline date-box">注册时间：</label>
                                    <input type="text" class="form-control inline s-time-input regist-time time-start" name="minRegisterTime"  id="regist_timeStart" placeholder="开始时间" data-date-format="yyyy-mm-dd" onfocus="this.blur()"/> - 
                                    <input type="text" class="form-control inline s-time-input regist-time time-end" name="maxRegisterTime"  id="regist_timeEnd" placeholder="结束时间"  data-date-format="yyyy-mm-dd" onfocus="this.blur()"/>
                                </div>
                               <!--  <div class="form-group inline">
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
                                </div>-->
                   			</div> 
                   			</form>
                   		</div>
                      	<div class="more-search-panel" id="more_muen">
                      		<form method="post" id="customSearchform">
                            <div class="cus-list-box">	
                            	<p>消费信息</p>  
                            	<div class="form-group inline date-box">
                                    <label class="search-label inline">最近消费：</label>
                                    <input type="text" class="form-control inline s-time-input consume-time time-start" name="minConsumeTime"  id="consume_timeStart" placeholder="开始时间" data-date-format="yyyy-mm-dd" onfocus="this.blur()"/> - 
                                    <input type="text" class="form-control inline s-time-input consume-time time-end" name="maxConsumeTime"  id="consume_timeEnd" placeholder="结束时间"  data-date-format="yyyy-mm-dd" onfocus="this.blur()"/>
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
                                    <input type="tel" class="form-control inline integral-start" name="minAccrualPoint"  id="count_min" placeholder="最低积分" data-inputtype="number" maxlength="9"/> - 
                                    <input type="tel" class="form-control inline integral-start" name="maxAccrualPoint"  id="count_max" placeholder="最高积分" data-inputtype="number" maxlength="9"/>
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
                            <!-- 基本信息 -->
                            <div class="cus-list-box">
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
	                                	<div class="form-group inline date-box">
		                                    <label class="search-label inline" for="count_min">生日：</label>
		                                    <input type="tel" class="form-control inline s-time-input integral-start time-start" name="minBirthDate"  id="age_min" data-date-format="yyyy-mm-dd" placeholder="最小出生日期" onfocus="this.blur()"/> - 
		                                    <input type="tel" class="form-control inline s-time-input integral-start time-end" name="maxBirthDate"  id="age_max" data-date-format="yyyy-mm-dd" placeholder="最大出生日期" onfocus="this.blur()"/>
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
                                <div class="form-group inline custom-props date-box" data-type="${customProp.type }" data-subType="${customProp.subType }" data-storePropId="${customProp.storePropId }">
                                    <label class="search-label inline">${customProp.labelName }：</label>
                                    <c:if test="${customProp.type == 'input' }">
                                    	<c:if test="${customProp.subType == 'date' }">
                                    		<input type="tel" class="form-control inline s-time-input integral-start time-start"  data-date-format="yyyy-mm-dd" placeholder="最小${customProp.labelName }" onfocus="this.blur()"/> - 
                                    		<input type="tel" class="form-control inline s-time-input integral-start time-end"  data-date-format="yyyy-mm-dd" placeholder="最大${customProp.labelName }" onfocus="this.blur()"/>
                                    	</c:if>
                                    	<c:if test="${customProp.subType == 'mail' || customProp.subType == 'text' }">
                                    		<input type="text" class="form-control inline custom-prop-value" placeholder="请输入${customProp.labelName }">
                                    	</c:if>
                                    	<c:if test="${customProp.subType == 'radio' }">
											<c:set value="${ fn:split(customProp.value, ',') }" var="values" />
											<c:forEach items="${ values }" var="value">
											<div class="inline">
			                                    <input type="checkbox" name="${customProp.name }" value="${value }"/>
			                                    <label class="inline check_label">${value }</label>
		                                    </div>
											</c:forEach>
                                    	</c:if>
                                    </c:if>
                                </div>
                                <%-- <p>storePropId:${customProp.storePropId }</p>
                                <p>storeId:${customProp.storeId }</p>
                                <p>name:${customProp.name }</p>
                                <p>labelName:${customProp.labelName }</p>
                                <p>type:${customProp.type }</p>
                                <p>subType:${customProp.subType }</p>
                                <p>placeholder:${customProp.placeholder }</p>
                                <p>value:${customProp.value }</p>
                                <p>limit:${customProp.limit }</p>
                                <p>required:${customProp.required }</p>
                                <p>useState:${customProp.useState }</p> --%>
                                </c:forEach>
                                </form>
                           </div>     
                      	</div>
                    </div>
               	</div>
                <div class="buttons-panel clearfix">
				<!-- 	<button type="button" class="btn btn-info" id="set_label">打标签</button>
					 -->
					<button type="button" class="btn btn-info" id="add_member_q">快速新增会员</button>
					<button type="button" class="btn btn-info" id="add_member">注册会员</button>
					<button type="button" class="btn float-right" id="select-none" style="background-color:#fff;"><a href="javascript:void(0)">取消选中</a></button>
					<button type="button" class="btn btn-info float-right" id="select-all" >选中全部会员</button>
				</div>
				<!-- 会员列表 -->
               	<div class="table-head-back" style="margin-top: -1px;"></div>
               	<div class="table-panel">
					<table class="table user-table" aria-describedby="example2_info" id="userListTable">
						<thead>
							<tr valign="middle">
								<th width="25px"><input type="checkbox" class="icheckbox_minimal user_check" id="prochekAllBox" /></th>
								<th width="50px"></th>
								<th style="text-align:left">会员卡号</th>
								<th width="100px">昵称/手机号</th>
								<th width="150px">会员类型</th>
								<th>分红基金</th>
								<th>积分</th>
								<th width="160px">
								加入时间
									<%-- <span>标签</span><a href="${ctx}/back/tag/list" style="float:right;">前往管理标签</a>
								 --%>
								</th>
							</tr>
						</thead>
						<tbody id="userList" data-tmp="template1">
						</tbody>
					</table>
				</div>
           	</div>
      	</aside>
		</div>
		<!--新增会员模态对话框-->
		<div class="modal fade" id="add_member_modal" tabindex="99"	role="dialog" aria-labelledby="addMemberLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="addMemberLabel">快速新增会员</h4>
					 </div>
					<div class="modal-body">
						<div class="modal-body-con">
							<div class="form-group">
								<label class="modal-label search-label inline" for="new_menber_phone">手机号：</label>
								<input type="text" class="form-control inline" id="new_menber_phone" data-inputtype="number" maxlength="11"/>
								<span class="error-msg phone-msg">已注册</span>
							</div>
						</div>
						<div class="modal-body-operation">
							<button class="btn btn-default" data-dismiss="modal" id="cannel_menber">取消</button>
							<button type="button" class="btn btn-info" id="add_menber_btn"> 注册 </button>
							<button type="button" class="btn btn-info" id="add_menber_fill_btn"> 注册并完善信息 </button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--新增会员模态对话框结束-->
		<!--为会员打标签模态对话框-->
		<div class="modal fade" id="set_label_modal" tabindex="99"	role="dialog" aria-labelledby="sMemberLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					    <h4 class="modal-title" id="sMemberLabel">会员设置标签</h4>
					 </div>
					<div class="modal-body-y">
						<form class="set_label_form">
							<input type="hidden" value="" name="" class="sel_member_ids" />
							<div class="modal-body-con text-left">
								<p class="">您已选中会员：<span class="sele_member_count c-light-blue">0</span>位</p>
								<p>请设置标签内容：</p>
								<div class="form-group set_label_div">
									<label class="modal-label inline" for="s_neww_menber_labek">打标签：</label>
									<input type="text" class="form-control inline diy_input label_input" data-url="${ctx}/back/tag/customer-cache-list" data-param="" placeholder="" id="s_neww_menber_labek"/>
									<input type="hidden" class="set_labels" name="" />
									<a class="common_a" id="fresh_label" href="javascript:void(0);">刷新</a>
									<a class="common_a" id="add_label" href="javascript:void(0);">新建标签</a>
								</div>
								<p class="tips-p">请注意：您所选的会员若已打过本次设置的标签，这些会员将不会打上重复的标签</p>
							</div>
							<div class="modal-body-operation">
								<button class="btn btn-default" data-dismiss="modal">取消</button>
								<button type="button" class="btn btn-info" id="set-member-btn">确定</button>
							</div>
						</from>
					</div>
				</div>
			</div>
		</div>
		<!--为会员打标签模态对话框结束-->
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
								<label class="modal-label search-label inline" for="new_label">新建标签：</label>
								<input type="text" class="form-control inline" id="new_label" maxlength="10"/>
							</div>
							<p class="error-msg text-center">已存在</p>
							<p class="tips-p">新建完成后请点击刷新，获取最新的标签列表</p>
						</div>
						<div class="modal-body-operation">
							<button type="button" class="btn btn-info" id="add_label_btn"> 确定 </button>
							<button class="btn btn-default" data-dismiss="modal" id="cannel_label_btn">取消</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--新建标签模态对话框结束-->
		<!--查看会员信息模态对话框-->
		<div class="modal fade" id="member_info_modal" tabindex="99" role="dialog" aria-labelledby="memberLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
				</div>
			</div>
		</div>
		<!--查看会员信息模态对话框结束-->
	</body>
	<script type="text/javascript" src="${ctx}/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/timepicker/bootstrap-datetimepicker.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/app.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/libs/cky/jq.page.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx}/js/libs/CityUtils.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx}/js/apps/customer/customer-list.js?v=${v}" ></script>
</html>