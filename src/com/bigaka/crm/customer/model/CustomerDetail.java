package com.bigaka.crm.customer.model;

import java.io.Serializable;
import java.util.List;

import com.bigaka.crm.form.model.FormCustomerProp;
import com.bigaka.crm.form.model.FormStoreProp;
import com.bigaka.crm.form.model.FormStorePropExt;
import com.bigaka.crm.tag.model.Tag;

/**
 * 顾客详细信息
 * @author Dylan Tao 
 * @date 2015-12-02
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */ 

public class CustomerDetail implements Serializable{
	
	private static final long serialVersionUID = -7856115586995377410L;
	
	private Integer customerId;
	private String name;
	private String logo;
	private Short level;
	private Byte sex;
	private Long phone;
	private Long birthDate;
	private Integer areaCode;
	private String vipCardNo;
	private Long point;
	private Long accrualPoint;
	private String remark;
	private Long updateTime;
	private Long createTime;
	
	//ext
	private Integer storeId;
	private Integer parentStoreId;
	private Long username;
	private String nickName;//昵称
	private String openId;
	private Byte state;  //0 正常 1冻结
	private Long consumeTime;
	private Integer followPublicNum;  //关注公众号
	private Double price; //消费金额
	private Integer perfectDegree;  //信息完成程度
	
	private String cardNo;  //会员卡号

	
	private Boolean sendFlag;//是否需要发送微信模板
	
	private List<Tag> tagList;
	private List<CustomerAddress> addresses;
	
	//用户填写的自定义表单内容
	private List<FormCustomerProp> customerProps;
	
	//获取所有会员id
	private List<Integer>  allCustomerId;
	//用户
	private FormStorePropExt formStorePropExt;
	
	private Integer customerType;
	
	private Double purchaseAmount;
	private Double sellAmount;
	
	
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
	
	public FormStorePropExt getFormStorePropExt() {
		return formStorePropExt;
	}

	public void setFormStorePropExt(FormStorePropExt formStorePropExt) {
		this.formStorePropExt = formStorePropExt;
	}

	public List<Integer> getAllCustomerId() {
		return allCustomerId;
	}

	public void setAllCustomerId(List<Integer> allCustomerId) {
		this.allCustomerId = allCustomerId;
	}

	public Integer getFollowPublicNum() {
		return followPublicNum;
	}

	public void setFollowPublicNum(Integer followPublicNum) {
		this.followPublicNum = followPublicNum;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Integer getPerfectDegree() {
		return perfectDegree;
	}

	public void setPerfectDegree(Integer perfectDegree) {
		this.perfectDegree = perfectDegree;
	}

	public String getCardNo() {
		return cardNo;
	}

	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}

	public List<Tag> getTagList() {
		return tagList;
	}

	public void setTagList(List<Tag> tagList) {
		this.tagList = tagList;
	}


	public Boolean getSendFlag() {
		return sendFlag;
	}

	public void setSendFlag(Boolean sendFlag) {
		this.sendFlag = sendFlag;
	}



	private Byte registerType;
	private Byte registerChannel;

	public void setCustomerId(Integer customerId){
		this.customerId=customerId;
	}

	public Integer getCustomerId(){
		return customerId;
	}

	public void setName(String name){
		this.name=name;
	}

	public String getName(){
		return name;
	}

	public void setLogo(String logo){
		this.logo=logo;
	}

	public String getLogo(){
		return logo;
	}

	public void setLevel(Short level){
		this.level=level;
	}

	public Short getLevel(){
		return level;
	}

	public void setSex(Byte sex){
		this.sex=sex;
	}

	public Byte getSex(){
		return sex;
	}

	public Long getPhone() {
		return phone;
	}

	public void setPhone(Long phone) {
		this.phone = phone;
	}

	public void setBirthDate(Long birthDate){
		this.birthDate=birthDate;
	}

	public Long getBirthDate(){
		return birthDate;
	}

	public void setAreaCode(Integer areaCode){
		this.areaCode=areaCode;
	}

	public Integer getAreaCode(){
		return areaCode;
	}

	public void setVipCardNo(String vipCardNo){
		this.vipCardNo=vipCardNo;
	}

	public String getVipCardNo(){
		return vipCardNo;
	}
	
	public Long getPoint() {
		return point;
	}

	public void setPoint(Long point) {
		this.point = point;
	}

	public Long getAccrualPoint() {
		return accrualPoint;
	}

	public void setAccrualPoint(Long accrualPoint) {
		this.accrualPoint = accrualPoint;
	}

	public void setRemark(String remark){
		this.remark=remark;
	}

	public String getRemark(){
		return remark;
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

	public Integer getStoreId() {
		return storeId;
	}

	public void setStoreId(Integer storeId) {
		this.storeId = storeId;
	}

	public Byte getState() {
		return state;
	}

	public void setState(Byte state) {
		this.state = state;
	}

	public Long getConsumeTime() {
		return consumeTime;
	}

	public void setConsumeTime(Long consumeTime) {
		this.consumeTime = consumeTime;
	}

	public Byte getRegisterType() {
		return registerType;
	}

	public void setRegisterType(Byte registerType) {
		this.registerType = registerType;
	}

	public Byte getRegisterChannel() {
		return registerChannel;
	}

	public void setRegisterChannel(Byte registerChannel) {
		this.registerChannel = registerChannel;
	}

	public List<CustomerAddress> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<CustomerAddress> addresses) {
		this.addresses = addresses;
	}

	public String getOpenId() {
		return openId;
	}

	public void setOpenId(String openId) {
		this.openId = openId;
	}

	public Long getUsername() {
		return username;
	}

	public void setUsername(Long username) {
		this.username = username;
	}

	public Integer getParentStoreId() {
		return parentStoreId;
	}

	public void setParentStoreId(Integer parentStoreId) {
		this.parentStoreId = parentStoreId;
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

}

