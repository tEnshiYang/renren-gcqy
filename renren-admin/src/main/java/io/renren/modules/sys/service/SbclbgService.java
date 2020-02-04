package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.SbclbgEntity;

import java.util.Map;

/**
 * 设备材料变更
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:32:13
 */
public interface SbclbgService extends IService<SbclbgEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

