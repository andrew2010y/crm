package com.bigaka.crm.customer.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bigaka.crm.common.util.StringUtil;
import com.bigaka.crm.customer.model.CustomerTag;
import com.bigaka.crm.service.assist.JdbcHandler;
import com.bigaka.crm.service.assist.SqlHandler;
import com.bigaka.crm.tag.model.Tag;

/**
 * 顾客标签
 * @author Dylan_Tao
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
@Repository("customerTagDao")
public class CustomerTagDaoImpl implements CustomerTagDao{
	
	@Autowired
	private JdbcHandler handler;

	@Override
	public List<CustomerTag> getCustomerTagListExt(List<Integer> custIds) {
		String sql = "select ct.tag_id tagId,ct.customer_id customerId,t.name from customer_tag ct,tag t where ct.tag_id = t.tag_id and ct.customer_id";
		if(custIds!=null && custIds.size()==0){
			sql = " = ?";
			return handler.getForList(sql, CustomerTag.class, custIds.get(0));
		}else{
			sql = SqlHandler.createIn(sql, custIds.size());
			return handler.getForList(sql, CustomerTag.class, custIds.toArray());
		}
	}
	
	@Override
	public boolean batchSaveCustomerTag(List<List<Object>> params) {
		String sql = "insert into customer_tag(customer_tag_id,customer_id,tag_id,create_time) values(?,?,?,?)";
		return handler.batchSave(sql, params);
	}
	
	@Override
	public List<CustomerTag> getCustomerTagList(List<Integer> custIds) {
		String sql = "select tag_id tagId,customer_id customerId from customer_tag where customer_id";
		if(custIds!=null && custIds.size()==0){
			sql = " = ?";
			return handler.getForList(sql, CustomerTag.class, custIds.get(0));
		}else{
			sql = SqlHandler.createIn(sql, custIds.size());
			return handler.getForList(sql, CustomerTag.class, custIds.toArray());
		}
	}

	@Override
	public boolean deleteCustomerTag(Integer customerId) {
		String sql = "delete from customer_tag where customer_id = ?";
		return handler.delete(sql, customerId);
	}

	@Override
	public boolean deleteCustomerTag(Long tagId, Long userId) {
		String sql = " delete from customer_tag where tag_id = ? and customer_id = ?";
		return handler.delete(sql, tagId,userId);
	}

	@Override
	public boolean batchDeleteCustomerTag(Long tagId, Long[] userIds) {
		String sql = " delete from customer_tag where tag_id = ? and customer_id ";
		sql = SqlHandler.createIn(sql, userIds.length);
		List<Object> params = new ArrayList<Object>();
		params.add(tagId);
		for(Long id :userIds){
			params.add(id);
		}
		return handler.delete(sql,params.toArray());
	}

	@Override
	public int getCustomerTagByTagId(Long tagId) {
		String sql = " select count(*) from customer_tag where tag_id = ? ";
		return handler.getForColumn(sql, Integer.class, tagId);
	}

	@Override
	public boolean deleteCustomerTagById(Long tagId) {
		String sql = " delete from customer_tag where tag_id = ?";
		return handler.delete(sql, tagId);
	}
	

	@Override
	public List<Long> getUserIdsByTagId(Long id) {
		String sql = "select customer_id customerId from customer_tag where tag_id = ? ";
		return handler.getForColumnList(sql, Long.class, id);
	}

	@Override
	public List<String> getOpenIdsByTagIds(List<Long> tagIds,Integer storeId) {
		StringBuilder sql = new StringBuilder("SELECT DISTINCT  t2.open_id from customer_tag t1 join (select customer_id,open_id from customer where  parent_store_id = ? and open_id is not NULL and open_id !='') t2 on t1.customer_id = t2.customer_id  ");
		List<Object> params = new ArrayList<Object>();
		params.add(storeId);
		if(tagIds != null && tagIds.size() > 0){
			sql.append(" where t1.tag_id in (");	
			StringUtil.appendMutilStr(sql, "?", tagIds.size(), ",");
			sql.append(")");
			params.addAll(tagIds);
		}
		return handler.getForColumnList(sql.toString(), String.class, params.toArray());
	}
	
	/**
	 * 根据标签id查询用户id集合
	 * @author Ji qc
	 * @date 2016年7月15日
	 * @return
	 */
	@Override
	public List<CustomerTag> getCustomerTagByTid(Tag tag) {
		String sql="SELECT customer_id from customer_tag ct,tag t where ct.tag_id=t.tag_id and ct.tag_id=? and store_id=?";
		List<Object> params = new ArrayList<Object>();
		params.add(tag.getTagId());
		params.add(tag.getStoreId());
		return handler.getForList(sql, CustomerTag.class, params.toArray());
	}
}
