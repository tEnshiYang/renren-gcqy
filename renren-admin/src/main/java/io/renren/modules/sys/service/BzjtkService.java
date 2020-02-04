package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.BzjtkEntity;

import java.util.Map;

/**
 * 保证金退款
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-09 15:25:50
 */
public interface BzjtkService extends IService<BzjtkEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

