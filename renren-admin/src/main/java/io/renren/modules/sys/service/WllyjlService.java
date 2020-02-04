package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.WllyjlEntity;

import java.util.Map;

/**
 * 物料领用记录
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:44:00
 */
public interface WllyjlService extends IService<WllyjlEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

