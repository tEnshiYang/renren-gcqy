package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.GczlDao;
import io.renren.modules.sys.entity.GczlEntity;
import io.renren.modules.sys.service.GczlService;


@Service("gczlService")
public class GczlServiceImpl extends ServiceImpl<GczlDao, GczlEntity> implements GczlService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
  	  String zlmc = (String)params.get("zlmc");

        IPage<GczlEntity> page = this.page(
                new Query<GczlEntity>().getPage(params),
                new QueryWrapper<GczlEntity>()
                .like(StringUtils.isNotBlank(zlmc),"zlmc", zlmc)

        );

        return new PageUtils(page);
    }

}
