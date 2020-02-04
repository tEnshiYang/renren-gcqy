package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.BzjfkEntity;

import java.util.Map;

/**
 * 保证金付款
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-10 13:31:36
 */
public interface BzjfkService extends IService<BzjfkEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

