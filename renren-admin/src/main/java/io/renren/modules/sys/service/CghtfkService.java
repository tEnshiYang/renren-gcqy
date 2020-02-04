package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.CghtfkEntity;

import java.util.Map;

/**
 * 采购合同付款
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:10:19
 */
public interface CghtfkService extends IService<CghtfkEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

