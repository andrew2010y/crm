/**
 * 文件名：AccessTokenTest
 * 版权：Copyright 2002-2017 SDZN. All Rights Reserved.
 * 描述：
 * 修改人： yizhou
 * 修改时间：16/7/18
 * 修改内容：新增
 */
package com.sdzn.fuzhuxian.api.controller.accessToken;

import com.sdzn.fuzhuxian.api.controller.APIHttpClient;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.params.HttpParams;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * AccessTokenTest〈一句话功能简述〉
 * 〈功能详细描述〉
 * @author yizhou
 * @version v1.0.0
 * @see      ［相关类/方法］
 * @since 产品/模块版本
 */
public class AccessTokenTest {

    private String getURL = "/accessToken/get";

    @Test
    public void get() {

        APIHttpClient ac = new APIHttpClient();


        getURL+="?clientType=PC&timestamp="+new Date().getTime();

        System.out.println(ac.get(getURL));
    }

}
