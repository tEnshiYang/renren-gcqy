package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.YzdwglDao;
import io.renren.modules.sys.entity.YzdwglEntity;
import io.renren.modules.sys.service.YzdwglService;


@Service("yzdwglService")
public class YzdwglServiceImpl extends ServiceImpl<YzdwglDao, YzdwglEntity> implements YzdwglService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String gsmc = (String)params.get("gsmc");
     
        IPage<YzdwglEntity> page = this.page(
                new Query<YzdwglEntity>().getPage(params),
                new QueryWrapper<YzdwglEntity>()
                .eq(StringUtils.isNotBlank(gsmc),"gsmc", gsmc)
                
        );

        return new PageUtils(page);
    }

}
