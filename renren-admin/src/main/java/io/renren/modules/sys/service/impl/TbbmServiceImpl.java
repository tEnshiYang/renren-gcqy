package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.TbbmDao;
import io.renren.modules.sys.entity.TbbmEntity;
import io.renren.modules.sys.service.TbbmService;


@Service("tbbmService")
public class TbbmServiceImpl extends ServiceImpl<TbbmDao, TbbmEntity> implements TbbmService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String xmmc = (String)params.get("xmmc");
        String sqr = (String)params.get("sqr");
        String tbfs = (String)params.get("tbfs");

        IPage<TbbmEntity> page = this.page(
                new Query<TbbmEntity>().getPage(params),
                new QueryWrapper<TbbmEntity>()
                .like(StringUtils.isNotBlank(xmmc),"xmmc", xmmc)
                .eq(StringUtils.isNotBlank(sqr),"sqr", sqr)
                .like(StringUtils.isNotBlank(tbfs),"tbfs", tbfs)
        );

        return new PageUtils(page);
    }

}
