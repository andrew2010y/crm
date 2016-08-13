package com.bigaka.crm.customer.service;

import java.util.List;

import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.customer.model.CustomerAddress;


/**
 * 顾客收货地址
 * @author Dylan_Tao
 * @date 2015-12-15
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
public interface CustomerAddressService{
	
	ServiceResult<List<CustomerAddress>> getCustomerAddressList(String token, CustomerAddress address);
	
	ServiceResult<CustomerAddress> getCustomerAddress(Long customerAddressId);
	
	ServiceResult<Long> saveCustomerAddress(String token, CustomerAddress address);
	
	ServiceResult<Boolean> updateCustomerAddress(String token, CustomerAddress address);
	
	ServiceResult<Boolean> deleteCustomerAddress(String token, CustomerAddress address);
	
}
