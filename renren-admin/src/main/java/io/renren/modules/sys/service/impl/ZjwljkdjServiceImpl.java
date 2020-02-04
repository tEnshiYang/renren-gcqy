package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.ZjwljkdjDao;
import io.renren.modules.sys.entity.ZjwljkdjEntity;
import io.renren.modules.sys.service.ZjwljkdjService;


@Service("zjwljkdjService")
public class ZjwljkdjServiceImpl extends ServiceImpl<ZjwljkdjDao, ZjwljkdjEntity> implements ZjwljkdjService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
  	  String bt = (String)params.get("bt");
      String sqr = (String)params.get("sqr");	 
      String jklx = (String)params.get("jklx");
        IPage<ZjwljkdjEntity> page = this.page(
                new Query<ZjwljkdjEntity>().getPage(params),
                new QueryWrapper<ZjwljkdjEntity>()
                 .like(StringUtils.isNotBlank(bt),"bt", bt)
                .eq(StringUtils.isNotBlank(sqr),"sqr", sqr)
                   .like(StringUtils.isNotBlank(jklx),"jklx", jklx)
        );

        return new PageUtils(page);
    }

}
