package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.HtbgEntity;

import java.util.Map;

/**
 * 业主合同变更
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 17:01:45
 */
public interface HtbgService extends IService<HtbgEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

