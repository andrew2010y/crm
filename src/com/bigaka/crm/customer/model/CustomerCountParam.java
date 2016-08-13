package com.bigaka.crm.customer.model;

import java.io.Serializable;

public class CustomerCountParam implements Serializable{

	private static final long serialVersionUID = 7541031391191025283L;
	
	private Integer parentStoreId;
	private Integer storeId;
	private Integer type;
	private String sort;
	private Integer curPage;
	private Integer consumeMin;
	private Integer consumeMax;
	private Integer pointMin;
	private Integer pointMax;
	private String consumeDateStart;
	private String consumeDateEnd;
	
	private Long phone;
	
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
	public Integer getType() {
		return type;
	}
	public void setType(Integer type) {
		this.type = type;
	}
	public String getSort() {
		return sort;
	}
	public void setSort(String sort) {
		this.sort = sort;
	}
	public Integer getCurPage() {
		return curPage;
	}
	public void setCurPage(Integer curPage) {
		this.curPage = curPage;
	}
	public Integer getConsumeMin() {
		return consumeMin;
	}
	public void setConsumeMin(Integer consumeMin) {
		this.consumeMin = consumeMin;
	}
	public Integer getConsumeMax() {
		return consumeMax;
	}
	public void setConsumeMax(Integer consumeMax) {
		this.consumeMax = consumeMax;
	}
	public Integer getPointMin() {
		return pointMin;
	}
	public void setPointMin(Integer pointMin) {
		this.pointMin = pointMin;
	}
	public Integer getPointMax() {
		return pointMax;
	}
	public void setPointMax(Integer pointMax) {
		this.pointMax = pointMax;
	}
	public String getConsumeDateStart() {
		return consumeDateStart;
	}
	public void setConsumeDateStart(String consumeDateStart) {
		this.consumeDateStart = consumeDateStart;
	}
	public String getConsumeDateEnd() {
		return consumeDateEnd;
	}
	public void setConsumeDateEnd(String consumeDateEnd) {
		this.consumeDateEnd = consumeDateEnd;
	}
	public Long getPhone() {
		return phone;
	}
	public void setPhone(Long phone) {
		this.phone = phone;
	}
}
