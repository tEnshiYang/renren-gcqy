package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.FybxglDao;
import io.renren.modules.sys.entity.FybxglEntity;
import io.renren.modules.sys.service.FybxglService;


@Service("fybxglService")
public class FybxglServiceImpl extends ServiceImpl<FybxglDao, FybxglEntity> implements FybxglService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
     	  String bxbm = (String)params.get("bxbm");

        IPage<FybxglEntity> page = this.page(
                new Query<FybxglEntity>().getPage(params),
                new QueryWrapper<FybxglEntity>()
                .eq(StringUtils.isNotBlank(bxbm),"bxbm", bxbm)

        );

        return new PageUtils(page);
    }

}
