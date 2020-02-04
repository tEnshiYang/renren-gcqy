package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.YzfpdjEntity;

import java.util.Map;

/**
 * 业主发票登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:52:13
 */
public interface YzfpdjService extends IService<YzfpdjEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

