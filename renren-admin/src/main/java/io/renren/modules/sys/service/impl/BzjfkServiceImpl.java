package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.BzjfkDao;
import io.renren.modules.sys.entity.BzjfkEntity;
import io.renren.modules.sys.service.BzjfkService;


@Service("bzjfkService")
public class BzjfkServiceImpl extends ServiceImpl<BzjfkDao, BzjfkEntity> implements BzjfkService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
    	  String fkfs = (String)params.get("fkfs");
          String skdw = (String)params.get("skdw");
        IPage<BzjfkEntity> page = this.page(
                new Query<BzjfkEntity>().getPage(params),
                new QueryWrapper<BzjfkEntity>()
                 .like(StringUtils.isNotBlank(fkfs),"fkfs", fkfs)
                .eq(StringUtils.isNotBlank(skdw),"skdw", skdw)
        );

        return new PageUtils(page);
    }

}
