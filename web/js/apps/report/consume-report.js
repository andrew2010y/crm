(function($) {
	$(function() {
		require.config({
			paths : {
				echarts : ctx+'/js/libs/echarts/dist'
			}
		});

		setTimeout(function() {
			require([ 'echarts', 'echarts/theme/default', 'echarts/chart/bar',// 使用柱状图就加载bar模块，按需加载
			'echarts/chart/line' ], DrawEChart);
		}, 100);
		
		var cOptions = {
				color : [ '#FDB781', '#FF9293', '#6FCA84', '#77C2F7', '#4CB5FF',
						'#4cb5ff' ],
				title : {
					text : ''
				},
				tooltip : {
					trigger : 'axis'
				},
				legend : {
					show : true,

					data : []
				},
				toolbox : {
					show : false,
					feature : {
						mark : {
							show : true
						},
						dataView : {
							show : false,
							readOnly : true
						},
						magicType : {
							show : false,
							type : [ 'line', 'bar', 'stack', 'tiled' ]
						},
						restore : {
							show : true
						},
						saveAsImage : {
							show : true
						}
					}
				},
				calculable : true,
				xAxis : [ {
					type : 'category',
					data : [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月',
							'10月', '11月', '12月' ],
					splitLine:{
						show:false
					}
				} ],
				yAxis : [ {
					type : 'value'
				} ],
				series : [ {
					name : '微商城',
					type : 'line',
					legendHoverLink : true,
					data : [],
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					},
					markLine : {
						data : [ {
							type : 'average',
							name : '平均值'
						} ]
					},
					itemStyle : {
						normal : {
							areaStyle : {
								type : 'default',
								color : '#FDB781'
							}
						}
					}
				}, {
					name : '店客源',
					type : 'line',
					legendHoverLink : true,
					data : [],
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					},
					markLine : {
						data : [ {
							type : 'average',
							name : '平均值'
						} ]
					},
					itemStyle : {
						normal : {
							areaStyle : {
								type : 'default',
								color : '#FF9293'
							}
						}
					}
				}, {
					name : '创客源',
					type : 'line',
					legendHoverLink : true,
					data : [],
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					},
					markLine : {
						data : [ {
							type : 'average',
							name : '平均值'
						} ]
					},
					itemStyle : {
						normal : {
							areaStyle : {
								type : 'default',
								color : '#6FCA84'
							}
						}
					}
				}, {
					name : '创客链接',
					type : 'line',
					legendHoverLink : true,
					data : [],
					markPoint : {
						data : [ {
							type : 'max',
							name : '最大值'
						}, {
							type : 'min',
							name : '最小值'
						} ]
					},
					markLine : {
						data : [ {
							type : 'average',
							name : '平均值'
						} ]
					},
					itemStyle : {
						normal : {
							areaStyle : {
								type : 'default',
								color : '#4CB5FF'
							}
						}
					}
				} ]
			};
		
		var time2 = new Array();  //48小时时间
		var data=new Date();
		var year = data.getFullYear();
		var month = data.getMonth()+1;
		if(month <10){
			month ="0"+month;
		}
		
		
		var currydate = data.getDate();
		
		if(currydate <10){
			currydate ="0"+currydate;
		}
		var currydate1=currydate-1;
		if(currydate1 <10){
			currydate1 ="0"+currydate1;
		}
		var currydate2=currydate-2;
		if(currydate2 <10){
			currydate2 ="0"+currydate2;
		}
		
		var hour = data.getHours();
		var today =year+"-"+month+"-"+currydate;
		var yesterday = year+"-"+month+"-"+(currydate1);
		var beforeYesterday = year+"-"+month+"-"+(currydate2);
		
		 for (var j=hour;j<=24;j++){ 
			if(j<=9){
				 time2.push(beforeYesterday+" 0"+j+"点");//
		 	}else{
		 		time2.push(beforeYesterday+" "+j+"点");//
		 	}
			
		 }
		 
		
		 for (var j=1;j<=24;j++){
			
			 if(j<=9){
				 time2.push(yesterday+" 0"+j+"点");//
		 	}else{
		 		time2.push(yesterday+" "+j+"点");//
		 	}
		 } 
		
		 for (var j=1;j<hour;j++){
			 if(j<=9){
				 time2.push(today+" 0"+j+"点");//
		 	}else{
		 		time2.push(today+" "+j+"点");//
		 	}
		 } 
		
		
		
		
		 
		var wei = []; // 微商城数组对象
		var dian = []; // 店客源数组对象
		var chuang = []; // 创客源数组对象
		var lian = []; // 创客链接数组对象
		var res;
		

		var orderChart;
		var consumeChart;
		function DrawEChart(ec, theme) {
			orderChart = ec.init(document.getElementById('barOrderChart'),theme);
			orderChart.showLoading({
				text : '拼命加载中...', // loading话术
			});
			consumeChart = ec.init(document.getElementById('barCousumeChart'),theme);
			consumeChart.showLoading({
				text : '拼命加载中...', // loading话术
			});
			// 为echarts对象加载数据
			// myChart.setOption(options);
			
			// 订单量
			order();
			// 销售额
			spend();
			
			window.onresize = function() {
				orderChart.resize();
				consumeChart.resize();
			}
		}

		// 切换统计图
		$("body").on("click",".ch-chart",
						function() {
			
						//动态添加class样式	
						 $(this).addClass("active").siblings().removeClass("active");
							
							var type = $(this).attr("data-type");
							// 参数
							var day, i, title;
							if (type == 'month') {
								day = 30;
								i = -29;
								title = "近30天会员";
							}
							if (type == 'week') {
								day = 7;
								i = -6;
								title = "近7天会员";
							}
							if (type == 'hour') {
								day = 2;
								i = -1;
								title = "近48小时会员";
							}

							

							// 通过Ajax获取数据
							orderChart.showLoading();
							// 近30天会员订单量
							
							order(day,title);
							// 近30天的销售额
							consumeChart.showLoading();
							spend(day,title);
							
						});
		
		//订单主方法
		function order(day,title){
			var i;
			if(day==null||day==30){
				day=30;
				i=-29;
			}
			if(day==7){
				i=-6;
			}
			
			// 参数
			var time1 = [];  //30天、7天时间
			var j = 0;
			for (i; i < 1; i++) {
				var dd = new Date();
				dd.setDate(dd.getDate() + i);// 获取AddDayCount天后的日期
				var y = dd.getFullYear();
				var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);// 获取当前月份的日期，不足10补0
				var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
				time1[j] = +y + "-" + m + "-" + d;
				j++;
			}
			
			
			
			if(title==null){
				title="近30天会员"
			}
			
			$.ajax({
						type : "post",
						async : false, // 同步执行
						url : ctx + "/back/consume-log/order?time="+ day,
						dataType : "json", // 返回数据形式为json
						success : function(result1) {
							
							var time;
							if (day != 2) {
								time=time1;
								//获取30天或7天数据
								result1=result1.result2;
								
							}else{
								time=time2;
								//获取48小时数据
								result1=result1.result;
							}
							
							wei = [];
							dian = [];
							chuang = [];
							lian = [];
							
							
							
							if (result1!=""&&result1!=null&&result1.length>0) {
								
								
								for (var i = 0; i < result1.length; i++) {
									var times = result1[i]['createTime'] + "";
									
									if (day != 2) {
										res = times.substr(0, 4) + "-" + times.substr(4, 2) + "-"+ times.substr(6, 2);
									}else{
										res = times.substr(0, 4) + "-" + times.substr(4, 2) + "-"+ times.substr(6, 2)+" "+times.substr(8, 2)+"点";
									}
									
									
									for (var j = 0; j < time.length; j++) {
										if (res == time[j]) {
											
											if (result1[i]['consumeChannel'] == 1) {
												wei[j] = result1[i]['number'];

												if (dian[j] == null) {
													dian[j] = 0;
												}
												if (chuang[j] == null) {
													chuang[j] = 0;
												}
												if (lian[j] == null) {
													lian[j] = 0;
												}
											} else if (result1[i]['consumeChannel'] == 2) {
												dian[j] = result1[i]['number'];

												if (wei[j] == null) {
													wei[j] = 0;
												}
												if (chuang[j] == null) {
													chuang[j] = 0;
												}
												if (lian[j] == null) {
													lian[j] = 0;
												}
											} else if (result1[i]['consumeChannel'] == 3) {
												chuang[j] = result1[i]['number'];

												if (wei[j] == null) {
													wei[j] = 0;
												}
												if (dian[j] == null) {
													dian[j] = 0;
												}
												if (lian[j] == null) {
													lian[j] = 0;
												}
											} else if (result1[i]['consumeChannel'] == 4) {
												lian[j] = result1[i]['number'];

												if (wei[j] == null) {
													wei[j] = 0;
												}
												if (dian[j] == null) {
													dian[j] = 0;
												}
												if (chuang[j] == null) {
													chuang[j] = 0;
												}
											}
										} else {
											if (wei[j] == null) {
												wei[j] = 0;
											}
											if (dian[j] == null) {
												dian[j] = 0;
											}
											if (chuang[j] == null) {
												chuang[j] = 0;
											}
											if (lian[j] == null) {
												lian[j] = 0;
											}
										}
									}

								}
							} else {
								for (var j = 0; j < time.length; j++) {
									wei[j] = 0;
									dian[j] = 0;
									chuang[j] = 0;
									lian[j] = 0;
								}
								$.toast("没有订单和消费记录", 1500);
							}
						
							
								var result = {
									"ok" : 1,
									"title" : title + "订单量",
									"list" : [ {
										"name" : "微商城",
										"category" : time,
										"legend" : [ {
											"name" : "微商城",
											"textStyle" : {
												color : 'auto'
											}
										}

										],
										"series" : wei
									}, {
										"name" : "店客源",
										"category" : time,
										"legend" : [ {
											"name" : "店客源",
											"textStyle" : {
												color : 'auto'
											}
										} ],
										"series" : dian
									}, {
										"name" : "创客源",
										"category" : time,
										"legend" : [ {
											"name" : "创客源",
											"textStyle" : {
												color : 'auto'
											}
										} ],
										"series" : chuang
									}, {
										"name" : "创客链接",
										"category" : time,
										"legend" : [ {
											"name" : "创客链接",
											"textStyle" : {
												color : 'auto'
											}
										} ],
										"series" : lian
									} ]
								};

							
							
							if (result) {
								// 将返回的category和series对象赋值给options对象内的category和series
								// 因为xAxis是一个数组 这里需要是xAxis[i]的形式
								if (result.ok == 1) {
									
									
									
									cOptions.legend.data.splice(0,cOptions.legend.data.length);
									for (var i = 0; i < result.list.length; i++) {
										cOptions.legend.data.push(result.list[i].legend[0]);
										cOptions.series[i].data = result.list[i].series;
									}
									
									cOptions.xAxis[0].data = result.list[0].category;
									cOptions.title.text = result.title;
									orderChart.hideLoading();
									orderChart.clear();
									orderChart.setOption(cOptions);
									orderChart.refresh();
								} else {
									jQuery('.right-side').hideLoading()
									$.toast("服务器内部错误", 1500);
								}
							}
						},
						error : function(errorMsg) {
							$.toast("连接异常", 1500);
						}
					});
		}
		
		//消费主方法
		function spend(day,title){
			
			var i;
			if(day==null||day==30){
				day=30;
				i=-29;
			}
			if(day==7){
				i=-6;
			}
			
			if(title==null){
				title="近30天会员"
			}
			
			// 参数
			var time1 = [];  //30天、7天时间
			var j = 0;
			for (i; i < 1; i++) {
				var dd = new Date();
				dd.setDate(dd.getDate() + i);// 获取AddDayCount天后的日期
				var y = dd.getFullYear();
				var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);// 获取当前月份的日期，不足10补0
				var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
				time1[j] = +y + "-" + m + "-" + d;
				j++;
			}
			
			$.ajax({
				type : "post",
				async : false, // 同步执行
				url : ctx + "/back/consume-log//spend?time="+ day,
				dataType : "json", // 返回数据形式为json
				success : function(result) {
					var time;
					if (day != 2) {
						time=time1;
						//获取30天或7天数据
						result=result.result2;
					}else{
						time=time2;
						//获取48小时数据
						result=result.result;
					}
					
					wei = [];
					dian = [];
					chuang = [];
					lian = [];
					if (result!=""&&result!=null&&result.length>0) {
						
						for (var i = 0; i < result.length; i++) {
							var times = result[i]['createTime'] + "";
							if (day != 2) {
								res = times.substr(0, 4) + "-" + times.substr(4, 2) + "-"+ times.substr(6, 2);
							}else{
								res = times.substr(0, 4) + "-" + times.substr(4, 2) + "-"+ times.substr(6, 2)+" "+times.substr(8, 2)+"点";
							}
						
							for (var j = 0; j < time.length; j++) {
								
								if (res == time[j]) {
									
									if (result[i]['consumeChannel'] == 1) {
										wei[j] = result[i]['money'];

										if (dian[j] == null) {
											dian[j] = 0;
										}
										if (chuang[j] == null) {
											chuang[j] = 0;
										}
										if (lian[j] == null) {
											lian[j] = 0;
										}
									} else if (result[i]['consumeChannel'] == 2) {
										dian[j] = result[i]['money'];

										if (wei[j] == null) {
											wei[j] = 0;
										}
										if (chuang[j] == null) {
											chuang[j] = 0;
										}
										if (lian[j] == null) {
											lian[j] = 0;
										}
									} else if (result[i]['consumeChannel'] == 3) {
										chuang[j] = result[i]['money'];

										if (wei[j] == null) {
											wei[j] = 0;
										}
										if (dian[j] == null) {
											dian[j] = 0;
										}
										if (lian[j] == null) {
											lian[j] = 0;
										}
									} else if (result[i]['consumeChannel'] == 4) {
										lian[j] = result[i]['money'];

										if (wei[j] == null) {
											wei[j] = 0;
										}
										if (dian[j] == null) {
											dian[j] = 0;
										}
										if (chuang[j] == null) {
											chuang[j] = 0;
										}
									}
								} else {
									if (wei[j] == null) {
										wei[j] = 0;
									}
									if (dian[j] == null) {
										dian[j] = 0;
									}
									if (chuang[j] == null) {
										chuang[j] = 0;
									}
									if (lian[j] == null) {
										lian[j] = 0;
									}
								}
							}

						}
					}else{
						for (var j = 0; j < time.length; j++) {
							wei[j] = 0;
							dian[j] = 0;
							chuang[j] = 0;
							lian[j] = 0;
						}
					}

				

					var result2 = {
						"ok" : 1,
						"title" : title + "消费金额",
						"list" : [ {
							"name" : "微商城",
							"category" : time,
							"legend" : [ {
								"name" : "微商城",
								"textStyle" : {
									color : 'auto'
								}
							}

							],
							"series" : wei
						}, {
							"name" : "店客源",
							"category" : time,
							"legend" : [ {
								"name" : "店客源",
								"textStyle" : {
									color : 'auto'
								}
							} ],
							"series" : dian
						}, {
							"name" : "创客源",
							"category" : time,
							"legend" : [ {
								"name" : "创客源",
								"textStyle" : {
									color : 'auto'
								}
							} ],
							"series" : chuang
						}, {
							"name" : "创客链接",
							"category" : time,
							"legend" : [ {
								"name" : "创客链接",
								"textStyle" : {
									color : 'auto'
								}
							} ],
							"series" : lian
						} ]
					};

					// 将返回的category和series对象赋值给options对象内的category和series
					// 因为xAxis是一个数组 这里需要是xAxis[i]的形式
					if (result2.ok == 1) {
						cOptions.legend.data.splice(0,cOptions.legend.data.length);
						for (var i = 0; i < result2.list.length; i++) {
							cOptions.legend.data.push(result2.list[i].legend[0]);
							cOptions.series[i].data = result2.list[i].series;
						}
						cOptions.xAxis[0].data = result2.list[0].category;
						cOptions.title.text = result2.title;
						consumeChart.hideLoading();
						consumeChart.clear();
						consumeChart.setOption(cOptions);
						consumeChart.refresh();
					} else {
						jQuery('.right-side').hideLoading()
						tishi(1500, "服务器内部错误");
					}

				},
				error : function(errorMsg) {
					tishi(1500, "连接异常");
				}
			});
		}
	
	});

})(jQuery);
