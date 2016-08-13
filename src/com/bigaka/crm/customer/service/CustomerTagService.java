package com.bigaka.crm.customer.service;

import java.util.HashMap;
import java.util.List;

import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.customer.model.CustomerTag;


/**
 * 顾客消费统计
 * @author Dylan_Tao
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
public interface CustomerTagService{
	
	ServiceResult<HashMap<Integer, List<CustomerTag>>> getCustomerTagMap(List<Integer> custIds);
	
	ServiceResult<Boolean> batchSaveCustomerTag(List<Integer> customerIds, List<Long> tagIds);
	
	ServiceResult<Boolean> clearCustomerTag(Integer customerId);
	
	ServiceResult<Boolean> deleteCustomerTag(Long tagId, Long userId);

	ServiceResult<Boolean> batchDeleteCustomerTag(Long tagId, Long[] userIds);
	
	/**
	 * 批量同步保存用户标签
	* @param customerIds
	* @param tagCodes 第三方标签code
	* @return
	* ServiceResult<Boolean>
	 */
	ServiceResult<Boolean> batchSyncSaveCustomerTag(Integer storeId,List<Integer> customerIds, List<String> tagCodes);
	
	ServiceResult<List<String>> getOpenIdByTag(List<Long> tagIds,Integer storeId);
}
