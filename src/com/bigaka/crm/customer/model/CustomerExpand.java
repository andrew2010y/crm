package com.bigaka.crm.customer.model;

import java.io.Serializable;

/**
 * 会员扩展信息表
 * 
 * @author Wangzh 
 * @date 2016-06-01 
 */ 

public class CustomerExpand implements Serializable{
	
	private static final long serialVersionUID = 6351409764433825793L;
	
	private Long customerExpandId;
	//用户id
	private Integer customerId;
	//门店id
	private Integer storeId;
	//是否关注公众号  0 未关注  1 已关注
	private Byte followPublicNum;
	//会员信息完善程度
	private Byte perfectDegree;
	//是否首次关注公众号  0未关注  1首次关注  2非首次关注
	private Byte firstFollowPublicNum;
	//是否首次关注微信账号  0 未关注  1首次关注  2非首次关注
	private Byte firstFollowWechat;
	//是否完善用户信息到100%  0 非首次  1首次更新到100%
	private Byte firstFinishDegree;
	
	
	public Byte getFirstFinishDegree() {
		return firstFinishDegree;
	}

	public void setFirstFinishDegree(Byte firstFinishDegree) {
		this.firstFinishDegree = firstFinishDegree;
	}

	//ext
	private Byte state;
	private String openId;

	public Byte getState() {
		return state;
	}

	public void setState(Byte state) {
		this.state = state;
	}

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public void setCustomerExpandId(Long customerExpandId){
		this.customerExpandId=customerExpandId;
	}

	public Long getCustomerExpandId(){
		return customerExpandId;
	}

	public void setCustomerId(Integer customerId){
		this.customerId=customerId;
	}

	public Integer getCustomerId(){
		return customerId;
	}

	public void setStoreId(Integer storeId){
		this.storeId=storeId;
	}

	public Integer getStoreId(){
		return storeId;
	}

	public void setFollowPublicNum(Byte followPublicNum){
		this.followPublicNum=followPublicNum;
	}

	public Byte getFollowPublicNum(){
		return followPublicNum;
	}

	public void setPerfectDegree(Byte perfectDegree){
		this.perfectDegree=perfectDegree;
	}

	public Byte getPerfectDegree(){
		return perfectDegree;
	}

	public void setFirstFollowPublicNum(Byte firstFollowPublicNum){
		this.firstFollowPublicNum=firstFollowPublicNum;
	}

	public Byte getFirstFollowPublicNum(){
		return firstFollowPublicNum;
	}

	public void setFirstFollowWechat(Byte firstFollowWechat){
		this.firstFollowWechat=firstFollowWechat;
	}

	public Byte getFirstFollowWechat(){
		return firstFollowWechat;
	}

}

