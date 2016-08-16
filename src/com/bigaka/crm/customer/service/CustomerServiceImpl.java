package com.bigaka.crm.customer.service;

import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bigaka.crm.common.assist.ServiceException;
import com.bigaka.crm.common.model.Code;
import com.bigaka.crm.common.model.Constant.CodeType;
import com.bigaka.crm.common.model.Page;
import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.common.util.CodecUtil;
import com.bigaka.crm.common.util.DateUtil;
import com.bigaka.crm.common.util.JsonUtil;
import com.bigaka.crm.common.util.RandomUtil;
import com.bigaka.crm.common.util.StringUtil;
import com.bigaka.crm.customer.dao.CustomerCountDao;
import com.bigaka.crm.customer.dao.CustomerDao;
import com.bigaka.crm.customer.dao.CustomerDetailDao;
import com.bigaka.crm.customer.dao.CustomerExpandDao;
import com.bigaka.crm.customer.model.Customer;
import com.bigaka.crm.customer.model.Customer.RegisterChannel;
import com.bigaka.crm.customer.model.Customer.RegisterType;
import com.bigaka.crm.customer.model.Customer.ThirdSupportKey;
import com.bigaka.crm.customer.model.CustomerDetail;
import com.bigaka.crm.customer.model.LoginCredential;
import com.bigaka.crm.form.model.FormCustomerProp;

@Service("customerService")
public class CustomerServiceImpl implements CustomerService{
	@Autowired
	private CustomerDao customerDao;
	
	@Override
	public ServiceResult<Boolean> awardScoreAndCoupon(Customer arg0,
			boolean arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<Integer> bindCustomerPhone(String arg0, Long arg1,
			Integer arg2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<Boolean> bindPhone(Customer arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<Boolean> changeCustomerPhone(Integer arg0, Long arg1,
			Long arg2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<String> changeCustomerPwd(String arg0, String arg1,
			String arg2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<Customer> getByParentStoreIdAndPhone(Integer arg0,
			Long arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<Customer> getCustomer(Customer customer) {
		Customer customerDB = customerDao.getCustomer(customer);
		return new ServiceResult<Customer>(Code.SUCCESS, null, customerDB);
	}

	@Override
	public ServiceResult<HashMap<String, Integer>> getCustomerBindRef(
			Integer arg0, List<String> arg1, ThirdSupportKey arg2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<List<Customer>> getCustomerByStoreId(List<Integer> arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<LoginCredential> getLoginCredential(Integer arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	 

	@Override
	public ServiceResult<List<String>> getOpenIdList(Integer arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<Page<Customer>> getPageByParentStoreId(Integer arg0,
			Page<Customer> arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<Page<Customer>> getStoreAndDirectCustomerPage(
			Integer arg0, Page<Customer> arg1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<Boolean> getUserPublicNumberStatus(Integer arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<Boolean> isExistCustomer(Customer arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<Long> loadCustomerCount(Integer arg0, Long arg1,
			Long arg2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<LoginCredential> loginCustomer(Customer arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<String> logoutCustmer(String arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<LoginCredential> registerCustomer(Customer arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ServiceResult<String> resetCustomerPwd(Integer arg0, Long arg1,
			String arg2) {
		// TODO Auto-generated method stub
		return null;
	}

	private static final Log log = LogFactory.getLog(CustomerServiceImpl.class);
	
	@Autowired
	private CustomerDetailDao customerDetailDao;
	@Autowired
	private CustomerCountDao customerCountDao;
	@Autowired
	private CustomerExpandDao customerExpandDao;
	
	private ServiceResult<LoginCredential> registerParamCheck(Customer customer){
		if(customer==null || customer.getParentStoreId()==null || customer.getStoreId()==null || customer.getUsername()==null || customer.getRegisterChannel()==null || (StringUtil.isBlank(customer.getPassword()) && !customer.getRegisterChannel().equals(RegisterChannel.DATACENTER))){
			return new ServiceResult<LoginCredential>(Code.CUST_REG_PARAM_ERROR, Code.CUST_REG_PARAM_MSG);
		}
		return new ServiceResult<LoginCredential>(Code.SUCCESS);
	}
	
	@Override
	public ServiceResult<Customer> saveCustomer(Customer customer) {
		
		log.info("registerCustomer:"+JsonUtil.toJson(customer));
		ServiceResult<LoginCredential> serviceResult = registerParamCheck(customer); //参数验证
		if(serviceResult.getCode() != Code.SUCCESS){
			return new ServiceResult<Customer>(serviceResult.getCode(), serviceResult.getMessage(), null);
		}
		customer.setOpenId(null);
		Customer custData = customerDao.getCustomer(customer); //check global user exist
		if(custData!=null && custData.getCustomerId()!=null){
			return new ServiceResult<Customer>(Code.CUST_HAS_EXIST, Code.CUST_HAS_EXIST_MSG, null);
		}
		
		customer.setRegisterType(RegisterType.PHONE);//手机号码注册
		long time = DateUtil.getTime(); 
		customer.setCreateTime(time);
		String password = null;
		if(customer.getRegisterChannel().equals(RegisterChannel.DATACENTER)){ //数据中心注册则强制设置初始密码
			password = RandomUtil.randomKey();
			customer.setPassword(password);
		}
		if(!customer.getRegisterChannel().equals(RegisterChannel.CK)&&
				!customer.getRegisterChannel().equals(RegisterChannel.SALVE_SHOP)){ //创客源和2B商城会员注册 密码为密文，不做处理
			customer.setPassword(CodecUtil.encodeMD5(customer.getPassword(), true, CodeType.UTF8));
		}
	
		int customerId = customerDao.saveCustomer(customer);
		
		log.info("customerId"+customerId);
		
		if(customerId<=0){
			throw new ServiceException(Code.CUSTOMER_SAVE_ERROR, Code.CUSTOMER_SAVE_MSG);
		}
		customer.setCustomerId(customerId);
		
		CustomerDetail detail = new CustomerDetail();
		detail.setCustomerId(customerId);
		detail.setPhone(customer.getUsername());
		detail.setCreateTime(time);
		detail.setVipCardNo(customer.getVipCardNo());
		detail.setName(customer.getName());
		detail.setSex(customer.getSex()!=null?customer.getSex():0);
		detail.setAreaCode(customer.getAreaCode()!=null?customer.getAreaCode():0);
		detail.setRemark(customer.getRemark());
		detail.setNickName(customer.getNickName());
		detail.setCustomerProps(customer.getCustomerProps());
		if(StringUtil.isNotBlank(customer.getBirthDate())){
			Long date = DateUtil.getMinDate(customer.getBirthDate());
			detail.setBirthDate(date==null?0L:date);
		}else{
			detail.setBirthDate(0L);
		}
		boolean detail_flag = customerDetailDao.saveCustomerDetail(detail);
		if(!detail_flag){
			throw new ServiceException(Code.CUSTOMER_DETAIL_ERROR, Code.CUSTOMER_DETAIL_MSG);
		}
		boolean count_flag = customerCountDao.saveCustomerCount(customerId);
		if(!count_flag){
			throw new ServiceException(Code.CUSTOMER_COUNT_ERROR, Code.CUSTOMER_COUNT_MSG);
		}
		
		//用户填写的自定义表单内容
		List<FormCustomerProp> customerProps = customer.getCustomerProps();
		
		/*if(customerProps!=null && customerProps.size() >0){
			ServiceResult<Boolean> createResult = formCustomerDetailService.createCustomerProp(customerProps,customerId);
			if(createResult == null || createResult.getCode()!=Code.SUCCESS){
				throw new ServiceException(Code.FAILED, "新增顾客自定义表单内容失败!");
			}
		}*/
		
		//初始化会员卡号
		/*MembershipCode code = new MembershipCode();
		code.setMembershipId(0L);
		code.setStoreId(customer.getParentStoreId());
		code.setCustomerId(String.valueOf(customerId));
		code.setCreateTime(DateUtil.getTime());
		boolean boo = membershipCardService.createMemberShipCode(code).getResult();
		if(!boo){
			throw new ServiceException(Code.FAILED, "发放会员卡号失败~!");
		}*/
		
		boolean expend_flag = customerExpandDao.setExpandInfo(customer.getStoreId(), customerId);
		/*if(!expend_flag){
			throw new ServiceException(Code.FAILED, "初始化会员的状态记录失败~!");
		}*/
		
		//赠送积分与优惠券并发送短信
		//awardScoreAndCoupon(customer,true);
		
		//计算完善度
		detail.setStoreId(customer.getParentStoreId());
		//perfectDegree(detail);		
		
		//添加到MQ
		/*if(customer.getSysnCSB() && customer.getStoreId()!=null){ //后台新增会员同步到csb
			CSBParam<Customer> param = new CSBParam<Customer>();
			param.setStoreid(String.valueOf(customer.getStoreId()));
			param.setModel("user");
			param.setMethod("crmRegisterCustomer");
			param.setMsg(customer);
			ServiceResult<String> mqResult = mQService.sendMsg(param);
			if(StringUtil.isBlank(mqResult.getResult())){
				log.error("后台新增会员时，同步到线下时，放入MQ队列失败："+JsonUtil.toJson(mqResult));
			}
		}else{ //csb线下新增收货地址
			CustomerAddress address = new CustomerAddress();
			address.setCustomerAddressId(RandomUtil.getUniqueNum());
			address.setCityCode(customer.getAreaCode()==null?0:customer.getAreaCode());
			address.setCustomerId(customerId);
			address.setName(StringUtil.isBlank(customer.getName())?"":customer.getName());
			address.setPhone(customer.getUsername()==null?"":String.valueOf(customer.getUsername()));
			address.setAddress(customer.getAddress());
			address.setIsDefault(true);
			address.setCreateTime(DateUtil.getTime());
			boolean flag = customerAddressDao.saveCustomerAddress(address);
			if(!flag){
				throw new ServiceException(Code.FAILED, "csb线下会员同步到crm时，新增收货地址异常"+JsonUtil.toJson(address));
			}
		}*/
		
		Customer cr = new Customer();
		cr.setCustomerId(customerId);
		cr.setPhone(customer.getUsername());
		
		Long salePhone = customer.getSalePhone();
		Integer customerType = customer.getCustomerType();
		
		if(salePhone!=null){
			Customer customerSell = customerDao.getByParentStoreIdAndPhone(1, salePhone);
			
			//车提3%
			//会员卡
			if(customerSell!=null){
				double sellAmount =0.0;
				
				if(customerType!=null&&customerType==1){
					sellAmount = 0.09;
				}else{
					sellAmount = customer.getPurchaseAmount()*0.03;
				}
				customerSell.setSellAmount(
						customerSell.getSellAmount()+sellAmount);
				
				customerSell.setPurchaseAmount(customerSell.getPurchaseAmount()
						+sellAmount);
				
				// 更新
				customerDao.updateCustomerPurchaseAmount(customerSell);
			}
		}
		
		return new ServiceResult<Customer>(Code.SUCCESS, "",cr);
	}
	

	@Override
	public ServiceResult<Boolean> updateCustomer(Customer customer) {
		log.info(JsonUtil.toJson(customer));
		customer.setUsername(null);
		boolean flag = false;
		if(customer.getCustomerId()!=null){
			flag = customerDao.updateCustomer(customer);
		}else{ //适配没有customerId作为标识,并且csb只修改昵称的情况
			flag = true;
		}
		if(customer.getState()!=null){ //编辑页面的冻结
			return new ServiceResult<Boolean>(flag?Code.SUCCESS:Code.FAILED, "", flag);
		}else{ //编辑顾客信息
			if(!flag){
				throw new ServiceException(Code.FAILED, "修改顾客基本信息失败");
			}
			CustomerDetail detail = new CustomerDetail();
			detail.setCustomerId(customer.getCustomerId());
			detail.setLogo(customer.getLogo());
			detail.setVipCardNo(customer.getVipCardNo());
			detail.setName(customer.getName());
			detail.setNickName(customer.getNickName());
			detail.setSex(customer.getSex());
			detail.setAreaCode(customer.getAreaCode());
			detail.setRemark(customer.getRemark());
			detail.setCustomerProps(customer.getCustomerProps());
			
			//适配csb修改线下实卡的场景，根据parentStoreId和phone作为标识
			detail.setParentStoreId(customer.getParentStoreId());
			detail.setPhone(customer.getPhone());
			
			if(StringUtil.isNotBlank(customer.getBirthDate())){
				Long date = DateUtil.getMinDate(customer.getBirthDate());
				detail.setBirthDate(date==null?0L:date);
			}else{
				detail.setBirthDate(0L);
			}
			flag = customerDetailDao.updateCustomerDetail(detail);
			if(!flag){
				throw new ServiceException(Code.FAILED, "修改顾客基本信息失败");
			}
			
			//用户填写的自定义表单内容
			List<FormCustomerProp> customerProps = detail.getCustomerProps();
			if(customerProps == null || customerProps.size()==0){
				//计算完善度
				//customerExpandService.updateCustomerPerfectDegree(detail);
			}else{
				//用户之前已经填写的自定义表单内容
			//	ServiceResult<List<Long>> existsPrpResult = formCustomerDetailService.getExistsPropId(customer.getCustomerId());
			//	List<FormCustomerProp> createCustomerProps = new ArrayList<FormCustomerProp>(customerProps);
				//用户填写的不为空
				/*if(existsPrpResult.getCode() == Code.SUCCESS && existsPrpResult.getResult().size()>0){
					//需要更新的自定义表单内容
					List<FormCustomerProp> updateCustomerProps = new ArrayList<FormCustomerProp>();
					for(FormCustomerProp prop:customerProps){
						if(existsPrpResult.getResult().contains(prop.getStorePropId())){
							updateCustomerProps.add(prop);
							//删除需要更新的内容-剩下是需要新建的内容
							createCustomerProps.remove(prop);
						}
						
					}
					if(updateCustomerProps.size()>0){
						ServiceResult<Boolean> updateResult = formCustomerDetailService.updateCustomerProp(updateCustomerProps);
						if(updateResult == null || updateResult.getCode()!=Code.SUCCESS){
							throw new ServiceException(Code.FAILED, "编辑顾客自定义表单内容失败!");
						}
					}
				}
				if(createCustomerProps.size() >0){
					ServiceResult<Boolean> createResult = formCustomerDetailService.createCustomerProp(createCustomerProps,null);
					if(createResult == null || createResult.getCode()!=Code.SUCCESS){
						throw new ServiceException(Code.FAILED, "编辑顾客自定义表单内容失败!");
					}
				}*/
				//计算完善度
				//customerExpandService.updateCustomerPerfectDegree(detail);
			}
			
			//添加到MQ
			/*if(customer.getSysnCSB() && customer.getCustomerId()!=null){ //后台编辑会员或微商城渠道编辑会员同步到csb
				Customer c = customerDao.getCustomerByCid(customer.getCustomerId());
				customer.setParentStoreId(c.getParentStoreId());
				customer.setStoreId(c.getStoreId());
				
				CSBParam<Customer> param = new CSBParam<Customer>();
				param.setStoreid(String.valueOf(customer.getStoreId()));
				param.setModel("user");
				param.setMethod("crmMallEditCustomer");
				param.setMsg(customer);
				
				ServiceResult<String> mqResult = mQService.sendMsg(param);
				if(StringUtil.isBlank(mqResult.getResult())){
					log.error("后台编辑或微商城渠道编辑会员信息时，同步到线下时，放入MQ队列失败："+JsonUtil.toJson(mqResult));
				}
			}
			*/
			return new ServiceResult<Boolean>(Code.SUCCESS, "",true);
		}
	}

}
