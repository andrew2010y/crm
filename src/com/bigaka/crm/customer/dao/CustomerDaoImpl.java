package com.bigaka.crm.customer.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bigaka.crm.common.model.Page;
import com.bigaka.crm.common.util.DateUtil;
import com.bigaka.crm.common.util.StringUtil;
import com.bigaka.crm.customer.model.Customer;
import com.bigaka.crm.customer.model.Customer.ThirdSupportKey;
import com.bigaka.crm.service.assist.JdbcHandler;
import com.bigaka.crm.service.assist.SqlHandler;

/**
 * 顾客基本信息
 * @author Dylan_Tao
 * @date 2015-12-01
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
@Repository("customerDao")
public class CustomerDaoImpl implements CustomerDao{
	 
	@Autowired
	private JdbcHandler handler;

	@Override
	public int saveCustomer(Customer customer) {
		String sql = "insert into customer(parent_store_id,store_id,username,`password`,register_type,register_channel,open_id,login_time,update_time,create_time) values(?,?,?,?,?,?,?,?,?,?)";
		List<Object> paramList = new ArrayList<Object>();
		paramList.add(customer.getParentStoreId());
		paramList.add(customer.getStoreId());
		paramList.add(customer.getUsername());
		paramList.add(customer.getPassword());
		paramList.add(customer.getRegisterType().getValue());
		paramList.add(customer.getRegisterChannel().getValue());
		paramList.add(customer.getOpenId());
		paramList.add(customer.getCreateTime());
		paramList.add(customer.getCreateTime());
		paramList.add(customer.getCreateTime());
		return handler.saveReturnKey(sql, paramList.toArray());
	}
	 
	public Customer getCustomer(Customer customer){ 
		StringBuffer sql = new StringBuffer("select c.customer_id customerId,parent_store_id parentStoreId,store_id storeId,username,password,open_id openId,state,register_channel channel,cd.name,cd.logo,cd.phone,cd.point from customer c,customer_detail cd where cd.customer_id=c.customer_id");
		List<Object> paramList = new ArrayList<Object>();
		if(customer.getUsername()!=null){
			sql.append(" and c.username = ?");
			paramList.add(customer.getUsername());
		}
		if(StringUtil.isNotBlank(customer.getOpenId())){
			sql.append(" and c.open_id = ?");
			paramList.add(customer.getOpenId());
		}
		if(customer.getCustomerId()!=null){
			sql.append(" and c.customer_id = ?");
			paramList.add(customer.getCustomerId());
		}
		if(customer.getParentStoreId()!=null){
			sql.append(" and c.parent_store_id = ?");
			paramList.add(customer.getParentStoreId());
		}
		
		return handler.getForObject(sql.toString(), Customer.class, paramList.toArray());
	}
	
	public List<Customer> getCustomerList(Customer customer){ 
		StringBuffer sql = new StringBuffer("select c.customer_id customerId,parent_store_id parentStoreId,store_id storeId,username,password,open_id openId,state,cd.name,cd.logo,cd.phone,cd.point from customer c,customer_detail cd where cd.customer_id=c.customer_id");
		List<Object> paramList = new ArrayList<Object>();
		if(customer.getUsername()!=null){
			sql.append(" and c.username = ?");
			paramList.add(customer.getUsername());
		}
		if(StringUtil.isNotBlank(customer.getOpenId())){
			sql.append(" and c.open_id = ?");
			paramList.add(customer.getOpenId());
		}
		if(customer.getCustomerId()!=null){
			sql.append(" and c.customer_id = ?");
			paramList.add(customer.getCustomerId());
		}
		if(customer.getParentStoreId()!=null){
			sql.append(" and c.parent_store_id = ?");
			paramList.add(customer.getParentStoreId());
		}
		
		return handler.getForList(sql.toString(), Customer.class, paramList.toArray());
	}
	/**
	 * 获取用户的已有的数据信息。
	 */
	@Override
	public Customer getCustomerByCid(Integer customerId) {
		StringBuffer sql = new StringBuffer("select c.customer_id customerId,store_id storeId,username,password,open_id openId,parent_store_id parentStoreId from customer c where 1=1");
		List<Object> paramList = new ArrayList<Object>();
		if(customerId!=null){
			sql.append(" and c.customer_id = ?");
			paramList.add(customerId);
		}
		return handler.getForObject(sql.toString(), Customer.class, paramList.toArray());
	}
	
	@Override
	public boolean updateCustomer(Customer customer) {
		StringBuffer sql = new StringBuffer("update customer set update_time = ?");
		List<Object> params = new ArrayList<Object>();
		params.add(DateUtil.getTime());
		if(StringUtil.isNotBlank(customer.getPassword())){
			sql.append(",`password` = ?");
			params.add(customer.getPassword());
		}
		if(customer.getUsername()!=null){
			sql.append(",username = ?");
			params.add(customer.getUsername());
		}
		if(StringUtil.isNotBlank(customer.getOpenId())){
			sql.append(",open_id = ?");
			params.add(customer.getOpenId());
		}
		if(customer.getState()!=null){
			sql.append(",state = ?");
			params.add(customer.getState());
		}
		
		if(customer.getStoreId()!=null && customer.getStoreId() > 0){
			sql.append(",store_id = ?");
			params.add(customer.getStoreId());
		}
		if(customer.getRegisterType()!=null){
			sql.append(",register_type = ?");
			params.add(customer.getRegisterType().getValue());
		}
		if(customer.getRegisterChannel()!=null){
			sql.append(",register_channel = ?");
			params.add(customer.getRegisterChannel().getValue());
		}
		
		sql.append(" where customer_id = ?");
		params.add(customer.getCustomerId());
		return handler.update(sql.toString(), params.toArray());
	}
	
	@Override
	public boolean updateCustomerPwd(Customer customer) {
		StringBuffer sql = new StringBuffer("update customer set update_time = ?");
		List<Object> params = new ArrayList<Object>();
		params.add(DateUtil.getTime());
		if(StringUtil.isNotBlank(customer.getPassword())){
			sql.append(",`password` = ?");
			params.add(customer.getPassword());
		}
		if(customer.getParentStoreId()!=null && customer.getUsername()!=null){
			sql.append(" where parent_store_id = ? and username = ?");
			params.add(customer.getParentStoreId());
			params.add(customer.getUsername());
		}else if(customer.getCustomerId()!=null){
			sql.append(" where customer_id = ?");
			params.add(customer.getCustomerId());
		}
		return handler.update(sql.toString(), params.toArray());
	}

	@Override
	public boolean delCustomer(Customer customer) {
		String sql = "delete from customer where customer_id = ?";
		return handler.delete(sql, customer.getCustomerId());
	}
	
	@Override
	public long getCustomerCount(Integer storeId,List<Integer> subStoreIds,Long startTime, Long endTime) {
		StringBuffer sql = new StringBuffer("select count(*) from customer where ");
		List<Object> paramList = new ArrayList<Object>();
		if(storeId!=null){
			if(subStoreIds!=null && subStoreIds.size()>1){
				sql.append(" store_id");
				String newSql = SqlHandler.createIn(sql.toString(),subStoreIds.size());
				sql.setLength(0);
				sql.append(newSql);
				paramList.addAll(subStoreIds);
			}else{
				sql.append(" store_id = ?");
				paramList.add(storeId);	
			}
			
			if(startTime!=null && endTime!=null){
				sql.append(" and create_time >= ? and create_time <= ?");
				paramList.add(startTime);
				paramList.add(endTime);
			}
			return handler.getForColumn(sql.toString(), Integer.class, paramList.toArray());
		}else{
			return handler.getForColumn(sql.toString(), Integer.class);
		}
	}

	@Override
	public Page<Customer> getCustomerPage(List<Integer> subStoreIds, Page<Customer> page) {
		if(subStoreIds!=null&&subStoreIds.size()>0){
			StringBuffer sql = new StringBuffer();
			
			sql.append("select c.customer_id customerId ");
			sql.append(" from customer c ");
			sql.append(" where  c.store_id ");
			
			String newSql = SqlHandler.createIn(sql.toString(),subStoreIds.size());
			sql.setLength(0);
			sql.append(newSql);
			
			return handler.getForPage(sql.toString(), page, Customer.class, subStoreIds.toArray());

		}else{
			return page;
		}
	}
	
	@Override
	public Page<Customer> getPageByParentStoreId(List<Integer> subStoreIds, Page<Customer> page) {
		StringBuffer sql = new StringBuffer();
	
		
		List<Object> paramList = new ArrayList<Object>();
		
		sql.append("select c.customer_id customerId,parent_store_id parentStoreId,store_id storeId,username,open_id openId,state,cd.name,cd.logo,cd.phone,cd.point from customer c,customer_detail cd where cd.customer_id=c.customer_id");
		//sql.append(" and c.parent_store_id = ?");
		
		if(subStoreIds!=null){
			sql.append(" and c.store_id");
			String newSql = SqlHandler.createIn(sql.toString(),subStoreIds.size());
			sql.setLength(0);
			sql.append(newSql);
			paramList.addAll(subStoreIds);
		}
		
		return handler.getForPage(sql.toString(), page, Customer.class, paramList.toArray());
	}

	@Override
	public Customer getByParentStoreIdAndPhone(Integer parentStoreId, Long phone) {
		StringBuffer sql = new StringBuffer("select c.customer_id customerId,parent_store_id parentStoreId,store_id storeId,username,open_id openId,state,cd.name,cd.logo,cd.phone,cd.point from customer c,customer_detail cd where cd.customer_id=c.customer_id");
		sql.append(" and c.parent_store_id = ?");
		sql.append(" and c.username = ?");
		
		List<Object> paramList = new ArrayList<Object>();
		 
		paramList.add(parentStoreId);
		paramList.add(phone);
		
		return handler.getForObject(sql.toString(), Customer.class, paramList.toArray());
	}
	
	/*@Override
	public MembershipCode getMemberShipCode(Integer customerId, Long cardId) {
		String sql = " select membership_code_id membershipCodeId from membership_code where membership_id = ? and customer_id = ?";
		return handler.getForObject(sql, MembershipCode.class, cardId,customerId);
	}*/

	@Override
	public List<Customer> getCustomerByStoreId(List<Integer> ids) {
		String sql = " select cd.phone phone,DATE_FORMAT(c.create_time,'%Y-%m-%d %H:%i:%s') logo,cc.customer_price remark,cc.total_count areaCode,store_id storeId from customer c,customer_detail cd,customer_count cc where c.customer_id = cc.customer_id and cc.customer_id = cd.customer_id and c.store_id";
		sql = SqlHandler.createIn(sql, ids.size()) + "   order by c.create_time desc";
		return handler.getForList(sql, Customer.class, ids.toArray());
	}

	@Override
	public boolean updateCustomerDetailPhone(Customer cust) {
		String sql = " update customer_detail set update_time = ? ,phone = ? where customer_id = ?";
		return handler.update(sql, DateUtil.getTime(), cust.getUsername(),cust.getCustomerId());
	}

	@Override
	public List<String> getOpenIdList(Integer storeId) {
		String sql = "SELECT DISTINCT  open_id from customer where parent_store_id = ? and open_id is not NULL and open_id !=''";
		return handler.getForColumnList(sql, String.class, storeId);
	}
	
	public List<Customer> getCustomerBindConn(Integer parentStoreId,List<String> paramList,ThirdSupportKey key){
		StringBuffer sql = new StringBuffer();
		List<Object> params = new ArrayList<Object>();
		if(key.equals(ThirdSupportKey.PHONE)){
			sql.append("select customer_id,username");
			sql.append(" from customer where parent_store_id = ? ");
			params.add(parentStoreId);
			
			if(paramList.size()==1){
				sql.append(" and username = ?");
				params.add(paramList.get(0));
			}else{
				sql.append(" and username");
				sql = SqlHandler.createIn(sql, paramList.size());
				params.addAll(paramList);
			}
		}else{
			return null;
		}
		return handler.getForList(sql.toString(), Customer.class, params.toArray());
	}
 
}
