package com.bigaka.crm.customer.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bigaka.crm.common.assist.ServiceException;
import com.bigaka.crm.common.model.Code;
import com.bigaka.crm.common.model.Page;
import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.common.util.StringUtil;
import com.bigaka.crm.customer.dao.CustomerAddressDao;
import com.bigaka.crm.customer.dao.CustomerDao;
import com.bigaka.crm.customer.dao.CustomerDetailDao;
import com.bigaka.crm.customer.dao.CustomerTagDao;
import com.bigaka.crm.customer.model.CustSearchParam;
import com.bigaka.crm.customer.model.Customer;
import com.bigaka.crm.customer.model.CustomerAddress;
import com.bigaka.crm.customer.model.CustomerDetail;
import com.bigaka.crm.customer.model.CustomerPointChannelEnum;
import com.bigaka.crm.customer.model.LoginCredential;
import com.bigaka.crm.form.model.FormCustomerProp;
import com.bigaka.crm.form.model.FormStoreProp;
import com.bigaka.crm.form.model.FormStorePropExt;
import com.bigaka.crm.pointlog.model.PointLog;
import com.bigaka.crm.service.assist.UniqueGenerate;

/**
 * 顾客详细信息
 * @author Dylan_Tao
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
@Service("customerDetailService")
public class CustomerDetailServiceImpl implements CustomerDetailService{
	
	private static final Log logger = LogFactory.getLog(CustomerDetailServiceImpl.class);
	
	@Autowired
	private CustomerDetailDao customerDetailDao;
	@Autowired
	private CustomerTagDao customerTagDao;
/*	@Autowired
	private ConsumeLogDao consumeLogDao;
	@Autowired
	private PointLogDao pointLogDao;*/
	@Autowired
	private UniqueGenerate uniqueGenerate;
	//@Autowired
	//private CustomerAddressService customerAddressService;
	/*@Autowired
	private CommonService commonService;*/
	//@Autowired
	//private MembershipCardDao membershipCardDao;
	@Autowired
	private CustomerDao customerDao;
	//@Autowired
	//private TagDao tagDao;
	@Autowired
	private CustomerAddressDao customerAddressDao;
//	@Autowired
//	private FormCustomerPropDao formCustomerPropDao;
	/*@Autowired
	private FormCustomerPropService customerDetailService;*/
	@Autowired
	private FormStorePropService formStorePropService;
	/*@Autowired
	private WechatMsgTmplService wechatMsgTmplService;*/
	//@Autowired
	//private CustomerExpandService customerExpandService;
	
	@Override
	public ServiceResult<CustomerDetail> getCustomerDetail(CustomerDetail detail) {
		if(detail!=null && (detail.getCustomerId()!=null || (detail.getParentStoreId()!=null && StringUtil.isNotBlank(detail.getOpenId())))){
			
			//查询用户需要查询的字段（11字段）
			ServiceResult<FormStorePropExt> formStoreUsingPropResult = formStorePropService.getFormStoreUsingProp(detail);
			FormStorePropExt ext = new FormStorePropExt(); 
			if(formStoreUsingPropResult.getCode()==0){
				ext = formStoreUsingPropResult.getResult();
			}
			CustomerDetail customerDetail = customerDetailDao.getDysCustomerDetail(detail,ext.getDefaultProp());
			if(customerDetail!=null){
				detail=customerDetail;
			}
			detail.setFormStorePropExt(ext);
			//获取字段会员卡号
			/*MembershipCode membershipCode = null;// membershipCardDao.getMembershipCodeByCid(detail.getCustomerId());
			if(membershipCode!=null){
				detail.setCardNo(membershipCode.getCardNo());
			}*/
			FormCustomerProp formCusPr=new FormCustomerProp();
			if(detail.getCustomerId()!=null){
				formCusPr.setCustomerId(detail.getCustomerId());
				//List<FormCustomerProp> propList = formCustomerPropDao.getFormCustomerPropList(formCusPr);
				///detail.setCustomerProps(propList);
			}
			return new ServiceResult<CustomerDetail>(Code.SUCCESS,null,detail);
		}else{
			return new ServiceResult<CustomerDetail>(Code.GET_DETAIL_PARAME_ERROR,Code.GET_DETAIL_PARAME_MSG);
		}
	}
	
	@Override
	public ServiceResult<String> updateCustomerDetail(String token, CustomerDetail detail) {
		if(StringUtil.isBlank(token) || (StringUtil.isBlank(detail.getName()) && detail.getPhone()==null && StringUtil.isBlank(detail.getLogo()))){
			return new ServiceResult<String>(Code.UPDATE_DETAIL_PARAME_ERROR,Code.UPDATE_DETAIL_PARAME_MSG,null);
		}
		Object cacheObj = null;// redisCache.getObject(token);
		if(cacheObj!=null){
			LoginCredential credential = (LoginCredential)cacheObj;
			Integer customerId = credential.getCustomerId();
			if(customerId==null){
				return new ServiceResult<String>(Code.CUST_STATE_ERROR, Code.CUST_STATE_MSG, null);
			}
			detail.setCustomerId(customerId);
			boolean flag = customerDetailDao.updateCustomerDetail(detail);
			return flag ? new ServiceResult<String>(Code.SUCCESS, null,null):new ServiceResult<String>(Code.FAILED, "编辑顾客详情失败!",null);
		}else{
			return new ServiceResult<String>(Code.CUST_STATE_ERROR, Code.CUST_STATE_MSG, null);
		}
	}
	@Override
	public ServiceResult<Long> getCustPoint(CustomerDetail detail) {
		if(detail!=null && detail.getCustomerId()!=null){
			Integer customerId = detail.getCustomerId();
			logger.info("customerId: " +detail.getCustomerId());
			detail = customerDetailDao.getCustomerPoint(detail);
			Long point = 0L;
			if(detail==null){
				logger.info("会员信息已不存在customerId:" +customerId);
				return new ServiceResult<Long>(Code.FAILED, "会员信息已不存在", point);
			}else{
				point = detail.getPoint();
				return new ServiceResult<Long>(Code.SUCCESS, "查询成功！", point);
			}
			
			//return new ServiceResult<Long>(Code.SUCCESS, null, detail.getPoint()==null?0L:detail.getPoint());
		}else{
			return new ServiceResult<Long>(Code.CUSTOMER_POINT_PARAM_ERROR, Code.CUSTOMER_POINT_PARAM_MSG, null);
		}
	}
	
	/**
	 * 更改顾客积分dubbo服务
	 */
	public ServiceResult<Boolean> updateCustPoint(PointLog log,CustomerPointChannelEnum pointChannel) {
		if(log.getCustomerId()!=null && log.getStoreId() != null && log.getOperation() !=null && log.getValue() !=null && log.getOrderId()!=null && log.getConsumeChannel()!=null){
			
			if(log.getValue()==0){
				//变动积分为0不做操作  返回成功
				return new ServiceResult<Boolean>(Code.SUCCESS,null,true);
			}else{
				//修改积分
				boolean flag = customerDetailDao.updateUserScore(log.getCustomerId(), log.getOperation(), log.getValue());
				//增加积分记录
				if(flag){
					log.setPointLogId(uniqueGenerate.getId());
					log.setClerkId(0); //积分发放者
					
					//添加赠送积分说明
					if(pointChannel!=null){
						Integer channel=pointChannel.getChannel();
						//0 注册 1首次关注公众号   2 首次绑定微信号  3 消费金额  4 完善会员信息
						if(channel==0){
							log.setRemark("注册送积分");
						}else	if(channel==1){
							log.setRemark("关注公众号送积分");
						}else if(channel==2){
							log.setRemark("绑定微信送积分");
						}else if(channel==3){
							log.setRemark("消费送积分");
						}else if(channel==4){
							log.setRemark("完成会员信息送积分");
						}else if(channel==5){
							log.setRemark("领取时,积分兑换的优惠券");
						}
					}
					//添加日志记录
				//	flag = pointLogDao.savePointsLog(log);
					
					if(!flag){
						throw new ServiceException(Code.ADD_DATA_ERROR, "添加积分使用记录失败");
					}
					
					//发送积分变更微信消息
					if(pointChannel!=null){
						//wechatMsgTmplService.sendWechatMsgForPoint(log);
						Integer channel=pointChannel.getChannel();
						if(channel==0){
							//TODO 注册送积分短信提醒
							Customer customer=customerDao.getCustomerByCid(log.getCustomerId());
							///commonService.sendCustomerRegisterPointSMS(log.getStoreId(),log.getValue(),customer.getUsername());
							
						}
					}
				}
				
				return new ServiceResult<Boolean>(Code.SUCCESS,null,flag);	
			}
			
		}else{
			return new ServiceResult<Boolean>(Code.CUSTOMER_UPDATE_POINT_PARRM_ERROR,Code.CUSTOMER_UPDATE_POINT_PARRM_MSG,null);
		}
	}

	@Override
	public ServiceResult<Page<CustomerDetail>> getCustomerPage(CustSearchParam param,List<FormStoreProp> customProp,
			Page<CustomerDetail> page) {
		if(param.getStoreId()!=null){
			if(!param.isDirectShop()){
				//ServiceResult<List<Integer>> subStoreList =null;// commonService.getSubStoreIdList(param.getStoreId(),2);
				List<Integer> subStoreList = new ArrayList();
				subStoreList.add(1);
				param.setSubStoreIds(subStoreList
						//subStoreList.getResult()
						);
			}
			page = customerDetailDao.getCustomerPage(param,customProp, page);
			return new ServiceResult<Page<CustomerDetail>>(Code.SUCCESS, null, page);
		}else{
			return new ServiceResult<Page<CustomerDetail>>(Code.CUSTOMER_PAGE_PAREM_ERROR, Code.CUSTOMER_PAGE_PAREM_MSG, null);
		}
	}

	@Override
	public ServiceResult<CustomerDetail> getCustDetailIncludeAddress(CustomerDetail detail) {
		//detail = customerDetailDao.getCustDetailExt(detail);
		if(detail!=null && detail.getCustomerId()!=null){
			//获取收货地址
			CustomerAddress address = new CustomerAddress();
			address.setCustomerId(detail.getCustomerId());
		//	ServiceResult<List<CustomerAddress>> result = customerAddressService.getCustomerAddressList(null,address);
		//	List<CustomerAddress> addresses = result.getResult();
		//	detail.setAddresses(addresses);
		}
		return new ServiceResult<CustomerDetail>(Code.SUCCESS, null, detail);
	}

	@Override
	public ServiceResult<Integer> getIntegrationByOrderId(Integer orderId,String type) {
		Integer integration = 0;
		if(null != orderId && orderId != 0 && StringUtil.isNotBlank(type)){
			integration = customerDetailDao.getIntegrationByOrderId(orderId,type);
			if(integration != null){
				return new ServiceResult<Integer>(Code.SUCCESS,"查询成功",integration);
			}else {
				return new ServiceResult<Integer>(Code.FAILED,"没有查到此数据",integration);
			}
		}else {
			return new ServiceResult<Integer>(Code.FAILED,"参数不能为空",null);
		}
	}
}
