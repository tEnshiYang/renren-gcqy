package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.TbfkglEntity;

import java.util.Map;

/**
 * 投标反馈管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-09 16:25:12
 */
public interface TbfkglService extends IService<TbfkglEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

