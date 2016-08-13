package com.bigaka.crm.form.model;

import java.io.Serializable;

/**
 * 顾客自定义表单填写信息
 * @author Dylan Tao 
 * @date 2016-06-13
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 

public class FormCustomerProp implements Serializable{

	private static final long serialVersionUID = -7883260026946476465L;
	
	private Long customerPropId;
	private Integer customerId;
	private Long storePropId;
	private String value;

	public void setCustomerPropId(Long customerPropId){
		this.customerPropId=customerPropId;
	}

	public Long getCustomerPropId(){
		return customerPropId;
	}

	public void setCustomerId(Integer customerId){
		this.customerId=customerId;
	}

	public Integer getCustomerId(){
		return customerId;
	}

	public void setStorePropId(Long storePropId){
		this.storePropId=storePropId;
	}

	public Long getStorePropId(){
		return storePropId;
	}

	public void setValue(String value){
		this.value=value;
	}

	public String getValue(){
		return value;
	}

}

