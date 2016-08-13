package com.bigaka.crm.common.model;

/**
 * csb oo对象
 * @author Dylan Tao 
 * @date 2016年7月12日
 * Copyright 2015 bigaka.com. All Rights Reserved.
 */
public class CSBParam<T> {
	
	private String storeid;
	private String model;
	private String method;
	private T msg;
	
	public String getStoreid() {
		return storeid;
	}
	public void setStoreid(String storeid) {
		this.storeid = storeid;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getMethod() {
		return method;
	}
	public void setMethod(String method) {
		this.method = method;
	}
	public T getMsg() {
		return msg;
	}
	public void setMsg(T msg) {
		this.msg = msg;
	}
	
	
}
