package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.LwfwhtdjDao;
import io.renren.modules.sys.entity.LwfwhtdjEntity;
import io.renren.modules.sys.service.LwfwhtdjService;


@Service("lwfwhtdjService")
public class LwfwhtdjServiceImpl extends ServiceImpl<LwfwhtdjDao, LwfwhtdjEntity> implements LwfwhtdjService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String htmc = (String)params.get("htmc");
        String htbh = (String)params.get("htbh");
        String cjrxm = (String)params.get("cjrxm");

        IPage<LwfwhtdjEntity> page = this.page(
                new Query<LwfwhtdjEntity>().getPage(params),
                new QueryWrapper<LwfwhtdjEntity>()
                .like(StringUtils.isNotBlank(htmc),"htmc", htmc)
                .eq(StringUtils.isNotBlank(htbh),"htbh", htbh)
                .like(StringUtils.isNotBlank(cjrxm),"cjrxm", cjrxm)

        );

        return new PageUtils(page);
    }

}
