package com.bigaka.crm.customer.model;

/**
 * 会员积分变更 微商城渠道下积分变更渠道
 * @author wang
 * @date 2016年6月15日
 */
public enum CustomerPointChannelEnum {
	
	//0 注册送积分  1关注公众号（首次）送积分    2 绑定微信号（首次）送积分  3 消费金额送积分  4 完善会员信息送积分 5 领取时,积分兑换的优惠券
	REGISTER(0),PUBLIC_NUMBER(1),WECHAT(2),CONSUME_NUMBER(3),CUSTOMER_INFORMATION(4),RECEIVE_COUPON(5);
	private Integer channel;
		
	private CustomerPointChannelEnum(Integer channel){
		this.channel=channel;
	}
		
	public Integer getChannel(){
		return channel;
	}
}
