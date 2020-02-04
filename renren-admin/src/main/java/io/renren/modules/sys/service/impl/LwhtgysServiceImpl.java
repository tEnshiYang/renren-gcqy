package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.LwhtgysDao;
import io.renren.modules.sys.entity.LwhtgysEntity;
import io.renren.modules.sys.service.LwhtgysService;


@Service("lwhtgysService")
public class LwhtgysServiceImpl extends ServiceImpl<LwhtgysDao, LwhtgysEntity> implements LwhtgysService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String gysmc = (String)params.get("gysmc");
        String qrr = (String)params.get("qrr");

        IPage<LwhtgysEntity> page = this.page(
                new Query<LwhtgysEntity>().getPage(params),
                new QueryWrapper<LwhtgysEntity>()
                .eq(StringUtils.isNotBlank(gysmc),"gysmc", gysmc)
                .like(StringUtils.isNotBlank(qrr),"qrr", qrr)

        );

        return new PageUtils(page);
    }

}
