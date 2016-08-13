package com.bigaka.crm.tag.model;

import java.io.Serializable;

import com.bigaka.crm.common.assist.LongToStringSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * 标签
 * @author Dingjn 
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 

public class Tag implements Serializable{

	private static final long serialVersionUID = 4799636195701928970L;
	
	@JsonSerialize(using = LongToStringSerializer.class) 
	private Long tagId;
	
	private Integer storeId;
	private String name;
	private Long count;
	private Integer clerkId;
	private Integer sort;
	private Byte state;
	private Long updateTime;
	private Long createTime;
	private Byte select;
	public Byte getSelect() {
		return select;
	}

	public void setSelect(Byte select) {
		this.select = select;
	}

	//ext
	private String thirdPartyCode;//第三方标签码
	
	public void setTagId(Long tagId){
		this.tagId=tagId;
	}

	public Long getTagId(){
		return tagId;
	}

	public void setStoreId(Integer storeId){
		this.storeId=storeId;
	}

	public Integer getStoreId(){
		return storeId;
	}

	public void setName(String name){
		this.name=name;
	}

	public String getName(){
		return name;
	}

	public void setCount(Long count){
		this.count=count;
	}

	public Long getCount(){
		return count;
	}

	public void setClerkId(Integer clerkId){
		this.clerkId=clerkId;
	}

	public Integer getClerkId(){
		return clerkId;
	}

	public void setSort(Integer sort){
		this.sort=sort;
	}

	public Integer getSort(){
		return sort;
	}

	public void setState(Byte state){
		this.state=state;
	}

	public Byte getState(){
		return state;
	}

	public void setUpdateTime(Long updateTime){
		this.updateTime=updateTime;
	}

	public Long getUpdateTime(){
		return updateTime;
	}

	public void setCreateTime(Long createTime){
		this.createTime=createTime;
	}

	public Long getCreateTime(){
		return createTime;
	}

	public String getThirdPartyCode() {
		return thirdPartyCode;
	}

	public void setThirdPartyCode(String thirdPartyCode) {
		this.thirdPartyCode = thirdPartyCode;
	}

}

