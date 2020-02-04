package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.HkdjEntity;

import java.util.Map;

/**
 * 还款登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:39:17
 */
public interface HkdjService extends IService<HkdjEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

