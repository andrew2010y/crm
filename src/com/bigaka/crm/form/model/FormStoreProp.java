package com.bigaka.crm.form.model;

import java.io.Serializable;
import java.util.List;


/**
 * 商户自定义表单属性
 * @author Dylan Tao 
 * @date 2016-06-14
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 

public class FormStoreProp implements Serializable{ 
	
	private static final long serialVersionUID = -2236769340780242040L;

	public static final String[] defaultFormParam = new String[]{"vip_card_no","name","sex","birth_date","area_code","remark"};

	private Long storePropId;
	private Integer storeId;
	private String name;
	private String labelName;
	private String type;
	private String subType;
	private String placeholder;
	private String value;
	private String limit;
	private Boolean required;
	private Boolean useState;
	
	private List<Object> searchValue; 
	
	
	
	public List<Object> getSearchValue() {
		return searchValue;
	}

	public void setSearchValue(List<Object> searchValue) {
		this.searchValue = searchValue;
	}

	public enum FormType {
		
		INPUT("input"), SELECT("select"), TEXTAREA("textarea"), DEFAULT("default");

		private final String value;

		FormType(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
	}
	
	public enum FormSubType {
		
		MAIL("mail"), DATE("date"), CHECKBOX("checkbox"), RADIO("radio"), TEXT("text");

		private final String value;

		FormSubType(String value) {
			this.value = value;
		}
		public String getValue() {
			return value;
		}
	}

	public void setStorePropId(Long storePropId){
		this.storePropId=storePropId;
	}

	public Long getStorePropId(){
		return storePropId;
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

	public void setLabelName(String labelName){
		this.labelName=labelName;
	}

	public String getLabelName(){
		return labelName;
	}

	public void setType(String type){
		this.type=type;
	}

	public String getType(){
		return type;
	}

	public void setSubType(String subType){
		this.subType=subType;
	}

	public String getSubType(){
		return subType;
	}

	public void setPlaceholder(String placeholder){
		this.placeholder=placeholder;
	}

	public String getPlaceholder(){
		return placeholder;
	}

	public void setValue(String value){
		this.value=value;
	}

	public String getValue(){
		return value;
	}

	public void setLimit(String limit){
		this.limit=limit;
	}

	public String getLimit(){
		return limit;
	}

	public void setRequired(Boolean required){
		this.required=required;
	}

	public Boolean getRequired(){
		return required;
	}

	public void setUseState(Boolean useState){
		this.useState=useState;
	}

	public Boolean getUseState(){
		return useState;
	}

}

