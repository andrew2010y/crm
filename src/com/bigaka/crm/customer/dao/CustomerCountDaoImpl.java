package com.bigaka.crm.customer.dao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bigaka.crm.common.model.Code;
import com.bigaka.crm.common.model.Constant.OrderConstant;
import com.bigaka.crm.common.model.Page;
import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.common.util.DateUtil;
import com.bigaka.crm.customer.model.CustomerCount;
import com.bigaka.crm.customer.model.CustomerReport;
import com.bigaka.crm.customer.model.CustomerSearchParam.CustomerGroupByEnum;
import com.bigaka.crm.service.assist.JdbcHandler;
import com.bigaka.crm.service.assist.SqlHandler;

/**
 * 顾客消费统计
 * @author Dylan_Tao
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
@Repository("customerCountDao")
public class CustomerCountDaoImpl implements CustomerCountDao{
	
	@Autowired
	private JdbcHandler handler;

	@Override
	public boolean saveCustomerCount(int customerId) {
		String sql = "insert into customer_count(customer_id) values(?)";
		return handler.save(sql, customerId);
	}

	@Override
	public boolean delCustomerCount(int customerId) {
		String sql = "delete from customer_count where customer_id = ?";
		return handler.delete(sql, customerId);
	}

	@Override
	public List<CustomerReport> getCustomerCountByDateGroupBy(Integer date,Integer[] subStoreId,Long startTime,Long endTime,CustomerGroupByEnum byEnum,OrderConstant orderBy) {
		List<Object> param = new ArrayList<Object>();
		StringBuffer sql = new StringBuffer("");
		if(byEnum.equals(CustomerGroupByEnum.DATE)){
			sql.append("SELECT COUNT(*) as count ,date(c.create_time) as createTime ");
		}else if(byEnum.equals(CustomerGroupByEnum.STOREID)){
			sql.append("SELECT COUNT(*) as count ,store_id as storeId ");
		}
		sql.append(" FROM `customer` c where ")
		.append(" c.store_id");
		
		for(int i=0;i<subStoreId.length;i++){
			if(i==0){
				sql.append(" in(?");
			}else{
				sql.append(",?");
			}
		}
		sql.append(")");
		
		param.addAll(Arrays.asList(subStoreId));
		
		if(startTime!=null&&endTime!=null){
			sql.append(" and c.create_time >= ? ");
			param.add(startTime);
			
			sql.append(" and create_time <= ?");
			param.add(endTime);
		}else if(date!=null){
			sql.append(" and date_sub(curdate(), INTERVAL ")
			.append(date)
			.append(" DAY) <= date(c.create_time)");
		}
		if(byEnum.equals(CustomerGroupByEnum.DATE)){
			sql.append(" GROUP BY date(c.create_time)");
		}else if(byEnum.equals(CustomerGroupByEnum.STOREID)){
			sql.append(" GROUP BY store_id ORDER BY count ").append(orderBy.toString());
		}
		return handler.getForList(sql.toString(), CustomerReport.class,param.toArray());
	}
	
	@Override
	public List<CustomerReport> getCustomerCountByHourGroupBy(Integer hour,Integer[] subStoreId,CustomerGroupByEnum byEnum,OrderConstant orderBy){
		StringBuffer sql = new StringBuffer();
		if(byEnum.equals(CustomerGroupByEnum.HOUR)){
			sql.append(" SELECT COUNT(*) as count ,HOUR(c.create_time) as hour, date(c.create_time) as createTime FROM `customer` c where ");
		}else if(byEnum.equals(CustomerGroupByEnum.STOREID)){
			sql.append("SELECT COUNT(*) as count ,c.store_id as storeId FROM `customer` c where ");
		}
		sql.append(" c.store_id ");
		for(int i=0;i<subStoreId.length;i++){
			if(i==0){
				sql.append(" in(?");
			}else{
				sql.append(",?");
			}
		}
		sql.append(")");
		sql.append(" and date_format(c.create_time,'%Y%m%d%H')>=date_format(DATE_sub(now(),")
		.append(" INTERVAL ")
		.append(hour).append(" HOUR ),'%Y%m%d%H')");
		
		if(byEnum.equals(CustomerGroupByEnum.HOUR)){
			sql.append(" GROUP BY date_format(c.create_time,'%Y%m%d%H')");
		}else if(byEnum.equals(CustomerGroupByEnum.STOREID)){
			sql.append(" GROUP BY store_id ORDER BY count ").append(orderBy.toString());
		}
		List<Object> param = new ArrayList<Object>();
		param.addAll(Arrays.asList(subStoreId));
		 
		return handler.getForList(sql.toString(),CustomerReport.class,param.toArray());
	}
	
	
	
	@Override
	public Long getRegisterCustomerCountByDate(Integer date,Integer[] subStoreId,Long startTime,Long endTime) {
		List<Object> param = new ArrayList<Object>();
		StringBuffer sql = new StringBuffer("");
	 
		sql.append("SELECT COUNT(*) as count")
		.append(" FROM `customer` c where ")
		.append(" c.store_id");
		
		for(int i=0;i<subStoreId.length;i++){
			if(i==0){
				sql.append(" in(?");
			}else{
				sql.append(",?");
			}
		}
		sql.append(")");
		
		param.addAll(Arrays.asList(subStoreId));
		
		if(startTime!=null&&endTime!=null){
			sql.append(" and c.create_time >= ? ");
			param.add(startTime);
			
			sql.append(" and create_time <= ?");
			param.add(endTime);
		}else{
			sql.append(" and date_sub(curdate(), INTERVAL ")
			.append(date)
			.append(" DAY) <= date(c.create_time)");
		}
		
		return handler.getForColumn(sql.toString(), Long.class,param.toArray());
	}
	
	@Override
	public Long getRegisterCustomerCountByHour(Integer hour,Integer[] subStoreId){
		StringBuffer sql = new StringBuffer();
		sql.append(" SELECT COUNT(*) as count FROM `customer` c where ");
		sql.append(" c.store_id ");
		for(int i=0;i<subStoreId.length;i++){
			if(i==0){
				sql.append(" in(?");
			}else{
				sql.append(",?");
			}
		}
		sql.append(")");
		sql.append(" and date_format(c.create_time,'%Y%m%d%H')>=date_format(DATE_sub(now(),")
		.append(" INTERVAL ")
		.append(hour).append(" HOUR ),'%Y%m%d%H')");
		
		List<Object> param = new ArrayList<Object>();
		param.addAll(Arrays.asList(subStoreId));
		 
		return handler.getForColumn(sql.toString(),Long.class,param.toArray());
	}
	
	
	 
	public List<CustomerReport> getRegisterChannelCountByHour(Integer hour,Integer[] subStoreId) {
		List<Object> param = new ArrayList<Object>();
		StringBuffer sql = new StringBuffer();
		
		sql.append("SELECT COUNT(*) as count ,register_channel ")
		.append(" ,HOUR(c.create_time) as hour, date(c.create_time) as createTime ")
		.append(" FROM `customer` c where ");
		 
		sql.append(" c.store_id ");
		for(int i=0;i<subStoreId.length;i++){
			if(i==0){
				sql.append(" in(?");
			}else{
				sql.append(",?");
			}
		}
		sql.append(")");
		
		sql.append(" and date_format(c.create_time,'%Y%m%d%H')>=date_format(DATE_sub(now(), INTERVAL ")
		.append(hour).append(" HOUR ");
		sql.append(" ),'%Y%m%d%H') GROUP BY c.register_channel,date_format(c.create_time,'%Y%m%d%H') ");
				
		param.addAll(Arrays.asList(subStoreId));
		
		return handler.getForList(sql.toString(), CustomerReport.class,param.toArray());
	}
	
	@Override
	public List<CustomerReport> getChannelCountByDate(Integer intervalStart,Integer intervalEnd,Integer[] subStoreId) {
		
		StringBuffer sql = new StringBuffer("");
		 
		sql.append("SELECT COUNT(*) as count ,register_channel  FROM `customer` c where ");
		sql.append(" c.store_id ");
		
		for(int i=0;i<subStoreId.length;i++){
			if(i==0){
				sql.append(" in(?");
			}else{
				sql.append(",?");
			}
		}
		sql.append(")");
		
		sql.append("  and date_sub(curdate(), INTERVAL ")
		.append(intervalStart)
		.append(" DAY) <= date(c.create_time) ");
		
		if(intervalEnd!=null){
			sql.append(" and date(c.create_time)<=date_sub(curdate(), INTERVAL ")
			.append(intervalEnd).append(" DAY) ");
		}
		
		sql.append(" GROUP BY c.register_channel");
		 
		List<Object> param = new ArrayList<Object>();
		
		param.addAll(Arrays.asList(subStoreId));
		
		return handler.getForList(sql.toString(), CustomerReport.class,param.toArray());
	}

	@Override
	public ServiceResult<String> updateCustomerCount(Double price, Byte channel, Integer customerId) {
		String sql = " update customer_count set customer_price = customer_price + ?,total_count = total_count+1,consume_time = ?,consume_channel = ?,price=? where customer_id = ?";
		if(handler.update(sql, price , DateUtil.getTime(),channel,price,customerId)){
			 return new ServiceResult<String>(Code.SUCCESS, "更新成功", "");
		}else {
			 return new ServiceResult<String>(Code.SUCCESS, "更新失败", "");
		}
	}

	@Override
	public CustomerCount getCustomerCount(String customerId) {
		String sql = " select customer_price customerPrice,total_count totalCount,year_count yearCount ,month_count monthCount,day_count dayCount,consume_time consumeTime,consume_channel consumeChannel from customer_count where customer_id = ? ";
		CustomerCount count = handler.getForObject(sql, CustomerCount.class, customerId);
		return count;
	}

//	//TODO
//	@Override
//	public Page<CustomerReport> getTop10CustomerCount(Page<CustomerReport> page,Integer[] storeId , Long startTime, Long endTime, OrderConstant orderBy) {
//		StringBuffer sql = new StringBuffer();
//		List<Object> param = new ArrayList<Object>();
//		sql.append("SELECT COUNT(*) as count ,store_id as storeId FROM `customer` c where 1=1");
//		
//		if(startTime!=null && endTime!=null){
//			sql.append(" and create_time >= ? and create_time <= ?");
//			param.add(startTime);
//			param.add(endTime);
//		}
//		
//		sql.append(" and c.store_id ");
//		
//	    for(int i=0;i<storeId.length;i++){
//			if(i==0){
//				sql.append(" in(?");
//			}else{
//				sql.append(",?");
//			}
//		}
//		sql.append(")")
//		.append(" and c.username!='0'")
//		.append(" GROUP BY c.store_id");
//		if(orderBy ==null || orderBy.equals(OrderConstant.DESC)){
//			sql.append(" ORDER BY COUNT(*) DESC");
//		}else if(orderBy.equals(OrderConstant.ASC)){
//			sql.append(" ORDER BY COUNT(*) ASC");
//		}
//		param.addAll(Arrays.asList(storeId));
//		 
//		return handler.getForPage(sql.toString(), page ,CustomerReport.class,param.toArray());
//	}

	@Override
	public Integer getCustomerCountByStoreId(Integer[] subStoreId) {
		StringBuffer sql = new StringBuffer("select COUNT(*) from customer where ");
		Integer count = 0;
		if(subStoreId!=null && subStoreId.length>0){
			sql.append(" store_id ");
			for(int i=0;i<subStoreId.length;i++){
				if(i==0){
					sql.append(" in(?");
				}else{
					sql.append(",?");
				}	
			}
			sql.append(")");
			count = handler.getForColumn(sql.toString(), Integer.class,subStoreId);
		}else{
			count = handler.getForColumn(sql.toString(), Integer.class);
		}
		return count == null?0:count;
	}
	
	@Override
	public List<Map<String, Object>> getCustomerCount(Integer[] storeId) {
		List<Object> param = new ArrayList<Object>();
		StringBuffer buffer = new StringBuffer("select count(*) count,store_id storeId from customer where store_id ");
		SqlHandler.createIn(buffer, storeId.length);
		param.addAll(Arrays.asList(storeId));
		buffer.append("  group by store_id");
		return handler.getForMapList(buffer.toString(), param.toArray());
	}
}
