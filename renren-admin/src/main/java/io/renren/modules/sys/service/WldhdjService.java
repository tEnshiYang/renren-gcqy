package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.WldhdjEntity;

import java.util.Map;

/**
 * 物料到货登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:41:30
 */
public interface WldhdjService extends IService<WldhdjEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

