package com.bigaka.crm.customer.model;

import java.io.Serializable;
import java.util.List;

import com.bigaka.crm.form.model.FormCustomerProp;


/**
 * 顾客基本信息
 * @author Dylan Tao 
 * @date 2015-12-01
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 

public class Customer implements Serializable{

	private static final long serialVersionUID = -7445493299072871258L;
	
	private Integer customerId;
	private Integer parentStoreId;
	private Integer storeId;
	private Long username;
	private String password;
	private RegisterType registerType;
	private RegisterChannel registerChannel;
	private String openId;
	private Long loginTime;
	private Byte state;
	private Long changepwdTime;
	private Long updateTime;
	private Long createTime;
	
	//ext
	private String token;
	
	private String storeName;
	
	private String name;
	private String nickName;//昵称
	private String logo;
	private Long phone;
	private String vipCardNo;
	private Long point;
	private Byte sex;
	private String birthDate;
	private Integer areaCode;
	private String remark;
	
	private String address;
	
	private Byte type;
	private Byte channel;
	
	private Boolean sysnCSB; //默认是同步到csb，csb在调用相关服务时必须设置成false，否则会导致循环同步
	private Integer customerType;
	private Double purchaseAmount;
	private Double sellAmount;
	
	//ext
	//用户填写的自定义表单内容
	private List<FormCustomerProp> customerProps;
	private Long salePhone;
	
	public Long getSalePhone() {
		return salePhone;
	}

	public void setSalePhone(Long salePhone) {
		this.salePhone = salePhone;
	}
	public enum RegisterChannel {
		CK {
			public byte getValue() {
				return 1;
			}
		},
		MALL {
			public byte getValue() {
				return 2;
			}
		},SHOP {
			public byte getValue() {
				return 3;
			}
		},DATACENTER {
			public byte getValue() {
				return 4;
			}
		},CK_LINK {
			public byte getValue() {
				return 5;
			}
		},SALVE_SHOP{
			public byte getValue(){
				return 6;
			}
		},CSB{
			public byte getValue(){
				return 7;
			}
		};
		public abstract byte getValue();
		
		public static RegisterChannel getEnumByValue(byte value){
	        for(RegisterChannel rc : RegisterChannel.values()){
	            if(rc.getValue()==value){
	                return rc;   
	            }
	        }
			return null;
	    }
	}
	
	public enum RegisterType {
		PHONE {
			public byte getValue() {
				return 1;
			}
		},
		WEIXIN {
			public byte getValue() {
				return 2;
			}
		};
		
		public abstract byte getValue();
		
		public static RegisterType getEnumByValue(byte value){
	        for(RegisterType gt : RegisterType.values()){
	            if(gt.getValue()==value){
	                return gt;   
	            }
	        }
			return null;
	    }
	}

	public void setCustomerId(Integer customerId){
		this.customerId=customerId;
	}

	public Integer getCustomerId(){
		return customerId;
	}

	public void setStoreId(Integer storeId){
		this.storeId=storeId;
	}

	public Integer getStoreId(){
		return storeId;
	}

	public Long getUsername() {
		return username;
	}

	public void setUsername(Long username) {
		this.username = username;
	}

	public void setPassword(String password){
		this.password=password;
	}

	public String getPassword(){
		return password;
	}

	public RegisterType getRegisterType() {
		return registerType;
	}

	public void setRegisterType(RegisterType registerType) {
		this.registerType = registerType;
	}

	public RegisterChannel getRegisterChannel() {
		return registerChannel;
	}

	public void setRegisterChannel(RegisterChannel registerChannel) {
		this.registerChannel = registerChannel;
	}

	public void setOpenId(String openId){
		this.openId=openId;
	}

	public String getOpenId(){
		return openId;
	}

	public void setLoginTime(Long loginTime){
		this.loginTime=loginTime;
	}

	public Long getLoginTime(){
		return loginTime;
	}

	public void setState(Byte state){
		this.state=state;
	}

	public Byte getState(){
		return state;
	}

	public void setChangepwdTime(Long changepwdTime){
		this.changepwdTime=changepwdTime;
	}

	public Long getChangepwdTime(){
		return changepwdTime;
	}

	public void setUpdateTime(Long updateTime){
		this.updateTime=updateTime;
	}

	public Long getUpdateTime(){
		return updateTime;
	}

	public void setCreateTime(Long createTime){
		this.createTime=createTime;
	}

	public Long getCreateTime(){
		return createTime;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public Long getPhone() {
		return phone;
	}

	public void setPhone(Long phone) {
		this.phone = phone;
	}

	public String getVipCardNo() {
		return vipCardNo;
	}

	public void setVipCardNo(String vipCardNo) {
		this.vipCardNo = vipCardNo;
	}

	public Byte getSex() {
		return sex;
	}

	public void setSex(Byte sex) {
		this.sex = sex;
	}

	public Integer getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(Integer areaCode) {
		this.areaCode = areaCode;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(String birthDate) {
		this.birthDate = birthDate;
	}

	public Byte getType() {
		return type;
	}

	public void setType(Byte type) {
		this.type = type;
	}

	public Byte getChannel() {
		return channel;
	}

	public void setChannel(Byte channel) {
		this.channel = channel;
	}

	public Long getPoint() {
		return point;
	}

	public void setPoint(Long point) {
		this.point = point;
	}

	public Integer getParentStoreId() {
		return parentStoreId;
	}

	public void setParentStoreId(Integer parentStoreId) {
		this.parentStoreId = parentStoreId;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public List<FormCustomerProp> getCustomerProps() {
		return customerProps;
	}

	public void setCustomerProps(List<FormCustomerProp> customerProps) {
		this.customerProps = customerProps;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Boolean getSysnCSB() {
		return sysnCSB==null?true:sysnCSB;
	}

	public void setSysnCSB(Boolean sysnCSB) {
		this.sysnCSB = sysnCSB;
	}
	
	
	public enum ThirdSupportKey {
		PHONE {
			public byte getValue() {
				return 1;
			}
		},
		VIP_CARD_NO {
			public byte getValue() {
				return 2;
			}
		};
		
		public abstract byte getValue();
		
		public static ThirdSupportKey getEnumByValue(byte value){
	        for(ThirdSupportKey gt : ThirdSupportKey.values()){
	            if(gt.getValue()==value){
	                return gt;   
	            }
	        }
			return null;
	    }
	}

	public Integer getCustomerType() {
		return customerType;
	}

	public void setCustomerType(Integer customerType) {
		this.customerType = customerType;
	}

	public Double getPurchaseAmount() {
		if(purchaseAmount==null){
			purchaseAmount=0.0;
		}
		return purchaseAmount;
	}

	public void setPurchaseAmount(Double purchaseAmount) {
		this.purchaseAmount = purchaseAmount;
	}

	public Double getSellAmount() {
		if(sellAmount==null){
			sellAmount=0.0;
		}
		return sellAmount;
	}

	public void setSellAmount(Double sellAmount) {
		this.sellAmount = sellAmount;
	}
	
}

