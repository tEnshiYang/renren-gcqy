package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.HtzfEntity;

import java.util.Map;

/**
 * 业主合同作废
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 17:04:12
 */
public interface HtzfService extends IService<HtzfEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

