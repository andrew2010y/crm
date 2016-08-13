package com.bigaka.crm.customer.service;

import java.util.HashMap;
import java.util.List;

import com.bigaka.crm.common.model.Page;
import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.customer.model.Customer;
import com.bigaka.crm.customer.model.Customer.ThirdSupportKey;
import com.bigaka.crm.customer.model.LoginCredential;
import com.bigaka.crm.customer.model.User;


/**
 * 顾客基本信息
 * @author Dylan_Tao
 * @date 2015-12-01
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
public interface UserService{ 
	
	ServiceResult<User> getByUserNameAndPassword(String userName, String password);
	
	/**
	 * 注册顾客帐号 [微商城/店客源引用]
	 * 微信授权登录不包含在内,详见loginCustomer
	 * @param customer
	 * @return
	 */
	ServiceResult<LoginCredential> registerCustomer(Customer customer);
	
	/**
	 * 后台新增会员和审核会员
	 * @param customer
	 * @return
	 */
	ServiceResult<Customer> saveCustomer(Customer customer);
	
	/**
	 * 顾客登录[公有云引用]
	 * 包含微信授权登录
	 * @param customer
	 * @return
	 */
	ServiceResult<LoginCredential> loginCustomer(Customer customer);
	
	ServiceResult<LoginCredential> getLoginCredential(Integer customerId);
	
	/**
	 * 用户注销[公有云引用]
	 * @param token
	 * @return
	 */
	ServiceResult<String> logoutCustmer(String token);
	
	/**
	 * 修改密码[公有云引用]
	 * @param token
	 * @return
	 */
	ServiceResult<String> changeCustomerPwd(String token, String oldPwd, String newPwd);
	
	ServiceResult<String> resetCustomerPwd(Integer parentStoreId, Long phone, String newPwd);
	
	/**
	 * 绑定手机号码
	 * @param token
	 * @param storeId
	 * @param phone
	 * @return
	 */
	ServiceResult<Integer> bindCustomerPhone(String openId, Long phone, Integer parentStoreId);
	
	ServiceResult<Boolean> changeCustomerPhone(Integer parentStoreId, Long oldPhone ,Long newPhone); 

	ServiceResult<Boolean> updateCustomer(Customer customer);
	
	ServiceResult<Long> loadCustomerCount(Integer storeId, Long startTime, Long endTime);
	
	ServiceResult<Customer> getCustomer(Customer customer);
	
	ServiceResult<Boolean> isExistCustomer(Customer customer);
	
	ServiceResult<Page<Customer>> getStoreAndDirectCustomerPage(Integer storeId, Page<Customer> page);

	ServiceResult<Page<Customer>> getPageByParentStoreId(Integer parentStoreId, Page<Customer> page);

	ServiceResult<Customer> getByParentStoreIdAndPhone(Integer parentStoreId,Long phone);

//	ServiceResult<MembershipCode> getMemberShipCode(Integer customerId, Long cardId);

	ServiceResult<List<Customer>> getCustomerByStoreId(List<Integer> subStoreIds);

	ServiceResult<Boolean> bindPhone(Customer result);
	
	/**
	 * 获取会员公众号关注状态
	 */
	ServiceResult<Boolean>  getUserPublicNumberStatus(Integer customerId);
	
	ServiceResult<Boolean> awardScoreAndCoupon(Customer customer,boolean flag);
	
	ServiceResult<List<String>> getOpenIdList(Integer storeId);
	
	ServiceResult<HashMap<String, Integer>> getCustomerBindRef(Integer parentStoreId,List<String> paramList,ThirdSupportKey key);

}
