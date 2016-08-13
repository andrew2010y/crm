(function($){
	//存放商户选择的会员列表
	var pageSize=10;
	
	$(function(){
		//初始化颜色值
		var colorVal = $(".sele-color-val").val();
		var colorInput = $(".diy-color-input");
		for(var i = 0; i<BIGAKA.ColorList.length; i++){
			if(colorVal == BIGAKA.ColorList[i].color){
				var str = '<span class="sel_color_span" data-id="'+BIGAKA.ColorList[i].colorVal+'" style="background: '+ BIGAKA.ColorList[i].colorVal+'" data-type="'+BIGAKA.ColorList[i].color+'"></span>';
				$(".sele_color_div").html(str);
				$(".sele_color_div").css({
				    "left": colorInput.position().left,
				    "top":  colorInput.position().top,
				    "margin-left": "0px"
				});
				$(".app-field.member-card-field").css("background-color",BIGAKA.ColorList[i].colorVal);
			}
		}
		
		var couponStatus = $("#coupon-status").val();
		switch (couponStatus){ 
			case "1":
				$("#add-couon-form").find("input[type='radio']").each(function(i,v){
					$(v).prop("disabled","disabled");
				});
				$("#add-couon-form").find("input[type='checkbox']").each(function(i,v){
					$(v).prop("disabled","disabled");
				});
				$("#quantity").prop("readonly","readonly");
				$("#coupon-val").prop("readonly","readonly");
				$("#limit_count").prop("readonly","readonly");
				$("#limit_integral").prop("readonly","readonly");
				$('.diy-color-input').removeAttr("readonly","readonly");
				$('.diy-color-input').prop("disabled","disabled");
				break;
			case "3":
				$("#add-couon-form").find("input[type='text']").each(function(i,v){
					$(v).removeProp("readonly");
				});
				$("#add-couon-form").find("input[type='radio']").each(function(i,v){
					$(v).removeProp("disabled");
				});
				$("#add-couon-form").find("input[type='checkbox']").each(function(i,v){
					$(v).removeProp("disabled");
				});
				$("#add-couon-form").find("textarea").each(function(i,v){
					$(v).removeProp("readonly");
				});
				break;
			case "0":
			$("#add-couon-form").find("input[type='text']").each(function(i,v){
				$(v).prop("readonly","readonly");
			});
			$("#add-couon-form").find("input[type='radio']").each(function(i,v){
				$(v).prop("disabled","disabled");
			});
			$("#add-couon-form").find("input[type='checkbox']").each(function(i,v){
				$(v).prop("disabled","disabled");
			});
			$("#add-couon-form").find("textarea").each(function(i,v){
				$(v).prop("readonly","readonly");
			});
			$('.diy-color-input').removeAttr("readonly","readonly");
			$('.diy-color-input').prop("disabled","disabled");
			break;
			case "2":
				$("#add-couon-form").find("input[type='text']").each(function(i,v){
					$(v).prop("readonly","readonly");
				});
				$("#add-couon-form").find("input[type='radio']").each(function(i,v){
					$(v).prop("disabled","disabled");
				});
				$("#add-couon-form").find("input[type='checkbox']").each(function(i,v){
					$(v).prop("disabled","disabled");
				});
				$("#add-couon-form").find("textarea").each(function(i,v){
					$(v).prop("readonly","readonly");
				});
				$('.diy-color-input').removeAttr("readonly","readonly");
				$('.diy-color-input').prop("disabled","disabled");

				break;
		}
		 
		
		var curVal = $("input[name='useScene']:checked").val();
		// 选择店客源
		if(curVal == 2 || curVal == 0){ 
			$("#type-all").prop("checked", "true");
			$("#type-vType,#type-brief").attr("disabled",true);
		}
		if(curVal == 1){
			$("#type-vType,#type-brief").removeAttr("disabled");
		}
		if($("input[name=type-pro]:checked").val()==0){
			//适用商品不限
			$("#a_show_brief").css("color","#AEAEAE");
			$("#choose_nav_id").css("color","#AEAEAE");
		}
		if($("input[name=type-pro]:checked").val()==1){
			//指定商品
			$("#a_show_brief").css("color","#77c2f7");
			$("#choose_nav_id").css("color","#AEAEAE");
		}
		if($("input[name=type-pro]:checked").val()==2){
			//指定商品分类
			$("#a_show_brief").css("color","#AEAEAE");
			$("#choose_nav_id").css("color","#77c2f7");
		}
		if($("input[name=hasSubStore]:checked").val()==0){
			//不限门店
			$(".select_store").css("color","#AEAEAE")
		}
		
	});
	//选择省市区的下拉列表
	var options={
			province	:'p1',			//	省/直辖市
			city		:'p2',			//	市
			county		:'p3',			//	县/区
			defaultCitys:''
		};
    
	WX.cityUtils.init(options);
	$("#p1").prepend("<option selected='selected' value=''>---请选择---</option>").val("");
	
	$("#p2").empty().hide();
	$("#p3").empty().hide();
	$("body").on("change","#p1",function() {
		if ($("#p1").prop("value") == '') {
			$("#p2").attr("style", "display: none;");
			$("#p3").attr("style", "display: none;");
		} else {
			$("#p2").prepend("<option selected='selected' value=''>---请选择---</option>").val("").show();
			$("#p3").val("");
		}
	});
	$("body").on("change","#p2",function() {
		$("#p3").prepend("<option selected='selected' value=''>---请选择---</option>").show();
	});
		//ztree 的默认参数
		var zTreeNodes=[];
		var setting = {
					data: {							//数据格式
						simpleData: {
						//	enable: true,			//使用 / 不使用 简单数据模式   即 json 数组对象,
													//以id,pId 来标识子父关系,而非使用children来标识子对象
							idKey: "id",			//主键
							pIdKey: "parent_id",			//父ID
							rootPId: 0				//用于修正根节点父节点数据，即 pIdKey 指定的属性值
						}
					},
					callback: {
						onDblClick : zTreeOnDblClick,		//用于捕获 zTree 上鼠标双击之后的事件回调函数
					}
				};
		 var zTree;//树对象  
		
		$(function(){
			//选择门店
			$("#sele-store").click(function(ev){
				ev.preventDefault();
				ev.stopPropagation();
				
				$("#type-useStore").prop("checked", "true");
				
				var p1 = $("#p1").val();
				var p2 = $("#p2").val();
				var p3 = $("#p3").val();
				if($("#p1").val()==null){
					p1 = "";
				}
				if($("#p2").val()==null){
					p2 = "";
				}
				if($("#p3").val()==null){
					p3 = "";
				}
				var pValue=p1+p2+p3;
				var name=$("#storeTypeName").val();
				var sptr='%';
				while (name.indexOf(sptr) >= 0){
					name = name.replace(sptr, '#-');
	            }
				//获取已经选中的门店
				var checkedStoreId = $("#checkedStoreId").val();
				var params = {districtId:pValue,name:name};
				
				initStoreList(1,params,checkedStoreId);
			});
		
		$("body .js-pick-time").datetimepicker({
			weekStart: 1,
			todayBtn: 1,
	        autoclose: 1,
	        todayHighlight: 1,
	        startView: 2,
	        minView: 2,
	        forceParse: 0,
			startDate:new Date()
		 });
			
		$("body").on("change",".js-pick-time",function(ev){
			ev.preventDefault();
			ev.stopPropagation();
			var curVal = $(this).val();
			var oCurVal = $(this).val();
			var curId = $(this).attr("id");
		
			// 生效时间
			if(curId == "start-time"){
				if(curVal == ""){
					$.toast("请选择有效开始日期",1500);
				} else{
					var tempStartT = "";
	   	        	var endTime =  $.trim($("#end-time").val());
		        	
		        	if($("#end-time").val() != ""){
	    	        	if(new Date(tempStartT) >= new Date(endTime)){
	    	        		$("#start-time").addClass("date-error");
							$("#end-time").addClass("date-error");
							$.toast("开始日期必须小于结束日期",1500);
	    	        	}else{
	    	        		$("#start-time").removeClass("date-error");
		        			$("#end-time").removeClass("date-error");
	    	        	}
		        	} 
				}
			}
			// 过期时间
			if(curId == "end-time"){
				if(curVal == ""){
					$.toast("请选择有效结束日期",1500);
				} else{
					var startTime = $.trim($("#start-time").val());
					var tempEndT = "";
		        	
					if($("#start-time").val() != ""){
	    	        	if(new Date(startTime) >= new Date(tempEndT)){
	    	        		$("#start-time").addClass("date-error");
							$("#end-time").addClass("date-error");
							$.toast("开始日期必须小于结束日期",1500);
	    	        	}else{
	    	        		$("#start-time").removeClass("date-error");
		        			$("#end-time").removeClass("date-error");
	    	        	}
		        	}
				}
			}
		});
	//判断小数和最大值问题
	$("#coupon-val").on("change",function(){
		var curVal = $.trim($("#coupon-val").val());
		if(curVal != ""){
    		if(curVal.indexOf('.')>-1){
    			$.toast("面额不能为小数",1500);
    			return false;
    		}
			if(parseInt(curVal) > 3000){
				$.toast("金额不能大于3000",1500);
				$("#coupon-val").val("3000");
    			return false;
			}
		}
	});
	    	
	// 优惠券面额范围
	$("#coupon-range").on("click",function(){
		var flag = $(this).is(":checked");
		if(flag){
			$(".coupon-range").css("display","inline-block");
		} else{
			$(".coupon-range").hide();
			$(".coupon-sval").val("");
			$(".coupon-eval").val("");
		}
	});
	// 判断金额是否正确
	$(".js-only-float").on("blur",function(){
		$(this).val($.trim($(this).val()));
		var curVal = $.trim($(this).val());
		var floatReg = new RegExp("^\\d+(\\.\\d{1,2})?$");
		var curId = $(this).attr("id");
		
		if(curVal != ""){
			if(curId == "coupon-val"){
				if(!floatReg.test(curVal)){
					$.toast("请填写正确的面额",1500);
				} else{
					if(parseFloat(curVal)>100000000){
						$.toast("订单金额不能大于100000000",1500);
						$(this).val("100000000");
						return;
					}
				}
			}
			if(curId == "coupon-sval"){
				if($("#coupon-range").is(":checked")){
					var endVal = $.trim($("#coupon-eval").val());
					if(!floatReg.test(curVal)){
						$.toast("请填写正确的最小面额",1500);
					} else {
						if(parseFloat(curVal)>100000000){
							$.toast("订单金额不能大于100000000",1500);
							$(this).val("100000000");
							return;
						} else{
							if(endVal != "" && parseFloat(curVal) > parseFloat(endVal)){
								$.toast("请填写正确的最小面额",1500);
    						}
						}
						
					}
				}
			}
			if(curId == "coupon-eval"){
				if($("#coupon-range").is(":checked")){
					var startVal = $.trim($("#coupon-sval").val());
					if(!floatReg.test(curVal)){
						$.toast("请填写正确的最大面额",1500);
						return;
					} else {
						if(parseFloat(curVal)>100000000){
							$.toast("订单金额不能大于100000000",1500);
							$(this).val("100000000");
							return;
						} else{
							if(endVal != "" && parseFloat(curVal) < parseFloat(startVal)){
								$.toast("请填写正确的最大面额",1500);
    							return;
    						}
						}
						
					}
				}
			}
			if(curId == "zk-coupon-val"){
				if(!floatReg.test(curVal)){
					$.toast("请填写正确的面额",1500);
				}else {
					if(parseFloat(curVal)>100000000){
						$.toast("订单金额不能大于100000000",1500);
						$(this).val("100000000");
						return;
					}	    					
				}
			}
			//订单满金额可用
			if(curId == "limit_price"){
				if($("#type-price").is(":checked")){
					if(!floatReg.test(curVal)){
						$.toast("请填写正确订单金额",1500);
						return;
					} else{
						if(parseFloat(curVal)>100000000){
							$.toast("订单金额不能大于100000000",1500);
							$(this).val("100000000");
							return;
						}
					}
				}
			}
		}
	});
	
	// 选择优惠券还是抵扣券
	$("input[name='coupon-type']").on("click",function(){
		var curVal = $(this).val();
		if(curVal == "1"){
			$(".controls.dy-coupon").show();
			$(".controls.zk-coupon").hide();
		}else if(curVal == "2"){
			$(".controls.zk-coupon").show();
			$(".controls.dy-coupon").hide();
		}
	});
	
	// 选择使用场景
	$("input[name='useScene']").on("click",function(){
		var curVal = $(this).val();
		// 选择店客源
		if(curVal == 2 || curVal == 0){ 
			$("#a_show_brief").css("color","#AEAEAE");
			$("#choose_nav_id").css("color","#AEAEAE");
			$("#type-all").prop("checked", "true");
			$("#type-vType,#type-brief").attr("disabled",true);
		}
		if(curVal == 1){
			$("#type-vType,#type-brief").removeAttr("disabled");
		}
	});
	$("input[name='type-pro']").on("click",function(){
		if($("input[name=type-pro]:checked").val()==0){
			//适用商品不限
			$("#a_show_brief").css("color","#AEAEAE");
			$("#choose_nav_id").css("color","#AEAEAE");
		}
		if($("input[name=type-pro]:checked").val()==1){
			//指定商品
			$("#a_show_brief").css("color","#77c2f7");
			$("#choose_nav_id").css("color","#AEAEAE");
		}
		if($("input[name=type-pro]:checked").val()==2){
			//指定商品分类
			$("#a_show_brief").css("color","#AEAEAE");
			$("#choose_nav_id").css("color","#77c2f7");
		}
	});
	$("input[name='hasSubStore']").on("click",function(){
		if($("input[name=hasSubStore]:checked").val()==0){
			//不限门店
			$(".select_store").css("color","#AEAEAE");
		}else{
			$(".select_store").css("color","#77c2f7")
		}
	});
	//选择分类
	//一级分类change事件(商品查询参数)
	$("body").on("change", "#goods-categrory1", function() {
		var c1 = $(this).val();
		$("#goods-categrory2").val(0);
		loadCategoryDataWithQuery(c1);
	});
	
	function loadCategoryData2(data,cat1Div){
		 
		if (data.code == 0) {
			var ocStr = '<option value="0">-请选择-</option>';
			if(data.result.length > 0){
				for (var i = 0; i < data.result.length; i++) {
					if(data.result[i].id == cat1Div.val()){
						if(data.result[i].children!=null&&data.result[i].children.length > 0){
							for(var j = 0; j < data.result[i].children.length; j++){
								ocStr += "<option value='" + data.result[i].children[j].id + "'>" +data.result[i].children[j].name + "</option>";
							}
							$("#goods-categrory2").html(ocStr).show();
						}else
							$("#goods-categrory2").hide();
					}
				}
			}
		} else{
			$.toast(data.message, 1500);
		}
	}
	
	function loadCategoryData1(data){
		if (data.code == 0) {
			var ostr = '<option value="0">-请选择-</option>';
			if(data.result.length > 0){
				for (var i = 0; i < data.result.length; i++) {
					ostr += "<option value='" + data.result[i].id + "'>" + data.result[i].name + "</option>";
				}
			}
			$("#goods-categrory1").html(ostr);
		} else{
			$.toast(data.message, 1500);
		}
	}
	
	var sonsdata=1;
	// 装载商品导航
	function loadCategoryDataWithQuery(flag) {
		
		var url = ctx + "/back/coupon-expand/sons-list";
		var curCateDiv = $("#storeBrief .goods-cate-div-container");
		var cat1Div= curCateDiv.find("#goods-categrory1");
		var cat2Div = curCateDiv.find("#goods-categrory2");
		//查询二级分类
		if(flag){
			if(cat1Div.val() != 0){
				if(sonsdata==1){
					$.ajax({
						url : ctx + "/back/coupon-expand/sons-list",
						type:"GET",//
						 async: false,
						 dataType:"json",
						 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
					     timeout: 30000,
					     error: function(){
					       $.toast("连接异常",1500);
					     },
						success : function(data) {
							loadCategoryData2(data,cat1Div);
							sonsdata = data;
						}
					});
				}else{
					loadCategoryData2(sonsdata,cat1Div);
				}
				
			} else {
				cat2Div.html("<option value='0'>-请选择-</option>").hide();
			}
		} else { //初始化一级分类
			if(sonsdata==1){
				$.ajax({
					url : ctx + "/back/coupon-expand/sons-list",
					type:"GET",//
					 async: false,
					 dataType:"json",
					 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				     timeout: 30000,
				     error: function(){
				       $.toast("连接异常",1500);
				     },
					success : function(data) {
						loadCategoryData1(data);
						sonsdata = data;
					}
				});
			}else{
				loadCategoryData1(sonsdata);
			}
		}
	}
	
	//初始化选择指定商品的对话框
	function initGoods(pageNo){
		var goodCat1 = $("#goods-categrory1").val();
		var goodCat2 = $("#goods-categrory2").val();

		if(goodCat2 == 0){
		} else{
			goodCat1=goodCat2;
		}
		var name=$("#goodName").val();
		var sptr='%';
		while (name.indexOf(sptr) >= 0){
			name = name.replace(sptr, '#-');
        }
		 
		 $.ajax({
				url:ctx+"/back/coupon-expand/goods-list",
				type:"GET",
				 async: false,
				 data:{'name':name,'pageNo':pageNo,'pageSize':10,'navId':goodCat1},
				 dataType:"html",
				 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			        timeout: 30000,
			        error: function(){
			        	$.toast("连接异常",1500);
			        },
			        success: function(data,textStatus){
			        	if(textStatus=="success"){
							// 渲染新数据
				        	var totalCount = $($(data)[0]).attr("data-totalCount");
				        	$("#storeBriefList").html(data);
		        			CreatePager(pageSize,pageNo,totalCount,1,"stores_Brief","goods-modal-row");
			        	}
			        }
			});
	}
	/* 商品分页 跳转 start */
	//点击跳转页码
	$("body").on("click","#storeBrief #goPage",function(){
		var goPageNum=parseInt($(this).prev().val());
		if(!goPageNum)
			return false;
		var $_pageLi=$(this).parents(".paging_full_numbers").find(".pagination li");
		var maxPage=$_pageLi.eq($_pageLi.length-3).find("a").attr("curpage");
		if(goPageNum>maxPage||goPageNum<=0){
			$.toast("没有找到数据");
			return false;
		}
		initGoods(goPageNum);
	});
	//直接选择页数
	$("body").on("click","#storeBrief #page_div li a",function(){
		var pageNo = $(this).attr("curPage");
		initGoods(pageNo);
	});
	
	/* 商品分页 跳转 end */
	//点击选择指定商品，打开对应的modal
	$("#a_show_brief").on("click",function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		if(!$(this).prev(".controls_div").find("input[type='radio']").prop("checked")){
			return;
		} else{
			var useScene=$('input[name="useScene"]:checked').val();
			if(useScene!=1){
				return false;
			}
			$("#storeBrief .modal-body").slimscroll({
		        height: "708px",
		        distance:'10px',
		        alwaysVisible: false,
		        railVisible:true,
		        railColor:'#e1e1e1',
		        railOpacity: 1,
		        size: "6px",
		        color: '#77c2f7',
		        opacity: 1
			});
			
		 	$("#storeBrief").attr("data-backdrop", "static");
			$("#storeBrief").modal("show");
			$(ev).prev().find("input:radio").prop("checked","checked")
			initGoods(1);
			loadCategoryDataWithQuery();
		}
	});
	    	
	//选择指定商品
	$("body").on("click",".sel-good", function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		var curTr = $(this).closest("tr");
		$("#a_show_brief").html("选择商品："+curTr.attr("data-name"));
		$("#a_show_brief").attr("productId",curTr.attr("data-id"));
		$("#a_show_brief").attr("productName",curTr.attr("data-name"));
		$("#storeBrief").modal("hide");
		$(".good-type").removeAttr("checked");
		$(".good-type[value='1']").prop("checked", "true");
		$("#choose_nav_id").attr("categoryId","");
		$("#choose_nav_id").attr("categoryName","");
		$("#choose_nav_id").html("选择分类");
		$("#navId").val("");
		$("#del-nav").hide();
		$("#del-brief").show();
	});
	//搜索商品
	$("body").on("click","#sele-good", function(){
		initGoods(1);
	});
	
	//选择分类
	$("#choose_nav_id").on("click",function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		if(!$(this).prev(".controls_div").find("input[type='radio']").prop("checked")){
			return;
		} else{
			var useScene=$('input[name="useScene"]:checked').val();
			if(useScene!=1){
				return false;
			}
			$(ev).prev().find("input:radio").prop("checked","checked");
			$("#nav-modal").attr("data-backdrop", "static");
			$("#nav-modal").modal("show");
			//获取分类数据
			$.ajax({
				url:ctx+"/back/coupon-expand/sons-list",
				type:"GET",//
				 async: false,
				 dataType:"json",
				 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			     timeout: 30000,
			     error: function(){
			       $.toast("连接异常",1500);
			     },
				success:function(data){
					zTreeNodes=data.result;
					zTree=$.fn.zTree.init($("#zTree"), setting, zTreeNodes);
				}		
			});
		}
	});
	
	//点击展开，展开分类
	$("body").on("click", "#open_down_tree", function(){
		zTree.expandAll(true);
	});
	//点击收起，收起分类
	$("body").on("click", "#close_up_tree", function(){
		zTree.expandAll(false);
	});
	initStoreList2();
	function initStoreList2(){
		//显示门店列表
		 $.ajax({
				url:ctx+"/back/coupon-expand/store-list",
				type:"POST",//GET
				 async: false,
				// data:params,
				 dataType:"html",
				 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			        timeout: 30000,
			        error: function(){
			        	$.toast("连接异常",1500);
			        },
			        success: function(data,textStatus){
			        	if(textStatus=="success"){
				        	var totalCount = $($(data)[0]).attr("data-totalCount");
				        	 if(totalCount==0){
				        		 $("#select_store_div").hide();
				        	 }
		        		}
			        }
			});
	}
	
	function initStoreList(pageNo,params,checkedStoreId){
		params.pageNo = pageNo;
		
		//显示门店列表
		 $.ajax({
				url:ctx+"/back/coupon-expand/store-list",
				type:"POST",//GET
				 async: false,
				 data:params,
				 dataType:"html",
				 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			        timeout: 30000,
			        error: function(){
			        	$.toast("连接异常",1500);
			        },
			        success: function(data,textStatus){
			        	if(textStatus=="success"){
			        		if($("#checkedStoreId").val()!=""){//选中之前选中的门店
			        			var $_data=$(data)
			        			$.each(eval("("+$("#checkedStoreId").val()+")"),function(index_i,obj_i){
			        				$_data.find(".order_checkbox[id="+obj_i.id+"]").prop("checked",true);
			        			})
				        		console.log($_data);
			        			var newData="";
			        			$_data.each(function(index,obj){
			        				newData+=obj.html();
			        			})
			        			data=newData;
			        		}
				        	var totalCount = $($(data)[0]).attr("data-totalCount");
				        	$("#storeList").html(data);
			        		CreatePager(pageSize,pageNo,totalCount,1,"stores_table","store-modal-row");
			        		var result=checkedStoreId.split(",");
			        		if(result != ""){
			        			var dataResultList = $("#stores_table .order_tr");
			        			for(var i = 0;i < dataResultList.length;i++){
			        				var curData = $(dataResultList[i]).find(".order_checkbox");
			        				for(var j = 0 ;j < result.length; j++){
			        					if(curData.val() == result[j]){
			        						curData.attr("checked",true);
			        					}
			        				}
			        			}
			        		}
		        		}
			        		
			        }
			});
	}
	// 选择门店
	$(".select_store").on("click",function(ev){
		ev.preventDefault();
		ev.stopPropagation();
		if($(this).closest(".controls_div").find("input[type='radio']").attr("disabled")){
			return;
		} else{
			if(!$("#hasSubStore1").is(":checked")){
				return;
			}
			
			$("#storeModal .modal-body").slimscroll({
				height: "708px",
				distance:'10px',
				alwaysVisible: false,
				railVisible:true,
				railColor:'#e1e1e1',
				railOpacity: 1,
				size: "6px",
				color: '#77c2f7',
				opacity: 1
			});
			$("#storeModal").attr("data-backdrop", "static");
			$("#storeModal").modal("show");
			
			$("#type-useStore").prop("checked", "true");
			
			var p1 = $("#p1").val();
			var p2 = $("#p2").val();
			var p3 = $("#p3").val();
			if($("#p1").val()==null){
				p1 = "";
			}
			if($("#p2").val()==null){
				p2 = "";
			}
			if($("#p3").val()==null){
				p3 = "";
			}
			var pValue=p1+p2+p3;
			var name=$("#storeTypeName").val();
			var sptr='%';
			while (name.indexOf(sptr) >= 0){
				name = name.replace(sptr, '#-');
            }
			
			//获取已经选中的门店
			var checkedStoreId = $("#checkedStoreId").val();
			var params = {districtId:pValue,name:name};
			initStoreList(1,params,checkedStoreId);
		}
	});
	//门店直接选择页数
	$("body").on("click",".store-modal-row #page_div li a",function(){
		var pageNo = $(this).attr("curPage");
		var p1 = $("#p1").val();
		var p2 = $("#p2").val();
		var p3 = $("#p3").val();
		if($("#p1").val()==null){
			p1 = "";
		}
		if($("#p2").val()==null){
			p2 = "";
		}
		if($("#p3").val()==null){
			p3 = "";
		}
		var pValue=p1+p2+p3;
		var name=$("#storeTypeName").val();
		var sptr='%';
		while (name.indexOf(sptr) >= 0){
			name = name.replace(sptr, '#-');
        }
		 
		//获取已经选中的门店
		var checkedStoreId = $("#checkedStoreId").val();
		var params = {districtId:pValue,name:name};
		initStoreList(pageNo,params,checkedStoreId);
	});
	$("body").on("click",".store-modal-row #goPage",function(){
		var goPageNum=parseInt($(this).prev().val());
		if(!goPageNum)
			return false;
		var $_pageLi=$(this).parents(".paging_full_numbers").find(".pagination li");
		var maxPage=$_pageLi.eq($_pageLi.length-3).find("a").attr("curpage");
		if(goPageNum>maxPage||goPageNum<=0){
			$.toast("没有找到数据");
			return false;
		}
		var p1 = $("#p1").val();
		var p2 = $("#p2").val();
		var p3 = $("#p3").val();
		if($("#p1").val()==null){
			p1 = "";
		}
		if($("#p2").val()==null){
			p2 = "";
		}
		if($("#p3").val()==null){
			p3 = "";
		}
		var pValue=p1+p2+p3;
		var name=$("#storeTypeName").val();
		var sptr='%';
		while (name.indexOf(sptr) >= 0){
			name = name.replace(sptr, '#-');
        }
		//获取已经选中的门店
		var checkedStoreId = $("#checkedStoreId").val();
		var params = {districtId:pValue,name:name};
		initStoreList(goPageNum,params,checkedStoreId);
	});
	// 门店选择弹出框和选择商品弹出框，点击一行的时候相应操作
	$(".table").on("click", ".order_tr", function(ev) {
		var curTable = $(this).closest(".table");
		if(curTable.attr("id") == "stores_Brief"){ // 商品
			
    		$("#a_show_brief").html("选择商品："+$(this).attr("data-name"));
    		$("#a_show_brief").attr("productId",$(this).attr("data-id"));
    		$("#a_show_brief").attr("productName",$(this).attr("data-name"));
    		$(this).find(".sel-good").prop("checked","checked");
    		$("#storeBrief").modal("hide");
    		$(".good-type").removeAttr("checked");
    		$(".good-type[value='1']").prop("checked", "true");
    		
    		//还原选择分类的内容
    		$("#choose_nav_id").attr("categoryId","");
    		$("#choose_nav_id").attr("categoryName","");
    		$("#choose_nav_id").html("选择分类");
    		$("#navId").val("");
    		$("#del-nav").hide();
    		$("#del-brief").show();
		} else if(curTable.attr("id") == "stores_table"){ // 门店
			var $_checkbox = $(this).find(".order_checkbox");
			if ($_checkbox.prop("checked")) {
				$_checkbox.removeAttr("checked");
				
			} else {
				$_checkbox.prop("checked", "true");
			}
			var $_seleTrs = $(".table tbody tr .order_checkbox:checked");
			$(".btn-select .seleStoreCount").html($_seleTrs.length);
		}
	
	});
	    	
	$(".table").on("click", ".order_checkbox", function(event) {
		event.stopPropagation();
		var $_seleTrs = $(".table tbody tr .order_checkbox:checked");
		$(".btn-select .seleStoreCount").html($_seleTrs.length);
	});
	$(".order_checkbox_all").on("click", function() {
		if ($(this).prop("checked")) {
			$(".order_checkbox").prop("checked", "true");
		} else {
			$(".order_checkbox").removeAttr("checked");
		}
		var $_seleTrs = $(".table tbody tr .order_checkbox:checked");
		$(".btn-select .seleStoreCount").html($_seleTrs.length);
	});
	
	
	//弹出选择门店的页面后，点击已选的 ，后给选择门店赋值
	$("#storeModal").on("click",".btn-select",function(){
		var selectedLis = $('.order_checkbox:checked');
		var selectedIds= "";
		if(selectedLis.length>0){
			selectedIds= "[";
			for(var i=0;i<selectedLis.length;i++){
				var storeId = $(selectedLis[i]).val();
				if(storeId!='0'){
					var json = {
							"id":parseInt(storeId),
							"name":$(selectedLis[i]).closest("tr.order_tr").attr("data-name")
					};
					json = JSON.stringify(json);
						
					selectedIds +=json;	
					if(i<selectedLis.length-1){
						selectedIds +=",";
					}
				}
			}
			selectedIds +="]";
		}
		
		//selectedIds=selectedIds.substring(0,selectedIds.length-1);
		$("#checkedStoreId").val(selectedIds);
		var len = $(".btn-select .seleStoreCount").html();
		$(".select_store #storeCount").html(len);
		$("#storeModal").modal("hide");
	});
	
	//同步商城会员  or同步微信后台
	$("input[name='directGrant']").click(function(event){
		if($(this).prop("checked")){
			$("input[name='directGrant']").prop("checked",false);
			$("input[name='synchWechat']").prop("checked",false);
			$(this).prop("checked",true);
			$('#btn-submit-send').show();
		}
	});
	
	$("#synchWechat").change(function() { 
		if($("#synchWechat").is(":checked")) { 
			$("input[name='directGrant']").prop("checked",false);
			$('#btn-submit-send').hide();
		}else{
			$('#btn-submit-send').show();
		}
	}); 
	
	// 取消
	$("#btn-cancel").on("click",function(){
		window.location.href=ctx+"/back/coupon";
	});
	
	//生成并发放
	$("#btn-submit-send").on("click",function(){
		$("#btnType").val(2);
		checkAndSaveCoupon();
	});
	//生成优惠券
	$("#btn-submit").on("click",function(){
		$("#btnType").val(0);
		checkAndSaveCoupon();
	});
	
	$("body").on("click",".dialog-chanel",function(){
		$('#num-modal').modal('hide');
	});
	
	$("body").on("click",".dialog-save",function(){
		if($('#synchWechat').prop('checked') && !$('#barCode').prop('checked') && !$('#QrCode').prop('checked')){
			$.toast("请选择优惠券的展示形式",1500);
			return;
		}else{
			sendCoupons($("#btnType").val());
		}
	});
	
	function checkAndSaveCoupon(){
		//验证必填项
		var flag = checkFormat();
		 
		if(flag){
			var hasSubStore=$('input[name="hasSubStore"]:checked').val();
			var checkedStoreId = $("#checkedStoreId").val();
			var subStoreData;
			
			if(hasSubStore==1){
				if(checkedStoreId==""){
					if($("#couponId").val()){
					}else{
						$.toast("请选择门店",1500);
						return false;
					}
				}else{
					subStoreData = checkedStoreId;
				}
			}
			 
			if($("#coupon-val").val().indexOf('.')>-1){
				$.toast("金额不能为小数",1500);
    			return false;
    		}
			var userCount=$("#customerCount").val();
			
			if($("#directGrant").prop("checked")){
				if(Number($("#quantity").val())<Number(userCount) || Number(userCount)>=100000){
					$.toast("发送总数不能少于会员总数",1500);
					return false;
				}
			}
		}
		
		if($('#synchWechat').prop('checked')){
			$('#num-modal').modal('show');
		}else{
			sendCoupons($("#btnType").val());
		}
	}
			
	function sendCoupons(status){
		
		//验证必填项
		var flag = checkFormat();
		 
		if(flag){
			var type=$('input[name="coupon-type"]:checked').val();
			var faceAmount;
			//是否自定义
			if($("#coupon-range").is(":checked")){
				faceAmount=$("#coupon-sval").val()+","+$("#coupon-eval").val();
			}else{
				if(type==1){
					faceAmount=$("#coupon-val").val();
    			}else if(type==2){
    				faceAmount=$("#zk-coupon-val").val();
    			}
			}
			
			var typeLimit=$('input[name="type-limit"]:checked').val();
			var getCount=1;
			if(typeLimit==0){
				getCount=0;
			}else{
				getCount=$("#limit_count").val();
			}
			var typeNoIntegeral=$('input[name="type-integral"]:checked').val();
			var integral=0;
			if(typeNoIntegeral==0){
				integral=0;
			}else{
				integral=$("#limit_integral").val();
			}
			var startTime=$("#start-time").val();
			var endTime=$("#end-time").val();
			
			var typePrice=$('input[name="type-price"]:checked').val();
			var fullCut=0;
			if(typePrice==0){
				fullCut=0;
			}else{
				fullCut=$("#limit_price").val();
			}
			
			var typeUse=$('input[name="type-useCount"]:checked').val();
			var use=0;
			if(typeUse==0){
				use=0;
			}else{
				use=$("#limit_useCount").val();
			}
			
			var useScene=$('input[name="useScene"]:checked').val();
			
			var hasSubStore=$('input[name="hasSubStore"]:checked').val();
			var checkedStoreId = $("#checkedStoreId").val();
			var subStoreData;
			
			if(hasSubStore==1){
				if(checkedStoreId==""){
					if($("#couponId").val()){
					}else{
						$.toast("请选择门店",1500);
						return false;
					}
				}else{
					subStoreData = checkedStoreId;
				}
			}
			 
			var userCount=$("#customerCount").val();
			
			var checkedVal = $("input[name='codeTypeRadio']:checked").val();
		 
			///////////////////////发放设置
			/////isSysn  1:同步会员  2：同步微信
			var directGrant=0;
			if($("#directGrant").prop("checked")){
				if(Number($("#quantity").val())<Number(userCount) || Number(userCount)>=100000){
					$.toast("发送总数不能少于会员总数",1500);
					return false;
				}else{
					directGrant=1;
				}
			}
			
			if($("#synchWechat").prop("checked")){
				directGrant=0;
			}
			
			//////////////////////
			/////isNavBrief  0 不限  1活动 2导航
			var isNavBrief=$('input[name="type-pro"]:checked').val();
			var proId=0;
			var proName="";
			if(isNavBrief==1){
				proId=$("#a_show_brief").attr("productId");
				proName=$("#a_show_brief").attr("productName");
			}else if(isNavBrief==2){
				proId=$("#choose_nav_id").attr("categoryId");
				proName=$("#choose_nav_id").attr("categoryName");
			}
			
			var categoryId = $("#choose_nav_id").attr("categoryId");
			var categoryData ;
			if($('#type-vType').prop('checked')){
				categoryData = JSON.stringify(couponCategoryData);
			}
			/*f(categoryId&&categoryId!=''){
				if(categoryId!='0'){
					
					categoryData ={
						'id': parseInt(categoryId),
						'name': $("#choose_nav_id").attr("categoryName")
					};
					
					categoryData =JSON.stringify(categoryData);
				}
			}*/
		 
			var productId = $("#a_show_brief").attr("productId");
			var productData ;
			
			if(productId&&productId!=''){
				if(categoryId!='0'){
					productData = {
							'id': parseInt(productId),
							'name':$("#a_show_brief").attr("productName")
					};
					productData = JSON.stringify(productData);
				}
			}
			 
			var couponId = $("#couponId").val();
			var url = ctx+"/back/coupon/"+(couponId?"update":"save");
		 
			var data={
					'couponId':couponId,
					'title':$("#coupon-name").val(),
					'type':type,
					'quantity':$("#quantity").val(),
					'faceAmount':faceAmount,
					'notice':$("#merchant_comment").val(),
					'getLimit':getCount,
					'integral':integral,
					'startTime1':startTime,
					'endTime1':endTime,
					'priceLimit':fullCut,
					'hasSubStore':hasSubStore,//是否需要选择子门店
					'subStoreData':subStoreData,
					'useScene':useScene,//使用场景
					'description':$("#description").val(),
					'directGrant':directGrant,
					'status':status,
					'position':isNavBrief,
					'color':$("#color").val(),
					'productData':productData,
					'categoryData':categoryData,
					'synchWechat':$('#synchWechat').is(':checked'),
					'customerCount':$("#customerCount").val(),
					'codeType':checkedVal
			};
			if(couponId){
			}else{
				$('#btn-submit').attr('disabled',"true");
				$('#btn-submit-send').attr('disabled',"true");
			}
			 
			// 保存数据到后台
			$.ajax({
				url:url,
				type:"POST",
				 async: true,
				 data:data,
				 dataType:"json",
				 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			     timeout: 10000,
			     error: function(){
			        $.toast("连接异常",1500);
			     },
			     success: function(data,textStatus){
			        	if(textStatus=="success"){
			        		if(data.data!="fail"){
			        			if(couponId){
			        				$.toast("修改成功",1500);
			        			}else{
			        				$.toast("添加成功",1000);
			        			}
			        			setTimeout(function(){window.location.href=ctx+"/back/coupon";},1500);
			        		}
			        	}
			     }
				});
			}
		}
	
	});
		
	function checkFormat(){
		var couponName = $.trim($("#coupon-name").val());
		if(couponName == ""){
			$.toast("请填写优惠券的名称", 1500);
			return false;
		}else{
			var reg = /^[\u4e00-\u9fa5a-z\d_]{2,}$/gi;
		    if (reg.test(couponName)){
		        var len = couponName.replace(/[^\x00-\xff]/g,"aa").length;
		    	 
		        if (len < 1 || len >18){
		        	var msg = "只能输入汉字、英文字母、数字 ，且中文限制1到9个，英文限制1到18个";
	                $.toast(msg, 1500);
		            return false;
		        }
		    }
		}
		var quantity = $.trim($("#quantity").val()); // 发放量
		if(quantity == ""){
			$.toast("请填写优惠券的发放量",1500);
			return false;
		}else if(parseInt(quantity) > 100000){
			$.toast("优惠券生产总量不能大于100000",1500);
			return false;
		}
		// 优惠券类型
		var couponType= $("input[name='coupon-type']:checked").val();
		$("#coupon-type").val(couponType);
		 
		var cVal = $.trim($("#coupon-val").val());
		var startCVal = $.trim($("#coupon-sval").val());
		var endCVal = $.trim($("#coupon-eval").val());
		var zkVal = $.trim($("#zk-coupon-val").val());
		var floatReg = new RegExp("^\\d+(\\.\\d{1,2})?$");
		var numReg = new RegExp("^\\-?\\d+(\\.\\d+)?$");
		if(couponType == "1"){
			// 面额是否随机
			if($("#coupon-range").is(":checked")){
				$("#isValRange").val("1");
				if(startCVal == ""){
					$.toast("请填写优惠券最低面额",1500);
					return false;
				} 
				if(endCVal == ""){
					$.toast("请填写优惠券最高面额",1500);
					return false;
				}
				
				if(startCVal > endCVal){
					$.toast("优惠券最低面额不能大于最高面额",1500);
					return false;
				}
			} else {
				$("#isValRange").val("0");
				$("#coupon-sval").val("");
				$("#coupon-eval").val("");
			}
			if(!$("#coupon-range").is(":checked")){
				if(cVal == ""){
					$.toast("请填写优惠券面额",1500);
					return false;
				} else{
					//优惠券面额校验
					if(!floatReg.test(cVal)&&!numReg.test(cVal)){
						$.toast("请填写正确的优惠券面额",1500);
						return false;
					}
				}
			}
			$("#zk-coupon-val").val("");
		} else if(couponType == "2"){
			if(zkVal == ""){
				$.toast("折扣券的面额不能为空",1500);
				return false;
			} else{
				if(!floatReg.test(zkVal)&&!numReg.test(zkVal)){
					$.toast("请填写正确的折扣券面额",1500);
					return false;
				} else{
					 ;
					$("#coupon-range").removeAttr("checked");
					$("#coupon-val").val("");
					$("#isValRange").val("0");
					$("#coupon-sval").val("");
					$("#coupon-eval").val("");
				}
			}
		}
		
		//满额限制校验
		var typePrice=$('input[name="type-price"]:checked').val();
		 
		if(typePrice==1){
			var fullCut=$("#limit_price").val();
		    if(!numReg.test(fullCut)||fullCut.indexOf('.')>-1){
				$.toast("请填写正确的满额限制",1500);
				return false;
		    }
    	}	 
		
		// 微信卡包
		 
		// 每人限领
		if($("#type-limit").is(":checked")){
			$("#countLimit").val("1");
			var limitCount = $.trim($("#limit_count").val());
			if(limitCount == ""){
				$.toast("优惠券每人限领张数不能为空",1500);
				return false;
			}
			//限领张数校验
			if(!numReg.test(limitCount)){
				$.toast("请填写正确的优惠券限领张数",1500);
				return false;
			}
			if(parseInt(limitCount) > 100000){
				$.toast("优惠券限领张数不能大于100000",1500);
				return false;
			}
		} else{
			$("#countLimit").val("0");
			$("#limit_count").val("");
		}
		// 积分兑换
		if($("#type-integral").is(":checked")){
			$("#isUseLitegral").val("1");
			var integralVal = $.trim($("#limit_integral").val());
			if(integralVal == ""){
				$.toast("优惠券使用积分数不能为空",1500);
				return false;
			}
			if(!numReg.test(integralVal)){
				$.toast("请填写正确的积分数",1500);
				return false;
			}
			if(parseInt(integralVal) > 100000000){
				$.toast("优惠券使用积分数不能大于100000000",1500);
				return false;
			}
		} else {
			$("#isUseLitegral").val("0");
			$("#limit_integral").val("");
		}
		
		// 有效时间
		var startTime = $("#start-time").val();
		var endTime = $("#end-time").val();
		if(startTime == "" || endTime == ""){
			$.toast("优惠券有效期不能为空",1500);
			return false;
		}
		if(new Date(startTime) > new Date(endTime)){
			$.toast("开始时间不能大于结束时间",1500);
			return false;
		}
		// 订单金额
		if($("#type-price").is(":checked")){
			$("#isFullPrice").val("1");
			var fullPrice = $.trim($("#limit_price").val());
			if(fullPrice == ""){
				$.toast("优惠券订单金额不能为空",1500);
				return false;
			}
			if(!floatReg.test(fullPrice)){
				$.toast("请填写正确的订单金额",1500);
				return false;
			}
			if(parseFloat(fullPrice) > 100000000){
				$.toast("订单金额不能大于100000000",1500);
				return false;
			}
		} else{
			$("#isFullPrice").val("0");
			$("#limit_price").val("");
		}
		// 使用数量
		if($("#type-useCount").is(":checked")){
			$("#isLimitCount").val("1");
			var limitCount = $.trim($("#limit_useCount").val());
			if(limitCount == ""){
				$.toast("优惠券可用数量不能为空",1500);
				return false;
			}
			if(!numReg.test(limitCount)){
				$.toast("请填写正确的优惠券可以数量",1500);
				return false;
			}
			if(parseInt(limitCount) > 100000000){
				$.toast("优惠券可用数量不能大于100000000",1500);
				return false;
			}
		} else{
			$("#isLimitCount").val("0");
		}
		// 使用场景
		var useScene = $("#type-scene:checked").val();
		$("#coupon-useScene").val(useScene);
		
		// 适用门店
		return true;
	}
		
	/****** 删除分类  ******/
	$("#del-nav").on("click",function(){
		$("#choose_nav_id").html("选择分类");
		$("#navId").val("");
		$(this).hide();
	});
	
	/****** 删除商品  ******/
	$("#del-brief").on("click",function(){
		$("#a_show_brief").html("选择商品");
		$("#storeBriefList tr .sel-good:checked").removeAttr("checked");
		$(this).hide();
	});
		
})(jQuery);

function checktime(){
	// 有效时间
	var startTime = $("#start-time").val();
	var endTime = $("#end-time").val();
	if(startTime == "" || endTime == ""){
		return false;
	}
	if(new Date(startTime) > new Date(endTime)){
		$.toast("开始时间不能大于结束时间",1500);
		return false;
	}
}

//用于捕获 zTree 上鼠标双击之后的事件回调函数	
function zTreeOnDblClick(event, treeId, treeNode) {
	window.couponCategoryData=[];
	couponCategoryData.push({
		'id':treeNode.id,
		'name':treeNode.name
	})
	if(treeNode.children&&treeNode.children.length>0){
		$.each(treeNode.children,function(index,obj){
			couponCategoryData.push({
				'id':obj.id,
				'name':obj.name
			})
		})	
	}
	$("#choose_nav_id").attr("categoryId",treeNode.id);
	$("#choose_nav_id").attr("categoryName",treeNode.name);
	$("#choose_nav_id").html("选择分类：" + treeNode.name);
	$(".good-type").removeAttr("checked");
	$(".good-type[value='2']").prop("checked", "true");
	//还原选择商品的内容
	$("#a_show_brief").html("选择商品");
	$("#a_show_brief").attr("productId","");
	$("#a_show_brief").attr("productName","");
	$("#del-brief").hide();
	$("#navId").val(treeNode.id);
	$("#storeBriefList tr .sel-good:checked").removeAttr("checked");
	
	$("#nav-modal").modal("hide");
	$("#navId").val(treeNode.id);
	$("#del-nav").show();
};
//展开节点
function expand(ids,treeObj){
	for(var i=0;i<ids.length;i++){
		var treeNode = treeObj.getNodeByParam("id", ids[i], null);
		if(treeNode==null)
			return false;
		 var pNode=treeNode.getParentNode();//获取父节点
		 while(true){
			 if(pNode==null)
				 break;
			 treeObj.expandNode(pNode,true);//展开节点
			 $("#"+pNode.tId+"_span").attr("style","color:blue");
			 pNode=pNode.getParentNode();
		 }
		$("#"+treeNode.tId+"_span").attr("style","color:red");
	}
}

