package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.WllyjlDao;
import io.renren.modules.sys.entity.WllyjlEntity;
import io.renren.modules.sys.service.WllyjlService;


@Service("wllyjlService")
public class WllyjlServiceImpl extends ServiceImpl<WllyjlDao, WllyjlEntity> implements WllyjlService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
  	  String ssxt = (String)params.get("ssxt");
      String lydw = (String)params.get("lydw");
        IPage<WllyjlEntity> page = this.page(
                new Query<WllyjlEntity>().getPage(params),
                new QueryWrapper<WllyjlEntity>()
                 .like(StringUtils.isNotBlank(ssxt),"ssxt", ssxt)
                .eq(StringUtils.isNotBlank(lydw),"lydw", lydw)
        );

        return new PageUtils(page);
    }

}
