package com.bigaka.crm.customer.action;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.common.util.StringUtil;
import com.bigaka.crm.customer.model.User;
import com.bigaka.crm.customer.service.UserService;

/**
 * 顾客基本信息
 * @author Dylan_Tao
 * @date 2015-12-01
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
@Controller
@RequestMapping("/login")
public class LoginAction{
	
	private static final Log log = LogFactory.getLog(LoginAction.class);
	 
	@Autowired
	private UserService userService;
	
	@RequestMapping(value="", method=RequestMethod.GET)
	public ModelAndView Index(){
		return new ModelAndView("/login");	
	}
	
	@RequestMapping(value="", method=RequestMethod.POST)
	public ModelAndView login(String userName,String password){
		if(StringUtil.isNotBlank(userName) &&
				StringUtil.isNotBlank(password)){
			ServiceResult<User> userResult = userService.getByUserNameAndPassword(userName, password);
			
			if(userResult.getResult()!=null){
				return new ModelAndView("redirect:/back/customer/list");	
			}else{
				return new ModelAndView("/login");	
			}
		}else{
			return new ModelAndView("/login");	
		}
	}
	
}
