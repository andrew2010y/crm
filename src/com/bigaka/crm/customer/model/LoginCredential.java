package com.bigaka.crm.customer.model;

import java.io.Serializable;

import com.bigaka.crm.customer.model.Customer.RegisterChannel;
import com.bigaka.crm.customer.model.Customer.RegisterType;

public class LoginCredential implements Serializable{
	
	private static final long serialVersionUID = 7125584381425562083L;
	
	private Integer customerId;
	private Integer parentStoreId;
	private Integer storeId;
	private String name;
	private String logo;
	private Long phone;
	
	private RegisterType loginType;
	private RegisterChannel loginChannel;
	
	//ext
	private String token;
	private String openId;
	private Long point;
	
	public Integer getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}
	
	public Integer getParentStoreId() {
		return parentStoreId;
	}
	public void setParentStoreId(Integer parentStoreId) {
		this.parentStoreId = parentStoreId;
	}
	public Integer getStoreId() {
		return storeId;
	}
	public void setStoreId(Integer storeId) {
		this.storeId = storeId;
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
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public RegisterType getLoginType() {
		return loginType;
	}
	public void setLoginType(RegisterType loginType) {
		this.loginType = loginType;
	}
	public RegisterChannel getLoginChannel() {
		return loginChannel;
	}
	public void setLoginChannel(RegisterChannel loginChannel) {
		this.loginChannel = loginChannel;
	}
	public Long getPoint() {
		return point;
	}
	public void setPoint(Long point) {
		this.point = point;
	}
	
}
