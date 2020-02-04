package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.LwfwhtfkEntity;

import java.util.Map;

/**
 * 劳务服务合同付款
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:22:57
 */
public interface LwfwhtfkService extends IService<LwfwhtfkEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

