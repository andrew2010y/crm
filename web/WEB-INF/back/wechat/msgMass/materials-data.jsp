<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/include/taglib.jsp"%>
	 <c:if test="${empty page.result || fn:length(page.result) == 0}">
         <p class="center">暂无数据</p>
    </c:if>
	<c:forEach items="${page.result}" var="data">
	<c:if test="${fn:length(data.content.news_item)==1}" >
		<!-- 单图文 -->
		<c:forEach items="${data.content.news_item}" var="news_item" varStatus="status">
			<div class="sign-templet-content list-box">
				<input type="hidden" class="media-id" value="${data.media_id}"/>
				<div class="sign-first-part">
					<h4 class="sign-first-part-title">${news_item.title}</h4>
					<img class="sign-first-part-img" src="${news_item.thumb_url}"/>
					<%-- <img class="sign-first-part-img" src="${ctx}/img/wx-news-add.png"/> --%>
				</div>
				<div class="sign-templet-text">${news_item.digest}</div>
				<div class="sign-templet-tips" style="height:22px;">查看全文</div>
				<div class="box-mask"><span>选择素材</span></div> 
			</div> 
		</c:forEach>
	</c:if>	
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="${data.media_id}" />
		<c:forEach items="${data.content.news_item}" var="news_item" varStatus="status">
			<c:if test="${status.index==0}" >
			<div class="more-first-part">
				<img src="${news_item.thumb_url}" class="more-first-part-img"/>
				<%-- <img src="${ctx}/img/wx-news-add.png" class="more-first-part-img"/> --%>
				<h4 class="first-part-title">${news_item.title}</h4>
			</div>
				</c:if>
				<c:if test="${status.index >0}" >
					<div class="next-part">
						<h4 class="next-part-title">${news_item.title}</h4>
						<img class="next-part-img" src="${news_item.thumb_url}"/>
						<%-- <img class="next-part-img" src="${ctx}/img/wx-news-add.png"/> --%>
					</div>
				</c:if>
		</c:forEach>
		<div class="box-mask"><span>选择素材</span></div> 
	</div>
	</c:forEach> 

	<%-- <div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="2RBDkqynyF6l7FGanHb8cTffG2_u8kuLQxCSUm5DNok">
		<div class="more-first-part">
				<img src="${ctx}/img/wx-news-add.png" class="more-first-part-img">
				<h4 class="first-part-title">2015春夏最浪漫婚纱 怎么美都不过分</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">搞笑动态图：妹子的太空步不错哦~</h4>
						<img class="next-part-img" src="${ctx}/img/wx-news-add.png">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">1分钟瘦小腹,让平坦的肚子重见天日!</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oau3AWFCyibUwPlUibWxvhB30xyhkcCO3CJsiaBObCiaRbq6T0XY3zNsftZZloMJN0kM3XjtrGezuEPhQ/0?wx_fmt=jpeg">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">关于书，我们离开了多久？</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oau3AWFCyibUwPlUibWxvhB306wpZgTshAn7ricu5nGt8aAjRkicBiaf08Umm2H3Aickib59lGl9vbWefmhg/0?wx_fmt=jpeg">
					</div>
				<div class="box-mask" style="display: none;"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="aR6pTuUdzbMxqhTfM2Je-CeJzpTOdIahh6eJWtLusnw">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYVIibf0vibnEwcyMN9icsl2t9OgBT62was1xn9qyuIJGAicbglGzCibTpRC9A5ghf1BX0ebicODMM37rcw/0" class="more-first-part-img">
				<h4 class="first-part-title">每个女人都应该拥有的7双美鞋</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">婚纱｜別再只知道Vera Wang了，这些都是今年最美的婚纱！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYVIibf0vibnEwcyMN9icsl2t9AjwoKsfZIMJt0KR9JoeIKZGJrpkkJ7vG2pzUlsbppANa2KEp2yOScw/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">4种简单方法，分分钟让毛孔缩小~</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYVIibf0vibnEwcyMN9icsl2t9IyoW0RCMpXlZH3fWE8oKTV5ziaBbZ9g0zPvBytYEL9NDwc3LGTkp0Fg/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">你不知道的14个苏州私密小园林</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYVIibf0vibnEwcyMN9icsl2t9OqohybhVZz0OX4359HShl76LK6zFh9WwqVQDGziadnoKo2ShfxFwibVg/0">
					</div>
				<div class="box-mask" style="display: none;"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="iwbbeZZiaePnohWf0ilgrAC4_J4akHyDtQqDj5Fy9uk">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obiaIPibzSgrKSpuicHdxgKgbknib5bn7U0RKOChXwWO57MByPXHEb4neicW5KTDkdnUAAs1JxMM2RLWrQ/0" class="more-first-part-img">
				<h4 class="first-part-title">生个女儿 穿遍世间最美的母女装</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">像Colin Firth一样喝酒 史上最全《王牌特工》饮酒指南</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obiaIPibzSgrKSpuicHdxgKgbkjV036mrahMDAlZlq3icQfbsHB2TYgOv2f6nMuvibFPdZ7sKg8XVl0saw/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">知道：米面防虫6法，谁用谁知道啊</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obiaIPibzSgrKSpuicHdxgKgbkCT0IvIKmkarKFmvrKDDMYhb63mhutPpBA3kDr15BXSElibNefXyS1ZQ/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">值得早起的苏州早餐店，肯定有你没吃过的！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obiaIPibzSgrKSpuicHdxgKgbk4uol7wrDevticl9MM9ELU3jxBy3iaXIic30JhtPXnWCHahyhBDV3nOWRg/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="onsDNMJ8HElVfvrG3didjX-X6vl_l3K1XaRexxOwudY">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obLrf3NCwichofKWc9tt6jNwGOz4JhDd1h4GvhpJ4cZ8vKacI7Lwoics2QnDRLfWS6vsLGia0Fm1ibmTg/0" class="more-first-part-img">
				<h4 class="first-part-title">会穿衣这件事儿，可能真的和脸没有关系！ 小长假出街指南</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">太牛了，这才叫创意，每一个都让你尖叫！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obLrf3NCwichofKWc9tt6jNwRibLQqzlU7h9WQgCYia0icGwdRmndNsciaU2cewpZEVgWgpb9KUNVuJtDA/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">衣服上的毛球太烦人？教你一招轻松解决</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obLrf3NCwichofKWc9tt6jNwfbeEsynZCrhPn7KqYjv1vic24sDFIVYNADpBRmHVKxwLLaSVVC0pSwg/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">周杰伦陈奕迅两大男神深情演绎《淘汰》</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obLrf3NCwichofKWc9tt6jNwhJZhCEQseAgBXic1rJSczkdl1HWB5Kzo2RAG2tdBfMS1s7QbRG1H0qA/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="Xg0Bk5ezYs7ZP2S_bx7KRClsDl7TgYG38-FbtI1nlHA">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obfVC9OzkKuVpdPKIg0QpFpg0LMZ4ya0vnFHlFiaT7YKZknnDibUIF7P8ZfOxw4aEgwJ1nFr7mfW8vg/0" class="more-first-part-img">
				<h4 class="first-part-title">那些年 我们穿过的宽腿喇叭裤回来了！</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">愚人节整人大全，丧心病狂没朋友！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obfVC9OzkKuVpdPKIg0QpFpKt6libbibJp4cqgJU2l6mU0fejY31prRoyDHOdFwZEYDwvFhnibx9vE2w/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">怎样在朋友圈假装有女朋友？</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obfVC9OzkKuVpdPKIg0QpFpsYGibZwPUFSPfKOK6o1Gba6lA1me2jvkM0hALicnxTlgecKAWiafrBIsQ/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">苏州春季旅游攻略</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obfVC9OzkKuVpdPKIg0QpFpfu0NLfLHbnxASV1TtPOjRibLehlBbpN2QnvzCO6lXbGekroHEs9R0wQ/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="ePUeklIEuxxJ-2uJr_sgB-7vdfh03AEkrK3i1xcQLJU">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obWfjQWXe27me10CQuZSEQT7USALXK2LZGo6ibfXw2omENVWyurTxrIfWFW47p0EmYZ3aoojqcMYicQ/0" class="more-first-part-img">
				<h4 class="first-part-title">格兰诺华&lt;最贴心的礼物&gt;</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">酒后对联，太经典了</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obWfjQWXe27me10CQuZSEQTo1BJ8ESVo8e5xrxHU8lsZPNKrnXy9DZicppgVnYbXQJAj4pY4Rp7l7g/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">妻子的100种叫法，各种精彩，你最喜欢哪一种！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obWfjQWXe27me10CQuZSEQTDlxia3navsELVnCLMAgr78BuI9XeUwY4lHMjia9gGTHrV1ia87KezdxUw/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">你在等全世界的樱花，而我在樱花树下等你</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obWfjQWXe27me10CQuZSEQTTialPI7CydXLO2x16Rcz8oQrhzXqMTwNQArflyiarsy7OZqEDd9sIBhA/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">做个有胸、有腰、有臀的姑娘，然后咱一起祸害四方！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obWfjQWXe27me10CQuZSEQTbUzWtleyQibodIRJXYuAu9yKh5IThGTpLw2EMMxZGDXqfibEG8DGwUew/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="-6K8q-tKjx5F21TBy9Rj2M7hecUqRjeQkX0drJjs5Hw">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaP4kTzKfvfYNEnqovTSZYl5em5Pj9pOH6kXXKlOSuNcdyKUo6671k6oww4yAyb5gOs0doqaQxolQ/0" class="more-first-part-img">
				<h4 class="first-part-title">时尚很骨感，胖妞怎么办？</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">叫你走路玩手机，看你以后还敢不敢了？</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaP4kTzKfvfYNEnqovTSZYlv4tTLtsdWXH3IHGXGObl0qZq2ibjgF7S2nhT2Y0biahlPa4fl3hB6Yicg/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">3月竟然有32个节日，不信你看！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaP4kTzKfvfYNEnqovTSZYlZyojzcA50JUz3a4lTdS3jKZ4noD0TPam9n2lhXdIh0icbatj8Y9Neibw/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">无论你在哪里上班，都要记住—— 共勉！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaP4kTzKfvfYNEnqovTSZYlmNqGnU5kqFU0Vl1Wk3P09oiaKIItzvmlKZ79nNu3Z2XraVLfX7kGDuw/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="96_nGILRWqGOTPPTJtnaf-rN0XYFRyjVNh8Gupf_GRY">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaicu2A51ZWibHc6ZyEVCGVTtUbUMa2uiatUkgoyzSvIsnSJ0JTO2nI2XvwTpT9ia6jcbbw7fjfabmkGw/0" class="more-first-part-img">
				<h4 class="first-part-title">这是我见过最闷骚的衬衫</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">手相看你的爱情结局，准死了！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaicu2A51ZWibHc6ZyEVCGVTtoPWyrdZBCqE2rhtMrLsKHmY8KNOgPJoUbBJIDlTmO5icoibwdQXNJoQw/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">妞，让我摸一下</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaicu2A51ZWibHc6ZyEVCGVTtfrnSsajdG2Z2BhS0QeZppdS3icJicje5icPia5kB9E4Upj3D8uwbia9ic72A/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">日本海滨公园迷人的“蓝色海洋”</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaicu2A51ZWibHc6ZyEVCGVTtzzZH6C24gVOSGZpnbcYiatibBTVj67oVkshCl2kBiaPMwE8XuTbHiaxKKQ/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="ZlIDTWCliwr5ZiXKV30Q15syzKsqrADKTQ0Ibvjh7CQ">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oZZtScRQ4KXO7gGJbQMd9kpjOtlzHccB6UbCqcRRanGpYF0icicJz58Vxj0To1MH3dJMFm2A9yCUbfw/0" class="more-first-part-img">
				<h4 class="first-part-title">新年新气象！50个走向成功的好习惯</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">看了这个小品以后，才知道春晚小品有多无趣</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oZZtScRQ4KXO7gGJbQMd9kpOx0mR1viccjdcmy4XzgESoNY206BHtX4yS1dic98tiaN1aejg1djPJgicQ/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">8大表现 说明你已"精神出轨"</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oZZtScRQ4KXO7gGJbQMd9kpRDoqbDx7PK1f8DvQOETPtYak5Q6txRFiapeKeRSicG5X57GXWuZl0RCQ/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">丹麦嫩模沙滩写真上演性感服装秀</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oZZtScRQ4KXO7gGJbQMd9kpCAysr34sniacrQydU7fLvBzCVomeF2aVDicbCWGAU8X3dZQa5hH58cxQ/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="rZ4RnIn3DxKf1kibHxJrbCqaq7iberCf3xyyB6M7Wf0">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oZAhKO7vYv5k5BS8kqbNLqyYvPZZXPicndI0bibKeDbibt8kHBx9m4y9kpBl3j5arHuAT0Uhms6h7Qyw/0" class="more-first-part-img">
				<h4 class="first-part-title">谢谢你，我身边所有的温暖与美好</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">12星座男爱上你的表现</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oZAhKO7vYv5k5BS8kqbNLqym7TZPf7rnC2Job3Nnr77z7VG6fALcYww5ibHum1yrfjYZMcAZMU6DFQ/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">春节吃什么零食 12种零食最健康</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oZAhKO7vYv5k5BS8kqbNLqy2Aibl15icI9fyXzNFowFJz1jVygHxX8Owxg7sD7rccoPYBouI5hQCkzg/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">红色冬装时尚搭配 2015新年开运装</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oZAhKO7vYv5k5BS8kqbNLqyKQjW4CxUgKJ3AKUQXLbyJTZgbQQMpGAhE8XpxYCDOYjZc83JrcNYmw/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="iikxwwf-PQk63DngWlHI2hxRfvlgD5rFSf-fniTbN5E">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYNibMO5Y4KKJ9r7OicHImxg2fUxc7VOea1DhVRKp8n7P4EziblRgia65lRZ7MMhkX4vUevFyEYchF9Ww/0" class="more-first-part-img">
				<h4 class="first-part-title">公司年会选择服装这么讲究？</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">12道你答不出来的小学试题，不服来战！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYNibMO5Y4KKJ9r7OicHImxg2UibFruvAHaCd9ZjmicuUJRnhLYcicQFAspHZBYE0UmjITI7yLnw65ypvw/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">初吻不给亲该如何机智应对</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYNibMO5Y4KKJ9r7OicHImxg2KFjxO57Le52icia7nXLjrYXmpewiaxXXn942GmavadkFss8kGXN43wdcA/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">闹钟——文章很短却感人</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYNibMO5Y4KKJ9r7OicHImxg2l6LTeibibibfpGHUP0dRjfswRtPpEKKHDP6qkS7wVRERfMAJOiaPvM6AEw/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="EHJw4h5WR92vSC-NloDRbxn7mvfhaAWu3oxDKT-_HEk">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oa3MTib4ejHaoc0cbay1fZzf5sMxUz1IbEF12iaVcwUuD6usJqKRUwv2uicYtLa6gKnvmSZJSCPrsPGg/0" class="more-first-part-img">
				<h4 class="first-part-title">毛衣只有基本款？3招轻松搭出时髦感</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">99%聪明人都答错，你会几题？</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oa3MTib4ejHaoc0cbay1fZzfYexMkBN7Qz76TiahgJ8nyaH65tsqPhf0iafvNX0mFRctfw2SJYsSg0Og/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">12星座制服法，简单粗暴，天蝎已哭晕在厕所！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oa3MTib4ejHaoc0cbay1fZzfWT3dA3BrzxOoy2uuK4jr3dqibmY3vVicIRdVuTjsr171p47TgaPlXHbQ/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">37条社交潜规则，终身受用</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oa3MTib4ejHaoc0cbay1fZzfjtgy1LmEPQ757ZrW6hiceMTmdic4w3bs63icjaqGzZicG1P84WlibKUBcFw/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="QdJC9HpdBF7s2n6UWaNgyQe_02edEVFMe0_gtQ3YqnM">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4ob4kPqgHjdzlCKc6aXF942cb2cy90YXiagBMoD7NQKvc5jI8sJUcSc0yWic7OzDvy4EZ4YZ0adibqHXg/0" class="more-first-part-img">
				<h4 class="first-part-title">格兰诺华交行团购会，马云款卖爆了，还在等什么，赶快入手！！</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">超模Eva Herzigova 登封面上演复古诱惑</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4ob4kPqgHjdzlCKc6aXF942cBxEyhibIkVA6BPfM5o9gGR7Zx4Y2icYKWf71UDjuAwtpAhMAzYGPqZAQ/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">心累了就歇一歇，心烦了就放一放</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4ob4kPqgHjdzlCKc6aXF942cRKkglqGHMlY9muTUngOHHWLfWu7JHucUuHn03NbseUWHvZYHCm1qeg/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">女孩子如何在一段亲密关系中保持独立</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4ob4kPqgHjdzlCKc6aXF942cdxfBKsEEFzS8EPW9XBwzBH9AbRENQBADvia9rfN6kYBy2U7Jvn1q53g/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="raGHlvHmqBme_y3x93GBMDgZ2JN89x8Iykq_PHI0BdE">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oZsQZqDrrh9RJ3jb7f4tm28BKotBEIgJic2zBRFkwzXMh4R729sAF6Yyy3aSdeMF6vq0yrb57R9qeA/0" class="more-first-part-img">
				<h4 class="first-part-title">传奇超模Kate Moss素颜出镜意大利Vogue黑白大片</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">千万不要在一起的两个星座！！！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oZsQZqDrrh9RJ3jb7f4tm28C0adthhr0ib2EbTu8vbRY9Jicu8MJibckeB3Tr5QrdmiaLibmWOm3ZW3eeg/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">11个让你新的一年拥有更快 WIFI 的办法</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oZsQZqDrrh9RJ3jb7f4tm28WxoiaAYSBSVl9ZvmjaPicKVC461H1JMN6tzIFrbs8gRV87HS51Q84dibw/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">2015年即将失业的那群人，你身在其中吗？</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oZsQZqDrrh9RJ3jb7f4tm28p4vwgbnNs7FEK2hmtXFD2IibWUXAicrhia5mJn3ricUFjwdloJpTeLJUMw/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="lwV5XvBt0PRXXIh-M6fNBgu9fLymwGxEWj5IqhO2MNo">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obhpXiav5iblFZJOBoSzbCsvoAmdmJhmb2icGNibLViaI6EpsOUWNTIiadjYxj9TBppJOGUXmFXuS7Ef2Bw/0" class="more-first-part-img">
				<h4 class="first-part-title">Grannova教你风度和温度怎样并存</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">围观思密达国型男美女们的冬日穿搭术</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obhpXiav5iblFZJOBoSzbCsvoibHKZkK7kcDxMF3jKoODlmZ6ekuw20mcO3vhicuHrg8LQaUmtR5VpQTA/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">秒杀思聪女友！Baby一款珍珠表占尽先机</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obhpXiav5iblFZJOBoSzbCsvoPdoY3Wjrw6PqNL9iaJKIXdZlBKJYRf1wqKuiaZ2kx6Hc8AiboKdyEX3RQ/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">10种围巾非常规系法教你马上变潮人</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obhpXiav5iblFZJOBoSzbCsvocgUnM2qicRPXhFl1nmhiaeJPGln2wIaU2kGUCI9nyyAkp980ibibqiaLcRg/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="8NDIhyRyPXf3VPuK2zISpJ-_K9Gdz9XwIrQCwfNS_-0">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaPBtrMsrB3OgVxCrdYiatzIqXrcLWMZdWZr0ZuJWE1dnibS4sryJia93rqIaia87FyAYCkzYOqfSwiagA/0" class="more-first-part-img">
				<h4 class="first-part-title">Grannova潮绒新年狂欢趴——年终壕礼大放送</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">格兰诺华优惠码使用指南</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaPBtrMsrB3OgVxCrdYiatzI5kw7GGCaJN6Nv4V73Rw4niaxY52NdQYFk9HcNkFCwOcOmWP6VSWxt1w/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">穿衣也要智商，你的衣商是多少？</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaPBtrMsrB3OgVxCrdYiatzI8940VDfE5u0YqYVGAVHeBvBQPwVuoWt0ekbfxpxsAnicia1ibmmAb3mTA/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">看肤色选围巾，你选对了吗？</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaPBtrMsrB3OgVxCrdYiatzIm4DsibbWOhhAcHkJ424DibaYqzTZONoPvMH9FN0SlWYpJfLqaWqlib9Lg/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 单图文 -->
		<div class="sign-templet-content list-box">
				<input type="hidden" class="media-id" value="8NDIhyRyPXf3VPuK2zISpMqodmLlRT-GH0vK7r0Urxk">
				<div class="more-first-part">
					<h4 class="sign-first-part-title">格兰诺华优惠码使用指南</h4>
					<img class="sign-first-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaPBtrMsrB3OgVxCrdYiatzI5kw7GGCaJN6Nv4V73Rw4niaxY52NdQYFk9HcNkFCwOcOmWP6VSWxt1w/0">
				</div>
				<div class="">优惠码使用指南</div>
				<div class="">查看全文</div>
				<div class="box-mask"><span>选择素材</span></div> 
			</div> 
		<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="8NDIhyRyPXf3VPuK2zISpMqodmLlRT-GH0vK7r0Urxk">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaPBtrMsrB3OgVxCrdYiatzI5kw7GGCaJN6Nv4V73Rw4niaxY52NdQYFk9HcNkFCwOcOmWP6VSWxt1w/0" class="more-first-part-img">
				<h4 class="first-part-title">格兰诺华优惠码使用指南</h4>
			</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="1QGcD12z7YuL4az50DxD3bHUYzgSfmOfFbEvEi_EZLI">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obbLcdoLsFrAB8Szu3LkbKNmOuCuUl55beomibZoMWbAVFdWQ70kQCPXgk56WuvfB8YRNicQobQbUyg/0" class="more-first-part-img">
				<h4 class="first-part-title">蛋蛋节买羊绒就是这么任性！</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">羊毛衫成衣查衫“十七步”</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obbLcdoLsFrAB8Szu3LkbKNsHLIttiblHvMYWxogOjqhJuYOWtAzV3ic1pajeCz89xfuDibSb2hXAY1w/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">流行元素+完美配色</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obbLcdoLsFrAB8Szu3LkbKNnqpqsQEGcuKLDHP4cYwZhvoO6ibx0aYvwH3BzmCa5XEz7WQX33D0LNA/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">羊绒与羊毛的那些事儿</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obbLcdoLsFrAB8Szu3LkbKNPwgRAn5mUxnSEHnuuZBrUwTJu6rtvWv9KuJEPn0k2VvLEb8KJBTDsA/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">【过去时~】你错过的拥抱情人节！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4obbLcdoLsFrAB8Szu3LkbKNyG4PibDUnSnrianpHxPw0yocUibMkvYHYTeia4BPKlDibWKTLFqcqKtMQoQ/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="Efpw8vgFJwKkfiRWWhkLINcTIy1kgNLDLEur-ZIr2Ao">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaVliaGURqaj639L0NVspq2eib5nURmdFpteqWWg91LmXP5CGtDT4UbBGUYDZ90icQKUicjWqibNUuUX6Q/0" class="more-first-part-img">
				<h4 class="first-part-title">Hug Day！拥抱情人节~</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">维多利亚的秘密你知多少！</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaVliaGURqaj639L0NVspq2ehKBj2raSYlGKBiasCkmbkicvWm0sn4pNATTZDnZOVVqL7TibtVu7N4fjg/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">冬季呢大衣+短靴，巧搭配也能有大长腿，变成完美身材~</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaVliaGURqaj639L0NVspq2ehRsx73Bs7Un5ibEasiaPq5Vwcjz9OTexdjaD9RqFN10lVowagtrMEldw/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">衣服颜色就是女人的性格</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oaVliaGURqaj639L0NVspq2ezdq4KVq4JOfSpt0BdYgyeMc8bMNg6S0ISTnW3uoHedLwwR2Q3L4toA/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div>
	<!-- 多图文	 -->
	<div class="more-templet-content list-box">
		<input type="hidden" class="media-id" value="XzlLgwKNLFt3BfRvp5R3CNXGLs5Hqg1uES9t5P58ef0">
		<div class="more-first-part">
				<img src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYmUL0bLiahNvXynkwibn17T1nCGGJxibqoyN2Xo9lTv4bIw1vwazV6UfCmNuEpic0jAU3dFl6w3K6DkQ/0" class="more-first-part-img">
				<h4 class="first-part-title">格兰诺华轻奢羊绒狂欢季</h4>
			</div>
				<div class="next-part">
						<h4 class="next-part-title">羊绒衫今冬流行点啥？</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYmUL0bLiahNvXynkwibn17T1pGZdymU04ib6GCpzgAK2usrJmibE3xxibhByiaqVg7RKXxraoUDHfExTgg/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">披肩围巾的各种围法及搭配方法</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYmUL0bLiahNvXynkwibn17T1lfUAA35TnReJDVWaY1p6xkNgRy8XmaG90V1ibbo8jxicLmWDtvrbR86A/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">一袭长裙，一身优雅</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYmUL0bLiahNvXynkwibn17T1qhgoWmgGgSfoqFobDLQ4uzOPGA3MjicIcwUpXxeTSlrjlGUlcUqakJw/0">
					</div>
				<div class="next-part">
						<h4 class="next-part-title">百变毛衫女王教你如何搭配</h4>
						<img class="next-part-img" src="http://mmbiz.qpic.cn/mmbiz/FomibZ56t4oYmUL0bLiahNvXynkwibn17T1zACRbbhDSDUbKTruFKEYrkUGD1dyDH2NmhhGgLqtdUWYfR2BI1oYEw/0">
					</div>
				<div class="box-mask"><span>选择素材</span></div> 
	</div> --%>