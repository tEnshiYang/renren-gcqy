package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.ZlaqjcEntity;

import java.util.Map;

/**
 * 质量安全检查
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:47:23
 */
public interface ZlaqjcService extends IService<ZlaqjcEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

