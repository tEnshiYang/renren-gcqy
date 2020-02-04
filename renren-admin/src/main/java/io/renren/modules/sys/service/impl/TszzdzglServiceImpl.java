package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.TszzdzglDao;
import io.renren.modules.sys.entity.TszzdzglEntity;
import io.renren.modules.sys.service.TszzdzglService;


@Service("tszzdzglService")
public class TszzdzglServiceImpl extends ServiceImpl<TszzdzglDao, TszzdzglEntity> implements TszzdzglService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
    	  String xmbh = (String)params.get("xmbh");
          String cwbh = (String)params.get("cwbh");
        IPage<TszzdzglEntity> page = this.page(
                new Query<TszzdzglEntity>().getPage(params),
                new QueryWrapper<TszzdzglEntity>()
                    .like(StringUtils.isNotBlank(xmbh),"xmbh", xmbh)
                .eq(StringUtils.isNotBlank(cwbh),"cwbh", cwbh)
        );

        return new PageUtils(page);
    }

}
