package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.LwfwhtzfEntity;

import java.util.Map;

/**
 * 劳务服务合同作废
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:25:22
 */
public interface LwfwhtzfService extends IService<LwfwhtzfEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

