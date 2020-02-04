package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.TbbmEntity;

import java.util.Map;

/**
 * 投标报名管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-08 16:28:36
 */
public interface TbbmService extends IService<TbbmEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

