package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.GysdjDao;
import io.renren.modules.sys.entity.GysdjEntity;
import io.renren.modules.sys.service.GysdjService;


@Service("gysdjService")
public class GysdjServiceImpl extends ServiceImpl<GysdjDao, GysdjEntity> implements GysdjService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String dwmc = (String)params.get("dwmc");

        String qrr = (String)params.get("qrr");

        String cjr = (String)params.get("cjr");

        IPage<GysdjEntity> page = this.page(
                new Query<GysdjEntity>().getPage(params),
                new QueryWrapper<GysdjEntity>()
                .eq(StringUtils.isNotBlank(dwmc),"dwmc", dwmc)
                .like(StringUtils.isNotBlank(qrr),"qrr", qrr)
                .eq(StringUtils.isNotBlank(cjr),"cjr", cjr)

        );

        return new PageUtils(page);
    }

}
