package com.bigaka.crm.customer.dao;

import java.util.List;

import com.bigaka.crm.customer.model.CustomerAddress;


/**
 * 顾客收货地址
 * @author Dylan_Tao
 * @date 2015-12-15
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
public interface CustomerAddressDao {
	
	List<CustomerAddress> getCustomerAddressList(CustomerAddress address);
	
	CustomerAddress getCustomerAddress(CustomerAddress address);
	
	boolean saveCustomerAddress(CustomerAddress address);
	
	boolean updateCustomerAddress(CustomerAddress address);
	
	boolean deleteCustomerAddress(CustomerAddress address);
	
	boolean resetCustomerDefaultAddress(Integer customerId);

}
