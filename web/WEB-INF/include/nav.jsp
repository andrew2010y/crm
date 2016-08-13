<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!--一级菜单-->
<input type="hidden" value="${platformCtx}" id="platform-url">
<%-- <input type="hidden" value="${platformCtx}/api/getStoreOfSubStore.do" id="substore-url">
 --%>
 <div class="menu-first">
	<div class="wrappers">
		<div class="logo-img"> 
			<%-- <img alt="CRM" src="${store.oemLogo}" /> --%>
		</div>
		<div class="menu-list">
		</div>
	</div>
	<div class="head-user-div">
		<div class="user-label">
			<img src="${ctx}/images/tou.png" class="user-img" alt="User Image">
			<p class="user-name">${store.loginUserName}</p>
			<img src="${ctx}/img/uesr-arrow.png" class="user-arrow" alt="User Image">
		</div>
		<div class="user-control">
			<a data-toggle="modal" data-target="#updatepwd">修改密码</a>
			<a id="logout-btn">安全退出</a>
		</div>
	</div>
</div>
<!--二级菜单-->
<div class="menu-secend">
	<div class="wrappers">
	</div>
	<div class="menu-sec-help-btn">
		<%-- <a class="btn btn-help btn-info" target="_blank" href="http://help.bigaka.com/">
		<img alt="" src="${ctx }/img/help_icon.png" style="margin-right:5px;">使用帮助</a> --%>
	</div> 
</div>
<!--密码修改模态对话框-->
<div class="modal fade" id="updatepwd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel"> 修改密码 </h4>
      </div>
      <div class="modal-body">
      	<form  id="updatepwdform">
      		<div class="form-group inline">
      			<label class="form-label">旧密码：</label>
      			<input type="password" class="form-control inline" name="oldpwd" id="oldpwd" maxlength="16"/>
      		</div>
      		<div class="form-group inline">
      			<label class="form-label">新密码：</label>
      			<input type="password" class="form-control inline" name="npwd" id="npwd" maxlength="16"/>
      		</div>
      		<div class="form-group inline">
      			<label class="form-label">确认密码：</label>
      			<input type="password" class="form-control inline"  name="cpwd" id="cpwd" maxlength="16"/>
      		</div>
			<input type="hidden" id="userid" name="userid" value=""/>
			<input type="hidden" id="opwd" name="opwd" value=""/>
      	</form>
      	
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal" id="updatepwd_btn"> 关闭 </button>
        <button type="button" class="btn btn-primary" onclick="modifyPwd()"> 确认修改 </button>
      </div>
    </div>
  </div>
</div><!--密码修改模态结束-->

<div class="modal fade" id="confirm_dialog" data-backdrop="static" style="z-index:2000" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" style="width: 320px;">
  	<div class="modal-content">
  		<div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" id="myModalLabel"><i class="glyphicon glyphicon-warning-sign"></i> <span id="confirm_title">确认操作吗？</span> </h4>
        </div>
        <div class="modal-footer" style="border-top: 0 none;">
	        <button type="button" class="btn btn-danger" id="confirm_ok"> 确认 </button>
	        <button type="button" class="btn btn-success" id="confirm_cance" data-dismiss="modal">取消</button>
      </div>
  	</div>
  </div>
</div>
<div class="modal fade" id="prompt_dialog" data-backdrop="static" style="z-index:2000" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
  	<div class="modal-content">
  		<div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
	        <h4 class="modal-title" id="myModalLabel"><span id="prompt_title">确认操作吗？</span> </h4>
        </div>
        <div class="modal-body">
        	<input type="text" class="form-control inline" id="prompt_value" maxlength="10">
        </div>
        <div class="modal-footer">
	        <button type="button" class="btn btn-success" id="prompt_ok"> 确认 </button>
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
      </div>
  	</div>
  </div>
</div>
<div class="browserTips">
	<div class="tips-content">
		<div class="tips-head">
			<h3>温馨提示：</h3>
			<span class="close-modal">×</span>
		</div>
		<div class="tips-body">
			<div class="body-content">
				<p class="tip-detail">
				</p>
				<p>请下载最新
					<a class="downChrome" href="http://www.google.cn/intl/zh-CN/chrome/browser/desktop/index.html">Chrome浏览器。</a>
				</p>
			</div>
		</div>
	</div>
</div>