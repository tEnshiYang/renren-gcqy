package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.BhxzglDao;
import io.renren.modules.sys.entity.BhxzglEntity;
import io.renren.modules.sys.service.BhxzglService;


@Service("bhxzglService")
public class BhxzglServiceImpl extends ServiceImpl<BhxzglDao, BhxzglEntity> implements BhxzglService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
     	  String bh = (String)params.get("bh");
          String xqbm = (String)params.get("xqbm");
    	  String hth = (String)params.get("hth");
          String gcmc = (String)params.get("gcmc");
        IPage<BhxzglEntity> page = this.page(
                new Query<BhxzglEntity>().getPage(params),
                new QueryWrapper<BhxzglEntity>()
                 .like(StringUtils.isNotBlank(bh),"bh", bh)
                .eq(StringUtils.isNotBlank(xqbm),"xqbm", xqbm)
                   .like(StringUtils.isNotBlank(hth),"hth", hth)
                .eq(StringUtils.isNotBlank(gcmc),"gcmc", gcmc)
        );

        return new PageUtils(page);
    }

}
