package com.bigaka.crm.customer.model;

import java.io.Serializable;

/**
 * 顾客消费统计
 * @author Dylan Tao 
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 

public class CustomerCount implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1743900843574001505L;
	private Integer customerId;
	private Double customerPrice;
	private Long totalCount;
	private Long yearCount;
	private Long monthCount;
	private Long dayCount;
	private Long consumeTime;
	private Integer consumeChannel;
	private Double price;
	


	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getConsumeChannel() {
		return consumeChannel;
	}

	public void setConsumeChannel(Integer consumeChannel) {
		this.consumeChannel = consumeChannel;
	}

	public void setCustomerId(Integer customerId){
		this.customerId=customerId;
	}

	public Integer getCustomerId(){
		return customerId;
	}

	public void setCustomerPrice(Double customerPrice){
		this.customerPrice=customerPrice;
	}

	public Double getCustomerPrice(){
		return customerPrice;
	}

	public void setTotalCount(Long totalCount){
		this.totalCount=totalCount;
	}

	public Long getTotalCount(){
		return totalCount;
	}

	public void setYearCount(Long yearCount){
		this.yearCount=yearCount;
	}

	public Long getYearCount(){
		return yearCount;
	}

	public void setMonthCount(Long monthCount){
		this.monthCount=monthCount;
	}

	public Long getMonthCount(){
		return monthCount;
	}

	public void setDayCount(Long dayCount){
		this.dayCount=dayCount;
	}

	public Long getDayCount(){
		return dayCount;
	}

	public void setConsumeTime(Long consumeTime){
		this.consumeTime=consumeTime;
	}

	public Long getConsumeTime(){
		return consumeTime;
	}

}

