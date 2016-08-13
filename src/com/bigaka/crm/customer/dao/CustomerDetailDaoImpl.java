package com.bigaka.crm.customer.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bigaka.crm.common.model.Page;
import com.bigaka.crm.common.util.DateUtil;
import com.bigaka.crm.common.util.StringUtil;
import com.bigaka.crm.customer.model.CustSearchParam;
import com.bigaka.crm.customer.model.CustomerDetail;
import com.bigaka.crm.form.model.FormStoreProp;
import com.bigaka.crm.service.assist.JdbcHandler;
import com.bigaka.crm.service.assist.SqlHandler;

/**
 * 顾客详细信息
 * @author Dylan_Tao
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
@Repository("customerDetailDao")
public class CustomerDetailDaoImpl implements CustomerDetailDao{
	
	private static final Log log = LogFactory.getLog(CustomerDetailDaoImpl.class);
	
	@Autowired
	private JdbcHandler handler;
	
	@Override
	public CustomerDetail getCustomerDetail(CustomerDetail detail) {
		StringBuffer sql = new StringBuffer("select c.store_id storeId,c.customer_id customerId,username,cd.name,cd.logo,cd.phone,store_id storeId,cd.vip_card_no vipCardNo,cd.point,cd.nick_name nickName  from customer c,customer_detail cd where cd.customer_id=c.customer_id");
		List<Object> paramList = new ArrayList<Object>();
		if(detail.getCustomerId()!=null){
			sql.append(" and c.customer_id = ?");
			paramList.add(detail.getCustomerId());
		}
		if(StringUtil.isNotBlank(detail.getOpenId())){
			sql.append(" and c.open_id = ?");
			paramList.add(detail.getOpenId());
		}
		if(detail.getParentStoreId()!=null){
			sql.append(" and c.parent_store_id = ?");
			paramList.add(detail.getParentStoreId());
		}
		return handler.getForObject(sql.toString(), CustomerDetail.class, paramList.toArray());
	}

	@Override
	public boolean saveCustomerDetail(CustomerDetail detail) {
		String sql = "insert into customer_detail(customer_id,phone,name,vip_card_no,sex,birth_date,area_code,remark,update_time,create_time,nick_name) values(?,?,?,?,?,?,?,?,?,?,?)";
		List<Object> params = new ArrayList<Object>();
		params.add(detail.getCustomerId());
		params.add(detail.getPhone());
		params.add(detail.getName());
		params.add(detail.getVipCardNo());
		params.add(detail.getSex()==null?0:detail.getSex());
		params.add(detail.getBirthDate()==null?0:detail.getBirthDate());
		params.add(detail.getAreaCode());
		params.add(detail.getRemark());
		params.add(detail.getCreateTime());
		params.add(detail.getCreateTime());
		params.add(detail.getNickName());
		return handler.save(sql, params.toArray());
	}

	@Override
	public boolean updateCustomerDetail(CustomerDetail detail) {
		StringBuffer sql = new StringBuffer("update customer_detail set update_time = ?");
		List<Object> params = new ArrayList<Object>();
		params.add(DateUtil.getTime());
		
		if(detail.getName()!=null){
			sql.append(",name = ?");
			params.add(detail.getName());
		}
		if(detail.getNickName()!=null){
			sql.append(",nick_name = ?");
			params.add(detail.getNickName());
		}
		if(StringUtil.isNotBlank(detail.getLogo())){
			sql.append(",logo = ?");
			params.add(detail.getLogo());
		}
		if(StringUtil.isNotBlank(detail.getVipCardNo())){
			sql.append(",vip_card_no = ?");
			params.add(detail.getVipCardNo());
		}
		if(detail.getSex()!=null){
			sql.append(",sex = ?");
			params.add(detail.getSex());
		}
		if(detail.getAreaCode()!=null){
			sql.append(",area_code = ?");
			params.add(detail.getAreaCode());
		}
		if(detail.getBirthDate()!=null && detail.getBirthDate()>0){
			sql.append(",birth_date = ?");
			params.add(detail.getBirthDate());
		}
		if(detail.getPhone()!=null && detail.getCustomerId()!=null){
			sql.append(",phone = ?");
			params.add(detail.getPhone());
		}
		if(StringUtil.isNotBlank(detail.getRemark())){
			sql.append(",remark = ?");
			params.add(detail.getRemark());
		}
		sql.append(" where customer_id = ");
		if(detail.getParentStoreId()!=null && detail.getPhone()!=null){
			sql.append(" (select customer_id from customer where parent_store_id =? and username = ?)");
			params.add(detail.getParentStoreId());
			params.add(detail.getPhone());
		}else{
			sql.append(" ?");
			params.add(detail.getCustomerId());
		}
		
		return handler.update(sql.toString(), params.toArray());
	}

	@Override
	public boolean delCustomerDetail(CustomerDetail detail) {
		String sql = "delete from customer_detail where customer_id = ?";
		return handler.delete(sql, detail.getCustomerId());
	}

	/**
	 * 获取会员列表
	 */
	public Page<CustomerDetail> getCustomerPage(CustSearchParam param,List<FormStoreProp> customProp, Page<CustomerDetail> page) {
		//customer的username用户注册手机号和customer_detail的phone同步，尽量以userName为主
		
		StringBuffer sql = new StringBuffer();
		if(param.getAllCustomerId()==0){
			sql.append("select c.store_id storeId,cd.phone ,c.customer_id customerId,c.username,"
					+ "cd.name,cd.logo,cd.create_time createTime, "
					+ "cd.point,cd.accrual_point,"//,cc.consume_time consumeTime,IFNULL(cc.price,-1) as price
					//,mc.card_no
					+ "c.open_id,c.state,ce.perfect_degree, ce.follow_public_num,cd.nick_name ");
		}else{
			sql.append("select c.customer_id customerId");
		}
		
		//customer_count cc,membership_code mc,
		sql.append(" from customer c,customer_detail cd,customer_expand ce");
		
		//and c.customer_id = cc.customer_id  and c.customer_id = mc.customer_id 
		String baseInnerJoinSql = " and c.customer_id = ce.customer_id  ";
		String innerJoinSql = "";
		//标签
		if(param.getTags()!=null&& param.getTags().length>0){
			sql.append(",customer_tag ct "); // where c.customer_id =cd.customer_id
			innerJoinSql = " and c.customer_id=ct.customer_id ";
		}
		//动态字段
		if(customProp!=null&&customProp.size()>0){
			sql.append(",form_customer_prop fcp ");
			innerJoinSql =innerJoinSql+ " and c.customer_id=fcp.customer_id";
		}
		
		sql.append("  where c.customer_id =cd.customer_id ");
		
		
		sql.append(baseInnerJoinSql).append(innerJoinSql).append(" and ");
		
		//查询标签
		List<Object> paramList = new ArrayList<Object>();
		if(param.getTags()!=null && param.getTags().length > 0){
			sql.append(" c.customer_id = ct.customer_id and ct.tag_id ");
			String insql = SqlHandler.createIn(sql.toString(), param.getTags().length);
			sql.setLength(0);
			sql.append(insql);
			for(int i=0; i<param.getTags().length; i++){
				paramList.add(param.getTags()[i]);
			}
			sql.append(" and ");
		}
		
		//自定义字段
		if(customProp!=null&&customProp.size()>0){
			
			for(FormStoreProp formStoreProp:customProp){
				if(formStoreProp.getType().equals("input")){
					if(formStoreProp.getSubType().equals("date")){
						List<Object> result=formStoreProp.getSearchValue();
						sql.append("  fcp.store_prop_id ="+formStoreProp.getStorePropId()+" and ");
						if(result!=null&&result.size()>0){
							if(result.get(0)!=null&&!result.get(0).equals("")){
								sql.append(" fcp.value>="+result.get(0)+" and ");
							}
							if(result.get(1)!=null&&!result.get(1).equals("")){
								sql.append(" fcp.value<="+result.get(1)+" and ");
							}
						}
					}
					
					if(formStoreProp.getSubType().equals("radio")){
						List<Object> result=formStoreProp.getSearchValue();
						sql.append(" fcp.store_prop_id ="+formStoreProp.getStorePropId()+" and ");
						if(result!=null&&result.size()>0){
							for(int i=0;i<result.size();i++){
								if(i==0){
									if(result.get(0)!=null){
										sql.append("(  fcp.value = '"+result.get(0)+ "' ");
									}
								}else{
									if(result.get(i)!=null){
										sql.append("  || fcp.value = '"+result.get(i)+ "' ");
									}
								}
							}
							sql.append(" ) and ");
						}
					}
					
					if(formStoreProp.getSubType().equals("mail")){
						List<Object> result=formStoreProp.getSearchValue();
						sql.append(" fcp.store_prop_id ="+formStoreProp.getStorePropId()+" and ");
						if(result!=null&&result.size()>0){
							if(result.get(0)!=null){
								sql.append("  fcp.value like '%"+result.get(0)+ "%' and ");
							}
						}
					}
				}
				
				if(formStoreProp.getType().equals("textarea")){
					List<Object> result=formStoreProp.getSearchValue();
					sql.append(" fcp.store_prop_id ="+formStoreProp.getStorePropId()+"  and ");
					if(result!=null&&result.size()>0){
						if(result.get(0)!=null){
							sql.append(" fcp.value like  '% "+result.get(0)+"%' and ");
						}
					}
				}
				
				if(formStoreProp.getType().equals("select")){
					List<Object> result=formStoreProp.getSearchValue();
					sql.append(" fcp.store_prop_id ="+formStoreProp.getStorePropId()+" and ");
					if(result!=null&&result.size()>0){
						if(result.get(0)!=null){
							sql.append("   fcp.value = '"+result.get(0)+"' and ");
						}
					}
				}
				
			}
		}
		
			
		if(param.getSubStoreIds()!=null && param.getSubStoreIds().size()>0){
			sql.append("  c.parent_store_id");
			String newSql = SqlHandler.createIn(sql.toString(),param.getSubStoreIds().size());
			sql.setLength(0);
			sql.append(newSql);
			paramList.addAll(param.getSubStoreIds());
		}else{
			sql.append(" c.store_id = ?");
			paramList.add(param.getStoreId());	
		}	
	
		//微信  绑定微信
		/*if(param.getRegisterWechat()==1){
			sql.append(" and c.open_id !=\"\" ");	
		}*/
		// 未绑定微信
		/*if(param.getRegisterWechat()==0){
			sql.append(" and  (c.open_id is NULL or c.open_id=\"\") ");	
		}*/
				
		//手机号  绑定手机号
		/*if(param.getRegisterPhone()==1){
			sql.append(" and c.username>0 ");					
		}*/
		//未绑定手机号
		/*if(param.getRegisterPhone()==0){
			sql.append(" and c.username=0 ");					
		}*/
		
		//信息完成程度  0未完善  1以完善   
		/*if(param.getPerfectDegree()!=null){
			if(param.getPerfectDegree()==0){
				sql.append(" and ce.perfect_degree<100 ");
			}
			if(param.getPerfectDegree()==1){
				sql.append(" and ce.perfect_degree=100 ");
			}
		}*/
		//关注公众号  0 未关注 
		/*if(param.getFollowPublicNum()==0){
			sql.append(" and ce.follow_public_num="+0);
		}
		//关注公众号   1已关注
		if(param.getFollowPublicNum()==1){
			sql.append(" and ce.follow_public_num="+1);
		}
		//累计积分  最小值   
		if(param.getMinAccrualPoint()!=null){
			sql.append(" and cd.accrual_point>="+param.getMinAccrualPoint());
		}
		//累计积分   最大值
		if(param.getMaxAccrualPoint()!=null){
			sql.append(" and cd.accrual_point<="+param.getMaxAccrualPoint());
		}
		
		//最近消费   最高消费金额 
		if(param.getMaxNowCustomerPrice()!=null){
			sql.append(" and cc.price<="+param.getMaxNowCustomerPrice());
		}
		//最近消费  最低消费金额
		if(param.getMinNowCustomerPrice()!=null){
			sql.append(" and cc.price>="+param.getMinNowCustomerPrice());
		}
		//卡号
		if(StringUtil.isNotBlank(param.getCardNo())){
			sql.append(" and mc.card_no like '%"+param.getCardNo()+"%'");
		}
		//昵称  
		if(StringUtil.isNotBlank(param.getNickName())){
			sql.append(" and cd.nick_name like '%"+param.getNickName()+"%'");
		}
*/
		if(param.getPhone()!=null){
			sql.append(" and cd.phone like ?");
			paramList.add("%"+param.getPhone()+"%");
		}
		if(param.getCustomerId()!=null){
			sql.append(" and cd.customer_id like ?");
			paramList.add("%"+param.getCustomerId()+"%");
		}
		if(StringUtil.isNotBlank(param.getName())){
			sql.append(" and cd.name like ?");
			paramList.add("%"+param.getName()+"%");
		}
		
		if(param.getRegisterType()!=null && param.getRegisterType()!=-1){
			sql.append(" and c.register_type = ?");
			paramList.add(param.getRegisterType());
		}
		if(param.getRegisterChannel()!=null && param.getRegisterChannel()!=-1){
			sql.append(" and c.register_channel = ?");
			paramList.add(param.getRegisterChannel());
		}
		if(StringUtil.isNotBlank(param.getMinRegisterTime())){
			Long minRegisterTime = DateUtil.getMinDate(param.getMinRegisterTime());
			if(minRegisterTime>0){
				sql.append(" and cd.create_time >= ?");
				paramList.add(minRegisterTime);
			}
		}
		if(StringUtil.isNotBlank(param.getMaxRegisterTime())){
			Long maxRegisterTime = DateUtil.getMaxDate(param.getMaxRegisterTime());
			if(maxRegisterTime>0){
				sql.append(" and cd.create_time <= ?");
				paramList.add(maxRegisterTime);
			}
		}
		if(StringUtil.isNotBlank(param.getMinConsumeTime())){
			Long minConsumeTime = DateUtil.getMinDate(param.getMinConsumeTime());
			if(minConsumeTime>0){
				sql.append(" and cc.consume_time >= ?");
				paramList.add(minConsumeTime);
			}
		}
		if(StringUtil.isNotBlank(param.getMaxConsumeTime())){
			Long maxConsumeTime = DateUtil.getMaxDate(param.getMaxConsumeTime());
			if(maxConsumeTime>0){
				sql.append(" and cc.consume_time <= ?");
				paramList.add(maxConsumeTime);
			}
		}
		if(param.getMinPoint() !=null){
			sql.append(" and cd.point >= ?");
			paramList.add(param.getMinPoint());
		}
		if(param.getMaxPoint()!=null){
			sql.append(" and cd.point <= ?");
			paramList.add(param.getMaxPoint());
		}
		if(param.getState()!=null && param.getState()!=-1){
			sql.append(" and c.state = ?");
			paramList.add(param.getState());
		}
		if(param.getMinCustomerPrice()!=null){
			sql.append(" and cc.customer_price >= ?");
			paramList.add(param.getMinCustomerPrice());
		}
		if(param.getMaxCustomerPrice()!=null){
			sql.append(" and cc.customer_price <= ?");
			paramList.add(param.getMaxCustomerPrice());
		}
		if(param.getMinAvgPrice()!=null){
			sql.append(" and cc.customer_price/cc.total_count >= ?");
			paramList.add(param.getMinAvgPrice());
		}
		if(param.getMaxAvgPrice()!=null){
			sql.append(" and cc.customer_price/cc.total_count <= ?");
			paramList.add(param.getMaxAvgPrice());
		}
		if(param.getMinTotalCount()!=null){
			sql.append(" and cc.total_count >= ?");
			paramList.add(param.getMinTotalCount());
		}
		if(param.getMaxTotalCount()!=null){
			sql.append(" and cc.total_count <= ?");
			paramList.add(param.getMaxTotalCount());
		}
		if(param.getRate()!=null){
			if(param.getRate()==1){
				if(param.getMinRate()!=null && param.getMaxRate()!=null){
					if(param.getMinRate().equals(param.getMaxRate())){
						sql.append(" and cc.month_count = ?");
					}else{
						sql.append(" and cc.month_count >= ?");
					}
					paramList.add(param.getMinRate());
				}else if(param.getMinRate()!=null && param.getMaxRate()==null){
					sql.append(" and cc.month_count >= ?");
					paramList.add(param.getMinRate());
				}else if(param.getMinRate()==null && param.getMaxRate()!=null){
					sql.append(" and cc.month_count <= ?");
					paramList.add(param.getMaxRate());
				}
			}else if(param.getRate()==2){
				if(param.getMinRate()!=null && param.getMaxRate()!=null){
					if(param.getMinRate().equals(param.getMaxRate())){
						sql.append(" and cc.year_count = ?");
					}else{
						sql.append(" and cc.year_count >= ?");
					}
					paramList.add(param.getMinRate());
				}else if(param.getMinRate()!=null && param.getMaxRate()==null){
					sql.append(" and cc.year_count >= ?");
					paramList.add(param.getMinRate());
				}else if(param.getMinRate()==null && param.getMaxRate()!=null){
					sql.append(" and cc.year_count <= ?");
					paramList.add(param.getMaxRate());
				}
			}else if(param.getRate()==3){
				if(param.getMinRate()!=null && param.getMaxRate()!=null){
					if(param.getMinRate().equals(param.getMaxRate())){
						sql.append(" and cc.day_count = ?");
					}else{
						sql.append(" and cc.day_count >= ?");
					}
					paramList.add(param.getMinRate());
				}else if(param.getMinRate()!=null && param.getMaxRate()==null){
					sql.append(" and cc.day_count >= ?");
					paramList.add(param.getMinRate());
				}else if(param.getMinRate()==null && param.getMaxRate()!=null){
					sql.append(" and cc.day_count <= ?");
					paramList.add(param.getMaxRate());
				}
			}
		}
		if(param.getSex()!=null && param.getSex().length>0){
			if(param.getSex().length==1){
				sql.append(" and cd.sex = ?");
				paramList.add(param.getSex()[0]);
			}else{
				String insql = SqlHandler.createIn(sql+" and cd.sex ", param.getSex().length);
				sql.setLength(0);
				sql.append(insql);
				for(int i=0; i<param.getSex().length; i++){
					paramList.add(param.getSex()[i]);
				}
			}
		}
		
		if(param.getCityCode()!=null){
			String startCity=null;
			String endCity=null;
			if(param.getCityCode().toString().length()==2){
				startCity=param.getCityCode()+"0000";
				endCity=param.getCityCode()+"9999";
				sql.append(" and cd.area_code >= ?");
				paramList.add(startCity);
				sql.append(" and cd.area_code <= ?");
				paramList.add(endCity);
				
			}else if(param.getCityCode().toString().length()==4){
				startCity=param.getCityCode()+"00";
				endCity=param.getCityCode()+"99";
				sql.append(" and cd.area_code >= ?");
				paramList.add(startCity);
				sql.append(" and cd.area_code <= ?");
				paramList.add(endCity);
				
			}else{
				sql.append(" and cd.area_code = ?");
				paramList.add(param.getCityCode());
			}
		}
		
		if(StringUtil.isNotBlank(param.getMinBirthDate())){
			Long minBirthDate = DateUtil.getMinDate(param.getMinBirthDate());
			if(minBirthDate>0){
				sql.append(" and cd.birth_date >= ?");
				paramList.add(minBirthDate);
			}
		}
		
		if(StringUtil.isNotBlank(param.getMaxBirthDate())){
			Long maxBirthDate = DateUtil.getMinDate(param.getMaxBirthDate());
			if(maxBirthDate>0){
				sql.append(" and cd.birth_date <= ?");
				paramList.add(maxBirthDate);
			}
		}
		
		if(StringUtil.isNotBlank(param.getMinBirthDate())||StringUtil.isNotBlank(param.getMaxBirthDate())){
			sql.append(" and cd.birth_date != 0");
		}
		
		if(param.getAllCustomerId()==0){
			sql.append(" order by c.create_time desc");
			return handler.getForPage(sql.toString(), page, CustomerDetail.class, paramList.toArray());
		}else{
			
			List<Integer> customerIds= handler.getForColumnList(sql.toString(), Integer.class, paramList.toArray());
		

			CustomerDetail customerDetail=new CustomerDetail();
			customerDetail.setAllCustomerId(customerIds);
			List<CustomerDetail> detail=new ArrayList<CustomerDetail>();
			detail.add(customerDetail);
			Page<CustomerDetail> result=new Page<CustomerDetail>(0,0);
			result.setResult(detail);
			return result;
		}
		
		
	}

	@Override
	public CustomerDetail getCustDetailExt(CustomerDetail detail) {
		String sql = "select cd.customer_id customerId,vip_card_no vipCardNo,name,sex,area_code areaCode,phone,birth_date birthDate,c.store_id storeId,c.state,c.register_type registerType,c.register_channel registerChannel from customer_detail cd,customer c where cd.customer_id = c.customer_id and cd.customer_id = ?";
		return handler.getForObject(sql, CustomerDetail.class, detail.getCustomerId());
	}

	@Override
	public Page<CustomerDetail> getCustomerByUserId(List<Long> userIds,Page<CustomerDetail> page) {
		String sql = "select cd.customer_id customerId,vip_card_no vipCardNo,phone,name,c.state from customer_detail cd,customer c where cd.customer_id = c.customer_id and cd.customer_id ";
		sql = SqlHandler.createIn(sql, userIds.size());
		return handler.getForPage(sql,page, CustomerDetail.class, userIds.toArray());
	}

	@Override
	public Page<CustomerDetail> getUserByParams(List<Long> userIds,Page<CustomerDetail> page, String param) {
		String sql = "select cd.customer_id customerId,vip_card_no vipCardNo,phone,name,c.state from customer_detail cd,customer c "
				+ "where cd.customer_id = c.customer_id and (cd.customer_id like ? or cd.name like ? or phone like ? ) and cd.customer_id ";
		sql = SqlHandler.createIn(sql, userIds.size());
		List<Object> params = new ArrayList<Object>();
		params.add("%"+param+"%");
		params.add("%"+param+"%");
		params.add("%"+param+"%");
		params.addAll(userIds);
		return handler.getForPage(sql, page, CustomerDetail.class, params.toArray());
	}
	
	/**
	 * 获取顾客积分信息
	 * 
	 * @param customerId
	 * @return
	 */
	public CustomerDetail getCustomerPoint(CustomerDetail detail){
		String sql="select point as point,accrual_point as accrualPoint from customer_detail where customer_id = ?";
		return handler.getForObject(sql, CustomerDetail.class, detail.getCustomerId());
	}
	
	@Override
	public Page<CustomerDetail> getCustomerDetailByTagId(Page<CustomerDetail> page, Long tagId) {
		String sql = " select cd.customer_id customerId, name, phone,c.state state from customer_detail cd ,customer c,customer_tag ct "
				+ "where cd.customer_id = c.customer_id and c.customer_id = ct.customer_id and ct.tag_id = ? ";
		return handler.getForPage(sql, page, CustomerDetail.class, tagId);
	}
	
	
	@Override
	public boolean updateUserScore(Integer customerId,boolean boo, Integer score) {
		StringBuffer sql = new StringBuffer("update customer_detail set update_time = ? ");
		List<Object> params= new ArrayList<Object>();
		params.add(DateUtil.getTime());
		if(boo){
			sql.append(",point = point + ? ,accrual_point = accrual_point + ?");
			params.add(score);
			params.add(score);
		}else {
			sql.append(",point = point - ?");
			params.add(score);
		}
		sql.append(" where customer_id = ?");
		params.add(customerId);
		return handler.update(sql.toString(),params.toArray());
	}

	@Override
	public Integer getIntegrationByOrderId(Integer orderId,String type) {
		String sql = " select sum(value) from point_log where order_id = ? and operation = ? ";
		Integer value = handler.getForColumn(sql, Integer.class, orderId,type);
		if(value == null){
			return 0;
		}else {
			return value;
		}
	}

	/**
	 * 获取对应的用户详情拼接字段
	 * name, sex, birth_date, area_code, remark
	 * private Long accrualPoint;
	private String remark;
	private Long updateTime;
	private Long createTime;
	 */
	@Override
	public CustomerDetail getDysCustomerDetail(CustomerDetail detail,List<String> prop) {
		StringBuffer sql = new StringBuffer("select c.store_id storeId,c.customer_id customerId,c.parent_store_id parentStoreId,c.open_id openId,username,`level`,c.state,cd.logo,cd.phone,cd.point,cd.accrual_point accrualPoint,c.register_type registerType,c.register_channel registerChannel,cd.update_time updateTime,cd.create_time createTime,cd.nick_name nickName");
		StringBuffer str=new StringBuffer();
		if(prop!=null&&prop.size()>0){
			for (String s : prop) {
				if(s!=null&&s.equals("vip_card_no")){
					str.append(",cd.vip_card_no vipCardNo");
				}
				if(s!=null&&s.equals("name")){
					str.append(",cd.name");
				}
				if(s!=null&&s.equals("sex")){
					str.append(",cd.sex");
				}
				if(s!=null&&s.equals("birth_date")){
					str.append(",cd.birth_date birthDate");
				}
				if(s!=null&&s.equals("area_code")){
					str.append(",cd.area_code areaCode");
				}
				if(s!=null&&s.equals("remark")){
					str.append(",cd.remark");
				}
			}
		}
		
		/*for (FormStoreProp formStoreProp : customProp) {
			if(formStoreProp.getStorePropId()!=null){
				
			}
			
		}*/
		sql.append(str.toString()+" from customer c,customer_detail cd where cd.customer_id=c.customer_id");
		List<Object> paramList = new ArrayList<Object>();
		if(detail.getCustomerId()!=null){
			sql.append(" and c.customer_id = ?");
			paramList.add(detail.getCustomerId());
		}
		if(StringUtil.isNotBlank(detail.getOpenId())){
			sql.append(" and c.open_id = ?");
			paramList.add(detail.getOpenId());
		}
		if(detail.getParentStoreId()!=null){
			sql.append(" and c.parent_store_id = ?");
			paramList.add(detail.getParentStoreId());
		}
		return handler.getForObject(sql.toString(), CustomerDetail.class, paramList.toArray());
	}
	
	/**
	 * 获取昵称、卡号连表查询
	 */
	public CustomerDetail getCustomerDetailAndCardNo(Integer customerId){
		String sql="select mc.card_no,cd.name,cd.nick_name,c.parent_store_id,c.store_id,c.username from "
				+ "customer c LEFT JOIN  customer_detail cd ON c.customer_id=cd.customer_id "
				+ "LEFT JOIN membership_code mc ON cd.customer_id=mc.customer_id  "
				+ "where c.customer_id= ?";
		return handler.getForObject(sql, CustomerDetail.class, customerId);
	}
}
