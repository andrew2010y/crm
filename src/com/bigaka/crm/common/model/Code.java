package com.bigaka.crm.common.model;

/**
 * 统一错误码
 * @description 
 * @author Dylan Tao
 * @date 2015-11-12
 * Copyright 2015 bigaka.com. All Rights Reserved.
 */

public interface Code {
	
	//=========== CRM ref ==============
	long SUCCESS = 0; //成功
	long FAILED = -1; //失败
	
	long PARAMETER_ERROR = 10500;//参数不正确
	
	long ADD_DATA_ERROR = 10600;//添加数据失败
	
	long UPDATE_MEMBER_STATUS_EEROR=10602;
	String UPDATE_MEMBER_STATUS_ERROR_MSG="更新会员卡状态失败";
	
	long CREATE_MEMBER_SHIP_CARD_WECHAT_ERROR=10603;
	String CREATE_MEMBER_SHIP_CARD_WECHAT_ERROR_MSG="创建微信会员卡失败";
	
	long UPDATE_MEMBER_SHIP_CARD_WECHAT_ERROR=10604;
	String UPDATE_MEMBER_SHIP_CARD_WECHAT_ERROR_MSG="修改微信会员卡失败";
	
	String MEMBER_CARD_AUDIT_PASS_MSG = "会员卡审核通过!";
	
	String MEMBER_CARD_AUDIT_NOT_PASS_MSG = "会员卡未审核通过!";
	
	long CUSTOMER_SAVE_ERROR = 11000;
	String CUSTOMER_SAVE_MSG = "保存顾客帐号信息失败!";
	
	long CUSTOMER_DETAIL_ERROR = 11001;
	String CUSTOMER_DETAIL_MSG = "初始化顾客基本信息失败!";
	
	long CUSTOMER_COUNT_ERROR = 11002;
	String CUSTOMER_COUNT_MSG = "初始化顾客统计失败!";
	
	long CUSTOMER_DATE_ENUM_ERROR = 11003;
	String CUSTOMER_DATE_ENUM_MSG = "查询时间不能为空!";
	
	long CUSTOMER_STOREID_ERROR = 11004;
	String CUSTOMER_STOREID_MSG = "门店ID不能为空!";
	
	long CUSTOMER_PARENTSTOREID_ERROR = 11005;
	String CUSTOMER_PARENTSTOREID_MSG = "商户ID不能为空!";
	
	/** COUPON START */
	
	long COUPONLOG_OP_STATUS_ERROR = 10000;
	String COUPONLOG_OP_STATUS_MSG = "优惠券状态更新值不正确!";
	
	long CUSTOMER_PUSH_COUNT_ERROR = 10002;
	String CUSTOMER_PUSH_COUNT_MSG = "推送会员数量为空!";
	
	long COUPON_PUSH_COUNT_ERROR = 10003;
	String COUPON_PUSH_COUNT_MSG = "推送优惠券数量为空!";
	
	long DELETE_COUPON_PUSH_ERROR = 10004;
	String DELETE_COUPON_PUSH_MSG = "删除优惠券发放记录失败!";
	
	long DELETE_COUPON_PUSH_LOG_ERROR = 10005;
	String DELETE_COUPON_PUSH_LOG_MSG = "删除优惠券发放会员记录失败!";
	
	long SAVE_COUPON_ERROR = 10006;
	String SAVE_COUPON_MSG = "优惠券保存失败!";
	
	long UPDATE_COUPON_ERROR = 10007;
	String UPDATE_COUPON_MSG = "优惠券更新失败!";

	long CREATE_COUPON_WECHAT_ERROR = 10008;
	String CREATE_COUPON_WECHAT_MSG = "创建微信优惠券失败!";
	
	long UPDATE_BATCH_START_COUPON_ERROR = 10009;
	String UPDATE_BATCH_START_COUPON_MSG = "优惠券批量发放失败!";
	
	long UPDATE_BATCH_FAILURE_COUPON_ERROR = 10010;
	String UPDATE_BATCH_FAILURE_COUPON_MSG = "优惠券批量失效失败!";
	
	long COUPON_PUSH_SAVE_ERROR = 10011;
	String COUPON_PUSH_SAVE_MSG = "保存推送记录失败!";
	
	long COUPON_PUSH_SMS_ERROR = 10012;
	String COUPON_PUSH_SMS_MSG = "推送短信失败";
	
	long COUPON_PUSH_SMS_PUSH_ERROR = 10013;
	String COUPON_PUSH_SMS_PUSH_MSG = "短信推送服务异常！";
	
	long COUPON_PUSH_Wechat_ERROR = 10014;
	String COUPON_PUSH_Wechat_MSG = "推送微信失败！";
	
	long UPDATE_COUPON_COUPONID_ERROR = 10015;
	String UPDATE_COUPON_COUPONID_MSG = "优惠券ID不能为空!";
	
	String COUPON_CARD_AUDIT_PASS_MSG = "优惠券审核通过!";
	
	String COUPON_CARD_GET_PASS_MSG = "优惠券领取成功!";
	
	String COUPON_CARD_GET_PASS_SAVE_MSG = "更新优惠券领取信息失败!";
	
	String COUPON_CARD_AUDIT_NOT_PASS_MSG = "优惠券未审核通过!";
	
	long DELETE_COUPON_PRODUCE_LOG_ERROR = 10016;
	String DELETE_COUPON_PRODUCE_LOG_MSG = "优惠券领取信息删除失败!";

	long SAVE_COUPON_CONSUME_LOG_ERROR = 10017;
	String SAVE_COUPON_CONSUME_LOG_MSG = "优惠券核销失败!";
	
	long SAVE_COUPON_modify_Stock_ERROR = 10018;
	String SAVE_COUPON_modify_Stock_MSG = "同步优惠券库存失败!";
	
	long SAVE_COUPON_deposit_ERROR = 10019;
	String SAVE_COUPON_deposit_MSG = "同步优惠券Code失败!";
	
	long COUPON_ID_ERROR = 10020;
	String COUPON_ID_MSG = "优惠券ID不能为空!";
	
	long COUPON_CUSTOMER_ID_ERROR = 10021;
	String COUPON_CUSTOMER_ID_MSG = "会员ID不能为空!";
	
	long COUPON_CUSTOMERID_ERROR = 10022;
	String COUPON_CUSTOMERID_MSG = "推送会员ID不能为空!";
	
	long COUPON_MEDIA_ID_ERROR = 10023;
	String COUPON_MEDIA_ID_MSG = "上传图片失效!";
	
	long CARD_CACHE_ERROR = 10024;
	String CARD_CACHE_MSG = "卡券缓存对象失效!";
	
	long COUPON_COUNT_SAVE_UPDATE_ERROR = 10032;
	String COUPON_COUNT_SAVE_UPDATE_MSG = "保存优惠券库存数量异常!";
	
	long COUPON_COUNT_GET_UPDATE_ERROR = 10033;
	String COUPON_COUNT_GET_UPDATE_MSG = "修改优惠券领取数量异常!";
	
	long COUPON_CODE_UPDATE_ERROR = 10034;
	String COUPON_CODE_UPDATE_MSG = "优惠券code生成失败!";

	long GET_COUPON_TICKET_ERROR = 10035;
	String GET_COUPON_TICKET_MSG = "获取优惠券签名ticket失败!";
	
	long GET_COUPON_TOKEN_ERROR = 10036;
	String GET_COUPON_TOKEN_MSG = "获取微信token失败!";
	
	long GET_COUPON_TOKEN_INvalid_ERROR = 10037;
	String GET_COUPON_TOKEN_INvalid_MSG = "微信token失效!";
	
	long GET_COUPON_NOT_EXIST_ERROR = 10038;
	String GET_COUPON_NOT_EXIST_MSG = "优惠券不存在!";
	
	long COUPON_CARDID_NOT_EXIST_ERROR = 10039;
	String COUPON_CARDID_NOT_EXIST_MSG = "优惠券同步微信失败!";
	
	long COUPON_INVALID_STATUS_2_ERROR = 10040;
	String COUPON_INVALID_STATUS_2_MSG = "定时批量失效优惠券失败!";

	long COUPON_PRODUCE_LOG_INVALID_STATUS_2_ERROR = 10041;
	String COUPON_PRODUCE_LOG_INVALID_STATUS_2_MSG = "定时批量失效优惠券发放记录失败!";
	
	long CREATE_WECHAT_ACCOUNT_ERROR = 10042;
	String CREATE_WECHAT_ACCOUNT_MSG = "微信公众号未认证!";

	long CREATE_COUPON_COLOR_ERROR = 10043;
	String CREATE_COUPON_COLOR_MSG = "微信颜色不支持!";
	
	long BATCH_UPDATE_COUPON_CODE_ERROR = 10044;
	String BATCH_UPDATE_COUPON_CODE_MSG = "批量失效优化码失败!";
	
	long COUPON_CODE_ProduceLog_ERROR = 10045;
	String COUPON_CODE_ProduceLog_MSG = "优惠码不存在!";
	
	long COUPON_CODE_DELETE_2_ERROR = 10046;
	String COUPON_CODE_DELETE_2_MSG = "定时批量删除失效优惠券码失败!";
	
	/** COUPON END */
	
	long SAVE_WECHAT_MENU_ERROR=11500;
	String SAVE_WECHAT_MENU_LOG_MSG="微信平台数据同步失败！";
	
	long SAVE_WECHAT_STATUS_ERROR=11501;
	String SAVE_WECHAT_STATUS_LOG_MSG="微信配置未开启！";
	
	long UPDATE_CUPON_LOCK_STATUS_ERROR=11502;
	String UPDATE_CUPON_LOCK_STATUS_ERROR_MSG="couponCodeId不能为空";
	
	long SAVE_WECHAT_SETTING_ERROR=11503;
	String SAVE_WECHAT_SETTING_LOG_MSG="appId或appSecret配置错误！";
	
	long DEL_WECHAT_MENU_ERROR=11504;
	String DEL_WECHAT_MENU_LOG_MSG="微信菜单数据库删除失败！";
	
	long DEL_WECHAT_CARD_ERROR=11505;
	String DEL_WECHAT_CARD_MSG="删除微信会员卡失败";
	
	long DEL_COUPON_LOG_ERROR=11506;
	String DEL_COUPON_LOG_MSG="物理删除coupon_produce_log和coupon_consume_log数据失败";
	
	long ADD_STORE_POINT_SETTING_ERROR=11507;
	String ADD_STORE_POINT_SETTING_MSG="添加积分配置失败";
	
	long UPDATE_STORE_POINT_SETTING_ERROR=11508;
	String UPDATE_STORE_POINT_SETTING_MSG="修改积分配置失败";
	
	long OPEN_STORE_POINT_SETTING_ERROR=11509;
	String OPEN_STORE_POINT_SETTING_MSG="赠送积分设置未开启";
	
	long PARAMETER_ENUM_ERROR=11510;
	String PARAMETER_ENUM_MSG="枚举参数缺失";
	
	//=========== Platform ref ================
	
	long CUST_REG_PARAM_ERROR = 11003;
	String CUST_REG_PARAM_MSG = "注册时基础参数：parentStoreId,storeId,username,password,registerChannel不能为空!";
	
	long CUST_REG_PARAM_EXT_ERROR = 11004;
	String CUST_REG_PARAM_EXT_MSG = "当注册渠道为微商城时(RegisterChannel=2)，password不能为空!";
	
	long CUST_LOGIN_PHONE_PARAM_ERROR = 11005;
	String CUST_LOGIN_PHONE_PARAM_MSG = "当登录类型为手机号码时(loginType.PHONE)，username,password不能为空!";
	
	long CUST_LOGIN_WX_PARAM_ERROR = 11006;
	String CUST_LOGIN_WX_PARAM_MSG = "当登录类型为微信授权时(loginType.PHONE)，openId不能为空!";
	
	long CUST_LOGIN_PWD_ERROR = 11007;
	String CUST_LOGIN_PWD_MSG = "密码错误!";
	
	long CUST_LOGIN_STATE_ERROR = 11008;
	String CUNT_LOGIN_STATE_MSG = "登录失败!用户登录状态保存失败,Redis服务异常!";
	
	long CUST_USER_NOT_EXISTS = 11009;
	String CUST_USER_NOT_EXISTS_MSG = "用户不存在!";
	
	long CUST_STATE_ERROR = 11009;
	String CUST_STATE_MSG = "用户状态过期或Redis服务异常!";
	
	long CUST_HAS_EXIST = 11010;
	String CUST_HAS_EXIST_MSG = "顾客帐号已存在!";
	
	long CUST_STOP_STATE = 11011;
	String CUST_STOP_STATE_MSG = "顾客帐号被冻结,无法登录!";
	
	long CHANGE_PWD_ERROR = 11012;
	String CHANGE_PWD_MSG = "密码修改时，customerId,oldPwd,newPwd不能为空!";
	
	long BIND_PHONE_ERROR = 11013;
	String BIND_PHONE_MSG = "手机号码绑定时，openId,parentStoreId,phone不能为空!";
	
	long LOGIN_TYPE_OPEN_ID_ERROR = 11014;
	String LOGIN_TYPE_OPEN_ID_MSG = "openId为空,请求有误!";
	
	long BIND_OPEN_ID_ERROR = 11015;
	String BIND_OPEN_ID_MSG = "将openId绑定指定手机号码帐号下失败!";
	
	long BIND_PHONE_TO_OPEN_ERROR = 11016;
	String BIND_PHONE_TO_OPEN_MSG = "将手机号码更新到指定openId帐号下失败";
	
	long UPDATE_PHONE_ERROR = 11017;
	String UPDATE_PHONE_MSG = "顾客详情更新更新手机号码失败!";
	
	long DEL_CUSTOMER_ERROR = 11018;
	String DEL_CUSTOMER_MSG = "合并顾客帐号时，删除顾客旧帐号失败!";
	
	long LOGIN_PARAME_ERROR = 11019;
	String LOGIN_PARAME_MSG = "登录时基础参数：storeId,registerType,registerChannel不能为空!";
	
	long BIND_PHONE_ECHO_ERROR = 11020;
	String BIND_PHONE_ECHO_MSG = "该帐号已经绑定了此手机号码,请更换号码!";
	
	long GET_DETAIL_PARAME_ERROR = 11021;
	String GET_DETAIL_PARAME_MSG = "获取用户详情时，参数：customerId或openId至少有一项不能为空,当为openId时，parentStoreId必须不能为空";
	
	long UPDATE_DETAIL_PARAME_ERROR = 11022;
	String UPDATE_DETAIL_PARAME_MSG = "编辑用户详情时，token必须不能为空且name,logo,phone至少有一项不能空!";
	
	long CUSTOMER_ADDRESS_PARAM_ERROR = 11023;
	String CUSTOMER_ADDRESS_PARAM_MSG = "获取顾客收获地址时，token或customerId或cookieId有一项必须不能为空!";
	
	long CUSTOMER_ADDRESS_SAVE_PARAM_ERROR = 11024;
	String CUSTOMER_ADDRESS_SAVE_PARAM_MSG = "保存顾客收货地址时，token,cookieId不能同时为空,cityCode,name,phone,address,isDefault参数均不能为空!";
	
	long CUSTOMER_ADDRESS_UPDATE_PARAM_ERROR = 11025;
	String CUSTOMER_ADDRESS_UPDATE_PARAM_MSG = "编辑或删除顾客收货地址时,token,cookieId不能同时为空,编辑时customerAddressId不能为空!";
	
	long CUSTOMER_POINT_PARAM_ERROR = 11026;
	String CUSTOMER_POINT_PARAM_MSG = "获取顾客积分时,customerId均不能为空!";
	
	long CUSTOMER_UPDATE_POINT_PARRM_ERROR = 11027;
	String CUSTOMER_UPDATE_POINT_PARRM_MSG = "修改顾客积分时,customerId,score,type,consumeChannel均不能为空!";
	
	long CUSTOMER_POINT_TYPE_ERROR = 11028;
	String CUSTOMER_POINT_TYPE_MSG = "修改顾客积分时,type符号非法,暂不支持!";
	
	long CUSTOMER_DEFAULT_ADDRESS_ERROR = 11029;
	String CUSTOMER_DEFAULT_ADDRESS_MSG = "设置默认顾客收货地址时，重置旧的默认收货地址异常";
	
	long CUSTOMER_PAGE_PAREM_ERROR = 11030;
	String CUSTOMER_PAGE_PAREM_MSG = "storeId均不能为空!";
	
	long CUSTOMER_EXIST_PARAM_ERROR = 11031;
	String CUSTOMER_EXIST_PARAM_MSG = "判断顾客是否存在时,customerId或openId有且一个不能为空，当openId验证时，parentStoreId必须不能为空!";
	
	long CUSTOMER_ADDRESS_DETAIL_PARAM_ERROR = 11032;
	String CUSTOMER_ADDRESS_DETAIL_PARAM_MSG = "获取顾客收货地址详情时，customerAddressId不能为空!";
	
	long SOCIAL_SETTING_NULL_ERROR = 11033;
	String SOCIAL_SETTING_NULL_MSG = "在获取token时，商家未设置微信的appid和secret，请联系商家配置!";
	
	long CHANGE_PWD_PARAME_ERROR = 11034;
	String CHANGE_PWD_PARAME_MSG = "修改密码时，parentStoreId,phone,newPwd参数均不能为空!";
	
	long CUSTOMER_SOCIAL_SETTING_ERROR = 11035;
	String CUSTOMER_SOCIAL_SETTING_MSG = "根据商户id获取微信设置时，appId和appSecret参数不能为空!";
	
	long CUSTOMER_CHANGE_PHONE_ERROR = 11036;
	String CUSTOMER_CHANGE_PHONE_MSG = "该用户要换绑的手机号码已存在，不能绑定!";
	
	long CUSTOMER_CHANGE_PHONE_PARAM_ERROR = 11037;
	String CUSTOMER_CHANGE_PHONE_PARAM_MSG = "用户在换绑手机号码时，parentStoreId,oldPhone,newPhone参数均不能为空!";
	
	long BIND_PHONE_HAS_ERROR = 11038;
	String BIND_PHONE_HAS_MSG = "该手机号码已经绑定,请更换号码!";
	
	long CUSTOMER_PHONE_REGISTER_ERROR = 11039;
	String CUSTOMER_PHONE_REGISTER_MSG = "该手机号码已经注册!";
	String CUSTOMER_PHONE_REGISTER_ARRAYDY_MSG = "该手机号码已经申请注册，不能再次申请!";
	
	long CUSTOMER_OPEN_ID_REGISTER_ERROR = 11040;
	String CUSTOMER_OPEN_ID_REGISTER_ARRAYDY_MSG = "该open_id已经申请注册，不能再次申请!";
	
	long CUSTOMER_PASSWORD_REGISTER_ERROR = 11041;
	String CUSTOMER_PASSWORD_REGISTER_ARRAYDY_MSG = "密码不能为空!";
	
	long CUSTOMER_PHONE_ARRAYDY_REGISTER_ERROR = 11042;
	String CUSTOMER_PHONE_ARRAYDY_REGISTER_MSG = "注册手机号不能为空!";
	
	long FORM_STORE_DEFAULT_PROP_ERROR = 11043;
	String FORM_STORE_DEFAULT_PROP_MSG = "商户自定义表单的默认公有属性保存/更新失败!";
	
	long FORM_STORE_CUSTOM_PROP_ERROR = 11044;
	String FORM_STORE_CUSTOM_PROP_MSG = "商户自定义表单的自定义属性批量更新失败!";
	
	long CONSUME_LOG_STATE_ERROR = 11045;
	String CONSUME_LOG_STATE_MSG = "更改消费记录信息时，订单id，顾客id，状态必须不能为空!";
	
	//	
	long COUPON_CONSUME_PARAM_ERROR = 10014;
	String COUPON_CONSUME_PARAM_MSG = "优惠券核销时，closeChannel,orderId必须不能为空，cardNo和storeId 或 couponCodeId有且一项不能为空!";
	
	long COUPON_CONSUME_ERROR = 10015;
	String COUPON_CONSUME_MSG = "要核销的此优惠券不存在，请核实是否正确!";
	
	long COUPON_WACHAT_STATE_PARAM_ERROR = 10016;
	String COUPON_WACHAT_STATE_PARAM_MSG = "微信核销优惠券状态时，cardNo和customerId均不能为空!";
	
	long COUPON_PRODUCE_STATE_PARAM_ERROR = 10017;
	String COUPON_PRODUCE_STATE_PARAM_MSG = "微信优惠券状态更新时，couponCodeId,isLock均不能为空";
	
	long COUPON_PRODUCE_GET_PARAM_ERROR = 10018;
	String COUPON_PRODUCE_GET_PARAM_MSG = "优惠券领取时，type,pushId,customerId,getGetChannel必须不能为空,cardNo和storeId 或couponId有且一项不能为空!";

	long COUPON_PRODUCE_GET_EMPTY_ERROR = 10019;
	String COUPON_PRODUCE_GET_EMPTY_MSG = "生产的优惠券已经被领光了!";
	
	long COUPON_PRODUCE_GET_TYPE_ERROR = 10020;
	String COUPON_PRODUCE_GET_TYPE_MSG = "优惠券的领取类型不支持,请联系CRM团队进行扩展支持!";
	
	long COUPON_UPDATE_STATUS_ERROR = 10021;
	String COUPON_UPDATE_STATUS_MSG = "优惠券的状态修改异常!";
	
	long COUPON_STATE_CREATE_ERROR = 10022;
	String COUPIN_STATE_CREATE_MSG = "优惠券正在创建中,暂时无法领取";
	
	long COUPON_STATE_NOSTART_ERROR = 10023;
	String COUPON_STATE_NOSTART_MSG = "优惠券还未开放,暂时无法领取";
	
	long COUPON_STATE_END_ERROR = 10024;
	String COUPON_STATE_END_MSG = "优惠券已经关闭,暂时无法领取";
	
	long COUPON_STATE_NOUSED_ERROR = 10025;
	String COUPON_STATE_NOUSED_MSG = "优惠券已经过期,暂时无法领取";
	
	long COUPON_NO_EXIST_ERROR = 10026;
	String COUPON_NO_EXIST_MSG = "优惠券不存在";
	
	long COUPON_PAGE_PARAM_ERROR = 10027;
	String COUPON_PAGE_PARAM_MSG = "获取用户优惠券列表时，storeId,customerId,status均不能为空!";
	
	long COUPON_USABLE_PAGE_ERROR = 10028;
	String COUPON_USABLE_PAGE_MSG = "获取用户可用优惠券列表时，storeId,parentStoreId,customerId,useScene均不能为空,storeId必须大于0!";
	
	long COUPON_COUNT_UPDATE_ERROR = 10029;
	String COUPON_COUNT_UPDATE_MSG = "修改优惠券相关数量异常!";
	
	long COUPON_GET_LIMIT_ERROR = 10030;
	String COUPON_GET_LIMIT_MSG = "领取优惠券时，此用户超出领取次数，每人限领{0}次 ";
	
	long COUPON_INTEGRAL_ERROR = 10031;
	String COUPON_INTEGRAL_MSG = "领取优惠券时,该用户积分不满足此次领取活动";
	
	long COUPON_EXCHANGE_PRICE_ERROR = 10035;
	String COUPON_EXCHANGE_PRICE_MSG = "兑换优惠券时，订单总额不满足!限制金额[分] ：";
	
	long COUPON_EXCHANGE_INTEGRAL_ERROR = 10036;
	String COUPON_EXCHANGE_INTEGRAL_MSG = "此优惠码仅限在微商城中兑换";
	
	long COUPON_EXCHANGE_STORE_ERROR = 10037;
	String COUPON_EXCHANGE_STORE_MSG = "此优惠码在该店面无法兑换";
	
	long COUPON_EXCHANGE_STRATTIME_ERROR = 10038;
	String COUPON_EXCHANGE_STRATTIME_MSG = "优惠券有效期未到，暂时不能无法使用";
	
	long COUPON_EXCHANGE_PARAM_ERROR = 10039;
	String COUPON_EXCHANGE_PARAM_MSG = "线下兑换优惠券时，storeId,cardNo,priceLimit均不能为空!";
	
	long COUPON_PRODUCE_GET_STATUS_ERROR = 10040;
	String COUPON_PRODUCE_GET_STATUS_MSG = "线下兑换优惠券时，此优惠码已经失效!";
	
	long COUPON_DRAW_CALLBACK_ERROR = 10041;
	String COUPON_DRAW_CALLBACK_MSG = "微信优惠券回调绑定用户时，pushId,customerId,getGetChannel,couponCodeId必须不能为空";
	
	long COUPON_PRODUCE_HAS_GET_ERROR = 10042;
	String COUPON_PRODUCE_HAS_GET__MSG = "该优惠码已经被兑换使用!";
	
	long COUPON_PRODUCE_START_TIME_ERROR = 10043;
	String COUPON_PRODUCE_START_TIME_MSG = "对不起，您的优惠券未到可用时间，请稍后使用~";
	
	long COUPON_PRODUCE_STATUS_ERROR = 10044;
	String COUPON_PRODUCE_STATUS_MSG = "优惠券状态不正确，多种场景文案定义!";
	
	long COUPON_PRODUCE_CODE_ERROR = 10045;
	String COUPON_PRODUCE_CODE_MSG = "为用户分配优惠券码失败!";
	
	long COUPON_PRODUCE_CLEAR_MISMATCHING = 10046;
	String COUPON_PRODUCE_CLEAR_MISMATCHING_MSG = "未找到可删除的优惠券码!";
	
	long COUPON_PRESENT_CODE_ERROR = 10047;
	String COUPON_PRESENT_CODE_MSG = "给顾客赠送优惠券失败!";
	
	long COUPON_PRESENT_PARAM_ERROR = 10048;
	String COUPON_PRESENT_PARAM_MSG = "给顾客赠送优惠券时，customerId、storeId必须不能为空，并且优惠券数量必须>1!";
	
	long COUPON_PRESENT_COUNT_ERROR = 10049;
	String COUPON_PRESENT_COUNT_MSG = "给顾客赠送优惠券时，更新优惠券的领取数量异常!";
	

	long WECHAT_MASS_OPENID_ERROR = 46001;
	String WECHAT_MASS_OPENID_MSG = "群发推送消息openid数量错误";

	long OPEN_WX_AUTH_ERROR = 44046;
	String OPEN_WX_AUTH_MSG = "公众号未授权";
	
	long OPEN_WX_AUTH_OPRATION_ERROR = 44047;
	String OPEN_WX_AUTH_OPRATION_MSG="公众号授权操作错误,请按授权流程授权！";
	
	long WECHAT_TMPL_NOT_OPEN_ERROR = 45001;
	String WECHAT_TMPL_NOT_OPEN_MSG = "未开通模版消息!";
	
	long WECHAT_TMPL_CONFLICT_ERROR = 45027;
	String WECHAT_TMPL_CONFLICT_MSG = "模版消息行业不匹配!";
	
	long WECHAT_TMPL_KEYWORD_NUM_ERROR = 45028;
	String WECHAT_TMPL_KEYWORD_NUM_MSG = "模版消息关键词数量不匹配!";
	
	long WECHAT_TMPL_NOT_EXISTS_ERROR = 45029;
	String WECHAT_TMPL_NOT_EXISTS_MSG = "未找到相应模板!";
	
	//礼遇模块使用的错误码25001--30000
	long PRESENT_NOT_RECEIVE_ERROR=25001;
	String PRESENT_NOT_RECEIVE_MSG="用户未领取礼遇！";
	
	long PRESENT_NOT_FOUND_ERROR=25002;
	String PRESENT_NOT_FOUND_MSG="会员礼遇不存在或已失效！";
	
	long PRESENT_PARAM_NULL_ERROR=25003;
	String PRESENT_PARAM_NULL_MSG="参数不能为空！";
	
	long PRESENT_UINTE_DEL_FIALD_ERROR=25008;
	String PRESENT_UINTE_DEL_FIALED_MSG="会员礼遇领取绑定失败！";
	
	long PRESENT_TAG_SAVE_FIALD_ERROR=25004;
	String PRESENT_TAG_SAVE_FIALD_MSG="会员礼遇标签对象保存失败！";
	
	long PRESENT_COUPON_SAVE_FIALD_ERROR=25005;
	String PRESENT_COUPON_SAVE_FIALD_MSG="会员礼遇优惠券对象保存失败！";
	
	long PRESENT_ARTICLE_SAVE_FIALD_ERROR=25006;
	String PRESENT_ARTICLE_SAVE_FIALD_MSG="会员礼遇富文本对象保存失败！";
	
	long PRESENT_SAVE_FIALD_ERROR=25007;
	String PRESENT_SAVE_FIALD_MSG="会员礼遇对象保存失败！";
	
	long PRESENT_DELETE_TAG_FIALD_ERROR=25009;
	String PRESENT_DELETE_TAG_FIALD_MSG="会员礼遇关联标签删除失败！";
	
	long PRESENT_UPDATE_FIALD_ERROR=25010;
	String PRESENT_UPDATE_FIALD_MSG="会员礼遇更新失败！";
	
	long PRESENT_COUPON_UPDATE_FIALD_ERROR=25011;
	String PRESENT_COUPON_UPDATE_FIALD_MSG="会员礼遇优惠券对象更新失败！";
	
	long PRESENT_DELETE_FIALD_ERROR=25012;
	String PRESENT_DELETE_FIALD_MSG="会员礼遇删除失败！";
	
	long CUSTOMER_TAG_FOUND_FIALD_ERROR=25013;
	String CUSTOMER_TAG_FOUND_FIALD_MSG="用户查询标签对象查找失败！";
	
	long PRESENT_LEVEL_UPDATE_FIALD_ERROR=25014;
	String PRESENT_LEVEL_UPDATE_FIALD_MSG="会员礼遇级别更新失败！";
	
	long PRESENT_LEVEL_FOUNDTARGET_FIALD_ERROR=25014;
	String PRESENT_LEVEL_FOUNDTARGET_FIALD_MSG="会员礼遇级别无下调或上调对象！";
}
