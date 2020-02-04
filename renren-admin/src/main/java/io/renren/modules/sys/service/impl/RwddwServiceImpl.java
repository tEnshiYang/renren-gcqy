package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.RwddwDao;
import io.renren.modules.sys.entity.RwddwEntity;
import io.renren.modules.sys.service.RwddwService;


@Service("rwddwService")
public class RwddwServiceImpl extends ServiceImpl<RwddwDao, RwddwEntity> implements RwddwService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<RwddwEntity> page = this.page(
                new Query<RwddwEntity>().getPage(params),
                new QueryWrapper<RwddwEntity>()
        );

        return new PageUtils(page);
    }

}
