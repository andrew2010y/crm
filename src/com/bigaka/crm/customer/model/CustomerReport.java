package com.bigaka.crm.customer.model;

import java.io.Serializable;

/**
 * 会员新增统计
 * @author yanxk
 * @date 2015-12-11
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 

public class CustomerReport implements Serializable{
 
	private static final long serialVersionUID = -6817869868563675754L;
	private Integer count;
	private String createTime;
	private Integer registerChannel;
	private int hour;
	private int storeId;
	private Integer parentStoreId;
	
	public Integer getParentStoreId() {
		return parentStoreId;
	}
	public void setParentStoreId(Integer parentStoreId) {
		this.parentStoreId = parentStoreId;
	}
	public int getStoreId() {
		return storeId;
	}
	public void setStoreId(int storeId) {
		this.storeId = storeId;
	}
	public int getHour() {
		return hour;
	}
	public void setHour(int hour) {
		this.hour = hour;
	}
	public Integer getRegisterChannel() {
		return registerChannel;
	}
	public void setRegisterChannel(Integer registerChannel) {
		this.registerChannel = registerChannel;
	}
	public Integer getCount() {
		if(count==null){
			return 0;
		}	
		return count;
	}
	public void setCount(Integer count) {
		this.count = count;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

}

