package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.XmfpglDao;
import io.renren.modules.sys.entity.XmfpglEntity;
import io.renren.modules.sys.service.XmfpglService;


@Service("xmfpglService")
public class XmfpglServiceImpl extends ServiceImpl<XmfpglDao, XmfpglEntity> implements XmfpglService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String ssxmmc = (String)params.get("ssxmmc");

        IPage<XmfpglEntity> page = this.page(
                new Query<XmfpglEntity>().getPage(params),
                new QueryWrapper<XmfpglEntity>()
                .like(StringUtils.isNotBlank(ssxmmc),"ssxmmc", ssxmmc)

        );

        return new PageUtils(page);
    }

}
