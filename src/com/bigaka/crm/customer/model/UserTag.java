package com.bigaka.crm.customer.model;

import java.io.Serializable;

import com.bigaka.crm.common.model.Page;

public class UserTag implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 2953110124079558945L;
	private Long tagId;
	private String tagName;
	private Integer count;
	
	private Page<CustomerDetail> userList;


	public Long getTagId() {
		return tagId;
	}

	public void setTagId(Long tagId) {
		this.tagId = tagId;
	}

	public String getTagName() {
		return tagName;
	}

	public void setTagName(String tagName) {
		this.tagName = tagName;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public Page<CustomerDetail> getUserList() {
		return userList;
	}

	public void setUserList(Page<CustomerDetail> userList) {
		this.userList = userList;
	}

	
}
