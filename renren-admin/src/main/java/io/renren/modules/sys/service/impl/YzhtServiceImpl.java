package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.YzhtDao;
import io.renren.modules.sys.entity.YzhtEntity;
import io.renren.modules.sys.service.YzhtService;


@Service("yzhtService")
public class YzhtServiceImpl extends ServiceImpl<YzhtDao, YzhtEntity> implements YzhtService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String ssxmmc = (String)params.get("ssxmmc");

        String htmc = (String)params.get("htmc");
        String dabh = (String)params.get("dabh");

        IPage<YzhtEntity> page = this.page(
                new Query<YzhtEntity>().getPage(params),
                new QueryWrapper<YzhtEntity>()
                 .eq(StringUtils.isNotBlank(ssxmmc),"ssxmmc", ssxmmc)
                  .like(StringUtils.isNotBlank(htmc),"htmc", htmc)
                   .eq(StringUtils.isNotBlank(dabh),"dabh", dabh)
        );

        return new PageUtils(page);
    }

}
