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
import io.renren.modules.sys.dao.GenzongDao;
import io.renren.modules.sys.entity.GenzongEntity;
import io.renren.modules.sys.service.GenzongService;


@Service("genzongService")
public class GenzongServiceImpl extends ServiceImpl<GenzongDao, GenzongEntity> implements GenzongService {

    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String xmname = (String)params.get("xmname");
        String xmbh = (String)params.get("xmbh");
        String jzzk = (String)params.get("jzzk");
        String jbr = (String)params.get("jbr");
        
//      System.out.println("+++++++++++++");
//      for(Entry<String, Object> entry : params.entrySet()){  
//          System.out.println("Key = "+entry.getKey()+",value="+entry.getValue());  
//      }  
        IPage<GenzongEntity> page = this.page(
                new Query<GenzongEntity>().getPage(params),
                new QueryWrapper<GenzongEntity>()
                .like(StringUtils.isNotBlank(xmname),"xmname", xmname)
                .eq(StringUtils.isNotBlank(xmbh),"xmbh", xmbh)
                .like(StringUtils.isNotBlank(jzzk),"jzzk", jzzk)
                .eq(StringUtils.isNotBlank(jbr),"jbr", jbr)
                .apply(params.get(Constant.SQL_FILTER) != null, (String)params.get(Constant.SQL_FILTER))
        );

        return new PageUtils(page);
    }

}
