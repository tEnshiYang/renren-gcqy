package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.CghtzfEntity;

import java.util.Map;

/**
 * 采购合同作废
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:20:02
 */
public interface CghtzfService extends IService<CghtzfEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

