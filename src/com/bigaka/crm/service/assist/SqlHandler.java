package com.bigaka.crm.service.assist;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.bigaka.crm.common.model.Constant;

/**
 * sql适配转换
 * @author Dylan Tao
 * @date 2015-4-29
 * Copyright 2015 bigaka.com. All Rights Reserved.
 */
public class SqlHandler {
	
	private static final String SELECT = "select count(*) from ";
	private static final String LIMIT = "limit";
	
	private static final String ORDER_FILTER_PATTERN = "order\\s*by[\\w|\\W|\\s|\\S]*";
	
	protected static String createCount(String sql){
		sql = SqlHandler.removeOrderBy(sql); //移除order by
		StringBuffer sb = new StringBuffer().append(SELECT).append("(").append(sql).append(")").append(" count_total");
		return sb.toString();
	}
	
	protected static String removeOrderBy(String sql) {
		Pattern p = Pattern.compile(ORDER_FILTER_PATTERN, Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(sql);
		StringBuffer sb = new StringBuffer();
		while (m.find()) {
			m.appendReplacement(sb, Constant.EMPTY);
		}
		m.appendTail(sb);
		return sb.toString();
	}
	
	protected static String createLimit(String sql,long startIndex,long selectLength){
		StringBuffer sb = new StringBuffer(sql);
		sb.append(Constant.SPACE).append(LIMIT).append(Constant.SPACE);
		sb.append(startIndex).append(Constant.COMMA).append(selectLength);
		return sb.toString();
	}
	
	public static String createIn(String sql,int count){
		StringBuffer buffer = new StringBuffer(sql);
		for(int i=0;i<count;i++){
			if(i==0){
				buffer.append(" in(?");
			}else{
				buffer.append(",?");
			}
		}
		return buffer.append(")").toString();
	}
	
	public static StringBuffer createIn(StringBuffer sql,int count){
		for(int i=0;i<count;i++){
			if(i==0){
				sql.append(" in(?");
			}else{
				sql.append(",?");
			}
		}
		return sql.append(")");
	}
	
}
