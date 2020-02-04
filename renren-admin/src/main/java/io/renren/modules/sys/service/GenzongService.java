package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.GenzongEntity;

import java.util.Map;

/**
 * 项目跟踪监控
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-04 11:34:46
 */
public interface GenzongService extends IService<GenzongEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

