package com.bigaka.crm.customer.dao;

import java.util.List;

import com.bigaka.crm.common.model.Page;
import com.bigaka.crm.customer.model.CustSearchParam;
import com.bigaka.crm.customer.model.CustomerDetail;
import com.bigaka.crm.form.model.FormStoreProp;


/**
 * 顾客详细信息
 * @author Dylan_Tao
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
public interface CustomerDetailDao {
	
	CustomerDetail getCustomerDetail(CustomerDetail detail);
	
	boolean saveCustomerDetail(CustomerDetail detail);
	
	boolean updateCustomerDetail(CustomerDetail detail);
	
	boolean delCustomerDetail(CustomerDetail detail);
	
	/**
	 * 获取会员列表
	 */
	Page<CustomerDetail> getCustomerPage(CustSearchParam param, List<FormStoreProp> customProp,Page<CustomerDetail> page);
	
	CustomerDetail getCustDetailExt(CustomerDetail detail);

	Page<CustomerDetail> getCustomerByUserId(List<Long> userIds,Page<CustomerDetail> page);

	Page<CustomerDetail> getUserByParams(List<Long> userIds, Page<CustomerDetail> page, String param);
	
	CustomerDetail getCustomerPoint(CustomerDetail detail);

	Page<CustomerDetail> getCustomerDetailByTagId(Page<CustomerDetail> page,
			Long tagId);

	boolean updateUserScore(Integer customerId, boolean b, Integer incrScore);

	Integer getIntegrationByOrderId(Integer orderId, String type);

	CustomerDetail getDysCustomerDetail(CustomerDetail detail, List<String> prop);
	
	/**
	 * 获取昵称、卡号连表查询
	 */
	CustomerDetail getCustomerDetailAndCardNo(Integer customerId);
}
