package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.TbgzsqDao;
import io.renren.modules.sys.entity.TbgzsqEntity;
import io.renren.modules.sys.service.TbgzsqService;


@Service("tbgzsqService")
public class TbgzsqServiceImpl extends ServiceImpl<TbgzsqDao, TbgzsqEntity> implements TbgzsqService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String xmmc = (String)params.get("xmmc");
        String tbbzj = (String)params.get("tbbzj");
        IPage<TbgzsqEntity> page = this.page(
                new Query<TbgzsqEntity>().getPage(params),
                new QueryWrapper<TbgzsqEntity>()
                 .eq(StringUtils.isNotBlank(xmmc),"xmmc", xmmc)
                .like(StringUtils.isNotBlank(tbbzj),"tbbzj", tbbzj)
        );

        return new PageUtils(page);
    }

}
