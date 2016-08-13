package com.bigaka.crm.customer.service;

import java.util.HashMap;

import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.customer.model.CustomerDetail;
import com.bigaka.crm.form.model.FormStorePropExt;


/**
 * 商户自定义表单属性
 * @author Dylan_Tao
 * @date 2016-06-14
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
public interface FormStorePropService{
	
		ServiceResult<HashMap<String, FormStorePropExt>> getFormStoreProp(Integer storeId);
		
		ServiceResult<FormStorePropExt> getFormStoreUsingProp(Integer storeId);
		
		ServiceResult<FormStorePropExt> getFormStoreUsingProp(CustomerDetail detail);
	
		ServiceResult<Boolean> updateFormStoreProp(Integer storeId, HashMap<String, FormStorePropExt> data);
}
