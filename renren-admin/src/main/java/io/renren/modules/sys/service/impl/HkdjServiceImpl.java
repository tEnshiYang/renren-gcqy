package io.renren.modules.sys.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;

import io.renren.modules.sys.dao.HkdjDao;
import io.renren.modules.sys.entity.HkdjEntity;
import io.renren.modules.sys.service.HkdjService;


@Service("hkdjService")
public class HkdjServiceImpl extends ServiceImpl<HkdjDao, HkdjEntity> implements HkdjService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        IPage<HkdjEntity> page = this.page(
                new Query<HkdjEntity>().getPage(params),
                new QueryWrapper<HkdjEntity>()
        );

        return new PageUtils(page);
    }

}
