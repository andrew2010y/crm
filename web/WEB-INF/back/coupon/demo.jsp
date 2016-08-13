<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
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
		<link rel="stylesheet" href="${ctx}/css/apps/coupon-style.css?v=${v}" />
		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		    <script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
		    <script src="http://apps.bdimg.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
		<title>舞象数据中心</title>
		
		<style>
body{TEXT-ALIGN: center;}
#center{ MARGIN-RIGHT: auto;
MARGIN-LEFT: auto;
background:#F00;
vertical-align:middle;
}
</style>
	</head>
	<body>
	<div >
		 优惠券ID：<input name="couponId" id="couponId">
	<br />
	<button style="height: 40px;" onclick="get();"  >
	 立即领取
	</button>
			   <br />
	<button style="height: 40px;" onclick="get2();">立即领取(静态)</button>
	</div>
	</body>
	<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript">
	    if (typeof jQuery == 'undefined') {
	    	document.write(unescape("%3Cscript src='${ctx}/js/libs/jquery-1.11.1.min.js' type='text/javascript'%3E%3C/script%3E"));
	    }
	    
	    var ctx = "${ctx}";
	    
	    function get(){
	    	var id= $("#couponId").val();
	    	if(id){
	    		
	    	}else{
	    		alert('请输入ID');
	    	}
	    	 $.ajax({
					url:ctx+"/back/coupon/getCouponAndSign",
					//type:"POST",
					 async: false,
					 data:{couponId:id},
					 dataType:"json",
					 contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				        timeout: 30000,
				        error: function(){
				        	$.toast("连接异常",1500);
				        },
				        success: function(data,textStatus){
				        	if(textStatus=="success"){
				        		var cardId = data.coupon.cardId;
				        		var cardExt = data.cardExt;
				        		
				        		if(cardExt){
				        			wx.addCard({
				        	    	    cardList: [{
				        	    	        cardId: cardId,
				        	    	        cardExt: {
				        	    	        	"code":cardExt.code,
				        	    	        	"openid":"",
				        	    	        	"timestamp":cardExt.timestamp,
				        	    	        	"nonce_str":cardExt.nonce_str,
				        	    	        	"signature":cardExt.signature
				        	    	        } 
				        	    	    }], // 需要添加的卡券列表
				        	    	    success: function (res) {
				        	    	        var cardList = res.cardList; // 添加的卡券列表信息
				        	    	        alert('领取成功' + JSON.stringify(cardList));
				        	    	    },
				        	            fail:function(res){
				        	                  alert('领取失败' + res);
				        	            }
				        	    	}); 
				        		}else{
				        			alert('获取签名失败');
				        		}
				        	}
				        }
				});
	    }
	    
	    function get2(){
	    	wx.addCard({
	    		cardList: [{
	    			cardId: 'pEIwnsymQbgrq5pPv_DuyV_bvRJs',
	    	         cardExt: {
	    	        	"code":"683930491677573120",
	    	        	"openid":"",
	    	        	"timestamp":"1451972992",
	    	        	"nonce_str":"307cce1d-7523-4dca-8180-d45e0c48e08d",
	    	        	"signature":"7420acf74be5f1af70d84a6c5c6e7d6fe12002c1"
	    	        	} 

		    	    }

	    	      ],
	    	      success: function (res) {
	    	        alert('领取成功' + JSON.stringify(res.cardList));
	    	      },
	              cancel: function (res) {
	            	  alert('cancel 22' + res);
	                  
	              },
	              fail:function(res){
	                  alert('领取失败' + res);
	              }
	    	    });
	    }
	    
	    function chooseCard(){
	    	 var ss ='{"code":"683880889444204544","openid":"","timestamp":"1451889850","nonce_str":"2010991e-0793-4bdd-9ac8-4e529345bc3b","signature":"12fa0e07136272f902f8bf237a15a8b3a4ba1ae1"}'
	    	 ;
	    		 
	    	 
		    	ss= JSON.parse(ss);
		    	alert(ss.signature);
		    	alert(ss.nonce_str);
	    	wx.chooseCard({
	    	    cardType: '', // 卡券类型
	    	    cardId: '${coupon.cardId}',
	    	    timestamp: ss.timestamp, // 卡券签名时间戳
	    	    nonceStr: ss.nonce_str, // 卡券签名随机串
	    	    signType: 'SHA1', // 签名方式，默认
	    	    cardSign: ss.signature, // 卡券签名
	    	    success: function (res) {
	    	        var cardList= res.cardList; // 用户选中的卡券列表信息
	    	        alert(11);
	    	    },
	              fail:function(res){
	                  alert('领取失败' + res.errMsg);
	              }
	    	});
	    }
	    
	    wx.error(function (res) {
	    	  alert(res.errMsg);
	    });
	</script>
	</html>