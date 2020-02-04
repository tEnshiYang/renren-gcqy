package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.ZbxqdDao;
import io.renren.modules.sys.entity.ZbxqdEntity;
import io.renren.modules.sys.service.ZbxqdService;


@Service("zbxqdService")
public class ZbxqdServiceImpl extends ServiceImpl<ZbxqdDao, ZbxqdEntity> implements ZbxqdService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
    	  String jzzt = (String)params.get("jzzt");
          String xmmc = (String)params.get("xmmc"); 
          String sqbm = (String)params.get("sqbm");
          String tblx = (String)params.get("tblx");
        IPage<ZbxqdEntity> page = this.page(
                new Query<ZbxqdEntity>().getPage(params),
                new QueryWrapper<ZbxqdEntity>()
                 .like(StringUtils.isNotBlank(jzzt),"jzzt", jzzt)
                .eq(StringUtils.isNotBlank(sqbm),"sqbm", sqbm)
                 .like(StringUtils.isNotBlank(xmmc),"xmmc", xmmc)
                .eq(StringUtils.isNotBlank(tblx),"tblx", tblx)
        );

        return new PageUtils(page);
    }

}
