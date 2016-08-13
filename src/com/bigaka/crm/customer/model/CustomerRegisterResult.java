package com.bigaka.crm.customer.model;
/**
 * 统一错误返回
 * @author Dylan Tao 
 * @date 2015年12月24日
 * Copyright 2015 bigaka.com. All Rights Reserved.
 */
public class CustomerRegisterResult {
	private Integer userId;
	private Integer result;
	private String message;
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getResult() {
		return result;
	}
	public void setResult(Integer result) {
		this.result = result;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
