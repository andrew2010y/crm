package com.bigaka.crm.customer.dao;

import java.util.List;
import java.util.Map;

import com.bigaka.crm.common.model.Page;
import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.common.model.Constant.OrderConstant;
import com.bigaka.crm.customer.model.CustomerCount;
import com.bigaka.crm.customer.model.CustomerReport;
import com.bigaka.crm.customer.model.CustomerSearchParam.CustomerGroupByEnum;


/**
 * 顾客消费统计
 * @author Dylan_Tao
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
public interface CustomerCountDao {
	
	boolean saveCustomerCount(int customerId);
	
	boolean delCustomerCount(int customerId);

	List<CustomerReport> getCustomerCountByDateGroupBy(Integer date,Integer[] subStoreId,Long startTime,Long endTime,CustomerGroupByEnum byEnum,OrderConstant orderBy);
	
	List<CustomerReport> getCustomerCountByHourGroupBy(Integer hour,Integer[] subStoreId,CustomerGroupByEnum byEnum,OrderConstant orderBy);
	
	Long getRegisterCustomerCountByDate(Integer date,Integer[] subStoreId,Long startTime,Long endTime);
	
	Long getRegisterCustomerCountByHour(Integer hour,Integer[] subStoreId);
	
	List<CustomerReport> getChannelCountByDate(Integer intervalStart,Integer intervalEnd,Integer[] subStoreId);
	
	ServiceResult<String> updateCustomerCount(Double price, Byte channel, Integer customerId);

	CustomerCount getCustomerCount(String customerId);

	List<CustomerReport> getRegisterChannelCountByHour(Integer hour,Integer[] subStoreId);
	
//	Page<CustomerReport> getTop10CustomerCount(Page<CustomerReport> page,Integer[] storeId , Long startTime, Long endTime, OrderConstant orderBy);
	
	Integer getCustomerCountByStoreId(Integer[] subStoreId);
	
	List<Map<String, Object>> getCustomerCount(Integer[] storeId);
	
}
