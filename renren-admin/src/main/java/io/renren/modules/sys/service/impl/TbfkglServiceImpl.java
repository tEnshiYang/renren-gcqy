package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.TbfkglDao;
import io.renren.modules.sys.entity.TbfkglEntity;
import io.renren.modules.sys.service.TbfkglService;


@Service("tbfkglService")
public class TbfkglServiceImpl extends ServiceImpl<TbfkglDao, TbfkglEntity> implements TbfkglService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String xmmc = (String)params.get("xmmc");

        IPage<TbfkglEntity> page = this.page(
                new Query<TbfkglEntity>().getPage(params),
                new QueryWrapper<TbfkglEntity>()
                .like(StringUtils.isNotBlank(xmmc),"xmmc", xmmc)

        );

        return new PageUtils(page);
    }

}
