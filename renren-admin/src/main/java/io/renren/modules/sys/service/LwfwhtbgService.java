package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.LwfwhtbgEntity;

import java.util.Map;

/**
 * 劳务服务合同变更
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:19:47
 */
public interface LwfwhtbgService extends IService<LwfwhtbgEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

