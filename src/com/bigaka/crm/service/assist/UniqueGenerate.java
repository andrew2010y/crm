package com.bigaka.crm.service.assist;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.bigaka.crm.common.assist.IdConstructor;
import com.bigaka.crm.common.util.RandomUtil;
/**
 * 集群id主键生成
 * @author Dylan Tao
 * @date 2015-4-29
 * Copyright 2015 bigaka.com. All Rights Reserved.
 */

@Repository("uniqueGenerate")
public class UniqueGenerate implements InitializingBean{
	
	private static final Log log = LogFactory.getLog(UniqueGenerate.class);
	
	@Value("#{config['basic.id.workerid']}")
	private Long workerId;//机器id，在部署多个service时一定要划分机器id
	@Value("#{config['basic.id.datacenterid']}")
	private Long datacenterId = 0L;
	
	private IdConstructor idConstructor;

	@Override
	public void afterPropertiesSet() throws Exception {
		if(workerId!=null && workerId >=0 && datacenterId!=null && datacenterId>=0){
			idConstructor = new IdConstructor(workerId, 0);
		}else{
			log.error("please set workerId and datacenterId, IdGenerate can't normal service!!!");
		}
	}
	/**
	 * 获取唯一主键id
	 * @return
	 */
	public long getId(){
		return idConstructor.nextId();
	}
	
	/**
	 * 获取token
	 * @return
	 */
	public String getToken(){
		return datacenterId + workerId + RandomUtil.getUniqueKey(false);
	}

}
