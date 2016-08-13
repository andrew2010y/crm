package com.bigaka.crm.customer.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 会员新增统计
 * @author yanxk
 * @param <T>
 * @date 2015-12-11
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 

public class CustomerChannelCountExt<CustomerReport> implements Serializable {
  
	private static final long serialVersionUID = -2991632191297187086L;

	protected List<CustomerReport> result =  new ArrayList<CustomerReport>();
	
	private int year;
	
	private int month;
	
	private int date;
	
	private int hour;
	
	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getMonth() {
		return month;
	}

	public void setMonth(int month) {
		this.month = month;
	}

	public int getDate() {
		return date;
	}

	public void setDate(int date) {
		this.date = date;
	}

	public int getHour() {
		return hour;
	}

	public void setHour(int hour) {
		this.hour = hour;
	}

	public List<CustomerReport> getResult() {
		return result;
	}

	public void setResult(List<CustomerReport> result) {
		this.result = result;
	}
}
