package com.bigaka.crm.customer.service;

import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.customer.model.CustomerDetail;
import com.bigaka.crm.customer.model.CustomerExpand;

/**
 * 
* 提供会员扩展信息查询服务公众号，微信，用户信息完善状态进行查询处理。
* @author  ji qc
* @date 创建时间：2016年6月14日 
*
 */
public interface CustomerExpandService {
	
	/**
	 * 获取会员关注状态
	 */
	ServiceResult<CustomerExpand> getCustomerExpand(Integer storeId,Integer customerId);
	
	/**
	 * 跟新并返回会员关注状态（登录调用）
	 */
	ServiceResult<CustomerExpand>  updateCustomerStatus(Integer storeId,Integer customerId);
	
	/**
	 * 更新会员信息完成程度
	 */
	ServiceResult<Boolean>  updateCustomerPerfectDegree(CustomerDetail customerDetail);
	/**
	 * 首次关注公众号更新扩展表，赠送积分。
	 * @author Ji qc
	 * @date 2016年6月30日
	 * @return
	 */
	public ServiceResult<Boolean> updateFirstPublicFollow(Integer storeId,Integer customerId);
	/**
	 * 首次绑定微信更新扩展表，赠送积分。
	 * @author Ji qc
	 * @date 2016年6月30日
	 * @return
	 */
	public ServiceResult<Boolean> updateFirstFollowWechat(Integer storeId,Integer customerId);
}
