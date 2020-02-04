package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.GfflmEntity;

import java.util.Map;

/**
 * 供方分类码
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:27:39
 */
public interface GfflmService extends IService<GfflmEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

