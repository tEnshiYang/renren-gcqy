package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.ZjwljkdjEntity;

import java.util.Map;

/**
 * 借款登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:57:56
 */
public interface ZjwljkdjService extends IService<ZjwljkdjEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

