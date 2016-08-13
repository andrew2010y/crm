package com.bigaka.crm.web.model;

public class Store {

	private Integer id;
	private Integer parentId;
	private Short type; // 0代表商户　1: 直营门店, 2:经销商
	private String name;
	private String logo;
	private String oemLogo;
	private String token;
	private String loginUserName;
	private String loginUserLogo;

	public enum StoreType {

		STORE(Short.valueOf("0")), RETAIL(Short.valueOf("1")), DEALER(Short
				.valueOf("2"));

		private final Short value;

		StoreType(Short value) {
			this.value = value;
		}

		public Short getValue() {
			return value;
		}

	}

	public String getLoginUserName() {
		return loginUserName;
	}

	public void setLoginUserName(String loginUserName) {
		this.loginUserName = loginUserName;
	}

	public String getLoginUserLogo() {
		return loginUserLogo;
	}

	public void setLoginUserLogo(String loginUserLogo) {
		this.loginUserLogo = loginUserLogo;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public Short getType() {
		return type;
	}

	public void setType(Short type) {
		this.type = type;
	}

	public String getOemLogo() {
		return oemLogo;
	}

	public void setOemLogo(String oemLogo) {
		this.oemLogo = oemLogo;
	}
	

}
