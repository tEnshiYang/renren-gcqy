package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.XmEntity;

import java.util.Map;

/**
 * 主项目
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-04 11:11:22
 */
public interface XmService extends IService<XmEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

