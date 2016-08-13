package com.bigaka.crm.customer.dao;

import java.util.List;

import com.bigaka.crm.customer.model.CustomerDetail;
import com.bigaka.crm.form.model.FormStoreProp;
import com.bigaka.crm.form.model.FormStoreProp.FormType;


/**
 * 商户自定义表单属性
 * @author Dylan_Tao
 * @date 2016-06-14
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
public interface FormStorePropDao {
	
	List<FormStoreProp> getFormStoreProp(Integer storeId, Boolean useState);
	
	List<FormStoreProp> getFormStoreProp(CustomerDetail detail,boolean useState);
	
	boolean isExistDefaultProp(Integer storeId, FormType type);
	
	boolean saveDefaultProp(FormStoreProp prop);
	
	boolean updateDefaultProp(FormStoreProp prop);
	
	boolean batchUpdateCustomProp(List<List<Object>> paramList);
	
}
