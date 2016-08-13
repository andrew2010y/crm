package com.bigaka.crm.customer.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bigaka.crm.common.assist.ServiceException;
import com.bigaka.crm.common.model.Code;
import com.bigaka.crm.common.model.Constant;
import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.common.util.StringUtil;
import com.bigaka.crm.customer.dao.FormStorePropDao;
import com.bigaka.crm.customer.model.CustomerDetail;
import com.bigaka.crm.form.model.FormStoreProp;
import com.bigaka.crm.form.model.FormStoreProp.FormType;
import com.bigaka.crm.form.model.FormStorePropExt;
import com.bigaka.crm.service.assist.UniqueGenerate;

/**
 * 商户自定义表单属性
 * @author Dylan_Tao
 * @date 2016-06-14
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
@Service("formStorePropService")
public class FormStorePropServiceImpl implements FormStorePropService{
	
	@Autowired
	private FormStorePropDao formStorePropDao;
	@Autowired
	private UniqueGenerate uniqueGenerate;

	@Override
	public ServiceResult<HashMap<String, FormStorePropExt>> getFormStoreProp(Integer storeId) {
		
		List<FormStoreProp> list = formStorePropDao.getFormStoreProp(storeId,null);
		HashMap<String, FormStorePropExt> result = new HashMap<String, FormStorePropExt>();
		FormStorePropExt usingExt = new FormStorePropExt();
		FormStorePropExt unusedExt = new FormStorePropExt();
		
		if(list!=null){
			List<String> usingList = null;
			
			List<FormStoreProp> usingCustomProp = new ArrayList<FormStoreProp>();
			List<FormStoreProp> unusedCustomProp = new ArrayList<FormStoreProp>();
			for(FormStoreProp prop:list){
				if(FormType.DEFAULT.getValue().equals(prop.getType())){
					usingList = getDefaultUsing(prop.getValue());
				}else{
					if(prop.getUseState()){
						usingCustomProp.add(prop);
					}else{
						unusedCustomProp.add(prop);
					}
				}
			}
			
			usingExt.setCustomProp(usingCustomProp);
			unusedExt.setCustomProp(unusedCustomProp);
			
			// usingList-> not null 设置为空，null为没数据
			List<String> unusedList = getDefaultUnUsed(usingList);
			if(usingList==null){
				usingExt.setDefaultProp(getDefaultProp());
				unusedExt.setDefaultProp(unusedList);
			}else{
				usingExt.setDefaultProp(usingList);
				unusedExt.setDefaultProp(unusedList);
			}
		}
		
		result.put("using", usingExt);
		result.put("unused", unusedExt);
		
		return new ServiceResult<HashMap<String,FormStorePropExt>>(Code.SUCCESS,null,result);
	}
	
	@Override
	public ServiceResult<FormStorePropExt> getFormStoreUsingProp(Integer storeId) {
		List<FormStoreProp> list = formStorePropDao.getFormStoreProp(storeId,true);
		FormStorePropExt usingExt = new FormStorePropExt();
		if(list!=null){
			List<String> usingList = null;
			List<FormStoreProp> usingCustomProp = new ArrayList<FormStoreProp>();
			for(FormStoreProp prop:list){
				if(FormType.DEFAULT.getValue().equals(prop.getType())){
					usingList = getDefaultUsing(prop.getValue());
				}else{
					usingCustomProp.add(prop);
				}
			}
			usingExt.setCustomProp(usingCustomProp);
			
			usingExt.setDefaultProp(usingList==null?getDefaultProp():usingList);
		}
		return new ServiceResult<FormStorePropExt>(Code.SUCCESS,null,usingExt);
	}
	
	@Override
	public ServiceResult<FormStorePropExt> getFormStoreUsingProp(CustomerDetail detail) {
		List<FormStoreProp> list = formStorePropDao.getFormStoreProp(detail,true);
		FormStorePropExt usingExt = new FormStorePropExt();
		if(list!=null){
			List<String> usingList = null;
			List<FormStoreProp> usingCustomProp = new ArrayList<FormStoreProp>();
			for(FormStoreProp prop:list){
				if(FormType.DEFAULT.getValue().equals(prop.getType())){
					usingList = getDefaultUsing(prop.getValue());
				}else{
					usingCustomProp.add(prop);
				}
			}
			usingExt.setCustomProp(usingCustomProp);
			usingExt.setDefaultProp(usingList==null?getDefaultProp():usingList);
		}
		return new ServiceResult<FormStorePropExt>(Code.SUCCESS,null,usingExt);
	}
	
	@Override
	public ServiceResult<Boolean> updateFormStoreProp(Integer storeId, HashMap<String, FormStorePropExt> data) {
		
		FormStorePropExt using = data.get("using");
		FormStorePropExt unused = data.get("unused");
		
		List<String> usingDefault = using.getDefaultProp();
		boolean flag = false;
		FormStoreProp prop = new FormStoreProp();
		
		if(usingDefault!=null && usingDefault.size()>0){
			
			String value = StringUtils.join(usingDefault, Constant.COMMA);
			
			if(formStorePropDao.isExistDefaultProp(storeId, FormType.DEFAULT)){
				prop.setUseState(true);
				prop.setValue(value);
				prop.setStoreId(storeId);
				prop.setType(FormType.DEFAULT.getValue());
				flag = formStorePropDao.updateDefaultProp(prop);
			}else{
				prop.setStorePropId(uniqueGenerate.getId());
				prop.setStoreId(storeId);
				prop.setName("default");
				prop.setLabelName("默认全部属性");
				prop.setType(FormType.DEFAULT.getValue());
				prop.setValue(value);
				prop.setLimit("0");
				prop.setRequired(true);
				prop.setUseState(true);
				flag = formStorePropDao.saveDefaultProp(prop);
			}
			if(!flag){
				throw new ServiceException(Code.FORM_STORE_DEFAULT_PROP_ERROR, Code.FORM_STORE_DEFAULT_PROP_MSG);
			}
		}else{
			if(formStorePropDao.isExistDefaultProp(storeId, FormType.DEFAULT)){
				prop.setUseState(true);
				prop.setStoreId(storeId);
				prop.setValue("");
				prop.setType(FormType.DEFAULT.getValue());
				flag = formStorePropDao.updateDefaultProp(prop);
			}
		}
		
		List<List<Object>> paramList = new ArrayList<List<Object>>();
		
		List<FormStoreProp> usingCustomList = using.getCustomProp();
		if(usingCustomList!=null && usingCustomList.size()>0){
			for(FormStoreProp usingCustom:usingCustomList){
				if(usingCustom!=null && usingCustom.getStorePropId()>0){
					List<Object> param = new ArrayList<Object>();
					param.add(true);
					param.add(usingCustom.getValue());
					param.add(usingCustom.getStorePropId());
					paramList.add(param);
				}
			}
		}
		
		List<FormStoreProp> unusedCustomList = unused.getCustomProp();
		if(unusedCustomList!=null && unusedCustomList.size()>0){
			for(FormStoreProp unusedCustom:unusedCustomList){
				if(unusedCustom!=null && unusedCustom.getStorePropId()>0){
					List<Object> param = new ArrayList<Object>();
					param.add(false);
					param.add(unusedCustom.getValue());
					param.add(unusedCustom.getStorePropId());
					paramList.add(param);
				}
			}
		}
		
		flag = formStorePropDao.batchUpdateCustomProp(paramList);
		
		if(!flag){
			throw new ServiceException(Code.FORM_STORE_CUSTOM_PROP_ERROR, Code.FORM_STORE_CUSTOM_PROP_MSG);
		}
		
		return new ServiceResult<Boolean>(Code.SUCCESS, null, flag);
	}
	
	
	/*获取正在使用的默认属性列*/
	protected List<String> getDefaultUsing(String usingStr){
		List<String> list = new ArrayList<String>();
		if(StringUtil.isNotBlank(usingStr)){
			if(usingStr.indexOf(",")>0){
				String[] a = usingStr.split(",");
				list.addAll(Arrays.asList(a));
			}else{
				list.add(usingStr);
			}
		}
		return list;
	}
	/*获取未使用的默认属性列*/
	protected List<String> getDefaultUnUsed(List<String> usingList){
		List<String> defaultUsingList = new ArrayList<String>();
		if(usingList!=null){
			defaultUsingList.addAll(Arrays.asList(FormStoreProp.defaultFormParam));
			defaultUsingList.removeAll(usingList);
		}
		return defaultUsingList;
	}
	
	/*获取默认属性列*/
	protected List<String> getDefaultProp(){
		return Arrays.asList(FormStoreProp.defaultFormParam);
	}


}
