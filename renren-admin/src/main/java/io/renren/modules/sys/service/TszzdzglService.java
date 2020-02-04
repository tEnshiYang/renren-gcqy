package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.TszzdzglEntity;

import java.util.Map;

/**
 * 特殊走账对账管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:11:43
 */
public interface TszzdzglService extends IService<TszzdzglEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

