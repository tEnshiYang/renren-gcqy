package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.GczlEntity;

import java.util.Map;

/**
 * 过程资料
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:45:59
 */
public interface GczlService extends IService<GczlEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

