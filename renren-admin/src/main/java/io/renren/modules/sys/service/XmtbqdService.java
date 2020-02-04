package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.XmtbqdEntity;

import java.util.Map;

/**
 * 项目投标清单
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:29:31
 */
public interface XmtbqdService extends IService<XmtbqdEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

