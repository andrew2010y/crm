package com.bigaka.crm.customer.model;

import java.io.Serializable;
import java.util.List;


/**
 * 顾客列表检索条件
 * @author Dylan Tao 
 * @date 2015-12-01
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 

public class CustSearchParam implements Serializable{

	private static final long serialVersionUID = -7445493299072871258L;
	
	private Long phone;
	private Integer customerId;
	private String name;
	private boolean isDirectShop;
	private List<Integer> subStoreIds;
	
	private Byte registerType;  //注册类型 [1创客源2微商城3店客源4数据中心5创客链接]
	private Byte registerChannel; //注册渠道 [1手机2微信]
	private Integer storeId;
	
	private Integer parentStoreId;
	
	private String minRegisterTime;
	private String maxRegisterTime;
	private String minConsumeTime;
	private String maxConsumeTime;
	
	private Long minPoint;  //剩余积分
	private Long maxPoint;
	private Byte state;
	
	private Long[] tags;
	
	private Double minCustomerPrice;  //累计消费
	private Double maxCustomerPrice;
	
	private Double minAvgPrice;  //单均价
	private Double maxAvgPrice;
	
	private Double minTotalCount;  //消费次数
	private Double maxTotalCount;
	
	private Byte rate;
	private Long minRate;
	private Long maxRate;
	
	private Byte[] sex;
	
	private Integer cityCode;
	
	private String minBirthDate;
	private String maxBirthDate;
	
	private byte registerPhone;  //绑定手机 1 手机渠道
	private byte registerWechat; //绑定微信 1 微信渠道
	
	private int pageNo;
	private int pageSize;
	
	// 未做查询筛选
	private Integer perfectDegree;  //信息完成程度  0未完善  1以完善
	private Byte followPublicNum;  //关注公众号状态  0 未关注  1已关注
	private Long minAccrualPoint;	//累计积分  最小值   
	private Long maxAccrualPoint;	//累计积分   最大值
	private Double maxNowCustomerPrice;//最近消费   最高消费金额
	private Double minNowCustomerPrice;//最近消费  最低消费金额  
	private String cardNo;   //卡号
	private String nickName;  //昵称
	
	private Integer allCustomerId; //获取所有会员id参数   0 不获取  1获取
	
	
	
	public Integer getAllCustomerId() {
		return allCustomerId;
	}
	public void setAllCustomerId(Integer allCustomerId) {
		this.allCustomerId = allCustomerId;
	}
	public String getCardNo() {
		return cardNo;
	}
	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public Long getMinAccrualPoint() {
		return minAccrualPoint;
	}
	public void setMinAccrualPoint(Long minAccrualPoint) {
		this.minAccrualPoint = minAccrualPoint;
	}
	public Long getMaxAccrualPoint() {
		return maxAccrualPoint;
	}
	public void setMaxAccrualPoint(Long maxAccrualPoint) {
		this.maxAccrualPoint = maxAccrualPoint;
	}
	public Integer getPerfectDegree() {
		return perfectDegree;
	}
	public void setPerfectDegree(Integer perfectDegree) {
		this.perfectDegree = perfectDegree;
	}
	public Byte getFollowPublicNum() {
		return followPublicNum;
	}
	public void setFollowPublicNum(Byte followPublicNum) {
		this.followPublicNum = followPublicNum;
	}
	public Double getMaxNowCustomerPrice() {
		return maxNowCustomerPrice;
	}
	public void setMaxNowCustomerPrice(Double maxNowCustomerPrice) {
		this.maxNowCustomerPrice = maxNowCustomerPrice;
	}
	public Double getMinNowCustomerPrice() {
		return minNowCustomerPrice;
	}
	public void setMinNowCustomerPrice(Double minNowCustomerPrice) {
		this.minNowCustomerPrice = minNowCustomerPrice;
	}
	public int getPageNo() {
		if(pageNo<0){
			pageNo=0;
		}
		return pageNo;
	}
	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}
	public int getPageSize() {
		if(pageSize<5){
			pageSize=5;
		}
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public byte getRegisterPhone() {
		return registerPhone;
	}
	public void setRegisterPhone(byte registerPhone) {
		this.registerPhone = registerPhone;
	}
	public byte getRegisterWechat() {
		return registerWechat;
	}
	public void setRegisterWechat(byte registerWechat) {
		this.registerWechat = registerWechat;
	}
	public Long getPhone() {
		return phone;
	}
	public void setPhone(Long phone) {
		this.phone = phone;
	}
	public Integer getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Byte getRegisterType() {
		return registerType;
	}
	public void setRegisterType(Byte registerType) {
		this.registerType = registerType;
	}
	public Byte getRegisterChannel() {
		return registerChannel;
	}
	public void setRegisterChannel(Byte registerChannel) {
		this.registerChannel = registerChannel;
	}
	public Integer getStoreId() {
		return storeId;
	}
	public void setStoreId(Integer storeId) {
		this.storeId = storeId;
	}
	public String getMinRegisterTime() {
		return minRegisterTime;
	}
	public void setMinRegisterTime(String minRegisterTime) {
		this.minRegisterTime = minRegisterTime;
	}
	public String getMaxRegisterTime() {
		return maxRegisterTime;
	}
	public void setMaxRegisterTime(String maxRegisterTime) {
		this.maxRegisterTime = maxRegisterTime;
	}
	public String getMinConsumeTime() {
		return minConsumeTime;
	}
	public void setMinConsumeTime(String minConsumeTime) {
		this.minConsumeTime = minConsumeTime;
	}
	public String getMaxConsumeTime() {
		return maxConsumeTime;
	}
	public void setMaxConsumeTime(String maxConsumeTime) {
		this.maxConsumeTime = maxConsumeTime;
	}
	
	public Long getMinPoint() {
		return minPoint;
	}
	public void setMinPoint(Long minPoint) {
		this.minPoint = minPoint;
	}
	public Long getMaxPoint() {
		return maxPoint;
	}
	public void setMaxPoint(Long maxPoint) {
		this.maxPoint = maxPoint;
	}
	public Byte getState() {
		return state;
	}
	public void setState(Byte state) {
		this.state = state;
	}
	public Long[] getTags() {
		return tags;
	}
	public void setTags(Long[] tags) {
		this.tags = tags;
	}
	public Double getMinCustomerPrice() {
		return minCustomerPrice;
	}
	public void setMinCustomerPrice(Double minCustomerPrice) {
		this.minCustomerPrice = minCustomerPrice;
	}
	public Double getMaxCustomerPrice() {
		return maxCustomerPrice;
	}
	public void setMaxCustomerPrice(Double maxCustomerPrice) {
		this.maxCustomerPrice = maxCustomerPrice;
	}
	public Double getMinAvgPrice() {
		return minAvgPrice;
	}
	public void setMinAvgPrice(Double minAvgPrice) {
		this.minAvgPrice = minAvgPrice;
	}
	public Double getMaxAvgPrice() {
		return maxAvgPrice;
	}
	public void setMaxAvgPrice(Double maxAvgPrice) {
		this.maxAvgPrice = maxAvgPrice;
	}
	public Double getMinTotalCount() {
		return minTotalCount;
	}
	public void setMinTotalCount(Double minTotalCount) {
		this.minTotalCount = minTotalCount;
	}
	public Double getMaxTotalCount() {
		return maxTotalCount;
	}
	public void setMaxTotalCount(Double maxTotalCount) {
		this.maxTotalCount = maxTotalCount;
	}
	public Byte getRate() {
		return rate;
	}
	public void setRate(Byte rate) {
		this.rate = rate;
	}
	public Long getMinRate() {
		return minRate;
	}
	public void setMinRate(Long minRate) {
		this.minRate = minRate;
	}
	public Long getMaxRate() {
		return maxRate;
	}
	public void setMaxRate(Long maxRate) {
		this.maxRate = maxRate;
	}
	public Byte[] getSex() {
		return sex;
	}
	public void setSex(Byte[] sex) {
		this.sex = sex;
	}
	public Integer getCityCode() {
		return cityCode;
	}
	public void setCityCode(Integer cityCode) {
		this.cityCode = cityCode;
	}
	public String getMinBirthDate() {
		return minBirthDate;
	}
	public void setMinBirthDate(String minBirthDate) {
		this.minBirthDate = minBirthDate;
	}
	public String getMaxBirthDate() {
		return maxBirthDate;
	}
	public void setMaxBirthDate(String maxBirthDate) {
		this.maxBirthDate = maxBirthDate;
	}
	public Integer getParentStoreId() {
		return parentStoreId;
	}
	public void setParentStoreId(Integer parentStoreId) {
		this.parentStoreId = parentStoreId;
	}
	public boolean isDirectShop() {
		return isDirectShop;
	}
	public void setDirectShop(boolean isDirectShop) {
		this.isDirectShop = isDirectShop;
	}
	public List<Integer> getSubStoreIds() {
		return subStoreIds;
	}
	public void setSubStoreIds(List<Integer> subStoreIds) {
		this.subStoreIds = subStoreIds;
	}
	
}

