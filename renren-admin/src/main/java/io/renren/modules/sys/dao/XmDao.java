package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.XmEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 主项目
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-04 11:11:22
 */
@Mapper
public interface XmDao extends BaseMapper<XmEntity> {
//	XmEntity selectByid(String xmId,String filepath);
}
