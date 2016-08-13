package com.bigaka.crm.pointlog.model;

import java.io.Serializable;

import com.bigaka.crm.common.assist.LongToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * 积分消费记录
 * @author Dingjn 
 * @date 2015-12-11
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 
 
public class PointLog implements Serializable{

	private static final long serialVersionUID = -5268391798014189284L;
	
	@JsonSerialize(using = LongToStringSerializer.class) 
	private Long pointLogId;    //积分记录主键
	
	private Integer storeId;    //店面id
	private Integer customerId;  //用户id
	private Integer orderId;     //订单id
	private Integer clerkId;     //积分发放者
	private Boolean operation;   //操作 0减少  1增加
	private Integer value;      //积分数
	private String remark;      //备注说明
	private Long createTime;    //记录时间
	
	
	//参数
	private Integer consumeChannel;  //渠道   消费入口[1微商城 抽奖、签到、注册[线上]2店客源[线下]3创客源4创客链接  5数据中心]
	private String startTime;			//开始时间
	private String endTime;			//结束时间
	private Integer opera;         	//操作初始值获取
    private String orderNo;    		//订单编号
    
    

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public Integer getOpera() {
		return opera;
	}

	public void setOpera(Integer opera) {
		this.opera = opera;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public Integer getConsumeChannel() {
		return consumeChannel;
	}

	public void setConsumeChannel(Integer consumeChannel) {
		this.consumeChannel = consumeChannel;
	}

	public void setPointLogId(Long pointLogId){
		this.pointLogId=pointLogId;
	}

	public Long getPointLogId(){
		return pointLogId;
	}

	public void setStoreId(Integer storeId){
		this.storeId=storeId;
	}

	public Integer getStoreId(){
		return storeId;
	}

	public void setCustomerId(Integer customerId){
		this.customerId=customerId;
	}

	public Integer getCustomerId(){
		return customerId;
	}

	public void setOrderId(Integer orderId){
		this.orderId=orderId;
	}

	public Integer getOrderId(){
		return orderId;
	}

	public void setClerkId(Integer clerkId){
		this.clerkId=clerkId;
	}

	public Integer getClerkId(){
		return clerkId;
	}

	public void setOperation(Boolean operation){
		this.operation=operation;
	}

	public Boolean getOperation(){
		return operation;
	}

	public void setValue(Integer value){
		this.value=value;
	}

	public Integer getValue(){
		return value;
	}

	public void setRemark(String remark){
		this.remark=remark;
	}

	public String getRemark(){
		return remark;
	}

	public void setCreateTime(Long createTime){
		this.createTime=createTime;
	}

	public Long getCreateTime(){
		return createTime;
	}

}

