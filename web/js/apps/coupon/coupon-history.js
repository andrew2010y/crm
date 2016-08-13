(function($){
	  // 仪表盘图
	  var tfOption = {
			    tooltip : {
			        formatter: "{a} <br/>{b} : {c}%"
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    series : [
					{
					    name:'优惠券核销',
					    type:'gauge',
					    splitNumber: 10,       // 分割段数，默认为5
					    axisLine: {            // 坐标轴线
					        lineStyle: {       // 属性lineStyle控制线条样式
					            color: [[0.2, '#2ec7c9'],[0.8, '#5ab1ee'],[1, '#d87a80']], 
					            width: 8       //弧度的宽度
					        }
					    },
					    axisTick: {            // 坐标轴小标记
					        splitNumber: 10,   // 每份split细分多少段
					        length :12,        // 属性length控制线长
					        lineStyle: {       // 属性lineStyle控制线条样式
					            color: 'auto'
					        }
					    },
					    axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
					        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					            color: 'auto'
					        }
					    },
					    splitLine: {           // 分隔线
					        show: true,        // 默认显示，属性show控制显示与否
					        length :25,         // 属性length控制线长
					        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
					            color: 'auto'
					        }
					    },
					    pointer : {
					        width : 5
					    },
					    title : {
					        show : true,
					        offsetCenter: [0, '-30%'],       // x, y，单位px
					        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					            fontWeight: 'bolder'
					        }
					    },
					    detail : {
					        formatter:'{value}%',
					        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
					            color: 'auto',
					            fontWeight: 'bolder'
					        }
					    },
					    data:[{value: 50, name: '核销率'}]
					}
			    ]
			};
	  //漏斗图
	  var newOptions = {
			  color:['#5ab1ef','#4ed1c0','#ffc23d'],
			    title : {
			        text: '优惠券领取详图',
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c}"
			    },
			    toolbox: {
			        show : false,
			        feature : {
			            mark : {show: true},
			            dataView : {show: true, readOnly: false},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },
			    legend: {
			    	show:false,
			        data : ['核销','发放','领取']
			    },
			    calculable : true,
			    series : [
			              {
					    name:'优惠券数量',
					    type:'funnel',
					    x: 150,
					    y:100,
					    width: '50%',
					    height: '50%',
					    itemStyle: {
					        normal: {
					            label: {
					            	formatter:function(a){
					                	var realLabel = a.data.name + "："+a.data.value;
					                	return realLabel;
					                },
					                textStyle:{
					                	fontSize:12
					                }
					            },
					            labelLine: {
					                show : false
					            }
					        },
					        emphasis: {
					            label: {
					                position:'inside',
					                formatter: function(a){
					                	var realLabel = a.data.name + "："+a.data.value;
					                	return realLabel;
					                },
					                textStyle:{
					                	color:'#fff'
					                }
					            }
					        }
					    },
					    data:[
					    ]
					}
			    ]
			};
	  var curInfo = {};
	  var sortType=0;
	$(function(){
		var pageSize = 15;
		//优惠券列表跳转页面的函数
		function initLableListPage(pageNo){
			 
			//获取优惠券列表的ajax请求
			$.ajax({
				url:ctx+"/back/coupon-log/list",
				data:{pageNo:pageNo,pageSize:pageSize,sortType:sortType},
				dataType:"html",
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			    timeout: 30000,
			    error: function(){
			       $.toast("连接异常",1500);
			    },
				success:function(data){
					var labelPage = $("#labels-ul").next(".row");
					// 渲染新数据
	        		$("#labels-ul").html(data);
	        		var totalCount = $("#labels-ul li:first").attr("data-totalCount");
	        		 
	        		if(totalCount){
	        		}else{ 
	        			totalCount=0;
	        		}
	        		CreatePager(pageSize,pageNo,totalCount,1,"labels-ul","labels-row");
	        		// 为echarts对象加载数据 
	        		require(
	                        [
	                            'echarts',
	                            'echarts/theme/default',
	                            'echarts/chart/bar',// 使用柱状图就加载bar模块，按需加载
	                            'echarts/chart/line',//使用线形图就加载line模块，按需加载
	                            'echarts/chart/pie', //使用饼状图就加载pie模块，按需加载
	                            'echarts/chart/funnel',//使用漏斗图就加载funnel模块，按需加载
	                            'echarts/chart/gauge'//使用仪表盘图就加载gauge模块，按需加载
	                        ],
	                        DrawEChart
	                );
				}
			});
		}
		require.config({
			paths: {
				echarts: ctx+'/js/libs/echarts/dist'
			}
		});
		$("#changeSortType").click(function(){//点击有效转化
			if(sortType==0){ //修改顺序
				sortType=1;
			}else if(sortType==1){ 
				sortType=2;
			}else if(sortType==2){
				sortType=1;
			}
			
			initLableListPage(1);//回到第一页
		})
		//初始化优惠券列表的
		initLableListPage(1);
		 
        //优惠券领取漏斗图 options
        var couponChart;//优惠券 漏斗图
        var transfromChart; //领取转发仪表图
        function DrawEChart(ec,theme){
        	couponChart = ec.init(document.getElementById('couponChart'),theme); 
        	transfromChart = ec.init(document.getElementById("transformChart"),theme);
        	
            couponChart.showLoading({
                text: '拼命加载中...',    //loading话术
            });
            transfromChart.showLoading({
                text: '拼命加载中...',    //loading话术
            });
            var currentId = $("#currentId").val();
            if(currentId){
            	var curCouponLi = $(".labels_ul li[data-id='"+currentId+"']");
            	  if(curCouponLi.hasClass("active")){
      				return;
      			} else{
      				$(".labels_ul li.active").removeClass("active");
      				curCouponLi.addClass("active");
      	    		$.ajax({
      	    	        type: "get",
      	    	        async: false, //同步执行
      	    	        url: ctx+"/back/coupon-log/get/"+currentId,
      	    	        dataType: "json", //返回数据形式为json
      	    	        error: function(){
      	    	        },
      	    	        success: function (result) {
      	    		        if (result) {
      	    		        	var couponStatus="已发放";
      	    		        	if(result.status==1){
      	    		        		couponStatus="发放成功";
      	    		        	}else if(result.status==2){
      	    		        		couponStatus="发放失败";
      	    		        	}
      	    			        //将返回的category和series对象赋值给options对象内的category和series
      	    			        //因为xAxis是一个数组 这里需要是xAxis[i]的形式
      	    			      // if(result.ok==1){
      	    			       		// 初始化该优惠券的发放和状态信息
      	    			       		curInfo = {
      	    			       			curId:'1',
      	    			       			couponName:result.couponTitle,
      	    			       			memGoalCount: result.pushCount,
      	    			       			memVerifyCount: result.consumeCount,
      	    			       			verifyPrecent:  result.conversionRate,
      	    			       			couponStatus: couponStatus,
      	    			       			couponSendTime: result.createTimeStr,
      	    			       			memPercent:result.closeConversionRate+'%',
      	    			       			sendMsg:[
      	    			       				{
      	    			       					msgType:"wechat",
      	    			       					msgTitle:result.title,
      	    			       					msgContent:result.wxContent,
      	    			       					msgImg:result.logo
      	    			       				},
      	    			       				{
      	    			       					msgType:"phone",
      	    			       					msgContent:result.smsContent,
      	    			       					msgComm:result.remarks
      	    			       				},
      	    			       			]
      	    			       			
      	    			       		};
      				       		$(".transform-left .goal-count").html(curInfo.memGoalCount);
      				       		$(".transform-left .real-count").html(curInfo.memVerifyCount);
      				       		var temp = curInfo.memVerifyCount/curInfo.memGoalCount;
      				       		
      				       		tfOption.series[0].data[0].value = temp== 0 ? 0 :Math.round(temp*100);
      				       		//parseInt(curInfo.memVerifyCount)/parseInt(curInfo.memGoalCount) == 0 ? 0 : (parseInt(curInfo.memVerifyCount)/parseInt(curInfo.memGoalCount)).toFix(2);
      				       		transfromChart.clear();
      				       		transfromChart.setOption(tfOption);
      				       		transfromChart.hideLoading();
      				       		transfromChart.refresh();
      				       		
      	    			       	 // 优惠券发放
      				            $("#curLableName").html(curInfo.couponName);
      				       		$("#curCouponStatus").html(curInfo.couponStatus);
      				       		$(".cou_send_time").html(curInfo.couponSendTime);
      				       		
      				       		for(var i=0;i<curInfo.sendMsg.length;i++){
      				       			if(curInfo.sendMsg[i].msgType == "wechat"){
      				       				var curItem = $(".msg_item.wechat");
      				       				curItem.find(".msg_title").html(curInfo.sendMsg[i].msgTitle);
      				       				curItem.find(".msg_content").html(curInfo.sendMsg[i].msgContent);
      				       				curItem.find(".msg_img").attr("src",curInfo.sendMsg[i].msgImg);
      				       			}
      				       			if(curInfo.sendMsg[i].msgType == "phone"){
      				       				var curItem = $(".msg_item.phone");
      				       				curItem.find(".msg_comm_info").html(curInfo.sendMsg[i].msgComm);
      				       				curItem.find(".msg_content").html(curInfo.sendMsg[i].msgContent);
      				       			}
      				       			
      				       		}
      	    				    	
      	    			       	//初始化漏斗图
      				       		var couponCounts = [{value:result.pushCount, name:'发放数量'},
      								                {value:result.consumeCount, name:'核销数量'},
      								                {value:result.getCount, name:'领取数量'}];
      				       		newOptions.series[0].data = couponCounts;
      	    			       couponChart.clear();
      	    			       couponChart.setOption(newOptions);
      	    			       couponChart.hideLoading();
      	    			       couponChart.refresh();
      	    			       
      	    			       window.onresize = function () {
      	    				        couponChart.resize();
      	    				    }  
      	    			       
      	    		        } else{
      	    		        	jQuery('.right-side').hideLoading()
      	    		        	$.toast("服务器内部错误",1500);
      	    		        }
      	    		        
      	    		       
      	    	        },
      	    	        error: function (errorMsg) {
      	    	        	$.toast("连接异常",1500);
      	    	        }
      	            });
      			}
            }else{
			     couponChart.hideLoading();
			     transfromChart.hideLoading();
			     $.toast("暂时没有发送历史数据", 1500);
            	return false;
            }
           
        }
        //标签列表分页跳转
        $("body").on("click","#goPage",function(){
    		var goPageNum=parseInt($(this).prev().val());
    		if(!goPageNum)
    			return false;
    		var $_pageLi=$(this).parents(".paging_full_numbers").find(".pagination li");
    		var maxPage=$_pageLi.eq($_pageLi.length-3).find("a").attr("curpage");
    		if(goPageNum>maxPage||goPageNum<=0){
    			$.toast("没有找到数据");
    			return false;
    		}
    		initLableListPage(goPageNum);
    	});
		//优惠券列表  直接选择页数
		$("body").on("click","#page_div li a",function(){
			var pageNo = $(this).attr("curPage");
			initLableListPage(pageNo);
		});
		
        // 删除标签
		$(".lable_list").on("click",".del-icon",function(ev){
			ev.preventDefault();
			ev.stopPropagation();
			var curTr = $(this).closest("li");
			var currentId = $("#currentId").val();
			var totalCount=parseInt(curTr.attr("data-totalcount"))-1;
			var curPage=parseInt($("#page_div li.active a").attr("curpage"));//当前页码
			var afterPage=Math.floor(totalCount/pageSize)+1;//删除后的页数
			$.wxConfirm("是否删除优惠券发放记录？",function(){
				// 与后台交互，删除标签
				$.ajax({
					type:"get",
					url:ctx+"/back/coupon-log/delete/"+currentId,
					async:true,
					success:function(data){
						if(curPage>afterPage){//删除之后该页没有了数据，回到最后一页
							initLableListPage(afterPage);
						}else{
							initLableListPage(curPage);
						}
					}
				});
			});
		});
		
		// 点击左侧标签，右侧显示相应标签信息与会员
		$(".labels_ul").on("click","li", function(){
			var curLabelId = $(this).attr("data-id");
			$("#currentId").val(curLabelId);
			if($(this).hasClass("active")){
				return;
			} else {
				require([
				         'echarts',
				         'echarts/theme/default',
				         'echarts/chart/bar',// 使用柱状图就加载bar模块，按需加载
				         'echarts/chart/line',//使用线形图就加载line模块，按需加载
				         'echarts/chart/pie', //使用饼状图就加载pie模块，按需加载
				         'echarts/chart/funnel'//使用漏斗图就加载funnel模块，按需加载
				         ],
				         DrawEChart
				);
			}
		});
	});
	 
})(jQuery);
