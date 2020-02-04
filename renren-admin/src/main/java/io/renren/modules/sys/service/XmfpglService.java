package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.XmfpglEntity;

import java.util.Map;

/**
 * 项目发票管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:55:41
 */
public interface XmfpglService extends IService<XmfpglEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

