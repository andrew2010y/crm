/*
 * 获取页码显示
 * pageSize: 每页显示多少条记录
 * currentPage: 当前页
 * recordCount: 共有多少条记录
 * numCount: 每页显示多少个分页数字
 * tableId：可以为空，当前对应哪个table。当前页面若只有一个需要分页的table，tableId不填写
 * */
var CreatePager=function(pageSize,currentPage,recordCount,url,tableId,rowClass){
	var numCount=5;
	if(!rowClass)
		rowClass="table_page_row";//默认的rowClass
	if(recordCount<=0){
		$("#"+tableId).next("."+rowClass).remove();//清空原有的页码div
		return false;
	}
	var startIndex=(currentPage-1)*pageSize+1;//开始第几条
	var endIndex=currentPage*pageSize;//结束第几条
	if(endIndex>recordCount)
		endIndex=recordCount
	var curPageDiv=//页码html
		'<div class="row '+rowClass+'" style="margin:0 0 20px;">'+
			'<div class="inline float-left">'+
				'<div id="example1_info" class="dataTables_info" role="status" aria-live="polite">'+
					'<div class="page_count">'+
						'<span id ="ofnumber">从'+startIndex+'到'+endIndex+'/</span>共 <span class="all_count" id="all_count">'+recordCount+'</span> 条数据</span>'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<div class="inline float-right">'+
				'<div id="example1_paginate" class="dataTables_paginate paging_full_numbers">'+
					'<ul class="pagination" id="page_div">'+
					'</ul>'+
					'<div class="input-group">'+
						'<input id="goPageNum" type="text" data-inputtype="number" style="width:55px;border-radius:0;text-align:center;" class="form-control pull-r" placeholder="页码">'+
						'<button id="goPage" class="btn btn-info pull-r" style="width:45px;padding: 6px 8px;">跳转</button>'+
					'</div>'+
				'</div>'+
			'</div>'+
	   '</div>';
	$("#"+tableId).next("."+rowClass).remove();//清空原有的页码div
	$("#"+tableId).after(curPageDiv);//在table后面拼接页码html
	curPageDiv = $("#"+tableId).next(".row");//页码jquery对象
	var CreateHref=function(page,text,currentPage,liId){//创建一个页码数
		//page链接到第几页，text链接文字，currentPage当前页
		var li_html='<li class="'+(currentPage==page?'active':"")+'" '+(liId?"id="+liId:"")+'><a curpage="'+page+'">'+text+'</a></li>'
		curPageDiv.find("#page_div").append(li_html);
		if(currentPage==1){//如果当前页是第一页，首页和上一页设为不可点击
			curPageDiv.find("#page_div").find("#go_page_first,#go_page_before").removeClass("active").addClass("disabled");
		}
		if(currentPage==pageCount){//如果当前页是最后一页，尾页和下一页设为不可点击
			curPageDiv.find("#page_div").find("#go_page_end,#go_page_next").removeClass("active").addClass("disabled");
		}
	}
	var pageCount=0;//总页数
	pageCount=recordCount%pageSize===0?recordCount/pageSize:parseInt(recordCount/pageSize)+1;//总页数
	CreateHref(1,'首页',currentPage,"go_page_first");//添加首页链接
	if(Number(currentPage)-1>=1){
		CreateHref(Number(currentPage)-1,'上页',currentPage,"go_page_before");//添加下一页
	}else{
		CreateHref(currentPage,'上页',currentPage,"go_page_before");//添加下一页
	}
	
	//显示分页数字 开始
	//总页数小于等于分页数字，正常渲染
	if(pageCount<=numCount+1){
		for(i=1;i<=pageCount;i++){
			CreateHref(i,i,currentPage);
		}
	}else{
		currentPage=currentPage>=pageCount?pageCount:currentPage;
		if(Number(currentPage)<numCount){
			for(i=1;i<=numCount;i++){
				CreateHref(i,i,currentPage);
			}
			curPageDiv.find("#page_div").append("<li class='disabled'><span>...</span></li>");
			CreateHref(pageCount,pageCount,currentPage);
		}else if(Number(currentPage)>(pageCount-4)){
			CreateHref(1,1,currentPage);
			curPageDiv.find("#page_div").append("<li class='disabled'><span>...</span></li>");
			for(i=(pageCount-4);i<=pageCount;i++){
				CreateHref(i,i,currentPage);
			}
		}else if(Number(currentPage)>=numCount){
			CreateHref(1,1,currentPage);
			curPageDiv.find("#page_div").append("<li class='disabled'><span>...</span></li>");
			CreateHref(Number(currentPage)-1,Number(currentPage)-1,currentPage);
			CreateHref(currentPage,currentPage,currentPage);
			CreateHref(Number(currentPage)+1,Number(currentPage)+1,currentPage);
			curPageDiv.find("#page_div").append("<li class='disabled'><span>...</span></li>");
			CreateHref(pageCount,pageCount,currentPage);			
		}
	}
	//下一页
	if(Number(currentPage)+1<=pageCount){
		CreateHref(Number(currentPage)+1,'下页',currentPage,"go_page_next");//添加下一页
	}else if(Number(currentPage)){
		CreateHref(currentPage,'下页',currentPage,"go_page_next");//添加下一页
	}
	//显示分页数字 结束
	CreateHref(pageCount,'尾页',currentPage,"go_page_end");//添加末页链
}
//输入页数，跳转到某一页
$("body").on("keypress","#goPageNum",function(event){
	var keywhich = (event.keyCode? event.keyCode:event.which);
	if(keywhich == "13"){
		$(this).next("#goPage").click();
	}
});