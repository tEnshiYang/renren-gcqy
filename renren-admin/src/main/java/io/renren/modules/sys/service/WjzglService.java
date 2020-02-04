package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.WjzglEntity;

import java.util.Map;

/**
 * 外经证管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:07:31
 */
public interface WjzglService extends IService<WjzglEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

