package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.ZjwlbmjjsDao;
import io.renren.modules.sys.entity.ZjwlbmjjsEntity;
import io.renren.modules.sys.service.ZjwlbmjjsService;


@Service("zjwlbmjjsService")
public class ZjwlbmjjsServiceImpl extends ServiceImpl<ZjwlbmjjsDao, ZjwlbmjjsEntity> implements ZjwlbmjjsService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
   	  String fkbm = (String)params.get("fkbm");
      String fkxm = (String)params.get("fkxm");
	  String skbm = (String)params.get("skbm");
      String skxm = (String)params.get("skxm");
        IPage<ZjwlbmjjsEntity> page = this.page(
                new Query<ZjwlbmjjsEntity>().getPage(params),
                new QueryWrapper<ZjwlbmjjsEntity>()
                           .like(StringUtils.isNotBlank(fkbm),"fkbm", fkbm)
                .eq(StringUtils.isNotBlank(fkxm),"fkxm", fkxm)
                   .like(StringUtils.isNotBlank(skbm),"skbm", skbm)
                .eq(StringUtils.isNotBlank(skxm),"skxm", skxm)
        );

        return new PageUtils(page);
    }

}
