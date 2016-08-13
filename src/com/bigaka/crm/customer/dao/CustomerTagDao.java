package com.bigaka.crm.customer.dao;

import java.util.List;

import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.customer.model.CustomerTag;
import com.bigaka.crm.tag.model.Tag;


/**
 * 顾客标签
 * @author Dylan_Tao
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
public interface CustomerTagDao {
	
	List<CustomerTag> getCustomerTagListExt(List<Integer> custIds);
	
	List<CustomerTag> getCustomerTagList(List<Integer> custIds);
	
	boolean batchSaveCustomerTag(List<List<Object>> params);
	
	boolean deleteCustomerTag(Integer customerId);

	boolean deleteCustomerTag(Long tagId, Long userId);

	boolean batchDeleteCustomerTag(Long tagId, Long[] userIds);

	int getCustomerTagByTagId(Long tagId);

	boolean deleteCustomerTagById(Long tagId);

	List<Long> getUserIdsByTagId(Long tagId);
	
	List<String> getOpenIdsByTagIds(List<Long> tagIds,Integer storeId);

	List<CustomerTag> getCustomerTagByTid(Tag tag);
}
