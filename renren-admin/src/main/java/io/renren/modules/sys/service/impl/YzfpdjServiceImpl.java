package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.YzfpdjDao;
import io.renren.modules.sys.entity.YzfpdjEntity;
import io.renren.modules.sys.service.YzfpdjService;


@Service("yzfpdjService")
public class YzfpdjServiceImpl extends ServiceImpl<YzfpdjDao, YzfpdjEntity> implements YzfpdjService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<YzfpdjEntity> page = this.page(
                new Query<YzfpdjEntity>().getPage(params),
                new QueryWrapper<YzfpdjEntity>()
        );

        return new PageUtils(page);
    }

}
