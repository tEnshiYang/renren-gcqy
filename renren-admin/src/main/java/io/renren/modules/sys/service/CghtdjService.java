package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.CghtdjEntity;

import java.util.Map;

/**
 * 采购合同登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:23:03
 */
public interface CghtdjService extends IService<CghtdjEntity> {
	Long getmaxid();
    PageUtils queryPage(Map<String, Object> params);
}

