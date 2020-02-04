package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.XmtbqdDao;
import io.renren.modules.sys.entity.XmtbqdEntity;
import io.renren.modules.sys.service.XmtbqdService;


@Service("xmtbqdService")
public class XmtbqdServiceImpl extends ServiceImpl<XmtbqdDao, XmtbqdEntity> implements XmtbqdService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
  	  String wpmc = (String)params.get("wpmc");

        IPage<XmtbqdEntity> page = this.page(
                new Query<XmtbqdEntity>().getPage(params),
                new QueryWrapper<XmtbqdEntity>()
                .eq(StringUtils.isNotBlank(wpmc),"wpmc", wpmc)

        );

        return new PageUtils(page);
    }

}
