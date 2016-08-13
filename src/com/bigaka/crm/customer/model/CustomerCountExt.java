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

public class CustomerCountExt<T> implements Serializable{
 
	private static final long serialVersionUID = 8970370047967165514L;
 
	protected List<T> result =  new ArrayList<T>();
	
	protected List<T> result2 =  new ArrayList<T>();
	
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

	public List<T> getResult() {
		return result;
	}

	public void setResult(List<T> result) {
		this.result = result;
	}

	public List<T> getResult2() {
		return result2;
	}

	public void setResult2(List<T> result2) {
		this.result2 = result2;
	}
}
