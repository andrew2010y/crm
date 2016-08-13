package com.bigaka.crm.customer.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.customer.model.Customer;
import com.bigaka.crm.customer.model.CustomerExpand;
import com.bigaka.crm.service.assist.JdbcHandler;

@Repository("customerExpandDao")
@SuppressWarnings("all")
public class CustomerExpandDaoImpl implements CustomerExpandDao{
	
	@Autowired
	private JdbcHandler handler;
	
	/**
	 * 获取会员关注状态
	 */
	public CustomerExpand getCustomerExpand(Integer customerId){
		StringBuilder sql=new StringBuilder("select * from customer_expand where 1=1");
		if(customerId!=null){
			sql.append(" and customer_id="+customerId);
		}
		return handler.getForObject(sql.toString(), CustomerExpand.class, null);
	}

	/**
	 * 更新用户的首次绑定微信的状态。
	 */
	@Override
	public boolean updateCustomerFirstFWC(Integer storeId, Integer customerId) {

		String sql = "UPDATE customer_expand SET first_follow_wechat=1 where store_id="+storeId+" and customer_id="+customerId;
		return handler.update(sql, null);
	}

	/**
	 * 为新用户添加扩展信息
	 */
	@Override
	public boolean setExpandInfo(Integer storeId, Integer customerId) {
		String sql = "insert into customer_expand(customer_id,store_id) values(?,?)";
		ArrayList<Integer> paramList=new ArrayList<Integer>();
		paramList.add(customerId);
		paramList.add(storeId);
		return handler.save(sql, paramList.toArray());
	}

	/**
	 * 更新用户的信息完善程度
	 */
	@Override
	public boolean updatePerDegree(Integer customerId, int numInt) {
		String sql = "UPDATE customer_expand SET perfect_degree="+numInt+" where customer_id="+customerId;
		return handler.update(sql, null);
	}

	/**
	 * 更新用户的关注公众号和首次关注公众号的状态
	 */
	@Override
	public boolean updateCustomerFirstFPN(Integer storeId, Integer customerId,Integer fpn,Integer ffpn) {
		String sql = "UPDATE customer_expand SET follow_public_num="+fpn+",first_follow_public_num="+ffpn+" where store_id="+storeId+" and customer_id="+customerId;
		return handler.update(sql, null);
	}

	/**
	 * 修改完善度和首次完善到100%
	 * @author Ji qc
	 * @date 2016年7月4日
	 * @return
	 */
	@Override
	public Boolean updatePerDegree(Integer customerId, int numInt, int firstFD) {
		String sql = "UPDATE customer_expand SET perfect_degree="+numInt+",first_finish_degree="+firstFD+" where customer_id="+customerId;
		return handler.update(sql, null);
	}
}
