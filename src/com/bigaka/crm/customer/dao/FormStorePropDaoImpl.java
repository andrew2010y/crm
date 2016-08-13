package com.bigaka.crm.customer.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bigaka.crm.common.util.StringUtil;
import com.bigaka.crm.customer.model.CustomerDetail;
import com.bigaka.crm.form.model.FormStoreProp;
import com.bigaka.crm.form.model.FormStoreProp.FormType;
import com.bigaka.crm.service.assist.JdbcHandler;

/**
 * 商户自定义表单属性
 * @author Dylan_Tao
 * @date 2016-06-14
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
@Repository("formStorePropDao")
public class FormStorePropDaoImpl implements FormStorePropDao{
	
	@Autowired
	private JdbcHandler handler;

	@Override
	public List<FormStoreProp> getFormStoreProp(Integer storeId, Boolean useState) {
		StringBuffer sql = new StringBuffer("select * from form_store_prop where store_id = ?");
		if(useState!=null){
			sql.append(" and use_state = ?");
			return handler.getForList(sql.toString(), FormStoreProp.class, storeId, useState);
		}else{
			return handler.getForList(sql.toString(), FormStoreProp.class, storeId);
		}
	}
	
	@Override
	public List<FormStoreProp> getFormStoreProp(CustomerDetail detail,boolean useState) {
		StringBuffer sql = new StringBuffer("select * from form_store_prop where use_state = ? and store_id = (select parent_store_id from customer ");
		List<Object> paramList = new ArrayList<Object>();
		paramList.add(useState);
		if(detail.getCustomerId()!=null){
			sql.append(" where customer_id = ?");
			paramList.add(detail.getCustomerId());
		}
		if(StringUtil.isNotBlank(detail.getOpenId()) && detail.getParentStoreId()!=null){
			sql.append(" where open_id = ? and parent_store_id = ?");
			paramList.add(detail.getOpenId());
			paramList.add(detail.getParentStoreId());
		}
		sql.append(")");
		return handler.getForList(sql.toString(), FormStoreProp.class, paramList.toArray());
	}

	@Override
	public boolean isExistDefaultProp(Integer storeId, FormType type) {
		String sql = "select store_prop_id from form_store_prop where store_id = ? and type = ?";
		Long storePropId = handler.getForColumn(sql, Long.class, storeId, type.getValue());
		return storePropId!=null?true:false;
	}

	@Override
	public boolean saveDefaultProp(FormStoreProp prop) {
		String sql = "insert into form_store_prop(store_prop_id,store_id,`name`,label_name,`type`,sub_type,placeholder,`value`,`limit`,required,use_state) values(?,?,?,?,?,?,?,?,?,?,?)";
		List<Object> param = new ArrayList<Object>();
		param.add(prop.getStorePropId());
		param.add(prop.getStoreId());
		param.add(prop.getName());
		param.add(prop.getLabelName());
		param.add(prop.getType());
		
		param.add(prop.getSubType());
		param.add(prop.getPlaceholder());
		param.add(prop.getValue());
		
		param.add(prop.getLimit()==null?0:prop.getLimit());
		param.add(prop.getRequired()==null?false:prop.getRequired());
		param.add(prop.getUseState()==null?true:prop.getUseState());
		return handler.save(sql, param.toArray());
	}
	
	@Override
	public boolean updateDefaultProp(FormStoreProp prop) {
		StringBuffer sql = new StringBuffer("update form_store_prop set use_state = ?");
		List<Object> param = new ArrayList<Object>();
		param.add(prop.getUseState());
		
		if(prop.getValue()!=null){
			sql.append(",value=?");
			param.add(prop.getValue());
		}
		sql.append(" where store_id = ? and type = ?");
		param.add(prop.getStoreId());
		param.add(prop.getType());	
		return handler.update(sql.toString(), param.toArray());
	}
	
	@Override
	public boolean batchUpdateCustomProp(List<List<Object>> paramList) {
		String sql = "update form_store_prop set use_state = ?,value=? where store_prop_id = ?";
		return handler.batchUpdate(sql, paramList);
	}
	
	
}
