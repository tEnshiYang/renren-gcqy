package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.CghtzfDao;
import io.renren.modules.sys.entity.CghtzfEntity;
import io.renren.modules.sys.service.CghtzfService;


@Service("cghtzfService")
public class CghtzfServiceImpl extends ServiceImpl<CghtzfDao, CghtzfEntity> implements CghtzfService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String htmc = (String)params.get("htmc");
        String zfbh = (String)params.get("zfbh");
        String sqrxm = (String)params.get("sqrxm");

        IPage<CghtzfEntity> page = this.page(
                new Query<CghtzfEntity>().getPage(params),
                new QueryWrapper<CghtzfEntity>()
                .eq(StringUtils.isNotBlank(htmc),"htmc", htmc)
                .like(StringUtils.isNotBlank(zfbh),"zfbh", zfbh)
                .eq(StringUtils.isNotBlank(sqrxm),"sqrxm", sqrxm)

                
        );

        return new PageUtils(page);
    }

}
