package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.ZjwlnbjsDao;
import io.renren.modules.sys.entity.ZjwlnbjsEntity;
import io.renren.modules.sys.service.ZjwlnbjsService;


@Service("zjwlnbjsService")
public class ZjwlnbjsServiceImpl extends ServiceImpl<ZjwlnbjsDao, ZjwlnbjsEntity> implements ZjwlnbjsService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
     	  String fkbm = (String)params.get("fkbm");
          String fkxm = (String)params.get("fkxm");
    	  String skbm = (String)params.get("skbm");
          String skxm = (String)params.get("skxm");
        IPage<ZjwlnbjsEntity> page = this.page(
                new Query<ZjwlnbjsEntity>().getPage(params),
                new QueryWrapper<ZjwlnbjsEntity>()
                                .like(StringUtils.isNotBlank(fkbm),"fkbm", fkbm)
                .eq(StringUtils.isNotBlank(fkxm),"fkxm", fkxm)
                   .like(StringUtils.isNotBlank(skbm),"skbm", skbm)
                .eq(StringUtils.isNotBlank(skxm),"skxm", skxm)
        );

        return new PageUtils(page);
    }

}
