(function($){
	$(function(){
		require.config({
            paths: {
            	echarts : ctx+'/js/libs/echarts/dist'
            }
        });
       
        setTimeout(function(){require(
             [
                 'echarts',
                 'echarts/theme/default',
                 'echarts/chart/bar',// 使用柱状图就加载bar模块，按需加载
                 'echarts/chart/line',
                 'echarts/chart/pie'
             ],
             DrawEChart
        );
        },100);
        //新增会员数柱状图 options
         var barOptions = {
         			color:[ 
        		      '#77C2F7','#4CB5FF', '#4cb5ff'
        		   ],
        		   title : {
        		        text: ''
        		    },
            	    tooltip : {
            	        trigger: 'axis'
            	    },
            	    legend: {
            	    	show:false,
            	        data:[]
            	    },
            	    toolbox: {
            	        show : true,
            	        feature : {
            	            mark : {show: true},
            	            dataView : {show: false, readOnly: true},
            	            magicType : {show: true, type: ['line','bar']},
            	            restore : {show: true},
            	            saveAsImage : {show: true}
            	        }
            	    },
            	    calculable : true,
            	    xAxis : [
            	        {
            	            type : 'category',
            	            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            	            splitLine:{
            					show:false
            				}
            	        }
            	    ],
            	    yAxis : [
            	        {
            	            type : 'value'
            	        }
            	    ],
            	    series : [
            	        {
            	            name:'新增用户',
            	            type:'bar',
            	            data:[],
            	            markPoint : {
            	                data : [
            	                    {type : 'max', name: '最大值'},
            	                    {type : 'min', name: '最小值'}
            	                ]
            	            },
            	            markLine : {
            	                data : [
            	                    {type : 'average', name: '平均值'}
            	                ]
            	            }
            	        }
            	    ]
            	};
         
            //新增会员数饼状图 options
           var pieOptions = {
         			color:[ 
        		       '#FDB781', '#FF9293', '#6FCA84', '#77C2F7','#4CB5FF', '#4cb5ff'
        		   ],
        		   title : {
        		        text: '会员渠道汇总',
        		        x:'center'
        		    },
            	    tooltip : {
            	        trigger: 'item',
            	        formatter: "{a} <br/>{b} : {c} ({d}%)"
            	    },
            	    legend: {
            	    	show:true,
            	    	orient : 'vertical',
    					x : 'left',	
    					y:'50px',
            	        data:["创客源","微商城","店客源","数据中心","创客链接"]
            	    },
            	    toolbox: {
            	        show : false,
            	        feature : {
            	            mark : {show: true},
            	            dataView : {show: true, readOnly: true},
            	            magicType : {show: true, type: ['pie','funnel']},
            	            restore : {show: true},
            	            saveAsImage : {show: true},
            	             option: {
			                    funnel: {
			                        x: '25%',
			                        width: '50%',
			                        funnelAlign: 'left',
			                        max: 1548
			                    }
			                }
            	        }
            	    },
            	    calculable : true,
            	    series : [
            	        {
            	            name:'渠道',
            	            type:'pie',
            	            radius: '55%',
            	            center:['50%','50%'],
            	            data:[
        	           			{
						        	"name":"微商城",
									"value":"100"
								},
								{
						        	"name":"店客源",
									"value":"130"
								},
								{
						        	"name":"创客源",
									"value":"20"
								},
								{
						        	"name":"数据中心",
									"value":"20"
								},
								{
						        	"name":"创客链接",
									"value":"40"
								}
							]
            	        }
            	    ]
            	};
           
           
           
           function GetDateStr(AddDayCount) { 
        	   var dd = new Date(); 
        	   dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
        	   var y = dd.getFullYear(); 
        	   var m = dd.getMonth()+1;//获取当前月份的日期 
        	   if(m<10){
        		   m="0"+m;
        	   }
        	   var d = dd.getDate();
        	   if(d<10){
        		   d="0"+d;
        	   }
        	   return y+"-"+m+"-"+d; 
          } 
           
           function getList(date){
        	   //标题设置
        	   var title1;  
        	   //30天或7天时间计算
    		   var i,day;
        		if(date==null||date==30){
        			day=30;
        			i=-30;
        		}
        		if(date==7){
        			day=7;
        			i=-7;
        		}
        		
        		//30天、7天时间集合
        		var time1 = [];  
        		var j = 0;
        		for (i; i <=0; i++) {
        				var dd = new Date();
        				dd.setDate(dd.getDate() + i);// 获取AddDayCount天后的日期
        				var y = dd.getFullYear();
        				var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);// 获取当前月份的日期，不足10补0
        				var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); // 获取当前几号，不足10补0
        				time1[j] = +y + "-" + m + "-" + d;
        				j++;
        		}
        		
        	   var time;
        	   if(date==2){
        		   day=2;
  		        	title1="近48小时新增用户数";
  		         }else if(date==7){
  		        	title1="近7天新增用户数";
  		        	time=time1;
  		         }else if(date==30){
  		        	title1="近30天新增用户数";
  		        	time=time1;
  		         }
        	   
         	  $.ajax({
   		        type: "get",
   		        async: false, //同步执行
   		        url: ctx+"/back/report/customer-count-data",
   		        data:{date:date},
   		        dataType: "json", //返回数据形式为json
   		        success: function (data) {
	   		         var result1 = eval(data.result.result);
	   		         var series = new Array();
	   		         var category = new Array();
	   		         //没有查询结果
	   		         if(result1.length==0){
	   		        	$.toast("暂时没有新增会员数据", 1500);
	   		         }else{//有结果
	   		        	 //查询2天数据
	   		        	 if(day==2){
		   		        		 var year = data.result.year;
		   		        		 var month = data.result.month;
		   		        		 var currydate = data.result.date;
		   		        		 var hour = data.result.hour;
		   		        		 
		   		        		 var today = GetDateStr(0);
		   		        		 var yesterday =  GetDateStr(-1);
		   		        		 var beforeYesterday = GetDateStr(-2);
		   		        		 
		   		        		 for (var j=hour;j<=24;j++){ 
		   		        			 var notHasValue =true;
		   		        			 for(var i=0; i<result1.length; i++){  
		   		 	        			if(beforeYesterday==result1[i].createTime&&
		   		 	        					j==result1[i].hour){
		   		 	        				series.push(result1[i].count);
		   		 	        				notHasValue=false;
		   		 	        			}
		   		 	 	        	 } 
		   		        			 if(notHasValue){
		   		        				 series.push(0);
		   		        			 }
		   		        			 
		   		        			 category.push(beforeYesterday+" "+j+"点");
		   		        		 }
		   		        		  
		   		        		 for (var j=1;j<=24;j++){
		   		        			 var notHasValue =true;
		   		        			 
		   		        			 for(var i=0; i<result1.length; i++){  
		   		        				 
		   		 	        			if(yesterday==result1[i].createTime&&
		   		 	        					j==result1[i].hour){ 
		   		 	        				series.push(result1[i].count);
		   		 	        				notHasValue=false;
		   		 	        			}
		   		 	 	        	 } 
		   		        			 
		   		        			 if(notHasValue){
		   		        				 series.push(0);
		   		        			 }
		   		        			 
		   		        			 category.push(yesterday+" "+j+"点");//
		   		        		 } 
		   		        		 for (var j=1;j<=hour;j++){
	   		        				 category.push(today+" "+j+"点");//
		   		        			 var notHasValue =true; 
		   		        			 for(var i=0; i<result1.length; i++){  
		   		 	        			if(today==result1[i].createTime&&j==result1[i].hour){
		   		 	        				series.push(result1[i].count);
		   		 	        				notHasValue=false;
		   		 	        			}
		   		 	 	        	 } 
		   		        			 if(notHasValue){
		   		        				 series.push(0);
		   		        			 }
		   		        		 } 
		   		        	 
	   		        	 }else{  //查询30天或7天数据
	   		        		 var change=1;
		   		        	 for (var j = 0; j < time.length; j++) {
			        			 change=1;
			        			 for(var i=0; i<result1.length; i++){ 
			        				 if(result1[i].createTime==time[j]){
			        					 category.push(result1[i].createTime);
			 	 	 	        	  	 series.push(result1[i].count);
			 	 	 	        	  	 change=2;
			        				 }
			 	 	        	 }
			        			 if(change==1){
			        				 category.push(time[j]);
		 	 	 	        	  	 series.push(0);
			        			 }
			        		 } 
	   		        	 }
	   		        	
	   		         }
   		        
	   		         var result= {
	        				"ok":1,
	        				"title":title1,
				        	"category":category,
				      		"series":series
	        		 };
			        if (result) {                       
				        //将返回的category和series对象赋值给options对象内的category和series
				        //因为xAxis是一个数组 这里需要是xAxis[i]的形式
				        if(result.ok==1){
					    	barOptions.title.text= result.title;
					    	barOptions.xAxis[0].data = result.category;
					        barOptions.series[0].data = result.series;
					    	
					    	userBarChart.hideLoading();
					        userBarChart.clear();
					        userBarChart.setOption(barOptions);
					        userBarChart.refresh();
				        }else{
				        	jQuery('.right-side').hideLoading()
				        	$.toast("服务器内部错误",1500);
				        }
			        }
			        
			        var result2 = eval(data.result.result2);
			       
			        var registerChannelList = "[";
			        
			        if(result2){
			        	 if(day==2){ 
					        	for(var k=1;k<6;k++){
						        	var count=0;
						        	for(var i=0; i<result2.length; i++){ 
						        		if(result2[i].registerChannel==k){
						        			var createTime=result2[i].createTime;
						        			//判断是否过期
						        			if(beforeYesterday==result2[i].createTime&&
						        					hour>result2[i].hour){
						        			}else if(createTime==today||yesterday==createTime){
						        				count+=result2[i].count;
						        			}
						        		}
						        	}
						        	
						        	registerChannelList+="{\"name\":\"";
					        		if(k=='1'){
						        		registerChannelList+="创客源";
						        	}
						        	if(k=='2'){
						        		registerChannelList+="微商城";
						        	}
						        	if(k=='3'){
						        		registerChannelList+="店客源";
						        	}
						        	if(k=='4'){
						        		registerChannelList+="数据中心";
						        	}
						        	if(k=='5'){
						        		registerChannelList+="创客链接";
						        	}
						        	registerChannelList+= "\",\"value\":\""+count+"\"}";
						        	if(k<5){
						        		registerChannelList+=",";
						        	}
						        }
					        }else{
					        	for(var i=0; i<result2.length; i++){   
						        	registerChannelList+="{\"name\":\"";
						        	if(result2[i].registerChannel=='1'){
						        		registerChannelList+="创客源";
						        	}
						        	if(result2[i].registerChannel=='2'){
						        		registerChannelList+="微商城";
						        	}
						        	if(result2[i].registerChannel=='3'){
						        		registerChannelList+="店客源";
						        	}
						        	if(result2[i].registerChannel=='4'){
						        		registerChannelList+="数据中心";
						        	}
						        	if(result2[i].registerChannel=='5'){
						        		registerChannelList+="创客链接";
						        	}
						        	registerChannelList+= "\",\"value\":\""+result2[i].count+"\"}";
						        	if(i<result2.length-1){
						        		registerChannelList+=",";
						        	}
						        	
					        	  	/*if(result2[i].registerChannel=='1'){
					        	  		registerChannelList.push('店客源',result2[i].count);
					        	  	}else{
					        	  		registerChannelList.push(result2[i].registerChannel,result2[i].count);
					        	  	}*/
						        } 
					        }
			        }
			        
			        registerChannelList+="]";
			       
			        var result2= {
	        				"ok":1,
	        				"title":"会员渠道汇总",
				        	"list":[
		        		]};
			        if (result2) {                       
				        //将返回的category和series对象赋值给options对象内的category和series
				        //因为xAxis是一个数组 这里需要是xAxis[i]的形式
				        if(result2.ok==1){
				        	pieOptions.series[0].data.splice(0,pieOptions.series[0].data.length);
					        pieOptions.series[0].data = eval(registerChannelList);//result2.list;
					        pieOptions.title.text= result2.title;
					        
					        userPieChart.hideLoading();
					        userPieChart.clear();
					        userPieChart.setOption(pieOptions);
					        userPieChart.refresh();
				        }else{
				        	jQuery('.right-side').hideLoading()
				        	tishi(1500,"服务器内部错误");
				        }
			        }
   		       },
   		        error: function (errorMsg) {
   		        	tishi(1500,"连接异常");
   		        }
   	        });
         }
           
        var userBarChart;
    	var userPieChart;
        function DrawEChart(ec,theme){
        	userBarChart = ec.init(document.getElementById('barUserChart'),theme); 
            userBarChart.showLoading({
                text: '拼命加载中...',    //loading话术
            });
            userPieChart = ec.init(document.getElementById('barCousumeChart'),theme); 
            userPieChart.showLoading({
                text: '拼命加载中...',    //loading话术
            });
            // 为echarts对象加载数据 
            //myChart.setOption(options); 
            getList(30);
            window.onresize = function () {
		        userBarChart.resize();
		        userPieChart.resize();
		    }
        }
        
        //切换统计图
        $("body").on("click",".ch-chart",function(){
        	var type = $(this).attr("data-type");
        	var date = $(this).attr("data-value");
        	//动态添加class样式	
			 $(this).addClass("active").siblings().removeClass("active");
		      	//通过Ajax获取数据
		      	userBarChart.showLoading();
		      	 //近30天新增会员
		        // 各个渠道新增会员数饼状图
		        userPieChart.showLoading();
		        getList(date);
        });
	});
	 
})(jQuery);
