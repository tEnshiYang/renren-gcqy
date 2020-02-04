package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.BzjtkDao;
import io.renren.modules.sys.entity.BzjtkEntity;
import io.renren.modules.sys.service.BzjtkService;


@Service("bzjtkService")
public class BzjtkServiceImpl extends ServiceImpl<BzjtkDao, BzjtkEntity> implements BzjtkService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String sqbm = (String)params.get("sqbm");
        String xmmc = (String)params.get("xmmc");
        String hkdw = (String)params.get("hkdw");

    	
        IPage<BzjtkEntity> page = this.page(
                new Query<BzjtkEntity>().getPage(params),
                new QueryWrapper<BzjtkEntity>()
                .like(StringUtils.isNotBlank(xmmc),"xmmc", xmmc)
                .eq(StringUtils.isNotBlank(sqbm),"sqbm", sqbm)
                .like(StringUtils.isNotBlank(hkdw),"hkdw", hkdw)

        );

        return new PageUtils(page);
    }

}
