package com.bigaka.crm.form.model;

import java.io.Serializable;
import java.util.List;

/**
 * 商户自定义表单属性
 * @author Dylan Tao 
 * @date 2016-06-14
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 

public class FormStorePropExt implements Serializable{
	
	private static final long serialVersionUID = -2325503379593033841L;

	private List<String> defaultProp;
	
	private List<FormStoreProp> customProp;

	public List<String> getDefaultProp() {
		return defaultProp;
	}

	public void setDefaultProp(List<String> defaultProp) {
		this.defaultProp = defaultProp;
	}

	public List<FormStoreProp> getCustomProp() {
		return customProp;
	}

	public void setCustomProp(List<FormStoreProp> customProp) {
		this.customProp = customProp;
	}
	
}

