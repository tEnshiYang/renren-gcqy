package io.renren.modules.sys.service;

import com.baomidou.mybatisplus.extension.service.IService;
import io.renren.common.utils.PageUtils;
import io.renren.modules.sys.entity.FybxglEntity;

import java.util.Map;

/**
 * 费用报销管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:03:12
 */
public interface FybxglService extends IService<FybxglEntity> {

    PageUtils queryPage(Map<String, Object> params);
}

