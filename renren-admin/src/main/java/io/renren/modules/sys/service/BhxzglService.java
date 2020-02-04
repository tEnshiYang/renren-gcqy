package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.BhxzglEntity;

import java.util.Map;

/**
 * 保含协助管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:05:54
 */
public interface BhxzglService extends IService<BhxzglEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

