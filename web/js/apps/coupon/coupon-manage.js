var checkedArr=[];//全局变量（防止过早销毁）
(function($){
	$('#couponListT tbody').on('change','.order_checkbox',function(event){//记录checkbox选中状态
		event.stopPropagation();
		var productId = $(this).attr('id');
		if($(this).prop('checked')){
			checkedArr.push(productId);
		}else{
			checkedArr.splice(checkedArr.indexOf(productId),1);
		}
		$('.checkedlength>num').text(checkedArr.length);
	});
	var pageSize = 10;
	var type; // 所有的优惠券类型 -1，未发放：0，已发放进行中：1，已失效：2
	var name = "";
	// 去除IE下bootstrap modal 对zeroClipboard的影响
	if (/MSIE|Trident/.test(window.navigator.userAgent)) {
		(function($) {
			var zcClass = '.' + ZeroClipboard.config('containerClass');
			var proto = $.fn.modal.Constructor.prototype;
			proto.enforceFocus = function() {
				$(document).off('focusin.bs.modal') /*
													 * Guard against infinite
													 * focus loop
													 */
				.on(
						'focusin.bs.modal',
						$.proxy(function(e) {
							if (this.$element[0] !== e.target
									&& !this.$element.has(e.target).length &&
									/*
									 * Adding this final condition check is the
									 * only real change
									 */
									!$(e.target).closest(zcClass).length) {
								this.$element.focus();
							}
						}, this));
			};
		})(window.jQuery);
	}

	// 初始化优惠券列表
	function couponsList(pageNo, type) {
		name = $("#inputName").val();
		var sptr = '%';
		while (name.indexOf(sptr) >= 0) {
			name = name.replace(sptr, '#-');
		}
		var newParams = $.param({
			status : type,
			name : name,
			pageNo : pageNo,
			pageSize : pageSize
		});

		$.ajax({
			url : ctx + "/back/coupon/list",
			type : "POST",
			data : newParams,
			dataType : "html",
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			timeout : 30000,
			error : function() {
				$.toast("连接异常", 1500);
			},
			success : function(data, textStatus) {
				// 渲染新数据
				var totalCount = $($(data)[0]).attr("data-totalCount");
				$("#storeList").html(data);
				$('.order_checkbox_all').removeAttr('checked');
				CreatePager(pageSize, pageNo, totalCount, 1, "couponListT", "couponListRow");
				$(window).scrollTop(0);
				$('.page_count').append('<label class="checkedlength">&nbsp;&nbsp;&nbsp;&nbsp;当前选中条数：<num>'+checkedArr.length+'</num>条</label>');//增加选中条数
        		$('#couponListT tbody').find('.order_checkbox').each(function(){
        			var productId = $(this).attr('id');
        			if(checkedArr.indexOf(productId)!=-1){//判断显式checkbox选中状态
        				$(this).prop('checked','true');
        			}
        		});
        		if($('#couponListT tbody').find('.order_checkbox:checked').length==$('.order_tr').length){
        			$('.order_checkbox_all').prop('checked','true');
        		}
			}
		});
	}
	$("#couponListT").on("click", ".order_tr", function(event) {
		if(!$(event.target).hasClass("order_checkbox"))
			$(this).find(".order_checkbox").click();
	});
	$(".order_checkbox_all").on("click", function() {
		if ($(this).prop("checked")) {
			$(".order_checkbox").prop("checked", "true");
		} else {
			$(".order_checkbox").removeAttr("checked");
		}
		$('#couponListT tbody').find('.order_checkbox:checked').each(function(){
			var productId = $(this).attr('id');
			if(checkedArr.indexOf(productId)==-1){
				checkedArr.push(productId);
			}
		});
		$('#couponListT tbody').find('.order_checkbox:not(:checked)').each(function(){
			var productId = $(this).attr('id');
			if(checkedArr.indexOf(productId)!=-1){
				checkedArr.splice(checkedArr.indexOf(productId),1);
			}
		});
		$('.checkedlength>num').text(checkedArr.length);
	});

	// 切换优惠券种类
	$(".nav-tabs .coupon-li").on("click", function() {
		$(".nav-tabs .coupon-li.active").removeClass("active");
		$(this).addClass("active");
		type = $(this).attr("data-type");
		if(type==3){//已失效优惠券
			$('#nouseCouponTips').show();
		}else{
			$('#nouseCouponTips').hide();
		}
		couponsList(1, type);
		/*
		 * $(".table-hover").hide();
		 * $(".table-hover[data-table-type='"+type+"']").show();
		 */
	});
	/* 批量生效 */
	$(".batch_operation").on("click", ".btn-all-push", function(event) {
		event.preventDefault();
		event.stopPropagation();
		var ids = checkedArr.toString();
		var searchFlag = false;
		// check 是否选择
		if ($(".table .order_tr .order_checkbox:checked").length > 0) {
			$(".table .order_tr .order_checkbox:checked").each(function(i, v) {
				//var curId = $(v).prop("id");
				var flg = $(v).attr("flg");
				var synchWechat = $(v).attr("synchWechat");

				if (synchWechat == 'true') {
					var wechatStatus = $(v).attr("wechatStatus");
					if (flg == 1 && wechatStatus == 1) {
						searchFlag = true;
					}
				} else {
					if (synchWechat == 'false' && flg == '1') {
						searchFlag = true;
					}
				}

				// 批量生效操作
				/*if (ids == "") {
					ids = curId;
				} else {
					ids += "," + curId;
				}*/
			});
			// if(ids!=""){
			if (searchFlag) {
				updateBatchStatus(1, ids, "批量生效");
			} else {
				$.toast("生效失败,检查优惠券状态", 1500);
			}
			// }
		} else {
			$.toast("请选择要批量生效的优惠券", 1500);
		}

	});

	function updateBatchStatus(status, ids, msg) {
		$.ajax({
			url : ctx + "/back/coupon/batch_start",
			type : "POST",
			data : {
				status : status,
				couponId : ids
			},
			dataType : "json",
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			timeout : 30000,
			error : function() {
				$.toast("连接异常", 1500);
			},
			success : function(data, textStatus) {
				if (textStatus == "success") {
					if (data.code == 0) {
						$.toast(msg + "成功", 1500);
					} else {
						$.toast(msg + "失败", 1500);
					}

					setTimeout(function() {
						window.location.reload();
					}, 1500);
				}
			}
		});

	}

	// 批量失效
	$(".batch_operation")
			.on(
					"click",
					".btn-all-loseE",
					function(event) {
						event.preventDefault();
						event.stopPropagation();
						var ids = checkedArr.toString();
						var searchFlag = false;
						// check 是否选择
						if (ids.length > 0) {
							var dataType = $(".coupon-li.active").attr("data-type");
							if (dataType != 2) {
								$.wxConfirm("提示：您将中止本优惠券的发放，领取链接及未领取的优惠券将无法领取，但已领取的优惠券仍将可以使用！",function() {
													$(".table .order_tr .order_checkbox:checked").each(
																	function(i,v) {
																		//var curId = $(v).prop("id");
																		var flg = $(v).attr("flg");
																		if (flg != 3) {
																			searchFlag = true;
																		}
																		// 批量失效操作
																	/*	if (ids == "") {
																			ids = curId;
																		} else {
																			ids += ","
																					+ curId;
																		}*/
																	});

													// if(ids!=""){
													if (searchFlag) {
														updateBatchStatus(2,ids, "批量失效");
													} else {
														$.toast("批量失效失败,检查优惠券状态",1500);
													}
													// }
												});
							} else {
								$(".table .order_tr .order_checkbox:checked")
										.each(function(i, v) {
											//var curId = $(v).prop("id");
											var flg = $(v).attr("flg");
											if (flg != 3) {
												searchFlag = true;
											}
											// 批量失效操作
										/*	if (ids == "") {
												ids = curId;
											} else {
												ids += "," + curId;
											}*/
										});

								if (searchFlag) {
									updateBatchStatus(2, ids, "批量失效");
								} else {
									$.toast("批量失效失败,检查优惠券状态", 1500);
								}
							}
						} else {
							$.toast("请选择要批量失效的优惠券", 1500);
						}
					});
	/* 点击领取链接 */
	$(".table").on(
			"click",
			".action_getLink",
			function(event) {
				event.preventDefault();
				event.stopPropagation();
				$('.btn-coupon-opera').attr('class','btn btn-primary btn-coupon-opera').removeAttr('disabled').hide();//显示优惠券码时，还原生成或导出的按钮状态
				$("#getCouponLinkModal").attr("data-backdrop", "static");
				$("#getCouponLinkModal").modal("show");

				var url = $(".couponTableHeader .link_input").val();
				$(".btn-saveQRCode").attr("data-url",
						"qcode.do?url=" + encodeURIComponent(url));
				/* 复制链接 */
				$('#getCouponLinkModal').on('shown.bs.modal', function() {
					// 复制
					var copybtn = document.querySelector('.btn-copyLink');
					copybtn.addEventListener('click', function() {
						if ($.trim($("#couponsUrl").val()) == "") {
							$.toast("url为空", 1500);
							return false;
						} else {
							var urlF = document.querySelector('#couponsUrl');
							urlF.select();
							document.execCommand('copy');
							$.toast("复制成功", 1500);
						}
					}, false);
				});
			});

	/* 点击编辑 */
	$(".table").on(
			"click",
			".action_edit",
			function(event) {
				event.preventDefault();
				event.stopPropagation();
				// 优惠劵ID
				var couponId = $($(this).parents('tr').children()[0]).find(
						'input').prop("id");
				window.location.href = ctx + "/back/coupon/edit/" + couponId;
			});
	/* 点击再次发放 */
	$(".table").on(
			"click",
			".action_grant",
			function(event) {
				event.preventDefault();
				event.stopPropagation();
				// 优惠劵ID
				var couponId = $($(this).parents('tr').children()[0]).find(
						'input').prop("id");
				window.location.href = ctx
						+ "/posCoupon/pageJumpAdd.do?couponsId=" + couponId
						+ "";
			});
	/* 点击发放 */
	$(".table").on(
			"click",
			".action_push",
			function(event) {
				event.preventDefault();
				event.stopPropagation();
				updateBatchStatus(1, $($(this).parents('tr').children()[0])
						.find('input').prop("id"), "生效");
			});

	$(function() {
		$('body').on('click','.btn-export',function(){//导出优惠券码
			var couponId = $('.btn-coupon-opera').prop('couponsId');
			var pageNo = 11;
			jconfirm("即将弹出一个新标签页导出优惠券信息，可能需要花费几分钟时间，请不要关闭页面；导出过程中您可以切换回本页进行其他操作。确定开始导出吗？",function(){
				window.open( ctx + '/back/coupon-produce-log/excel-download/' + couponId + '?pageNo=' + pageNo+ '&pageSize=10000&title=' + currentCouponName);
			});
		});
		$('body').on('click','.btn-refresh',function(){//刷新生成状态
			var couponId = $('.btn-coupon-opera').prop('couponsId');
			getListCardByCouponsId(1,couponId);
		});
		$('body').on('click','.btn-make',function(){//生成优惠券码
			jconfirm('系统正在生成优惠券码，请耐心等待，您可以进行其他操作，待生成完成后即可导出。');
			$('.btn-coupon-opera').attr('disabled',true);
			$.ajax({
				url : ctx + '/back/coupon-produce-log/create-code?couponId=' + $(".btn-coupon-opera").prop("couponsId"),
				type : 'POST',
				success : function(response){
					if(response.code == 0){
						$('.btn-coupon-opera').removeAttr('disabled').attr('class','btn btn-primary btn-coupon-opera btn-refresh').text('生成中');
					}else{
						$('.btn-coupon-opera').removeAttr('disabled');
					}
				},
				error : function(){
					$('.btn-coupon-opera').removeAttr('disabled');
				}
			})
		});
		// 页面加载 0所有
		couponsList(1, type);

		$(".search_icon").click(function() {
			couponsList(1, type);

		});
		// enter键搜索
		$("body").on("keypress", "#inputName", function(e) {
			var keywhich = (event.keyCode ? event.keyCode : event.which);
			if (keywhich == 13) {
				event.preventDefault();
				couponsList(1, type);
			}
		});
		
		$("body").on("click","#getCouponLinkModal #goPage",function(){
    		var goPageNum=parseInt($(this).prev().val());
    		if(!goPageNum)
    			return false;
    		var $_pageLi=$(this).parents(".paging_full_numbers").find(".pagination li");
    		var maxPage=$_pageLi.eq($_pageLi.length-3).find("a").attr("curpage");
    		if(goPageNum>maxPage||goPageNum<=0){
    			$.toast("没有找到数据");
    			return false;
    		}
    		var couponId = $("#coupon_link_table").attr("data-id");
    		getListCardByCouponsId(goPageNum, couponId);
    	});
		// 直接选择页数
		$("body").on("click", "#getCouponLinkModal #page_div li a", function() {
			var pageNo = $(this).attr("curPage");
			var couponId = $("#coupon_link_table").attr("data-id");
			getListCardByCouponsId(pageNo, couponId);
		});

		$("body").on("click",".couponListRow #goPage",function(){
    		var goPageNum=parseInt($(this).prev().val());
    		if(!goPageNum)
    			return false;
    		var $_pageLi=$(this).parents(".paging_full_numbers").find(".pagination li");
    		var maxPage=$_pageLi.eq($_pageLi.length-3).find("a").attr("curpage");
    		if(goPageNum>maxPage||goPageNum<=0){
    			$.toast("没有找到数据");
    			return false;
    		}
    		var type = $(".nav-tabs .coupon-li.active").attr("data-type");
    		couponsList(goPageNum,type);
    	});
		// 优惠券列表 直接选择页数
		$("body").on("click", ".couponListRow #page_div li a", function() {
			var pageNo = $(this).attr("curPage");
			var type = $(".nav-tabs .coupon-li.active").attr("data-type");
			couponsList(pageNo, type);
		});

	});

})(jQuery);

// 跳转添加优惠券页面
function toCouponAdd() {
	window.location.href = ctx + "/back/coupon/create";
}

/* 删除优惠券 */
function delCoupon(id) {
	$.wxConfirm("确定删除该优惠券吗？", function() {
		$.toast("delete", 1500);
		$.ajax({
			url : ctx + "/back/coupon/delete/" + id,
			type : "GET",
			data : {
				couponsId : id
			},
			dataType : "json",
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			timeout : 30000,
			error : function() {
				$.toast("连接异常", 1500);
			},
			success : function(data, textStatus) {
				if (textStatus == "success") {
					if (data.code == 0) {
						$.toast("删除成功", 1500);
						$("#" + id).parents("tr").remove();
					} else {
						$.toast("删除失败", 1500);
					}
				}
			}
		});
	});
}

var pageSize = 10; // 一页行数
//初始化table 分页的数据
var tempData;
var tempCouponId;

//查看优惠券的领取链接
function getListCardByCouponsId(pageNo,couponId) {
	$("#getCouponLinkModal").attr("data-backdrop", "static");
	$("#getCouponLinkModal").modal("show");
	if(pageNo>1&&couponId==tempCouponId){
		getPageByCouponId(pageNo, couponId,tempData);
	}else{
		tempCouponId=couponId;
		getQrcodeByCouponId(pageNo, couponId);
	}
}

function getQrcodeByCouponId(pageNo, couponId) {
	$.ajax({
		url : ctx + "/back/coupon-produce-log/get-qrcode-url",
		type : "POST",
		data : {
			couponId : couponId
		},
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		timeout : 30000,
		error : function() {
			$.toast("连接异常", 1500);
		},
		success : function(urldata, textStatus) {
			tempData=urldata;
			getPageByCouponId(pageNo, couponId,urldata);
	   }
	});
}

function getPageByCouponId(pageNo, couponId,urldata) {
	$.ajax({
		url : ctx + "/back/coupon-produce-log/list",
		type : "POST",
		data : {
			couponId : couponId,
			pageNo : pageNo
		},
		dataType : "json",
		contentType : "application/x-www-form-urlencoded; charset=UTF-8",
		timeout : 30000,
		error : function() {
			$.toast("连接异常", 1500);
		},
		success : function(data, textStatus) {
			madedata (pageNo,data, textStatus,couponId,urldata);
			refreshCouponStatus(couponId);
		}
	});
}
function refreshCouponStatus(couponId){
	$.ajax({
		url : ctx + '/back/coupon/quantity?couponId=' + couponId,
		type : 'POST',
		success : function(response){
			if(response.code == 0){
				if(response.result == 0){//不需要生成
					$('.btn-coupon-opera').hide();
				}
				if(response.result == 1){//需要生成
					$('.btn-coupon-opera').addClass('btn-make').text('生成优惠券码').show();
				}
				if(response.result == 2){//正在生成
					$('.btn-coupon-opera').addClass('btn-refresh').text('生成中').show();
				}
			}
		}
	})
}

function madedata (pageNo,data, textStatus,couponId,urldata) {
	var page = data.result;
	var couponStr = '';
	if (textStatus == "success") {
		var length = page.result.length;
		var totalCount = page.totalCount;

		if (length > 0) {
			for (var i = 0; i < page.result.length; i++) {
				var str = '<tr>' + '<td>'
						+ page.result[i].cardNo + '</td>';
				var phone = '';
				if (page.result[i].phone) {
					phone = page.result[i].phone;
				}
				var a = page.result[i].createTime + "";
				var createTime =0;
				if(a!='0'){
					createTime = a.substring(0, 4) + "-"
					+ a.substring(4, 6) + "-"
					+ a.substring(6, 8) + " "
					+ a.substring(8, 10) + ":"
					+ a.substring(10, 12) + ":"
					+ a.substring(12, 14);
				}
				
				if (page.result[i].status == 0) { // 未领取
					str += '<td>未领取 </td>';
					str += '<td align="center"> ' + phone
							+ ' </td>';
				} else if (page.result[i].status == 1) { // 已领取
					str += '<td>已领取</td>';
					var phone = '';
					if (page.result[i].phone) {
						phone = page.result[i].phone;
					}
					str += '<td align="center"> ' + phone
							+ ' </td>';

				} else if (page.result[i].status == 2) {
					str += '<td>已失效</td>';
					var phone = '';
					if (page.result[i].phone) {
						phone = page.result[i].phone;
					}
					str += '<td align="center"> ' + phone
							+ ' </td>';
				}else if (page.result[i].status == 3) {
				
					str += '<td>已核销</td>';
					var phone = page.result[i].phone;
					if (phone) {
						str += '<td align="center"> ' + phone
								+ ' </td>';
					} else {
						str += '<td align="center"></td>';
					}
				} else {
					str += '<td align="center"> - </td>' +
					// str += '<td align="center">
					// '+page.result[i].customerId+' </td>';
					'<td> - </td>';
				}
				
				str += '<td>' + createTime + '</td>';
				str += '</tr>';

				couponStr += str;
			}

			$("#cardList").html(couponStr);
		} else {
			$("#cardList").html("<tr><td colspan='4'>暂无数据</td></tr>");
		}
		
		$("#coupon_link_table").attr("data-id", couponId);

		CreatePager(pageSize, pageNo, totalCount, 1,"coupon_link_table","labels-row");
		var qrCodeUrl = urldata.result.qrCodeUrl;
		$("#aCode").prop("href", qrCodeUrl);
		var cont = "<div style='width:120px;height:120px'><img style='width:120px;height:120px' src='"
				+ qrCodeUrl + "'></div>";
		//alert(cont);
		console.log(cont);
		$("#aCode").popover('destroy').popover({
			placement : 'bottom',
			trigger : 'hover',
			content : cont,
			html : true
		});
		$('#couponsUrl').val(urldata.result.url);
		$(".btn-coupon-opera").prop("couponsId", couponId);
		$(window).scrollTop(0);
	}
}
function setCurrentCouponName(obj){
	window.currentCouponName = $(obj).parents('tr').find('td').eq(1).find('.show_coupon_info').text();
}