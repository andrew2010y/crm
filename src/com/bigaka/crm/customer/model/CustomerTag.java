package com.bigaka.crm.customer.model;

import java.io.Serializable;

import com.bigaka.crm.common.assist.LongToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * 顾客标签
 * @author Dylan Tao 
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 

public class CustomerTag implements Serializable{

	private static final long serialVersionUID = -969614317246686124L;
	
	@JsonSerialize(using = LongToStringSerializer.class) 
	private Long customerTagId;
	
	private Integer customerId;
	private Long tagId;
	private Long createTime;
	
	//ext
	private String name;

	public void setCustomerTagId(Long customerTagId){
		this.customerTagId=customerTagId;
	}

	public Long getCustomerTagId(){
		return customerTagId;
	}

	public void setCustomerId(Integer customerId){
		this.customerId=customerId;
	}

	public Integer getCustomerId(){
		return customerId;
	}

	public void setTagId(Long tagId){
		this.tagId=tagId;
	}

	public Long getTagId(){
		return tagId;
	}

	public void setCreateTime(Long createTime){
		this.createTime=createTime;
	}

	public Long getCreateTime(){
		return createTime;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}

