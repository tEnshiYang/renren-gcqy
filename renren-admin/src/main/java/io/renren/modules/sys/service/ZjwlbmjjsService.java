package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.ZjwlbmjjsEntity;

import java.util.Map;

/**
 * 部门间结算
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:59:53
 */
public interface ZjwlbmjjsService extends IService<ZjwlbmjjsEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

