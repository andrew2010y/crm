package com.bigaka.crm.common.model;

import java.io.Serializable;

import com.bigaka.crm.common.assist.ServiceException;

/**
 * dubbo服务统一返回结果集
 * @description 
 * @author Dylan Tao
 * @date 2015-11-12
 * Copyright 2015 bigaka.com. All Rights Reserved.
 */

public class ServiceResult<T> implements Serializable{
	
	private static final long serialVersionUID = -2586624936313267449L;
	
	private long code;
	private String message;
	private T result;
	
	public ServiceResult() {
	}
	
	public ServiceResult(Exception e) {
		super();
		ServiceException exception = (ServiceException)e;
		this.code = exception.getErrorCode()==null?-1:exception.getErrorCode();
		this.message = exception.getMessage();
	}
	
	public ServiceResult(long code, String message, T result) {
		super();
		this.code = code;
		this.message = message;
		this.result = result;
	}
	
	public ServiceResult(long code, T result) {
		super();
		this.code = code;
		this.message = "";
		this.result = result;
	}
	
	public ServiceResult(long code, String message) {
		super();
		this.code = code;
		this.message = message;
	}
	
	public ServiceResult(long code) {
		super();
		this.code = code;
		this.message = "";
	}

	public long getCode() {
		return code;
	}

	public void setCode(long code) {
		this.code = code;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public T getResult() {
		return result;
	}

	public void setResult(T result) {
		this.result = result;
	}
	
	

}
