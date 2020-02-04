package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.LwhtgysEntity;

import java.util.Map;

/**
 * 劳务合同供应商
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:12:59
 */
public interface LwhtgysService extends IService<LwhtgysEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

