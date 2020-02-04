package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.LwfwhtbgDao;
import io.renren.modules.sys.entity.LwfwhtbgEntity;
import io.renren.modules.sys.service.LwfwhtbgService;


@Service("lwfwhtbgService")
public class LwfwhtbgServiceImpl extends ServiceImpl<LwfwhtbgDao, LwfwhtbgEntity> implements LwfwhtbgService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String htmc = (String)params.get("htmc");
        String htbh = (String)params.get("htbh");
        String bgbt = (String)params.get("bgbt");
        String sqrxm = (String)params.get("sqrxm");
        IPage<LwfwhtbgEntity> page = this.page(
                new Query<LwfwhtbgEntity>().getPage(params),
                new QueryWrapper<LwfwhtbgEntity>()
                .like(StringUtils.isNotBlank(htmc),"htmc", htmc)
                .eq(StringUtils.isNotBlank(htbh),"htbh", htbh)
                .like(StringUtils.isNotBlank(bgbt),"bgbt", bgbt)
                .eq(StringUtils.isNotBlank(sqrxm),"sqrxm", sqrxm)

        );

        return new PageUtils(page);
    }

}
