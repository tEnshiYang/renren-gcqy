package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.YzdwglEntity;

import java.util.Map;

/**
 * 业主单位管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 16:55:31
 */
public interface YzdwglService extends IService<YzdwglEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

