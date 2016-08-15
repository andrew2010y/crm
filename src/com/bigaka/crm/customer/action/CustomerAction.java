package com.bigaka.crm.customer.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.bigaka.crm.common.model.Code;
import com.bigaka.crm.common.model.Page;
import com.bigaka.crm.common.model.ServiceResult;
import com.bigaka.crm.common.util.StringUtil;
import com.bigaka.crm.customer.model.CustSearchParam;
import com.bigaka.crm.customer.model.Customer;
import com.bigaka.crm.customer.model.Customer.RegisterChannel;
import com.bigaka.crm.customer.model.Customer.RegisterType;
import com.bigaka.crm.customer.model.CustomerDetail;
import com.bigaka.crm.customer.model.CustomerTag;
import com.bigaka.crm.customer.service.CustomerDetailService;
import com.bigaka.crm.customer.service.CustomerService;
import com.bigaka.crm.customer.service.FormStorePropService;
import com.bigaka.crm.form.model.FormStorePropExt;
import com.bigaka.crm.web.model.Store;
import com.bigaka.crm.web.model.Store.StoreType;

/**
 * 顾客基本信息
 * @author Dylan_Tao
 * @date 2015-12-01
 * Copyright 2015 bigaka.com. All Rights Reserved. 
 */
@Controller
@RequestMapping("/back/customer")
public class CustomerAction{
	
	private static final Log log = LogFactory.getLog(CustomerAction.class);
	
	private static final String EXCEL_NAME = "customer";
	
	@Value("#{config['pub.cloud.store.list.url']}")
	private String pubCloudStoreListUrl;
	 
	@Autowired
	private CustomerService customerService;
	@Autowired
	private CustomerDetailService customerDetailService;
/*	@Autowired
	private CustomerTagService customerTagService;*/
/*	@Autowired
	private TagService tagService;
	@Autowired
	private CustomerApplyService customerApplyService;
	@Autowired
	private CommonService commonService;
	*/
	@Autowired
	private FormStorePropService formStorePropService;
	
	@RequestMapping("/list")
	public ModelAndView getCustomerPage(Store store){
		//初始化全局标签 、商家门店列表,详见 /webapp/js/modules/modules.js  
		Map<String, Object> resultMap = new HashMap<String, Object>();
		//ServiceResult<FormStorePropExt> result = formStorePropService.getFormStoreUsingProp(store.getParentId());
		
		resultMap.put("storeListUrl",pubCloudStoreListUrl);
		//resultMap.put("storeFormUsingProp",result.getResult());
		//初始化全局标签 、商家门店列表,详见 /webapp/js/modules/modules.js  
		return new ModelAndView("/back/customer/customer-list",resultMap);	
	}
	
	@RequestMapping("/list-customer")
	public ModelAndView getCustomerPage(
			//@RequestBody CustomerListExt customerListExt ,Store store
			){
		//List<FormStoreProp> customProp=customerListExt.getCustomPropList();
		CustSearchParam param=  new CustSearchParam();//customerListExt.getParam();
		param.setPageNo(1);
		param.setPageSize(10);
		param.setAllCustomerId(0);
		
		//list-data
		Page<CustomerDetail> page = new Page<CustomerDetail>(param.getPageSize(), param.getPageNo());
		List<Integer> custIds = new ArrayList<Integer>();
		ServiceResult<Page<CustomerDetail>> result = new ServiceResult<Page<CustomerDetail>>();
		try {
			/*if(param.getStoreId() == null || param.getStoreId().equals(-1)){
				param.setStoreId(store.getId());
				param.setDirectShop(false);
			}else{
				param.setDirectShop(true);
			}*/
			param.setStoreId(1);
			param.setDirectShop(false);
			result = customerDetailService.getCustomerPage(param,
					null//customProp
					, page);
		} catch (Exception e) {
			log.error(e);
		}
		page = result.getResult();
		List<CustomerDetail> list = page.getResult();
		for(int i=0; i<list.size(); i++){
			CustomerDetail detail = list.get(i);
			custIds.add(detail.getCustomerId());
		}
		ServiceResult<HashMap<Integer, List<CustomerTag>>> tagResult = new ServiceResult<HashMap<Integer,List<CustomerTag>>>();
		try {
			if(custIds.size()>0){
				tagResult =null;// customerTagService.getCustomerTagMap(custIds);
			}
		} catch (Exception e) {
			log.error(e);
		}
		//HashMap<Integer, List<CustomerTag>> tagMap = tagResult.getResult();
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("page", page);
		//model.put("custTagMap", tagMap);
		
		return new ModelAndView("/back/customer/customer-list-data", model);
	}
	
	@RequestMapping("/create")
	public ModelAndView getCustomerDetail(Integer id, Long phone, Store store){
		store.setId(1);store.setParentId(1);
		Map<String, Object> resultMap = new HashMap<String, Object>();
		ServiceResult<FormStorePropExt> formStoreUsingProp = formStorePropService.getFormStoreUsingProp(store.getParentId());
		resultMap.put("storeFormUsingProp", formStoreUsingProp.getResult());
		resultMap.put("storeListUrl", pubCloudStoreListUrl);
		resultMap.put("customerId", id);
		resultMap.put("phone", phone);
		resultMap.put("store", store);
		return new ModelAndView("/back/customer/customer-create", resultMap);
	}
	
	
	@ResponseBody
	@RequestMapping("/save")
	public ServiceResult<Customer> saveCustomer(@RequestBody Customer customer, Store store){
		if(customer.getUsername()!=null){
			customer.setCustomerId(null);
			customer.setStoreId(1);
			customer.setParentStoreId(1);
			
			Integer customerType = customer.getCustomerType();
			if(customerType!=null&&customerType==1){
				customer.setPurchaseAmount("10");
			};
			
			/*if(customer.getStoreId()==null || customer.getStoreId().equals(store.getId())){//异常为空或选中为当前登录的店面
				customer.setStoreId(store.getId());//更改
				if(StoreType.RETAIL.getValue().equals(store.getType())){ //直营
					customer.setParentStoreId(store.getParentId());
				}else{ //经销或商户
					customer.setParentStoreId(store.getId());
				}
			}else{ //当前登录的商户与选中的不一致，必为直营店
				ServiceResult<HashMap<String, Object>> scoreDetail =null;// commonService.getStoreDetail(customer.getStoreId());
				if(scoreDetail.getResult()!=null){
					Integer parentId = (Integer) scoreDetail.getResult().get("parentId");
					customer.setParentStoreId(parentId);
				}else{
					return new ServiceResult<Customer>(Code.FAILED,"保存失败");
				}
			}*/
			customer.setParentStoreId(1);
			if(StringUtil.isBlank(customer.getStoreName())){
				customer.setStoreName(store.getName());
			}
			customer.setRegisterChannel(RegisterChannel.DATACENTER);
			ServiceResult<Customer> result = customerService.saveCustomer(customer);
			
			return result;
		}else{
			return new ServiceResult<Customer>(Code.FAILED,"保存失败");
		}
	}
	
	@ResponseBody
	@RequestMapping("/update")
	public ServiceResult<Boolean> updateCustomer(@RequestBody Customer customer){
		customer.setStoreId(1);
		if(customer!=null && customer.getCustomerId()!=null &&  customer.getStoreId()!=null){
			ServiceResult<Boolean> result;
			try {
				customer.setRegisterType(RegisterType.PHONE);
				customer.setRegisterChannel(RegisterChannel.DATACENTER);
				result = customerService.updateCustomer(customer);
			} catch (Exception e) {
				result = new ServiceResult<Boolean>(e);
			}
			return result;
		}else{
			return new ServiceResult<Boolean>(Code.FAILED, "数据异常!");
		}
	}
	
	@ResponseBody
	@RequestMapping("/state")
	public boolean updateState(Integer customerId, Byte state){
		if(customerId!=null && state!=null){
			Customer customer = new Customer();
			customer.setCustomerId(customerId);
			customer.setState(state);
			ServiceResult<Boolean> result = customerService.updateCustomer(customer);
			return result.getResult();
		}else{
			return false;
		}
	}
	
	@RequestMapping("/export/xls")
	public void exportCustomer(Store store,HttpServletRequest request,HttpServletResponse response){
		
		try {
			//获取门店名称
			ServiceResult<List<Integer>> subStoreList = null;//commonService.getSubStoreIdList(store.getId());
			List<Integer> subStoreIds = subStoreList.getResult();
			if(subStoreIds==null || subStoreIds.size()==0){
				subStoreIds = new ArrayList<Integer>();
				subStoreIds.add(store.getId());
			}
			
			HashMap<Integer,String> storeIdRefName =new HashMap<Integer,String>();
			for(Integer storeId:subStoreIds){
				HashMap<String, Object> map =null;//commonService.getStoreDetail(storeId).getResult();
				if(map!=null){
					storeIdRefName.put(storeId, String.valueOf(map.get("shortName")));
				}
			}
			
			String rootPath = request.getRealPath("/");
			String separator = System.getProperty("file.separator");
			String path = rootPath+separator+"WEB-INF"+separator+"classes"+separator+"template"+separator+EXCEL_NAME+".xls";
			
			HSSFWorkbook wb = new HSSFWorkbook(new FileInputStream(new File(path)));
			
			HSSFSheet sheet0 = wb.getSheetAt(0);
			sheet0.setColumnWidth(0, 30*256);
			sheet0.setColumnWidth(1, 30*256);
			sheet0.setColumnWidth(2, 30*256);
			sheet0.setColumnWidth(3, 30*256);
			sheet0.setColumnWidth(4, 20*256);
			ServiceResult<List<Customer>> list = customerService.getCustomerByStoreId(subStoreIds);
			List<Customer> customerList = list.getResult();
			for(int i = 0;i<customerList.size();i++){
				 HSSFRow row=sheet0.createRow(i+1); 
				Customer customer = customerList.get(i);
				//会员手机号
				HSSFCell cell0 = row.createCell(0); 
				cell0.setCellValue(customer.getPhone());
				//注册门店
				HSSFCell cell1 = row.createCell(1); 
				
				String storeName = storeIdRefName.get(customer.getStoreId());
				if(StringUtil.isNotBlank(storeName)){
					cell1.setCellValue(storeName);
				}
//				cell1.setCellValue(store.getName());
				//注册时间
				HSSFCell cell2 = row.createCell(2); 
				cell2.setCellValue(customer.getLogo());
				//消费总额
				HSSFCell cell3 = row.createCell(3); 
				cell3.setCellValue(customer.getRemark());
				//订单数量
				HSSFCell cell4 = row.createCell(4); 
				cell4.setCellValue(customer.getAreaCode());
				
			}
			String name = EXCEL_NAME;
			final String userAgent = request.getHeader("USER-AGENT").toLowerCase();  
			if (userAgent.indexOf("firefox") == -1){
				 name= URLEncoder.encode(name, "UTF-8");
			}else{//google,火狐浏览器  
				 name = new String(name.getBytes(), "ISO8859-1");  
			}
			 //下载
			downloadExcel(wb,name, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 下载文件
	 * 
	 * @param workBook
	 * @param fileName
	 * @param response
	 * @throws IOException
	 */
	public static void downloadExcel(HSSFWorkbook workBook, String fileName,
			HttpServletResponse response) throws IOException {
		
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-Disposition", "attachment;filename="
				+fileName+".xls");
		OutputStream os = null;
		try {
			os = response.getOutputStream();
			workBook.write(os);
			os.flush();
			os.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (os != null)
				os.close();
		}
	}

}
