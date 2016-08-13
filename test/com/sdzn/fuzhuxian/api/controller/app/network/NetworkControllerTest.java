/**
 * 文件名：NetworkControllerTest
 * 版权：Copyright 2002-2017 SDZN. All Rights Reserved.
 * 描述：
 * 修改人： yizhou
 * 修改时间：16/7/18
 * 修改内容：新增
 */
package com.sdzn.fuzhuxian.api.controller.app.network;

import com.sdzn.fuzhuxian.api.controller.APIHttpClient;
import org.apache.http.NameValuePair;
import org.apache.http.message.BasicNameValuePair;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * NetworkControllerTest〈一句话功能简述〉
 * 〈功能详细描述〉
 * @author yizhou
 * @version v1.0.0
 * @see      ［相关类/方法］
 * @since 产品/模块版本
 */
public class NetworkControllerTest {

    private String listUrl = "/app/network/list";

    @Test
    public void list() {

        APIHttpClient ac = new APIHttpClient();

        List<NameValuePair> params = new ArrayList<NameValuePair>();


        params.add(new BasicNameValuePair("imei", "dd"));
        params.add(new BasicNameValuePair("clientType", "PC"));
        params.add(new BasicNameValuePair("token", "aasfdsfweerwefwf"));
        params.add(new BasicNameValuePair("timestamp", new Date().getTime()+""));

        System.out.println(ac.post(listUrl,params));
    }
}
