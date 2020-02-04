package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.ZbxqdEntity;

import java.util.Map;

/**
 * 制标需求单
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-09 15:43:42
 */
public interface ZbxqdService extends IService<ZbxqdEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

