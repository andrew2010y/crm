package com.bigaka.crm.customer.model;

import java.io.Serializable;
import java.util.List;

import com.bigaka.crm.form.model.FormStoreProp;

public class CustomerListExt implements Serializable{
	
	private static final long serialVersionUID = -2718712149935386098L;
	
	private CustSearchParam param;
	private List<FormStoreProp> customPropList;
	public CustSearchParam getParam() {
		return param;
	}
	public void setParam(CustSearchParam param) {
		this.param = param;
	}
	public List<FormStoreProp> getCustomPropList() {
		return customPropList;
	}
	public void setCustomPropList(List<FormStoreProp> customPropList) {
		this.customPropList = customPropList;
	}
	
	
}
