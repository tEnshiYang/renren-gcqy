package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.TbgzsqEntity;

import java.util.Map;

/**
 * 投标盖章申请
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-09 16:12:27
 */
public interface TbgzsqService extends IService<TbgzsqEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

