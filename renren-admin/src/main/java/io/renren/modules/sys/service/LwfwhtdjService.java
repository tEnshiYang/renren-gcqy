package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.LwfwhtdjEntity;

import java.util.Map;

/**
 * 劳务服务合同登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:17:14
 */
public interface LwfwhtdjService extends IService<LwfwhtdjEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

