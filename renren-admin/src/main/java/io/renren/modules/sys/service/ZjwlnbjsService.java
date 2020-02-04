package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.ZjwlnbjsEntity;

import java.util.Map;

/**
 * 内部结算
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:01:51
 */
public interface ZjwlnbjsService extends IService<ZjwlnbjsEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

