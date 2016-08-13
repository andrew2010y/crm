package com.bigaka.crm.customer.dao;

import java.util.List;

import com.bigaka.crm.common.model.Page;
import com.bigaka.crm.customer.model.Customer;
import com.bigaka.crm.customer.model.Customer.ThirdSupportKey;


/**
 * 顾客基本信息
 * @author Dylan_Tao
 * @date 2015-12-01
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
public interface CustomerDao {
	
	int saveCustomer(Customer customer);
	
	Customer getCustomer(Customer customer);
	
	List<Customer> getCustomerList(Customer customer);
	
	Customer getCustomerByCid(Integer customerId);
	
	boolean updateCustomer(Customer customer);
	
	boolean updateCustomerPwd(Customer customer);
	
	boolean delCustomer(Customer customer);
	
	long getCustomerCount(Integer storeId,List<Integer> subStoreIds,Long startTime, Long endTime);
	
	Page<Customer> getCustomerPage(List<Integer> subStoreIds, Page<Customer> page);
	
	Page<Customer> getPageByParentStoreId(List<Integer> subStoreIds, Page<Customer> page);
	
	Customer getByParentStoreIdAndPhone(Integer parentStoreId,Long phone);
	
	///MembershipCode getMemberShipCode(Integer customerId, Long cardId);

	List<Customer> getCustomerByStoreId(List<Integer> ids);

	boolean updateCustomerDetailPhone(Customer cust);
	
	List<String> getOpenIdList(Integer storeId);
	
	List<Customer> getCustomerBindConn(Integer parentStoreId,List<String> paramList,ThirdSupportKey key);
}
