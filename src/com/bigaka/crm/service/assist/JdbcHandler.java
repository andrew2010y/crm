package com.bigaka.crm.service.assist;

import java.io.CharArrayReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.SingleColumnRowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.bigaka.crm.common.model.Page;
import com.mysql.jdbc.Statement;

/**
 * jdbcTemplate封装
 * @author Dylan Tao
 * @date 2015-4-29
 * Copyright 2015 bigaka.com. All Rights Reserved.
 */
@Repository("jdbcHandler")
public class JdbcHandler {

	private static final Log log = LogFactory.getLog(JdbcHandler.class);
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	/* =================== 查询单列操作 ===================== */

	public <T> T getForColumn(String sql, Class<T> cls, Object... param) {
		T obj = null;
		try {
			if (param != null && param.length > 0) {
				obj = jdbcTemplate.queryForObject(sql, new SingleColumnRowMapper<T>(cls), param);
			} else {
				obj = jdbcTemplate.queryForObject(sql, new SingleColumnRowMapper<T>(cls));
			}
		} catch (DataAccessException e) {
			if(e instanceof EmptyResultDataAccessException==false){
				log.error(e);
			}
		}
		return obj;
	}

	public <T> List<T> getForColumnList(String sql, Class<T> cls,
			Object... param) {
		List<T> list = null;
		try {
			if (param != null && param.length > 0) {
				list = jdbcTemplate.query(sql, new SingleColumnRowMapper<T>(cls), param);
			} else {
				list = jdbcTemplate.query(sql, new SingleColumnRowMapper<T>(cls));
			}
		} catch (DataAccessException e) {
			if(e instanceof EmptyResultDataAccessException==false){
				log.error(e);
			}
		}
		return list;
	}

	/* =================== 查询多列操作 ===================== */

	public Map<String, Object> getForMap(String sql, Object... param) {
		Map<String, Object> map = null;
		try {
			if (param != null && param.length > 0) {
				map = jdbcTemplate.queryForMap(sql, param);
			} else {
				map = jdbcTemplate.queryForMap(sql);
			}
		} catch (DataAccessException e) {
			if(e instanceof EmptyResultDataAccessException==false){
				log.error(e);
			}
		}
		return map;
	}

	public List<Map<String, Object>> getForMapList(String sql,
			Object... param) {
		List<Map<String, Object>> list = null;
		try {
			if (param != null && param.length > 0) {
				list = jdbcTemplate.queryForList(sql, param);
			} else {
				list = jdbcTemplate.queryForList(sql);
			}
		} catch (DataAccessException e) {
			if(e instanceof EmptyResultDataAccessException==false){
				log.error(e);
			}
		}
		return list;
	}

	/* =================== 查询单表或多表操作 ===================== */

	public <T> T getForObject(String sql, Class<T> cls, Object... param) {
		T obj = null;
		try {
			if (param != null && param.length > 0) {
				obj = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<T>(cls), param);
			} else {
				obj = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<T>(cls));
			}
		} catch (DataAccessException e) {
			if(e instanceof EmptyResultDataAccessException==false){
				log.error(e);
			}
		}
		return obj;
	}

	public <T> List<T> getForList(String sql, Class<T> cls, Object... param) {
		List<T> list = null;
		try {
			if (param != null && param.length > 0) {
				list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<T>(cls), param);
			} else {
				list = jdbcTemplate.query(sql, new BeanPropertyRowMapper<T>(cls));
			}
		} catch (DataAccessException e) {
			if(e instanceof EmptyResultDataAccessException==false){
				log.error(e);
			}
		}
		return list;
	}

	public <T> Page<T> getForPage(String sql, Page<T> page, Class<T> cls, Object... param) {
		// 执行顺序：where->group by->having-order by->limit
		if (page.isAutoCount()) {
			String countSql = SqlHandler.createCount(sql);
			long count = getCount(countSql, Long.class, param);
			page.setTotalCount(count);
		}
		int pageNo = page.getPageNo();
		int pageSize = page.getPageSize();
		int startIndex = (pageNo - 1) * pageSize;
		sql = SqlHandler.createLimit(sql, startIndex, pageSize); // 拼组limit	
		List<T> list = null;
		if(cls.equals(String.class) || cls.equals(Integer.class)|| cls.equals(Long.class)){
			list = this.getForColumnList(sql, cls, param);
		}else{
			list = this.getForList(sql, cls, param);
		}
		
		page.setResult(list);
		return page;
	}
	
	public <T> T getMappingObject(String sql, RowMapper<T> mapper, Object... param) {
		T obj = null;
		try {
			if (param != null && param.length > 0) {
				obj = jdbcTemplate.queryForObject(sql, mapper, param);
			} else {
				obj = jdbcTemplate.queryForObject(sql, mapper);
			}
		} catch (DataAccessException e) {
			if(e instanceof EmptyResultDataAccessException==false){
				log.error(e);
			}
		}
		return obj;
	}

	public <T> List<T> getMappingList(String sql, RowMapper<T> mapper, Object... param) {
		List<T> list = null;
		try {
			if (param != null && param.length > 0) {
				list = jdbcTemplate.query(sql, mapper, param);
			} else {
				list = jdbcTemplate.query(sql, mapper);
			}
		} catch (DataAccessException e) {
			if(e instanceof EmptyResultDataAccessException==false){
				log.error(e);
			}
		}
		return list;
	}

	public <T> Page<T> getMappingPage(String sql, Page<T> page, RowMapper<T> mapper, Object... param) {
		// 执行顺序：where->group by->having-order by->limit
		if (page.isAutoCount()) {
			String countSql = SqlHandler.createCount(sql);
			long count = getCount(countSql, Long.class, param);
			page.setTotalCount(count);
		}
		int pageNo = page.getPageNo();
		int pageSize = page.getPageSize();
		int startIndex = (pageNo - 1) * pageSize;
		sql = SqlHandler.createLimit(sql, startIndex, pageSize); // 拼组limit	
		List<T> list =  this.getMappingList(sql, mapper, param);
		page.setResult(list);
		return page;
	}

	/* =================== 扩展操作 ===================== */

	public <T> T getCount(String sql, Class<T> cls, Object... param) {
		return this.getForColumn(sql, cls, param);
	}

	/* =================== 单条记录增删改===================== */

	public boolean save(String sql, Object... param)  {
		return updateHandler(sql, param);
	}
	
	public int saveReturnKey(final String sql,final Object... params){
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(new PreparedStatementCreator() {
            public PreparedStatement createPreparedStatement(Connection conn) {
                PreparedStatement ps = null;
				try {
					ps = conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
					for(int i=1;i<=params.length;i++){
						 Object param = params[i-1];
						 if(param instanceof char[]){
							char[] cr = (char[])param;
							ps.setCharacterStream(i, new CharArrayReader(cr), cr.length);
						 }else{
							ps.setObject(i, param);
						 }	
					}
				} catch (SQLException e) {
					log.error(e);
				}
                return ps;
            }
        }, keyHolder);
        return keyHolder.getKey().intValue();
	}

	public boolean update(String sql, Object... param)  {
		return updateHandler(sql, param);
	}

	public boolean delete(String sql, Object... param)  {
		return updateHandler(sql, param);
	}

	/* =================== 多条记录增删改===================== */

	public boolean batchSave(String sql, List<List<Object>> paramList) {
		return batchHandler(sql, paramList);
	}

	public boolean batchUpdate(String sql, List<List<Object>> paramList) {
		return batchHandler(sql, paramList);
	}

	public boolean batchDelete(String sql, List<List<Object>> paramList) {
		return batchHandler(sql, paramList);
	}

	private boolean updateHandler(String sql, Object... param) {
		try {
			int index = 0;
			if (param != null && param.length > 0) {
				index = jdbcTemplate.update(sql, param);
			} else {
				index = jdbcTemplate.update(sql);
			}
			return index > 0 ? true : false;
		} catch (DataAccessException e) {
			log.error(e);
			return false;
		}
		
	}

	private boolean batchHandler(String sql, final List<List<Object>> paramList) {
		BatchPreparedStatementSetter setter = new BatchPreparedStatementSetter() {
			public void setValues(PreparedStatement ps, int index)throws SQLException {
				List<Object> subParamList = paramList.get(index);
				int spLength = subParamList.size();
				for(int u = 1; u<=spLength; u++){
					Object param = subParamList.get(u-1);
					if(param instanceof char[]){
						char[] cr = (char[])param;
						ps.setCharacterStream(u, new CharArrayReader(cr), cr.length);
					}else{
						ps.setObject(u, param);
					}
				}
			}
			public int getBatchSize() {
				return paramList.size();
			}
		};
		int[] index = null;
		try {
			index = jdbcTemplate.batchUpdate(sql, setter);
		} catch (DataAccessException e) {
			log.error(e);
		}
		if(index!=null && index.length == paramList.size()){
			return true;
		}
		return false;
	}

	
}
