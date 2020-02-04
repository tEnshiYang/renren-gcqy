package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.ZlaqhyDao;
import io.renren.modules.sys.entity.ZlaqhyEntity;
import io.renren.modules.sys.service.ZlaqhyService;


@Service("zlaqhyService")
public class ZlaqhyServiceImpl extends ServiceImpl<ZlaqhyDao, ZlaqhyEntity> implements ZlaqhyService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
  	  String bh = (String)params.get("bh");
      String wdmc = (String)params.get("wdmc");
	  String zrr = (String)params.get("zrr");
      String spzt = (String)params.get("spzt");
        IPage<ZlaqhyEntity> page = this.page(
                new Query<ZlaqhyEntity>().getPage(params),
                new QueryWrapper<ZlaqhyEntity>()
                        .like(StringUtils.isNotBlank(bh),"bh", bh)
                .eq(StringUtils.isNotBlank(wdmc),"wdmc", wdmc)
                   .like(StringUtils.isNotBlank(zrr),"zrr", zrr)
                .eq(StringUtils.isNotBlank(spzt),"spzt", spzt)
        );

        return new PageUtils(page);
    }

}
