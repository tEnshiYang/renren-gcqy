package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.RwddwEntity;

import java.util.Map;

/**
 * 入围的单位
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-02-02 16:46:35
 */
public interface RwddwService extends IService<RwddwEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

