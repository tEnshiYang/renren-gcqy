package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.HtbgDao;
import io.renren.modules.sys.entity.HtbgEntity;
import io.renren.modules.sys.service.HtbgService;


@Service("htbgService")
public class HtbgServiceImpl extends ServiceImpl<HtbgDao, HtbgEntity> implements HtbgService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String htbh = (String)params.get("htbh");
        String htmc = (String)params.get("htmc");
        String bgbt = (String)params.get("bgbt");
        String sqrxm = (String)params.get("sqrxm");

    	
        IPage<HtbgEntity> page = this.page(
                new Query<HtbgEntity>().getPage(params),
                new QueryWrapper<HtbgEntity>()
                .eq(StringUtils.isNotBlank(htbh),"htbh", htbh)
                .like(StringUtils.isNotBlank(htmc),"htmc", htmc)
                .eq(StringUtils.isNotBlank(bgbt),"bgbt", bgbt)
                .like(StringUtils.isNotBlank(sqrxm),"sqrxm", sqrxm)

        );

        return new PageUtils(page);
    }

}
