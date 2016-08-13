package com.bigaka.crm.customer.model;

import java.io.Serializable;

public class CustomerSearchParam implements Serializable{
 
	private static final long serialVersionUID = -9008472682841766027L;
	 
	private DateEnum dateEnum;
	private Integer storeId;
	private Integer[] subStoreId;
	private Long startTime;
	private Long endTime;
	
	public Long getStartTime() {
		return startTime;
	}
	public void setStartTime(Long startTime) {
		this.startTime = startTime;
	}
	public Long getEndTime() {
		return endTime;
	}
	public void setEndTime(Long endTime) {
		this.endTime = endTime;
	}
	public Integer[] getSubStoreId() {
		return subStoreId;
	}
	public void setSubStoreId(Integer[] subStoreId) {
		this.subStoreId = subStoreId;
	}
	public DateEnum getDateEnum() {
		return dateEnum;
	}
	public void setDateEnum(DateEnum dateEnum) {
		this.dateEnum = dateEnum;
	}
	public Integer getStoreId() {
		return storeId;
	}
	public void setStoreId(Integer storeId) {
		this.storeId = storeId;
	}
	
	public enum DateEnum {
	    // 利用构造函数传参
	    Date30 (30), Date7 (7),  Hour48(48),  Hour24(24);

	    // 定义私有变量
	    private int code ;

	    private DateEnum(int code) {
	        this.code = code;
	    }

	    @Override
	    public String toString() {
	        return String.valueOf (this.code);
	    }

		public int getCode() {
			return code;
		}
	 }
	
	public enum CustomerGroupByEnum {
	    // 利用构造函数传参
	    DATE(0), HOUR(1) ,STOREID(2);

	    // 定义私有变量
	    private int code ;

	    private CustomerGroupByEnum(int code) {
	        this.code = code;
	    }

	    @Override
	    public String toString() {
	        return String.valueOf (this.code);
	    }

		public int getCode() {
			return code;
		}
	 }
}

