package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Map.Entry;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.Constant;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.XmDao;
import io.renren.modules.sys.entity.SysDeptEntity;
import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.entity.XmEntity;
import io.renren.modules.sys.service.XmService;


@Service("xmService")
public class XmServiceImpl extends ServiceImpl<XmDao, XmEntity> implements XmService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String xmId = (String)params.get("xmId");

         String xmname = (String)params.get("xmname");
        String gcbh = (String)params.get("gcbh");
        System.out.println("+++++++++++++");
        for(Entry<String, Object> entry : params.entrySet()){  
            System.out.println("Key = "+entry.getKey()+",value="+entry.getValue());  
        } 
        IPage<XmEntity> page = this.page(
              
                new Query<XmEntity>().getPage(params),
                new QueryWrapper<XmEntity>()
                .eq(StringUtils.isNotBlank(xmId),"xmId", xmId)
                .like(StringUtils.isNotBlank(xmname),"xmname", xmname)
                .eq(StringUtils.isNotBlank(gcbh),"gcbh", gcbh)
                .apply(params.get(Constant.SQL_FILTER) != null, (String)params.get(Constant.SQL_FILTER))
        );
    

        return new PageUtils(page);
    }

}
