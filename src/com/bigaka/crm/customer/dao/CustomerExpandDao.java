package com.bigaka.crm.customer.dao;

import com.bigaka.crm.customer.model.CustomerExpand;

public interface CustomerExpandDao {

	/**
	 * 获取会员关注状态
	 */
	CustomerExpand getCustomerExpand(Integer customerId);

	boolean updateCustomerFirstFWC(Integer storeId, Integer customerId);

	boolean setExpandInfo(Integer storeId, Integer customerId);

	/**
	 * 更改用户的信息完善程度
	* @param storeId
	* @param customerId
	* @param numInt
	* @return Boolean
	 */
	boolean updatePerDegree(Integer customerId,
			int numInt);

	/**
	 * 更新用户的公众号关注状态及首次绑定状态
	* @param storeId
	* @param customerId
	* @return void
	 */
	boolean updateCustomerFirstFPN(Integer storeId, Integer customerId,Integer fpn,Integer ffpn);

	Boolean updatePerDegree(Integer customerId, int numInt, int firstFD);

}
