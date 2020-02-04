package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.CghtfkDao;
import io.renren.modules.sys.entity.CghtfkEntity;
import io.renren.modules.sys.service.CghtfkService;


@Service("cghtfkService")
public class CghtfkServiceImpl extends ServiceImpl<CghtfkDao, CghtfkEntity> implements CghtfkService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String htmc = (String)params.get("htmc");
        String htbh = (String)params.get("htbh");
        String htlx = (String)params.get("htlx");

        IPage<CghtfkEntity> page = this.page(
                new Query<CghtfkEntity>().getPage(params),
                new QueryWrapper<CghtfkEntity>()
                .eq(StringUtils.isNotBlank(htmc),"htmc", htmc)
                .like(StringUtils.isNotBlank(htbh),"htbh", htbh)
                .eq(StringUtils.isNotBlank(htlx),"htlx", htlx)

                
        );

        return new PageUtils(page);
    }

}
