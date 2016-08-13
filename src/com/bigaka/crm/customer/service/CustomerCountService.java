package com.bigaka.crm.customer.service;

import java.util.HashMap;
import java.util.Map;

import com.bigaka.crm.common.model.Constant.OrderConstant;
import com.bigaka.crm.common.model.Page;
import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.customer.model.CustomerChannelCountExt;
import com.bigaka.crm.customer.model.CustomerCountExt;
import com.bigaka.crm.customer.model.CustomerReport;
import com.bigaka.crm.customer.model.CustomerSearchParam;
import com.bigaka.crm.customer.model.CustomerSearchParam.DateEnum;


/**
 * 顾客消费统计
 * @author Dylan_Tao
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
public interface CustomerCountService{
	
	ServiceResult<CustomerChannelCountExt<CustomerReport>> getRegisterChannelCountByHour(Integer hour,Integer storeId);
	
	ServiceResult<CustomerChannelCountExt<CustomerReport>> getRegisterChannelCountByDate(CustomerSearchParam param);
	
	ServiceResult<CustomerChannelCountExt<CustomerReport>> loadCustomerCountByEndDate(Integer date,Integer storeId);
	   
	ServiceResult<CustomerCountExt<CustomerReport>> getCustomerList(CustomerSearchParam param);
	
	ServiceResult<Long> getCustomerCount(CustomerSearchParam param);
	
	ServiceResult<Page<CustomerReport>> getTop10CustomerCount(Page<CustomerReport> page,CustomerSearchParam param,final OrderConstant orderBy);
	
	ServiceResult<Integer> getCustomerCountByStoreId(Integer storeId,Integer[] subStoreId);
	
	/**
	 * API  根据StoreId获取门店下员工总数，经销店不含直营店
	 */
	ServiceResult<Map<Integer,Integer>> getCustomerCount(Integer[] storeIds);
	
	/**  4.0 遗留兼容***/
	
	ServiceResult<HashMap<String, Object>> getCustomerCount(Integer parentStoreId, Integer storeId, DateEnum dateType);

}
