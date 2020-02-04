package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.GfflmDao;
import io.renren.modules.sys.entity.GfflmEntity;
import io.renren.modules.sys.service.GfflmService;


@Service("gfflmService")
public class GfflmServiceImpl extends ServiceImpl<GfflmDao, GfflmEntity> implements GfflmService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
    	  String flmz = (String)params.get("flmz");
          String pxh = (String)params.get("pxh");
        IPage<GfflmEntity> page = this.page(
                new Query<GfflmEntity>().getPage(params),
                new QueryWrapper<GfflmEntity>()
                .like(StringUtils.isNotBlank(flmz),"flmz", flmz)
                .eq(StringUtils.isNotBlank(pxh),"pxh", pxh)
        );

        return new PageUtils(page);
    }

}
