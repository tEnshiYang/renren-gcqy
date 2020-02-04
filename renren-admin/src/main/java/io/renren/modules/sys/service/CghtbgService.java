package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.CghtbgEntity;

import java.util.Map;

/**
 * 采购合同变更
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:18:09
 */
public interface CghtbgService extends IService<CghtbgEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

