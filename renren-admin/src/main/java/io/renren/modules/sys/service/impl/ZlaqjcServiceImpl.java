package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.ZlaqjcDao;
import io.renren.modules.sys.entity.ZlaqjcEntity;
import io.renren.modules.sys.service.ZlaqjcService;


@Service("zlaqjcService")
public class ZlaqjcServiceImpl extends ServiceImpl<ZlaqjcDao, ZlaqjcEntity> implements ZlaqjcService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
  	  String bh = (String)params.get("bh");
      String wdmc = (String)params.get("wdmc");
	  String zrr = (String)params.get("zrr");
      String spzt = (String)params.get("spzt");
        IPage<ZlaqjcEntity> page = this.page(
                new Query<ZlaqjcEntity>().getPage(params),
                new QueryWrapper<ZlaqjcEntity>()
                   .like(StringUtils.isNotBlank(bh),"bh", bh)
                .eq(StringUtils.isNotBlank(wdmc),"wdmc", wdmc)
                   .like(StringUtils.isNotBlank(zrr),"zrr", zrr)
                .eq(StringUtils.isNotBlank(spzt),"spzt", spzt)
        );

        return new PageUtils(page);
    }

}
