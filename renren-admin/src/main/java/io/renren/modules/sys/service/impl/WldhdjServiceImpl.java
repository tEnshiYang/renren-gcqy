package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.WldhdjDao;
import io.renren.modules.sys.entity.WldhdjEntity;
import io.renren.modules.sys.service.WldhdjService;


@Service("wldhdjService")
public class WldhdjServiceImpl extends ServiceImpl<WldhdjDao, WldhdjEntity> implements WldhdjService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
     	  String htbh = (String)params.get("htbh");
          String htmc = (String)params.get("htmc");
          String fbs = (String)params.get("fbs");

        IPage<WldhdjEntity> page = this.page(
                new Query<WldhdjEntity>().getPage(params),
                new QueryWrapper<WldhdjEntity>()
                   .like(StringUtils.isNotBlank(htbh),"htbh", htbh)
                      .eq(StringUtils.isNotBlank(htmc),"htmc", htmc)
                         .like(StringUtils.isNotBlank(fbs),"fbs", fbs)
        );

        return new PageUtils(page);
    }

}
