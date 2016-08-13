package com.bigaka.crm.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebArgumentResolver;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.bigaka.crm.web.model.Store;
import com.shinesky.otoxplf.security.business.dto.CRMParamModel;
/**
 * 用户状态拦截器及参数补充
 * @description 
 * @author Dylan Tao
 * @date 2015-11-12
 * Copyright 2015 bigaka.com. All Rights Reserved.
 */
public class LoginStateInterceptor implements HandlerInterceptor,WebArgumentResolver{
	
	static final String TOKEN = "token";
	
	static final String STORE = "store";

	static final String  CRMParamModel    = "crmParamModel";
	
	static final String PLATFORM_CTX = "platformCtx";

	@Value("#{config['pub.cloud.login.url']}")
	private String pubCloudLoginUrl;
	@Value("#{config['pub.cloud.domain.url']}")
	private String pubCloudDomainUrl;
	
 
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

 
//		String requestType = request.getHeader("X-Requested-With");
//		String token = CookieUtil.getCookie(TOKEN, null, request);
//		boolean isHeader = false;
//		if(StringUtil.isBlank(token)){ //没有的话从地址栏尝试读取，依然没有则为非法
//			token = request.getParameter(TOKEN);	
//			isHeader = true;
//		}
//		if(StringUtil.isNotBlank(token)){//地址栏不为空或cookie不为空
//			InfoStore storeObj = redisCache.getObject(token);
//			if(storeObj!=null && storeObj.getId()!=null){
//				Store store = new Store();
//				store.setParentId(storeObj.getParentId());
//				store.setId(storeObj.getId());
//				store.setName(storeObj.getShortName());
//				store.setLogo(pubCloudDomainUrl + storeObj.getLogoUrl());
//				store.setToken(token);
//				request.setAttribute(STORE, store);
//				if(isHeader){
//					CookieUtil.setCookie(TOKEN, token, 3600, response);
//				}
//				return true;
//			}
//		}	
//		
//		PrintWriter out = response.getWriter();
//		if(StringUtil.isNotBlank(requestType) && requestType.equalsIgnoreCase("XMLHttpRequest")){
//			Result<String> result = new Result<String>();
//			result.setCode(-5);
//			result.setMessage("用户登录身份已过期!");
//			result.setResult(pubCloudLoginUrl);
//			String jsonResult = JsonUtil.toJson(result);
//			response.setContentType(ContentType.JSON.getValue());
//			out.write(jsonResult);
//			out.flush();
//			out.close();
//		}else{
//			response.setCharacterEncoding(CodeType.UTF8.getValue());  
//			response.setContentType("text/html; charset=UTF-8"); 
//            StringBuilder builder = new StringBuilder();  
//            builder.append("<script type=\"text/javascript\" charset=\"UTF-8\">");  
//            builder.append("window.top.location.href=\"");  
//            builder.append(pubCloudLoginUrl +"\";</script>");  
//            out.print(builder.toString());  
//            out.close();  
//		}
//		return false;
 
	/*	String requestType = request.getHeader("X-Requested-With");
		String token = CookieUtil.getCookie(TOKEN, null, request);
		String urlToken = request.getParameter(TOKEN);	
		boolean isHeader = false;
		if(StringUtil.isBlank(token) && StringUtil.isNotBlank(urlToken)){ //没有的话从地址栏尝试读取，依然没有则为非法
			token = urlToken;	
			isHeader = true;
		}else if(StringUtil.isNotBlank(token) && StringUtil.isNotBlank(urlToken)){ //强制重写cookieId
			token = urlToken;	
			CookieUtil.removeCookie(TOKEN, response);
			isHeader = true;
		}
		if(StringUtil.isNotBlank(token)){//地址栏不为空或cookie不为空
			InfoStore storeObj = redisCache.getObject(token);
			if(storeObj!=null && storeObj.getId()!=null){
				Store store = new Store();
				Integer parentid = storeObj.getParentId();
				store.setParentId(parentid==null || parentid.equals(0)?storeObj.getId():parentid);
				store.setType(storeObj.getSubType());
				store.setId(storeObj.getId());
				store.setName(storeObj.getShortName());
				store.setLogo( storeObj.getLogoUrl());
				store.setToken(token);
				store.setLoginUserName(storeObj.getLoginUserName());
				store.setLoginUserLogo(storeObj.getLoginUserLogo());
				request.setAttribute(STORE, store);
				
				
				CRMParamModel crmParamModel=redisCache.getObject(KeyGenter.getCRMParamKey(storeObj.getId()));
				request.setAttribute(CRMParamModel, crmParamModel);
				
				if(request.getSession().getServletContext().getAttribute(PLATFORM_CTX)==null){
					request.getSession().getServletContext().setAttribute(PLATFORM_CTX, pubCloudDomainUrl);
				}
				if(isHeader){
					CookieUtil.setCookie(TOKEN, token, 3600, response);
				}
				return true;
			}else{
				CookieUtil.removeCookie(TOKEN, response);// clear local cookie
			}
		}
		
		
		InfoStore storeObj = redisCache.getObject("dsadasdasdasdffffff");
		if(storeObj==null){
			storeObj = new InfoStore();
			storeObj.setParentId(736);
			storeObj.setId(736);
			storeObj.setShortName("舞象商城");
			storeObj.setLogoUrl(pubCloudDomainUrl + "/");
			redisCache.putObject("dsadasdasdasdffffff", storeObj);
		}*/
		
		Store store = new Store();
		store.setParentId(736);
		store.setId(736);
		store.setName("舞象商城");
		store.setLogo(pubCloudDomainUrl + "/");
		store.setToken("dsadasdasdasdffffff");
		request.setAttribute(STORE, store);
		return true;
//		InfoStore storeObj = redisCache.getObject("dsadasdasdasdffffff");
//		if(storeObj==null){
//			storeObj = new InfoStore();
//			storeObj.setParentId(40);
//			storeObj.setId(40);
//			storeObj.setShortName("舞象商城");
//			storeObj.setLogoUrl(pubCloudDomainUrl + "/");
//			redisCache.putObject("dsadasdasdasdffffff", storeObj);
//		}
//		
//		Store store = new Store();
//		store.setParentId(40);
//		store.setId(40);
//		store.setName("舞象商城");
//		store.setLogo(pubCloudDomainUrl + "/");
//		store.setToken("dsadasdasdasdffffff");
//		request.setAttribute(STORE, store);
//		CRMParamModel crmParamModel=new CRMParamModel(pubCloudDomainUrl);
//		crmParamModel.setStoreStockStatus( "Y");
//		crmParamModel.setStoreModel("Y");
//		request.setAttribute(CRMParamModel, crmParamModel);
//		return true;
		
	}

	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3) throws Exception {
		
	}

	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3) throws Exception {
		
	}

	@Override
	public Object resolveArgument(MethodParameter methodParameter, NativeWebRequest webRequest) throws Exception {
		 if (methodParameter.getParameterType().equals(Store.class)) {
			 Store store = (Store) webRequest.getAttribute(STORE, WebRequest.SCOPE_REQUEST);
			 return store;
		 }
		 if (methodParameter.getParameterType().equals(CRMParamModel.class)) {
			 CRMParamModel crmParamModel = (CRMParamModel) webRequest.getAttribute(CRMParamModel, WebRequest.SCOPE_REQUEST);
			 return crmParamModel;
		 }
		 return UNRESOLVED;
	}
	
	
}
