<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta charset="utf-8">
		<!-- IE能够使用最新渲染模式而不是兼容模式 -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!-- 国产浏览器默认采用“高速”模式渲染页面 -->
		<meta name="renderer" content="webkit">
		<!--title上的icon-->
		<link rel="shortcut icon" href="${ctx }/img/favicon.ico" >
		<link rel="stylesheet" href="${ctx }/css/libs/bootstrap.css?v=${v}" />
		<link rel="stylesheet" href="${ctx }/css/libs/timepicker/bootstrap-datetimepicker.min.css?v=${v}"/>
		<link rel="stylesheet" href="${ctx }/css/libs/font-awesome.css?v=${v}" />
		<link rel="stylesheet" href="${ctx }/css/libs/ionicons.css?v=${v}" />
		<link rel="stylesheet" href="${ctx }/css/libs/AdminLTE.css?v=${v}" />
		<link rel="stylesheet" href="${ctx }/css/apps/main.css?v=${v}" />
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
               	<div class="box tag-box">
               		<!--隐藏的店铺信息-->
               		<input type="hidden" id="cur_storeId" name="" value="${store.id}" />
               		<input type="hidden" id="cur_storeName" name="" value="${store.name}" />
               		<!-- 条件搜索 -->
               		<div class="label_m_col lable_list">
               			<div class="m_col_t_div">
               				<div class="m_title">所有标签</div>
               				<a class="m_r_div" id="add_label">
               					<span class="add-icon">+</span>
               					<span>新标签</span>
               				</a>
               			</div>
               			<div class="labels_list">
               				<ul class="labels_ul">
               					<c:if test="${empty result }">
               						<li data-index="0">暂无数据</li>
               					</c:if>
               					<c:forEach items="${result }" var="tag" varStatus="index">
               						<li data-id="${tag.tagId }" data-name="${tag.name }" data-index="${index.count }">
	               						<div class="l_left">${tag.name }</div>
	               						<div class="l_right">
	               							<span class="show-num">${tag.count }人</span>
	               							<span class="del-icon-flag"></span>
	               							<a class="del-icon" title="删除"></a>
	               						</div>
	               					</li>
               					</c:forEach>
               				</ul>
               			</div>
               		</div>
					<!-- 第一个标签 会员列表 -->
               		<div class="label_m_col" style="width:600px;max-width: 600px;">
               			<div class="curLabel-ope">
               				<div class="edit_label_div">
               					<input type="hidden" id="curLableId"  value="1"/>
               					<input type="text" name="" class="form-control inline" id="curLabelName"readonly="readonly" maxlength="10"/>
               					<button class="btn btn-info" id="change_lName">确定</button>
               					<button class="btn btn-default" id="cancel_lName">取消</button>
               				</div>
               				<div class="search_div">
               					<input type="text" name="searchParam" id="searchParam" class="form-control search_input inline" placeholder="会员编号/姓名/手机号"/>
								<span class="search_icon"></span>
               				</div>
               			</div>
	                	<div class="table-panel" style="border:none;">
							<table class="table label-tabel" aria-describedby="example2_info" id="labelUserTable">
								<thead>
									<tr valign="middle">
										<th>会员编号</th>
										<th>姓名</th>
										<th>手机号</th>
										<th>状态</th>
										<th width="150px">标签</th>
										<th>
											<a class="blue_a multi_sele" href="javascript:void(0);">多选</a>
											<div class="t_ope_div">
												<a class="blue_a del_sele" href="javascript:void(0);">移除</a>	
												<a class="blue_a cancel_sele" href="javascript:void(0);">取消</a>
											</div>
										</th>
									</tr>
								</thead>
								<tbody id="labelUserList">
									
								</tbody>
							</table>
						</div>
               		</div>
               	</div>
               	<div class="clear" style="clear:both;"></div>
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
								<label class="modal-label search-label inline" for="new_label">新建标签：</label>
								<input type="text" class="form-control inline" id="new_label" maxlength="10"/>
							</div>
							<p class="error-msg text-center">已存在</p>
							<p class="tips-p">新建完成后请前往会员列表打标签！</p>
						</div>
						<div class="modal-body-operation">
							<button type="button" class="btn btn-info" id="add_label_btn"> 确定 </button>
							<button class="btn btn-default" data-dismiss="modal" id="canel_label_btn">取消</button>
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
	<script type="text/javascript" src="${ctx }/js/libs/bootstrap.min.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx }/js/libs/timepicker/bootstrap-datetimepicker.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx }/js/libs/app.js?v=${v}" ></script>
	<script type="text/javascript" src="${ctx }/js/libs/cky/jq.page.js?v=${v}"></script>
	<script type="text/javascript" src="${ctx }/js/apps/tag/tag-list.js?v=${v}" ></script>
</html>
