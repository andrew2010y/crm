package com.bigaka.crm.customer.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.bigaka.crm.common.model.Code;
import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.common.util.JsonUtil;
import com.bigaka.crm.customer.model.Customer;
import com.bigaka.crm.customer.model.CustomerDetail;
import com.bigaka.crm.customer.model.CustomerTag;
import com.bigaka.crm.customer.service.CustomerDetailService;
import com.bigaka.crm.customer.service.CustomerExpandService;
import com.bigaka.crm.customer.service.CustomerService;
import com.bigaka.crm.customer.service.CustomerTagService;
import com.bigaka.crm.customer.service.FormStorePropService;
import com.bigaka.crm.web.model.Store;

/**
 * 顾客详细信息
 * 
 * @author Dylan_Tao
 * @date 2015-12-02 Copyright 2015 bigaka.com. All Rights Reserved.
 */
@Controller
@RequestMapping("/back/customer-detail")
public class CustomerDetailAction {
	
	private static final Log log = LogFactory.getLog(CustomerDetailAction.class);

	@Value("#{config['pub.cloud.store.list.url']}")
	private String pubCloudStoreListUrl;

	@Autowired
	private CustomerDetailService customerDetailService;
	/*@Autowired
	private CustomerTagService customerTagService;*/
	/*@Autowired
	private CouponConsumeLogService couponConsumeLogService;
	@Autowired
	private CouponProduceLogService couponProduceLogService;*/
	@Autowired
	private FormStorePropService formStorePropService;
	/*@Autowired
	private CustomerExpandService customerExpandService;*/
	@Autowired
	private CustomerService customerService;

	/**
	 * 获取用户详情
	 * 
	 * @author Ji qc
	 * @date 2016年6月21日
	 * @return
	 */
	@RequestMapping("/{customerId}")
	public ModelAndView getCustomerDetail(
			@PathVariable("customerId") Integer customerId, Store store) {
		CustomerDetail detail = new CustomerDetail();
		detail.setCustomerId(customerId);
		detail.setStoreId(store.getParentId());
		//获取用户的基础详情和扩展属性内容。
		ServiceResult<CustomerDetail> result = customerDetailService
				.getCustomerDetail(detail);
		//获取用户的地址信息
		ServiceResult<CustomerDetail> address = customerDetailService
				.getCustDetailIncludeAddress(detail);
		if(result.getCode()==Code.SUCCESS&&result.getResult()!=null){
			detail = result.getResult();
		}
		List<Integer> custIds = new ArrayList<Integer>();
		Map<String, Object> resultMap = new HashMap<String, Object>();
		custIds.add(customerId);
		if (custIds.size() > 0) {
			/*ServiceResult<HashMap<Integer, List<CustomerTag>>> custTagMap = customerTagService
					.getCustomerTagMap(custIds);
			HashMap<Integer, List<CustomerTag>> map = custTagMap.getResult();
			resultMap.put("tags", map.get(customerId));*/
		}
		Customer customer = new Customer();
		customer.setCustomerId(customerId);
		ServiceResult<Customer> resultCustomer = customerService
				.getCustomer(customer);
		if (resultCustomer.getCode() == 0) {
			customer = resultCustomer.getResult();
		}

		log.info(JsonUtil.toJson(detail.getFormStorePropExt()));
		// 自定义表单属性
		resultMap.put("formStoreUsingProp", detail.getFormStorePropExt());
		
		resultMap.put("cust", detail);
		resultMap.put("addresses", address.getResult().getAddresses());
		resultMap.put("storeListUrl", pubCloudStoreListUrl);
		resultMap.put("store", store);
		resultMap.put("customer", customer);

		return new ModelAndView("/back/customer/customer-detail", resultMap);
	}

	/**
	 * 获取会员的优惠券列表
	 * 
	 * @author yanxk
	 * @date 2015-12-03
	 * @return
	 */
/*	@ResponseBody
	@RequestMapping(value = "/coupon-list/{customerId}")
	public Map<String, Object> list(
			@PathVariable("customerId") Integer customerId,
			CouponCustomerSearchForm searchForm, Store store,
			@RequestParam(defaultValue = "1") int pageNo,
			@RequestParam(defaultValue = "10") int pageSize) {

		// 商户id获取
		Integer parentStoreId = store.getParentId();

		Page<CouponLogDto> page = new Page<CouponLogDto>(pageSize, pageNo);

		searchForm.setStoreId(parentStoreId);
		searchForm.setCustomerId(customerId);

		// 获取用户优惠券分页列表CouponConsumeLogDao
		ServiceResult<Page<CouponLogDto>> couponLogDtoResult = couponConsumeLogService
				.getPage(searchForm, page);

		// 已领取可用
		ServiceResult<Integer> usableCountResult = couponProduceLogService
				.getCount(customerId, parentStoreId, (byte) 1);
		Integer usableCount = usableCountResult.getResult();

		// 已失效过期
		ServiceResult<Integer> invalidCountResult = couponProduceLogService
				.getCount(customerId, parentStoreId, (byte) 2);
		Integer invalidCount = invalidCountResult.getResult();

		// 已消费
		ServiceResult<Integer> spendCountResult = couponConsumeLogService
				.getCount(customerId, parentStoreId);
		Integer spendCount = spendCountResult.getResult();

		// 已领取
		Integer receivedCount = usableCount + invalidCount + spendCount;

		Map<String, Object> resultMap = new HashMap<String, Object>();

		resultMap.put("page", couponLogDtoResult.getResult());
		resultMap.put("receivedCount", receivedCount);
		resultMap.put("spendCount", spendCount);
		resultMap.put("usableCount", usableCount);

		return resultMap;
	}*/

	/**
	 * 获取用户扩展状态信息
	 * 
	 * @author Ji qc
	 * @date 2016年6月21日
	 * @return
	 */
/*	@ResponseBody
	@RequestMapping("/customer-expand/icon")
	public ServiceResult<CustomerExpand> getCustomerExpand(Integer customerId,Integer storeId) {
		CustomerExpand expand=new CustomerExpand();
		if (customerId != null) {
			Customer customer = new Customer();
			customer.setCustomerId(customerId);
			ServiceResult<CustomerExpand> customerExpand;
			customer.setStoreId(storeId);
			customerExpand = customerExpandService.getCustomerExpand(
					storeId, customerId);
			if (customerExpand.getCode() != Code.SUCCESS){
				return new ServiceResult<CustomerExpand>(customerExpand.getCode(), customerExpand.getMessage(), null);
			}
			expand=customerExpand.getResult();
			ServiceResult<Customer> customerResult = customerService
					.getCustomer(customer);
			if (customerResult.getCode() == 0) {
				expand.setState(customerResult.getResult().getState());
				expand.setOpenId( customerResult.getResult().getOpenId());
			}
			return new ServiceResult<CustomerExpand>(Code.SUCCESS, null, expand);
		}else{
			return new ServiceResult<CustomerExpand>(Code.FAILED, "用户Id不能为空", null);
		}
	}*/
}
