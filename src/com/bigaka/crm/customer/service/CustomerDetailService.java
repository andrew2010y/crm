package com.bigaka.crm.customer.service;

import java.util.List;

import com.bigaka.crm.common.model.Page;
import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.customer.model.CustSearchParam;
import com.bigaka.crm.customer.model.CustomerDetail;
import com.bigaka.crm.customer.model.CustomerPointChannelEnum;
import com.bigaka.crm.form.model.FormStoreProp;
import com.bigaka.crm.pointlog.model.PointLog;


/**
 * 顾客详细信息
 * @author Dylan_Tao
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
public interface CustomerDetailService{
	
	ServiceResult<CustomerDetail> getCustomerDetail(CustomerDetail detail);
	@Deprecated
	ServiceResult<String> updateCustomerDetail(String token, CustomerDetail detail);
	/**
	 * 获取会员列表
	 */
	ServiceResult<Page<CustomerDetail>> getCustomerPage(CustSearchParam param,List<FormStoreProp> customProp,Page<CustomerDetail> page);
	
	ServiceResult<CustomerDetail> getCustDetailIncludeAddress(CustomerDetail detail);
	
	ServiceResult<Long> getCustPoint(CustomerDetail detail);
	
	/**
	 * 更改顾客积分dubbo服务
	 */
	ServiceResult<Boolean> updateCustPoint(PointLog log,CustomerPointChannelEnum pointChannel);

	ServiceResult<Integer> getIntegrationByOrderId(Integer orderId,String type);
}
