package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.WjzglDao;
import io.renren.modules.sys.entity.WjzglEntity;
import io.renren.modules.sys.service.WjzglService;


@Service("wjzglService")
public class WjzglServiceImpl extends ServiceImpl<WjzglDao, WjzglEntity> implements WjzglService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
     	  String bh = (String)params.get("bh");
          String xqbm = (String)params.get("xqbm");
    	  String gcmc = (String)params.get("gcmc");
          String xmdabh = (String)params.get("xmdabh");
        IPage<WjzglEntity> page = this.page(
                new Query<WjzglEntity>().getPage(params),
                new QueryWrapper<WjzglEntity>()
                           .like(StringUtils.isNotBlank(bh),"bh", bh)
                .eq(StringUtils.isNotBlank(xqbm),"xqbm", xqbm)
                   .like(StringUtils.isNotBlank(gcmc),"gcmc", gcmc)
                .eq(StringUtils.isNotBlank(xmdabh),"xmdabh", xmdabh)
        );

        return new PageUtils(page);
    }

}
