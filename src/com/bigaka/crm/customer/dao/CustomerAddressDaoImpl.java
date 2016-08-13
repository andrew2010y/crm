package com.bigaka.crm.customer.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bigaka.crm.common.util.StringUtil;
import com.bigaka.crm.customer.dao.CustomerAddressDao;
import com.bigaka.crm.customer.model.CustomerAddress;
import com.bigaka.crm.service.assist.JdbcHandler;

/**
 * 顾客收货地址
 * @author Dylan_Tao
 * @date 2015-12-15
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
@Repository("customerAddressDao")
public class CustomerAddressDaoImpl implements CustomerAddressDao{
	
	@Autowired
	private JdbcHandler handler;

	@Override
	public List<CustomerAddress> getCustomerAddressList(CustomerAddress address) {
		StringBuffer sql = new StringBuffer("select customer_address_id customerAddressId,city_code cityCode,name,phone,address,is_default isDefault,cookie_id cookieId,card_no cardNo,remark,create_time createTime from customer_address where ");
		Object[] param = new Object[1];
		if(address.getCustomerId()!=null){
			sql.append("customer_id = ?");
			param[0] = address.getCustomerId();
		}else if(StringUtil.isNotBlank(address.getCookieId())){
			sql.append("cookie_id = ?");
			param[0] = address.getCookieId();
		}
		sql.append(" order by is_default desc, create_time desc limit 0,5");
		return handler.getForList(sql.toString(), CustomerAddress.class, param);
	}
	
	@Override
	public CustomerAddress getCustomerAddress(CustomerAddress address) {
		String sql = "select customer_address_id customerAddressId,city_code cityCode,name,phone,address,is_default isDefault,cookie_id cookieId,card_no cardNo,remark,create_time createTime from customer_address where customer_address_id = ?";
		return handler.getForObject(sql, CustomerAddress.class, address.getCustomerAddressId());
	}

	@Override
	public boolean saveCustomerAddress(CustomerAddress address) {
		String sql = "insert into customer_address(customer_address_id,customer_id,city_code,name,phone,address,is_default,cookie_id,card_no,remark,create_time) values(?,?,?,?,?,?,?,?,?,?,?)";
		List<Object> paramList = new ArrayList<Object>();
		paramList.add(address.getCustomerAddressId());
		paramList.add(address.getCustomerId());
		paramList.add(address.getCityCode());
		paramList.add(address.getName());
		paramList.add(address.getPhone());
		paramList.add(address.getAddress());
		paramList.add(address.getIsDefault());
		paramList.add(address.getCookieId());
		paramList.add(address.getCardNo());
		paramList.add(address.getRemark());
		paramList.add(address.getCreateTime());
		return handler.save(sql, paramList.toArray());
	}

	@Override
	public boolean updateCustomerAddress(CustomerAddress address) {
		List<Object> paramList = new ArrayList<Object>();
		StringBuffer sql = new StringBuffer("update customer_address set customer_id = ?");
		paramList.add(address.getCustomerId());
		
		if(address.getCityCode() != null){
			sql.append(",city_code = ?");
			paramList.add(address.getCityCode());
		}
		
		if(StringUtil.isNotBlank(address.getName())){
			sql.append(",name = ?");
			paramList.add(address.getName());
		}
		
		if(StringUtil.isNotBlank(address.getPhone())){
			sql.append(",phone = ?");
			paramList.add(address.getPhone());
		}
		
		if(StringUtil.isNotBlank(address.getAddress())){
			sql.append(",address = ?");
			paramList.add(address.getAddress());
		}
		
		if(address.getIsDefault() != null){
			sql.append(",is_default = ?");
			paramList.add(address.getIsDefault());
		}
		
		if(StringUtil.isNotBlank(address.getCardNo())){
			sql.append(",card_no = ?");
			paramList.add(address.getCardNo());
		}
		
		if(StringUtil.isNotBlank(address.getRemark())){
			sql.append(",remark = ?");
			paramList.add(address.getRemark());
		}
		
		if(address.getCreateTime() != null){
			sql.append(",create_time = ?");
			paramList.add(address.getCreateTime());
		}
		sql.append(" where 1=1");
		if(address.getCustomerAddressId()!=null){
			sql.append(" and customer_address_id = ?");
			paramList.add(address.getCustomerAddressId());
		}
		//下面不能颠倒顺序
		if(StringUtil.isNotBlank(address.getCookieId())){
			sql.append(" and cookie_id = ?");
			paramList.add(address.getCookieId());
		}else if(address.getCustomerId()!=null && address.getCustomerId()>0){
			sql.append(" and customer_id = ?");
			paramList.add(address.getCustomerId());
		}
		return handler.update(sql.toString(), paramList.toArray());
	}

	@Override
	public boolean deleteCustomerAddress(CustomerAddress address) {
		StringBuffer sql = new StringBuffer("delete from customer_address where customer_address_id = ?");
		if(StringUtil.isNotBlank(address.getCookieId())){
			sql.append(" and cookie_id = ?");
			return handler.delete(sql.toString(), address.getCustomerAddressId(), address.getCookieId());
		}else if(address.getCustomerId()!=null && address.getCustomerId()>0){
			sql.append(" and customer_id = ?");
			return handler.delete(sql.toString(), address.getCustomerAddressId(), address.getCustomerId());
		}else{
			return false;
		}
	}

	@Override
	public boolean resetCustomerDefaultAddress(Integer customerId) {
		String sql = "update customer_address set is_default = false where customer_id = ?";
		return handler.update(sql, customerId);
	}

}
