package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.FyjklkddjEntity;

import java.util.Map;

/**
 * 来款单登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:14:41
 */
public interface FyjklkddjService extends IService<FyjklkddjEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

