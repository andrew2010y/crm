package com.bigaka.crm.customer.model;

import java.io.Serializable;

import com.bigaka.crm.common.assist.LongToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * 顾客收货地址
 * @author Dylan Tao 
 * @date 2015-12-15
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 

public class CustomerAddress implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@JsonSerialize(using = LongToStringSerializer.class) 
	private Long customerAddressId;
	
	private Integer customerId;
	private Integer cityCode;
	private String name;
	private String phone;
	private String address;
	private Boolean isDefault;
	private String cookieId;
	private String cardNo;
	private String remark;
	private Long createTime;

	public void setCustomerAddressId(Long customerAddressId){
		this.customerAddressId=customerAddressId;
	}

	public Long getCustomerAddressId(){
		return customerAddressId;
	}

	public void setCustomerId(Integer customerId){
		this.customerId=customerId;
	}

	public Integer getCustomerId(){
		return customerId;
	}

	public void setCityCode(Integer cityCode){
		this.cityCode=cityCode;
	}

	public Integer getCityCode(){
		return cityCode;
	}

	public void setName(String name){
		this.name=name;
	}

	public String getName(){
		return name;
	}

	public void setPhone(String phone){
		this.phone=phone;
	}

	public String getPhone(){
		return phone;
	}

	public void setAddress(String address){
		this.address=address;
	}

	public String getAddress(){
		return address;
	}

	public void setIsDefault(Boolean isDefault){
		this.isDefault=isDefault;
	}

	public Boolean getIsDefault(){
		return isDefault;
	}
	
	public String getCardNo() {
		return cardNo;
	}

	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}

	public void setRemark(String remark){
		this.remark=remark;
	}

	public String getRemark(){
		return remark;
	}

	public void setCreateTime(Long createTime){
		this.createTime=createTime;
	}

	public Long getCreateTime(){
		return createTime;
	}

	public String getCookieId() {
		return cookieId;
	}

	public void setCookieId(String cookieId) {
		this.cookieId = cookieId;
	}
	
}

