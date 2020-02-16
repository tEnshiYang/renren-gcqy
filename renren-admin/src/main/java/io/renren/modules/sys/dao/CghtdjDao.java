package io.renren.modules.sys.dao;

import io.renren.modules.sys.entity.CghtdjEntity;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * 采购合同登记
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:23:03
 */
@Mapper
public interface CghtdjDao extends BaseMapper<CghtdjEntity> {
	Long getmaxid();
}
