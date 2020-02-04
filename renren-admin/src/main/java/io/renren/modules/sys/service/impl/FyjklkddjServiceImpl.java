package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.FyjklkddjDao;
import io.renren.modules.sys.entity.FyjklkddjEntity;
import io.renren.modules.sys.service.FyjklkddjService;


@Service("fyjklkddjService")
public class FyjklkddjServiceImpl extends ServiceImpl<FyjklkddjDao, FyjklkddjEntity> implements FyjklkddjService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
    	  String xmmc = (String)params.get("xmmc");
          String xmfzr = (String)params.get("xmfzr");
        IPage<FyjklkddjEntity> page = this.page(
                new Query<FyjklkddjEntity>().getPage(params),
                new QueryWrapper<FyjklkddjEntity>()
                   .like(StringUtils.isNotBlank(xmmc),"xmmc", xmmc)
                .eq(StringUtils.isNotBlank(xmfzr),"xmfzr", xmfzr)
        );

        return new PageUtils(page);
    }

}
