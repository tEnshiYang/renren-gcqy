package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.LwfwhtzfDao;
import io.renren.modules.sys.entity.LwfwhtzfEntity;
import io.renren.modules.sys.service.LwfwhtzfService;


@Service("lwfwhtzfService")
public class LwfwhtzfServiceImpl extends ServiceImpl<LwfwhtzfDao, LwfwhtzfEntity> implements LwfwhtzfService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String htmc = (String)params.get("htmc");
        String zfbh = (String)params.get("zfbh");
        String sqrxm = (String)params.get("sqrxm");
        IPage<LwfwhtzfEntity> page = this.page(
                new Query<LwfwhtzfEntity>().getPage(params),
                new QueryWrapper<LwfwhtzfEntity>()
                .like(StringUtils.isNotBlank(htmc),"htmc", htmc)
                .eq(StringUtils.isNotBlank(zfbh),"zfbh", zfbh)
                .like(StringUtils.isNotBlank(sqrxm),"sqrxm", sqrxm)
        );

        return new PageUtils(page);
    }

}
