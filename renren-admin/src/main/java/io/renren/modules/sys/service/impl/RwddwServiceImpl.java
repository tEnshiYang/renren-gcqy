package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.RwddwDao;
import io.renren.modules.sys.entity.RwddwEntity;
import io.renren.modules.sys.service.RwddwService;


@Service("rwddwService")
public class RwddwServiceImpl extends ServiceImpl<RwddwDao, RwddwEntity> implements RwddwService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
  	  String xmmc = (String)params.get("xmmc");

        IPage<RwddwEntity> page = this.page(
                new Query<RwddwEntity>().getPage(params),
                new QueryWrapper<RwddwEntity>()
                .eq(StringUtils.isNotBlank(xmmc),"xmmc", xmmc)

        );

        return new PageUtils(page);
    }

}
