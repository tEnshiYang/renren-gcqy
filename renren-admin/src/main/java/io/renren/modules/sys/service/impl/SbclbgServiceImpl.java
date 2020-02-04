package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.SbclbgDao;
import io.renren.modules.sys.entity.SbclbgEntity;
import io.renren.modules.sys.service.SbclbgService;


@Service("sbclbgService")
public class SbclbgServiceImpl extends ServiceImpl<SbclbgDao, SbclbgEntity> implements SbclbgService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
  	  String dh = (String)params.get("dh");
      String bt = (String)params.get("bt");
        IPage<SbclbgEntity> page = this.page(
                new Query<SbclbgEntity>().getPage(params),
                new QueryWrapper<SbclbgEntity>()
                  .like(StringUtils.isNotBlank(dh),"dh", dh)
                .eq(StringUtils.isNotBlank(bt),"bt", bt)
        );

        return new PageUtils(page);
    }

}
