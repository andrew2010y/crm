/*package com.bigaka.crm.common.service;

import java.net.URLEncoder;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.bigaka.crm.common.model.Code;
import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.common.util.HttpUtil;
import com.bigaka.crm.common.util.JsonUtil;
import com.bigaka.crm.common.util.StringUtil;
import com.shinesky.common.util.ContantSmsContent;
import com.shinesky.common.util.ContantSmsInterface;
import com.shinesky.common.util.ContantSmsTemplate;
import com.shinesky.otoxplf.model.InfoStore;

@SuppressWarnings("rawtypes")
@Service("commonService")
public class CommonServiceImpl implements CommonService,InitializingBean{
	
	private static final Log log = LogFactory.getLog(CommonServiceImpl.class);
	
	@Value("#{config['pub.cloud.domain.url']}")
	private String smsUrl;
	@Value("#{config['sina.short.url']}")
	private String shortUrl;
	@Value("#{config['pub.cloud.sub.store.url']}")
	private String subStoreUrl;
	@Value("#{config['pub.cloud.store.detail.url']}")
	private String storeDetailUrl;

	
	@Autowired
	private ThreadPoolTaskExecutor asyncThread;
	@Autowired
	private RestTemplate restTemplate;
	
	@Override
	public void afterPropertiesSet() throws Exception {
		if(StringUtil.isNotBlank(smsUrl)){
			smsUrl = smsUrl + ContantSmsInterface.REQ_PATH;
		}else{
			System.out.println("短信api路径为空，初始化失败~");
		}
	}

	@Override
	public ServiceResult<Boolean> sendSMS(Integer storeId,String smsCodeName, List<String> param,Long... phone) {
		
		ContantSmsContent context = new ContantSmsContent() ;
		context.setStoreId(String.valueOf(storeId));
		context.setSmsCodeName(smsCodeName);
		for(String value:param){
			context.setSmsValue(value);
		}
		for(Long value:phone){
			context.setMobile(String.valueOf(value));
		}
		
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		HttpEntity<ContantSmsContent> request= new HttpEntity<ContantSmsContent>(context, headers);
		
		ServiceResult serviceResult;
		try {
			ResponseEntity<ServiceResult> entity = restTemplate.postForEntity(smsUrl, request, ServiceResult.class);
			serviceResult = entity.getBody();
			if(serviceResult!=null && serviceResult.getCode()!=0){
				log.error("请求公有云的短信接口，发送失败! phone：" + phone + "内容标识：" + smsCodeName + " cause："+serviceResult.getMessage());
				return new ServiceResult<Boolean>(Code.FAILED, null, false);
			}else{
				log.debug(serviceResult);
				return new ServiceResult<Boolean>(Code.SUCCESS, null, true);
			}
		} catch (Exception e) {
			log.error("公有云的短信接口异常：" + e);
		}
		return new ServiceResult<Boolean>(Code.FAILED, null, false);
	}
	
	*//**
	 * 包含已删除门店和冻结的门店
	 * 获取当前门店和下级直营店、经销店id集合
	 *//*
	public ServiceResult<List<Integer>> getSubStoreIdList(Integer storeId){
		String subStoreRealUrl = MessageFormat.format(subStoreUrl, String.valueOf(storeId),"","");
		try {
			ResponseEntity<String> responseEntity = restTemplate.getForEntity(subStoreRealUrl, String.class);
			String jsonResult = responseEntity.getBody();
			List<Integer> subStoreIds = JsonUtil.fromJsonArray(jsonResult);
			return new ServiceResult<List<Integer>>(Code.SUCCESS, null, subStoreIds);
		} catch (Exception e) {
			if(e instanceof RestClientException){
				log.error(e);
			}else{
				log.error("request success!");
			}
			return new ServiceResult<List<Integer>>(Code.FAILED, null, null);
		}	
	}

	*//**
	 * 包含已删除和冻结的门店
	 * subType=1 获取当前门店和下级直营店id集合
	 * subType=2 获取当前门店和下级经销店id集合
	 *//*
	public ServiceResult<List<Integer>> getSubStoreIdList(Integer storeId,Integer subType){
		String subStoreRealUrl = MessageFormat.format(subStoreUrl, String.valueOf(storeId),subType,"");
		try {
			ResponseEntity<String> responseEntity = restTemplate.getForEntity(subStoreRealUrl, String.class);
			String jsonResult = responseEntity.getBody();
			List<Integer> subStoreIds = JsonUtil.fromJsonArray(jsonResult);
			return new ServiceResult<List<Integer>>(Code.SUCCESS, null, subStoreIds);
		} catch (Exception e) {
			if(e instanceof RestClientException){
				log.error(e);
			}else{
				log.error("request success!");
			}
			return new ServiceResult<List<Integer>>(Code.FAILED, null, null);
		}	
	}
	
	public ServiceResult<List<Integer>> getSubStoreIdList(Integer storeId,Integer subType,Short isAll){
		String subStoreRealUrl = MessageFormat.format(subStoreUrl, String.valueOf(storeId),subType,isAll);
		try {
			ResponseEntity<String> responseEntity = restTemplate.getForEntity(subStoreRealUrl, String.class);
			String jsonResult = responseEntity.getBody();
			List<Integer> subStoreIds = JsonUtil.fromJsonArray(jsonResult);
			return new ServiceResult<List<Integer>>(Code.SUCCESS, null, subStoreIds);
		} catch (Exception e) {
			if(e instanceof RestClientException){
				log.error(e);
			}else{
				log.error("request success!");
			}
			return new ServiceResult<List<Integer>>(Code.FAILED, null, null);
		}	
	}
	
	public ServiceResult<HashMap<String, Object>> getStoreDetail(Integer storeId){
		String storeDetailRealUrl = MessageFormat.format(storeDetailUrl, String.valueOf(storeId));
		try {
			ResponseEntity<String> responseEntity = restTemplate.getForEntity(storeDetailRealUrl, String.class);
			String jsonResult = responseEntity.getBody();
			InfoStore infoStore = JsonUtil.fromJson(jsonResult,InfoStore.class);
			if(infoStore!=null){
				HashMap<String, Object> map = new HashMap<String, Object>();
				//需要其他列时，请自助返回
				map.put("parentId", infoStore.getParentId()==null?storeId:infoStore.getParentId());
				map.put("shortName", infoStore.getShortName());
				return new ServiceResult<HashMap<String, Object>>(Code.SUCCESS, null, map);
			}else{
				return new ServiceResult<HashMap<String, Object>>(Code.FAILED, null, null);
			}
		} catch (Exception e) {
			if(e instanceof RestClientException){
				log.error(e);
			}else{
				log.error("request success!");
			}
			return new ServiceResult<HashMap<String, Object>>(Code.FAILED, null, null);
		}	
	}
	
	*//**
	 * 发送顾客注册短信
	 * @param storeId
	 * @param storeName
	 * @param userName
	 * @param password
	 * @param storeUrl
	 *//*
	public ServiceResult<Boolean> sendCustomerRegisterSMS(final Integer storeId,final String storeName,final Long userName){
		asyncThread.execute(new Runnable() {
			@Override
			public void run() {
				if(storeId!=null && userName!=null){
					String newName = storeName;
					if(StringUtil.isBlank(newName)){
						ServiceResult<HashMap<String, Object>> resultMap = null;
						resultMap = getStoreDetail(storeId);
						if(resultMap.getCode()==0){
							newName =  (String) (resultMap.getResult()!=null?resultMap.getResult().get("shortName"):null);
						}else{
							log.error("获取商户基本信息失败~");
						}
					}
					//发送注册短信及生成短链接
						List<String> param = new ArrayList<String>();
						param.add(newName);
						param.add(String.valueOf(storeId));
						sendSMS(storeId, ContantSmsTemplate.CUSTOMER_REGISTER_CONTENT, param, userName);
				}else{
					log.error("发送顾客注册短信时，参数不能为空!");
				}
			}
		});
		return new ServiceResult<Boolean>(Code.SUCCESS, null, null);
	}
	
	*//**
	 * 发送顾客注册送积分短信
	 * @param storeId
	 * @param point 积分值
	 * @param userName
	 * @param password
	 * @param storeUrl
	 *//*
	public ServiceResult<Boolean> sendCustomerRegisterPointSMS(final Integer storeId,final Integer point,final Long userName){
		asyncThread.execute(new Runnable() {
			@Override
			public void run() {
				if(point!=null && userName!=null&&storeId!=null){
					
					String newName = null;
					
					ServiceResult<HashMap<String, Object>> resultMap = getStoreDetail(storeId);
						if(resultMap.getCode()==0){
							newName =  (String) (resultMap.getResult()!=null?resultMap.getResult().get("shortName"):null);
						}else{
							log.error("获取商户基本信息失败~");
						}
					
					//发送注册短信及生成短链接 serName,creditsNum,storeId";
					List<String> param = new ArrayList<String>();
					
					param.add(newName);
					param.add(String.valueOf(point));
					param.add(String.valueOf(storeId));
						
					sendSMS(storeId, ContantSmsTemplate.REGISTER_SCORE, param, userName);
				}else{
					log.error("发送顾客注册短信时，参数不能为空!");
				}
			}
		});
		return new ServiceResult<Boolean>(Code.SUCCESS, null, null);
	}
	
	public ServiceResult<Boolean> sendCustomerApplySMS(final Integer storeId,final String storeName, final Long userName){
		asyncThread.execute(new Runnable() {
			@Override
			public void run() {
				if(storeId!=null && StringUtil.isNotBlank(storeName) && userName!=null){
					//发送申请通过短信及生成短链接
					List<String> param = new ArrayList<String>();
					param.add(storeName);
					param.add(String.valueOf(storeId));
					sendSMS(storeId, ContantSmsTemplate.CUSTOMER_REGISTER_CONTENT, param, userName);	
				}else{
					log.error("发送顾客申请通过短信时，参数不能为空!");
				}
			}
		});
		return new ServiceResult<Boolean>(Code.SUCCESS, null, null);
	}
	
	*//**
	 * 获取短链接
	 * @param url
	 * @return
	 *//*
	public ServiceResult<String> getShortUrl(String url){
		try {
			url = URLEncoder.encode(url, "UTF-8");
			String requestUrl = MessageFormat.format(shortUrl,url);
			String data = HttpUtil.get(requestUrl);
			List<LinkedHashMap<String, String>> result = JsonUtil.fromJsonArray(data);
			if(result!=null && result.size()>0){
				LinkedHashMap<String, String> map = result.get(0);
				url = !map.isEmpty()?map.get("url_short"):null;
			}else{
				return new ServiceResult<String>(Code.FAILED, "生成短链接异常", null);
			}
		} catch (Exception e) {
			log.error("生成短链接异常：" + e);
			return new ServiceResult<String>(Code.FAILED, "生成短链接异常", null);
		}
		return new ServiceResult<String>(Code.SUCCESS, null, url);
	}
	
}
*/