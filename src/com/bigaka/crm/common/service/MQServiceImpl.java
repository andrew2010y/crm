/*package com.bigaka.crm.common.service;

import java.util.Properties;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.aliyun.openservices.ons.api.Message;
import com.aliyun.openservices.ons.api.ONSFactory;
import com.aliyun.openservices.ons.api.Producer;
import com.aliyun.openservices.ons.api.PropertyKeyConst;
import com.aliyun.openservices.ons.api.SendResult;
import com.bigaka.crm.common.model.CSBParam;
import com.bigaka.crm.common.model.Code;
import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.common.util.JsonUtil;
import com.bigaka.crm.common.util.StringUtil;

@Service("mqService")
public class MQServiceImpl implements MQService,InitializingBean{
	
	private static final Log log = LogFactory.getLog(MQServiceImpl.class);
	
	@Value("#{config['pub.mq.produce.id']}")
	private String producerId;
	@Value("#{config['pub.mq.access.key']}")
	private String accessKey;
	@Value("#{config['pub.mq.secret.key']}")
	private String secretKey;
	@Value("#{config['pub.mq.customer.topic']}")
	private String topicKey;
	@Value("#{config['pub.mq.customer.tag']}")
	private String topicTag;
	

	private Producer producer;
	
	@Override
	public void afterPropertiesSet() throws Exception {
		if(StringUtil.isNotBlank(producerId) && StringUtil.isNotBlank(accessKey) && StringUtil.isNotBlank(secretKey)){
			Properties properties = new Properties();
	        properties.put(PropertyKeyConst.ProducerId, producerId);
	        properties.put(PropertyKeyConst.AccessKey, accessKey);
	        properties.put(PropertyKeyConst.SecretKey, secretKey);
	        producer = ONSFactory.createProducer(properties);
	        producer.start();
		}else{
			System.out.println("MQ生产对象，初始化失败~");
		}
	}

	public <T> ServiceResult<String> sendMsg(CSBParam<T> obj) {
		if(producer!=null){
			String body = JsonUtil.toJson(obj);
			if(StringUtil.isNotBlank(body)){
				Message msg = new Message(topicKey,topicTag,body.getBytes());
//	            msg.setKey("ORDERID_100");
	            SendResult sendResult = producer.send(msg);
	            String msgId = sendResult.getMessageId();
	            if(StringUtil.isNotBlank(msgId)){
	            	return new ServiceResult<String>(Code.SUCCESS, null, msgId);
	            }else{
	            	log.error("存放MQ失败~" + sendResult.toString());
	            }
			}else{
				log.error("消息体转换为JSON时异常，未添加到mq队列~");
			}
		}else{
			log.error("MQ生产对象初始化失败，请验证基础设置信息~");
		}
		return new ServiceResult<String>(Code.FAILED, null, null);
	}
	
}
*/