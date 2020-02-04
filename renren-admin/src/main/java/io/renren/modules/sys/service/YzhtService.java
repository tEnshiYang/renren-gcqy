package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.YzhtEntity;

import java.util.Map;

/**
 * 业主合同登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 16:59:30
 */
public interface YzhtService extends IService<YzhtEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

