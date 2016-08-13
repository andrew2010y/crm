/* *
 * 城市选择组件 v1.1
*/
/* *
 * 全局空间 Vcity
 * */
var Vcity = {};
/* *
 * 静态方法集
 * @name _m
 * */
Vcity._m = {
    /* 选择元素 */
    $:function (arg, context) {
        var tagAll, n, eles = [], i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
            switch (arg.charAt(0)) {
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if (context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = Vcity._m.$('*', context);
                    n = tagAll.length;
                    for (i = 0; i < n; i++) {
                        if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },

    /* 绑定事件 */
    on:function (node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },

    /* 获取事件 */
    getEvent:function(event){
        return event || window.event;
    },

    /* 获取事件目标 */
    getTarget:function(event){
        return event.target || event.srcElement;
    },

    /* 获取元素位置 */
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },

    /* 添加样式名 */
    addClass:function (c, node) {
        if(!node)return;
        node.className = Vcity._m.hasClass(c,node) ? node.className : node.className + ' ' + c ;
    },

    /* 移除样式名 */
    removeClass:function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!Vcity._m.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

    /* 是否含有CLASS */
    hasClass:function (c, node) {
        if(!node || !node.className)return false;
        return node.className.indexOf(c)>-1;
    },

    /* 阻止冒泡 */
    stopPropagation:function (event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    },
    /* 去除两端空格 */
    trim:function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    }
};

/* 所有城市数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城市 */

Vcity.allCity = [
		{name: '北京|beijing|bj',id:'110000'},{name: '上海|shanghai|sh',id:'310000'}, 
		{name: '重庆|chongqing|cq',id:'500000'},{name:'深圳|shenzhen|sz',id:'440300'}, 
		{name:'广州|guangzhou|gz',id:'440100'}, {name:'杭州|hangzhou|hz',id:'330100'},
    	{name:'南京|nanjing|nj',id:'320100'}, {name:'苏州|shuzhou|sz',id:'320500'}, 
    	{name:'天津|tianjin|tj',id:'120000'}, {name:'成都|chengdu|cd',id:'510100'}, 
    	{name:'南昌|nanchang|nc',id:'360100'}, {name:'郑州|zhengzhou|zz',id:'410100'}, 
    	{name:'青岛|qingdao|qd',id:'370200'}, {name:'厦门|xiamen|xm',id:'350200'}, 
	    {name:'西安|xian|xa',id:'610100'}, {name:'长沙|changsha|cs',id:'430100'},
	    {name:'合肥|hefei|hf',id:'340100'},{name:'朝阳|chaoyang|cy',id:'211300'},
	    {name:'安庆|anqing|aq',id:'340800'}, {name:'安康|ankang|ak',id:'610900'},
	    {name:'包头|baotou|bt',id:'150200'}, {name:'大庆|daqing|dq',id:'230600'},
	    {name:'北海|beihai|bh',id:'450500'}, {name:'百色|baise|bs',id:'451000'},
	    {name:'保山|baoshan|bs',id:'530500'}, {name:'长治|changzhi|cz',id:'140400'}, 
	    {name:'长春|changchun|cc',id:'220100'}, {name:'常州|changzhou|cz',id:'320400'},
	    {name:'常德|changde|cd',id:'430700'},  {name:'白山|baishan|bs',id:'220600'}, 
	    {name:'赤峰|chifeng|cf',id:'150400'},  {name:'大同|datong|dt',id:'140200'},
	    {name:'大连|dalian|dl',id:'210200'},{name:'东营|dongying|dy',id:'370500'},  
	    {name:'丹东|dandong|dd',id:'210600'}, {name:'鄂尔多斯|eerduosi|eeds',id:'150600'}, 
	    {name:'福州|fuzhou|fz',id:'350100'}, {name: '呼和浩特|huhehaote|hhht',id:'150100'}, 
	    {name:'阜阳|fuyang|fy',id:'341200'},{name:'贵阳|guiyang|gy',id:'520100'},
	    {name:'桂林|guilin|gl',id:'450300'}, {name:'广元|guangyuan|gy',id:'510800'}, 
	    {name:'黑河|heihe|hh',id:'231100'}, {name:'哈尔滨|haerbin|heb',id:'230100'},
	    {name:'海口|haikou|hk',id:'460100'}, {name:'黄山|huangshan|hs',id:'341000'}, 
	    {name:'邯郸|handan|hd',id:'130400'}, {name:'汉中|hanzhong|hz',id:'610700'}, 
	    {name:'锦州|jinzhou|jz',id:'210700'}, {name:'景德镇|jingdezhen|jdz',id:'360200'},
	   	{name:'济宁|jining|jn',id:'370800'}, {name:'九江|jiujiang|jj',id:'360400'}, 
	    {name:'佳木斯|jiamusi|jms',id:'230800'}, {name:'济南|jinan|jn',id:'370100'},
	    {name:'昆明|kunming|km',id:'530100'}, {name:'克拉玛依|kelamayi|klmy',id:'650200'}, 
	    {name:'兰州|lanzhou|lz',id:'620100'},{name:'洛阳|luoyang|ly',id:'410300'}, 
	    {name:'丽江|lijiang|lj',id:'530700'},{name:'连云港|lianyungang|lyg',id:'320700'},
	    {name:'柳州|liuzhou|lz',id:'450200'}, {name:'泸州|luzhou|lz',id:'510500'}, 
	    {name:'拉萨|lasa|ls',id:'540100'}, {name:'临沂|linyi|ly',id:'371300'},
	    {name:'牡丹江|mudanjiang|mdj',id:'510700'},{name:'宁波|ningbo|nb',id:'330200'}, 
	    {name:'南充|nanchong|nc',id:'511300'}, {name:'南宁|nanning|nn',id:'450100'}, 
	    {name:'南阳|nanyang|ny',id:'411300'}, {name:'南通|nantong|nt',id:'320600'}, 
	    {name:'攀枝花|panzhihua|pzh',id:'510400'}, {name:'衢州|quzhou|qz',code:'330800'},
	    {name:'秦皇岛|qinhuangdao|qhd',id:'130300'}, {name:'庆阳|qingyang|qy',id:'621000'}, 
	    {name:'齐齐哈尔|qiqihaer|qqhe',id:'230200'}, {name:'石家庄|shijiazhuang|sjz',id:'130100'}, 
	    {name:'沈阳|shenyang|sy',id:'210100'}, {name:'铜仁|tongren|tr',id:'520600'},
	    {name:'台州|taizhou|tz',id:'331000'},{name:'珠海|zhuhai|zh',id:'440400'}, 
	    {name:'通辽|tongliao|tl',id:'150500'}, {name:'太原|taiyuan|ty',id:'140100'}, 
	    {name:'威海|weihai|wh',id:'371000'}, {name:'梧州|wuzhou|wz',id:'450400'}, 
	    {name:'无锡|wuxi|wx',id:'320200'}, {name:'潍坊|weifang|wf',id:'370700'}, 
	    {name:'温州|wenzhou|wz',code:'330300'}, {name:'乌鲁木齐|wulumuqi|wlmq',id:'650100'}, 
	    {name:'乌海|wuhai|wh',id:'150300'}, {name:'西宁|xining|xn',id:'630100'},
	    {name:'徐州|xuzhou|xz',id:'320300'}, {name:'永州|yongzhou|yz',id:'431100'}, 
	    {name:'榆林|yulin|yl',id:'610800'}, {name:'延安|yanan|ya',id:'610600'},
	    {name:'运城|yuncheng|yc',id:'140800'},{name:'烟台|yantai|yt',id:'370600'}, 
	    {name:'银川|yinchuan|yc',id:'640100'}, {name:'宜昌|yichang|yc',id:'420500'}, 
	    {name:'宜宾|yibin|yb',id:'511500'}, {name:'盐城|yancheng|yc',id:'320900'}, 
	    {name:'昭通|zhaotong|zt',id:'530600'},{name:'张家界|zhangjiajie|zjj',id:'430800'}, 
	    {name:'舟山|zhoushan|zs',code:'330900'}, {name:'中卫|zhongwei|zw',id:'640500'},
	    {name:'湛江|zhanjiang|zj',id:'440800'},{name:'唐山|tangshan|ts',id:'130200'},
		{name:'邢台|xingtai|xt',id:'130500'},{name:'保定|baoding|bd',id:'130600'},
		{name:'张家口|zhangjiakou|zjk',id:'130700'},{name:'承德|chengde|cd',id:'130800'},
		{name:'沧州|cangzhou|cz',id:'130900'},{name:'廊坊|langfang|lf',id:'131000'},
		{name:'衡水|hengshui|hs',id:'131100'},{name:'阳泉|yangquan|yq',id:'140300'},
		{name:'晋城|jincheng|jc',id:'140500'},{name:'朔州|shouzhou|sz',id:'140600'},
		{name:'晋中|jinzhong|jz',id:'140700'},{name:'忻州|xinzhou|xz',id:'140900'},
		{name:'临汾|linfen|lf',id:'141000'},{name:'吕梁|lvliang|ll',id:'141100'},
		{name:'呼伦贝尔|hulunbeier|hlbr',id:'150700'},{name:'巴彦淖尔|bayannaoer|byne',id:'150800'},
		{name:'乌兰察布|wulanchabu|wlcb',id:'150900'},{name:'兴安盟|xinganmeng|xam',id:'152200'},
		{name:'锡林郭勒盟|xilinguolemeng|xlglm',id:'152500'},{name:'阿拉善盟|alashanmeng|alsm',id:'152900'},
		{name:'鞍山|anshan|as',id:'210300'},{name:'抚顺|fushun|fs',id:'210400'},
		{name:'本溪|benxi|bx',id:'210500'},{name:'营口|yingkou|yk',id:'210800'},
		{name:'阜新|fuxin|fx',id:'210900'},{name:'辽阳|liaoyang|ly',id:'211000'},
		{name:'盘锦|panjin|pj',id:'211100'},{name:'铁岭|tieling|tl',id:'211200'},
		{name:'葫芦岛|huludao|hld',id:'211400'},{name:'吉林|jilin|jl',id:'220200'},
		{name:'四平|siping|sp',id:'220300'},{name:'辽源|liaoyuan|ly',id:'220400'},
		{name:'通化|tonghua|th',id:'220500'},{name:'松原|songyuan|sy',id:'220700'},
		{name:'白城|baicheng|bc',id:'220800'},{name:'延边朝鲜族自治州|yanbianchaoxianzizhizhou|ybcxzzzz',id:'222400'},
		{name:'鸡西|jixi|jx',id:'230300'},{name:'鹤岗|hegang|hg',id:'230400'},
		{name:'双鸭山|shuangyashan|sys',id:'230500'},{name:'伊春|yichun|yc',id:'230700'},
		{name:'七台河|qitaihe|qht',id:'230900'},{name:'绥化|suihua|sh',id:'231200'},
		{name:'大兴安岭|daxinganling|dxal',id:'232700'},{name:'淮安|huaian|ha',id:'320800'},
		{name:'扬州|yangzhou|yz',id:'231000'},{name:'镇江|zhenjiang|zj',id:'321100'},
		{name:'泰州|taizhou|tz',id:'321200'},{name:'宿迁|suqian|sq',id:'321300'},
		{name:'嘉兴|jiaxing|jx',id:'330400'},{name:'湖州|huzhou|hz',id:'330500'},
		{name:'绍兴|shaoxing|sx',id:'330600'},{name:'金华|jihua|jh',id:'330700'},
		{name:'丽水|lishui|ls',id:'331100'},{name:'芜湖|wuhu|wh',id:'340200'},
		{name:'蚌埠|bengbu|bb',id:'340300'},{name:'淮南|huainan|hn',id:'340400'},
		{name:'马鞍山|maanshan|mas',id:'340500'},{name:'淮北|huaibei|hb',id:'340600'},
		{name:'铜陵|tongling|tl',id:'340700'},{name:'滁州|chuzhou|cz',id:'341100'},
		{name:'宿州|suzhou|sz',id:'341300'},{name:'六安|liuan|la',id:'341500'},
		{name:'亳州|bozhou|bz',id:'341600'},{name:'池州|chizhou|cz',id:'341700'},
		{name:'宣城|xuancheng|xc',id:'341800'},{name:'莆田|putian|pt',id:'350300'},
		{name:'三明|sanming|sm',id:'350400'},{name:'泉州|quanzhou|qz',id:'350500'},
		{name:'漳州|zhangzhou|zz',id:'350600'},{name:'南平|nanping|np',id:'350700'},
		{name:'龙岩|longyan|ly',id:'350800'},{name:'宁德|ningde|nd',id:'350900'},
		{name:'萍乡|pingxiang|px',id:'360300'},{name:'新余|xinyu|xy',id:'360500'},
		{name:'鹰潭|yingtan|yt',id:'360600'},{name:'赣州|ganzhou|gz',id:'360700'},
		{name:'吉安|jian|ja',id:'360800'},{name:'宜春|jichun|yc',id:'360900'},
		{name:'抚州|fuzhou|fz',id:'361000'},{name:'上饶|shangrao|sr',id:'361100'},
		{name:'淄博|zibo|zb',id:'370300'},{name:'枣庄|zaozhuang|zz',id:'370400'},
		{name:'泰安|taoian|ta',id:'370900'},{name:'日照|rizhao|rz',id:'371100'},
		{name:'莱芜|laiwu|lw',id:'371200'},{name:'德州|dezhou|dz',id:'371400'},
		{name:'聊城|liaocheng|lc',id:'371500'},{name:'滨州|binzhou|bz',id:'371600'},
		{name:'菏泽|heze|hz',id:'371700'},{name:'开封|kaifeng|kf',id:'410200'},
		{name:'平顶山|pingdingshan|pds',id:'410400'},{name:'安阳|anyang|ay',id:'410500'},
		{name:'鹤壁|hebi|hb',id:'410600'},{name:'新乡|xinxiang|xx',id:'410700'},
		{name:'焦作|jiaozuo|jz',id:'410800'},{name:'濮阳|puyang|py',id:'410900'},
		{name:'许昌|xuchang|xc',id:'411000'},{name:'漯河|luohe|lh',id:'411100'},
		{name:'三门峡|sanmenxia|smx',id:'411200'},{name:'商丘|shangqiu|sq',id:'411400'},
		{name:'信阳|xinyang|yx',id:'411500'},{name:'周口|zhoukou|zk',id:'411600'},
		{name:'驻马店|zhumadian|zmd',id:'411700'},{name:'武汉|wuhan|wh',id:'420100'},
		{name:'黄石|huangshi|hs',id:'420200'},{name:'十堰|shiyan|sy',id:'420300'},
		{name:'襄阳|xiangyang|xy',id:'420600'},{name:'鄂州|ezhou|ez',id:'420700'},
		{name:'荆门|jingmen|jm',id:'420800'},{name:'孝感|xiaogan|xg',id:'420900'},
		{name:'荆州|jingzhou|jz',id:'421000'},{name:'黄冈|huanggang|hg',id:'421100'},
		{name:'威宁|weining|wn',id:'421200'},{name:'随州|suizhou|sz',id:'421300'},
		{name:'恩施土家族苗族自治州|enshitujiazumiaozuzizhizhou|estjzmzzzz',id:'422800'},
		{name:'株洲|zhuzhou|zz',id:'430200'},{name:'娄底|loudi|ld',id:'431300'},
		{name:'湘潭|xiangtan|xt',id:'430300'},{name:'衡阳|hengyang|hy',id:'430400'},
		{name:'邵阳|shaoyang|sy',id:'430500'},{name:'岳阳|yueyang|yy',id:'430600'},
		{name:'益阳|yiyang|yy',id:'430900'},{name:'郴州|chenzhou|cz',id:'431000'},
		{name:'益阳|yiyang|yy',id:'430900'},{name:'郴州|chenzhou|cz',id:'431000'},
		{name:'怀化|huaihua|hh',id:'431200'},{name:'娄底|loudi|ld',id:'431300'},
		{name:'湘西土家族苗族自治州|xiangxitujiazumiaozuzizhizhou|xxtjzmzzzz',id:'433100'},
		{name:'韶关|shaoguan|sg',id:'440200'},{name:'汕头|shantou|st',id:'440500'},
		{name:'佛山|foshan|fs',id:'440600'},{name:'江门|jiangmen|jm',id:'440700'},
		{name:'茂名|maomiong|mm',id:'440900'},{name:'肇庆|zhaoqing|zq',id:'441200'},
		{name:'惠州|huizhou|hz',id:'441300'},{name:'梅州|meizhou|mz',id:'441400'},
		{name:'汕尾|shanwei|sw',id:'441500'},{name:'河源|ehyuan|hy',id:'441600'},
		{name:'阳江|yangjiang|yj',id:'441700'},{name:'清远|qingyuan|qy',id:'441700'},
		{name:'东沙群岛|dongshaqundao|dsqd',id:'442100'},{name:'潮州|chaozhou|cz',id:'445100'},
		{name:'揭阳|jieyang|jy',id:'445200'},{name:'云浮|yunfu|yf',id:'445300'},
		{name:'防城港|fangchenggang|gcg',id:'450600'},{name:'钦州|qinzhou|qz',id:'450700'},
		{name:'贵港|guigang|gg',id:'450800'},{name:'玉林|yulin|yl',id:'450900'},
		{name:'贺州|hezhou|hz',id:'451100'},{name:'河池|hechi|hc',id:'451200'},
		{name:'来宾|laibin|lb',id:'451300'},{name:'崇左|chongzuo|cz',id:'451400'},
		{name:'三沙|sansha|ss',id:'460300'},{name:'自贡|zigong|zg',id:'510300'},
		{name:'德阳|deyang|dy',id:'510600'},{name:'内江|neijiang|nj',id:'511000'},
		{name:'遂宁|suining|sn',id:'510900'},{name:'乐山|leshan|ls',id:'511100'},
		{name:'眉山|meishan|ms',id:'511400'},{name:'广安|guangan|ga',id:'511600'},
		{name:'达州|dazhou|dz',id:'511700'},{name:'雅安|yaan|ya',id:'511800'},
		{name:'巴中|bazhong|bz',id:'511900'},{name:'资阳|ziyang|zy',id:'512000'},
		{name:'阿坝藏族羌族自治州|abazangzuqiangzuzizhizhou|abzzqzzzz',id:'513200'},
		{name:'甘孜藏族自治州|ganzizangzuzizhizhou|gzzzzzz',id:'513300'},
		{name:'凉山彝族自治州|liangshanyizuzizhizhou|lsyzzzz',id:'513400'},
		{name:'六盘水|liupanshui|lps',id:'520200'}, {name:'遵义|zunyi|zy',id:'520300'},
		{name:'安顺|anshun|as',id:'520400'}, {name:'毕节|bijie|bj',id:'520500'},
		{name:'黔西南布依族苗族自治州|qianxinanbuyizumiaozuzizhizhou|qxnbyzmzzzz',id:'522300'},
		{name:'黔东南苗族侗族自治州|qiandongnanmiaozutongzuzizhizhou|qdnmztzzzz',id:'522600'},
		{name:'黔南布依族苗族自治州|qiannanbuyizumiaozuzizhizhou|qnbyzmzzzz',id:'522700'},
		{name:'曲靖|qujing|qj',id:'530300'},{name:'玉溪|yuxi|yx',id:'530400'},
		{name:'普洱|puer|pe',id:'530800'},{name:'临沧|lincang|lc',id:'530900'},
		{name:'楚雄彝族自治州|chuxiongyizuzizhizhou|cxyzzzz',id:'532300'},
		{name:'红河哈尼族彝族自治州|honghehanizuyizuzizhizhou|hhhnzyzzzz',id:'532500'},
		{name:'文山壮族苗族自治州|wenshanzhuangzumiaozuzizhizhou|wszzmzzzz',id:'532600'},
		{name:'西双版纳傣族自治州|xishuangbannadaizuzizhizhou|xsbndzzzz',id:'532800'},
		{name:'大理白族自治州|dalibaizuzizhizhou|dlbzzzz',id:'532900'},
		{name:'德宏傣族景颇族自治州|dehongdaizujingpozuzizhizhou|dhdzjpzzzz',id:'533100'},
		{name:'怒江傈僳族自治州|nujiangsusuzuzizhizhou|njsszzzz',id:'533300'},
		{name:'迪庆藏族自治州|diqingzangzuzizhizhou|dqzzzzz',id:'533400'},
		{name:'昌都地区|changdudiqu|cddq',id:'542100'},{name:'山南地区|shannandiqu|sndq',id:'542200'},
		{name:'日喀则地区|rikazediqu|rkzdq',id:'542300'},{name:'那曲地区|naqudiqu|nqdq',id:'542200'},
		{name:'阿里地区|alidiqu|aldq',id:'542500'},{name:'林芝地区|linzhidiqu|lzdq',id:'542600'},
		{name:'铜川|tongchuan|tc',id:'610200'},{name:'宝鸡|baoji|bj',id:'610300'},
		{name:'咸阳|xianyang|xy',id:'610400'},{name:'渭南|weinan|wn',id:'610500'},
		{name:'商洛|nanluo|nl',id:'611000'},{name:'金昌|jinchang|jc',id:'620300'},
		{name:'白银|baiyin|by',id:'620400'},{name:'天水|tianshui|ts',id:'620500'},
		{name:'武威|wuwei|ww',id:'620600'},{name:'张掖|zhangye|zy',id:'620700'},
		{name:'平凉|pingliang|pl',id:'620800'},{name:'酒泉|jiuquan|jq',id:'620900'},
		{name:'定西|dingxi|dx',id:'621100'},{name:'陇南|longnan|ln',id:'621200'},
		{name:'临夏回族自治州|linxiahuizuzizhizhou|lxhzzzz',id:'622900'},{name:'甘南藏族自治州|gannanzangzuzizhizhou|anzzzzz',id:'623000'},
		{name:'海东|haidong|hd',id:'632100'},{name:'海北藏族自治州|haibeizangzuzizhizhou|hbzzzzz',id:'632200'},
		{name:'黄南藏族自治州|huangnanzangzuzizhizhou|hnzzzzz',id:'632300'},{name:'海南藏族自治州|hainanzangzuzizhizhou|hnzzzzz',id:'632500'},
		{name:'果洛藏族自治州|guoluozangzuzizhizhou|glzzzzz',id:'632600'},{name:'玉树藏族自治州|yushuzangzuzizhizhou|hnzzzzz',id:'632700'},
		{name:'海西蒙古族藏族自治州|haiximengguzuzangzuzizhizhou|hxmgzzzzzz',id:'632800'},{name:'石嘴山|shizuishan|szs',id:'640200'},
		{name:'吴忠|wuzhong|wx',id:'640300'},{name:'固原|guyuan|gy',id:'640400'},
		{name:'吐鲁番地区|tulufandiqu|tlfdq',id:'652100'},{name:'哈密地区|hamidiqu|hmdq',id:'652200'},
		{name:'昌吉回族自治州|jichuanghuizuzizhizhou|jchzzzz',id:'652300'},{name:'博尔塔拉蒙古自治州|boertalamengguzizhizhou|betlmgzzz',id:'652700'},
		{name:'巴音郭楞蒙古自治州|bayinguolengmengguzizhizhou|byglmgzzz',id:'652800'},{name:'阿克苏地区|akesudiqu|aksdq',id:'652900'},
		{name:'克孜勒苏柯尔克孜自治州|kezilesukeerkezizhizhou|kzlskekzzz',id:'653000'},{name:'喀什地区|kashi|ks',id:'653100'},
		{name:'和田地区|hetiandiqu|htdq',id:'653200'},{name:'伊犁哈萨克自治州|yilihasakezizhizhou|ylhskzzz',id:'654000'},
		{name:'塔城地区|tachengdiqu|tcdq',id:'654200'},{name:'阿勒泰地区|aletaidiqu|altdq',id:'654300'},
		{name:'香港|xianggang|xg',id:'810000'},{name:'澳门|aomen|am',id:'820000'},
	];

/* 正则表达式 筛选中文城市名、拼音、首字母 */

Vcity.regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*$/i;
Vcity.regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;

/* *
 * 格式化城市数组为对象oCity，按照a-h,i-p,q-z,hot热门城市分组：
 * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
 * */

(function () {
    var citys = Vcity.allCity, match, letter,
        regEx = Vcity.regEx,
        reg2 = /^[a-h]$/i, reg3 = /^[i-p]$/i, reg4 = /^[q-z]$/i;
    if (!Vcity.oCity) {
        Vcity.oCity = {hot:{},ABCDEFGH:{}, IJKLMNOP:{}, QRSTUVWXYZ:{}};
        //console.log(citys.length);
        for (var i = 0, n = citys.length; i < n; i++) {
            match = regEx.exec(citys[i].name);
            letter = match[3].toUpperCase();
            if (reg2.test(letter)) {
                if (!Vcity.oCity.ABCDEFGH[letter]) Vcity.oCity.ABCDEFGH[letter] = [];
                Vcity.oCity.ABCDEFGH[letter].push(citys[i]);
            } else if (reg3.test(letter)) {
                if (!Vcity.oCity.IJKLMNOP[letter]) Vcity.oCity.IJKLMNOP[letter] = [];
                Vcity.oCity.IJKLMNOP[letter].push(citys[i]);
            } else if (reg4.test(letter)) {
                if (!Vcity.oCity.QRSTUVWXYZ[letter]) Vcity.oCity.QRSTUVWXYZ[letter] = [];
                Vcity.oCity.QRSTUVWXYZ[letter].push(citys[i]);
            }
            /* 热门城市 前16条 */
            if(i<16){
                if(!Vcity.oCity.hot['hot']) Vcity.oCity.hot['hot'] = [];
                Vcity.oCity.hot['hot'].push(citys[i]);
            }
        }
    }
})();
/* 城市HTML模板 */
Vcity._template = [
    '<p class="tip">热门城市(支持汉字/拼音)</p>',
    '<ul>',
    '<li class="on">热门城市</li>',
    '<li>ABCDEFGH</li>',
    '<li>IJKLMNOP</li>',
    '<li>QRSTUVWXYZ</li>',
    '</ul>'
];

/* *
 * 城市控件构造函数
 * @CitySelector
 * */

Vcity.CitySelector = function () {
    this.initialize.apply(this, arguments);
};

Vcity.CitySelector.prototype = {

    constructor:Vcity.CitySelector,

    /* 初始化 */

    initialize :function (options) {
        var input = options.input;
        this.input = Vcity._m.$('#'+ input);
        this.inputEvent();
    },

    /* *
     * @createWarp
     * 创建城市BOX HTML 框架
     * */

    createWarp:function(){
        var inputPos = Vcity._m.getPos(this.input);
        var div = this.rootDiv = document.createElement('div');
        var that = this;

        // 设置DIV阻止冒泡
        Vcity._m.on(this.rootDiv,'click',function(event){
            Vcity._m.stopPropagation(event);
        });

        // 设置点击文档隐藏弹出的城市选择框
        Vcity._m.on(document, 'click', function (event) {
            event = Vcity._m.getEvent(event);
            var target = Vcity._m.getTarget(event);
            if(target == that.input) return false;
            //console.log(target.className);
            if (that.cityBox)Vcity._m.addClass('hide', that.cityBox);
            if (that.ul)Vcity._m.addClass('hide', that.ul);
            if(that.myIframe)Vcity._m.addClass('hide',that.myIframe);
        });
        div.className = 'citySelector';
        div.style.position = 'absolute';
        div.style.left = inputPos.left + 'px';
        div.style.top = inputPos.bottom + 'px';
        div.style.zIndex = 999999;

        // 判断是否IE6，如果是IE6需要添加iframe才能遮住SELECT框
        var isIe = (document.all) ? true : false;
        var isIE6 = this.isIE6 = isIe && !window.XMLHttpRequest;
        if(isIE6){
            var myIframe = this.myIframe =  document.createElement('iframe');
            myIframe.frameborder = '0';
            myIframe.src = 'about:blank';
            myIframe.style.position = 'absolute';
            myIframe.style.zIndex = '-1';
            this.rootDiv.appendChild(this.myIframe);
        }

        var childdiv = this.cityBox = document.createElement('div');
        childdiv.className = 'cityBox';
        childdiv.id = 'cityBox';
        childdiv.innerHTML = Vcity._template.join('');
        var hotCity = this.hotCity =  document.createElement('div');
        hotCity.className = 'hotCity';
        childdiv.appendChild(hotCity);
        div.appendChild(childdiv);
        this.createHotCity();
    },

    /* *
     * @createHotCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     **/

    createHotCity:function(){
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = Vcity.regEx,
            oCity = Vcity.oCity;
        for(key in oCity){
            odiv = this[key] = document.createElement('div');
            // 先设置全部隐藏hide
            odiv.className = key + ' ' + 'cityTab hide';
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = document.createElement('dl');
                odt = document.createElement('dt');
                odd = document.createElement('dd');
                odt.innerHTML = sortKey[j] == 'hot'?'&nbsp;':sortKey[j];
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                	var cityNameList = oCity[key][sortKey[j]][i].name.split("|");
                	var cityName = cityNameList[0];
                    str = '<a href="javascript:" data-id="'+oCity[key][sortKey[j]][i].id+'">' + cityName + '</a>';
                    odda.push(str);
                }
                odd.innerHTML = odda.join('');
                odl.appendChild(odt);
                odl.appendChild(odd);
                odiv.appendChild(odl);
            }

            // 移除热门城市的隐藏CSS
            Vcity._m.removeClass('hide',this.hot);
            this.hotCity.appendChild(odiv);
        }
        document.body.appendChild(this.rootDiv);
        /* IE6 */
        this.changeIframe();

        this.tabChange();
        this.linkEvent();
    },

    /* *
     *  tab按字母顺序切换
     *  @ tabChange
     * */

    tabChange:function(){
        var lis = Vcity._m.$('li',this.cityBox);
        var divs = Vcity._m.$('div',this.hotCity);
        var that = this;
        for(var i=0,n=lis.length;i<n;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var j=0;j<n;j++){
                    Vcity._m.removeClass('on',lis[j]);
                    Vcity._m.addClass('hide',divs[j]);
                }
                Vcity._m.addClass('on',this);
                Vcity._m.removeClass('hide',divs[this.index]);
                /* IE6 改变TAB的时候 改变Iframe 大小*/
                that.changeIframe();
            };
        }
    },

    /* *
     * 城市LINK事件
     *  @linkEvent
     * */

    linkEvent:function(){
        var links = Vcity._m.$('a',this.hotCity);
        var that = this;
        for(var i=0,n=links.length;i<n;i++){
            links[i].onclick = function(){
                that.input.value = this.innerHTML;
                that.input.nextElementSibling.value=this.getAttribute("data-id");
                Vcity._m.addClass('hide',that.cityBox);
                /* 点击城市名的时候隐藏myIframe */
                Vcity._m.addClass('hide',that.myIframe);
            }
        }
    },

    /* *
     * INPUT城市输入框事件
     * @inputEvent
     * */

    inputEvent:function(){
        var that = this;
        Vcity._m.on(this.input,'click',function(event){
            event = event || window.event;
            if(!that.cityBox){
                that.createWarp();
            }else if(!!that.cityBox && Vcity._m.hasClass('hide',that.cityBox)){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                if(!that.ul || (that.ul && Vcity._m.hasClass('hide',that.ul))){
                    Vcity._m.removeClass('hide',that.cityBox);

                    /* IE6 移除iframe 的hide 样式 */
                    //alert('click');
                    Vcity._m.removeClass('hide',that.myIframe);
                    that.changeIframe();
                }
            }
        });
        Vcity._m.on(this.input,'focus',function(){
            that.input.select();
            if(that.input.value == '') that.input.value = '';
        });
        Vcity._m.on(this.input,'blur',function(){
            if(that.input.value == '') that.input.value = '';
        });
        Vcity._m.on(this.input,'keyup',function(event){
            event = event || window.event;
            var keycode = event.keyCode;
            Vcity._m.addClass('hide',that.cityBox);
            that.createUl();

            /* 移除iframe 的hide 样式 */
            Vcity._m.removeClass('hide',that.myIframe);

            // 下拉菜单显示的时候捕捉按键事件
            if(that.ul && !Vcity._m.hasClass('hide',that.ul) && !that.isEmpty){
                that.KeyboardEvent(event,keycode);
            }
        });
    },

    /* *
     * 生成下拉选择列表
     * @ createUl
     * */

    createUl:function () {
        //console.log('createUL');
        var str;
        var value = Vcity._m.trim(this.input.value);
        // 当value不等于空的时候执行
        if (value !== '') {
            var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
            var searchResult = [];
            for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
            	var cityNameList = Vcity.allCity[i].name.split("|");
            	var cityName = cityNameList[0];
                if (reg.test(Vcity.allCity[i].name)) {
                    var match = Vcity.regEx.exec(Vcity.allCity[i].name);
                    if (searchResult.length !== 0) {
                        str = '<li data-id="'+Vcity.allCity[i].id+'"><b class="cityname">' + cityName + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    } else {
                        str = '<li class="on" data-id="'+Vcity.allCity[i].id+'"><b class="cityname">' + cityName + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    }
                    searchResult.push(str);
                }
            }
            this.isEmpty = false;
            // 如果搜索数据为空
            if (searchResult.length == 0) {
                this.isEmpty = true;
                str = '<li class="empty">对不起，没有找到数据 "<em>' + value + '</em>"</li>';
                searchResult.push(str);
            }
            // 如果slideul不存在则添加ul
            if (!this.ul) {
                var ul = this.ul = document.createElement('ul');
                ul.className = 'cityslide';
                this.rootDiv && this.rootDiv.appendChild(ul);
                // 记录按键次数，方向键
                this.count = 0;
            } else if (this.ul && Vcity._m.hasClass('hide', this.ul)) {
                this.count = 0;
                Vcity._m.removeClass('hide', this.ul);
            }
            this.ul.innerHTML = searchResult.join('');

            /* IE6 */
            this.changeIframe();

            // 绑定Li事件
            this.liEvent();
        }else{
            Vcity._m.addClass('hide',this.ul);
            Vcity._m.removeClass('hide',this.cityBox);

            Vcity._m.removeClass('hide',this.myIframe);

            this.changeIframe();
        }
    },

    /* IE6的改变遮罩SELECT 的 IFRAME尺寸大小 */
    changeIframe:function(){
        if(!this.isIE6)return;
        this.myIframe.style.width = this.rootDiv.offsetWidth + 'px';
        this.myIframe.style.height = this.rootDiv.offsetHeight + 'px';
    },

    /* *
     * 特定键盘事件，上、下、Enter键
     * @ KeyboardEvent
     * */

    KeyboardEvent:function(event,keycode){
        var lis = Vcity._m.$('li',this.ul);
        var len = lis.length;
        switch(keycode){
            case 40: //向下箭头↓
                this.count++;
                if(this.count > len-1) this.count = 0;
                for(var i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 38: //向上箭头↑
                this.count--;
                if(this.count<0) this.count = len-1;
                for(i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 13: // enter键
                this.input.value = Vcity.regExChiese.exec(lis[this.count].innerHTML)[0];
                Vcity._m.addClass('hide',this.ul);
                Vcity._m.addClass('hide',this.ul);
                /* IE6 */
                Vcity._m.addClass('hide',this.myIframe);
                break;
            default:
                break;
        }
    },

    /* *
     * 下拉列表的li事件
     * @ liEvent
     * */

    liEvent:function(){
        var that = this;
        var lis = Vcity._m.$('li',this.ul);
        for(var i = 0,n = lis.length;i < n;i++){
            Vcity._m.on(lis[i],'click',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                that.input.value = Vcity.regExChiese.exec(target.innerHTML)[0];
                that.input.nextElementSibling.value = this.getAttribute("data-id");
                Vcity._m.addClass('hide',that.ul);
                /* IE6 下拉菜单点击事件 */
                Vcity._m.addClass('hide',that.myIframe);
            });
            Vcity._m.on(lis[i],'mouseover',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.addClass('on',target);
            });
            Vcity._m.on(lis[i],'mouseout',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.removeClass('on',target);
            })
        }
    }
};