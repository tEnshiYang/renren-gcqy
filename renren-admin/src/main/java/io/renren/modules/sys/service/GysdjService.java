package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.GysdjEntity;

import java.util.Map;

/**
 * 供应商登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 17:07:01
 */
public interface GysdjService extends IService<GysdjEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

