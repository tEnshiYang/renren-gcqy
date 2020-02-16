package io.renren.modules.sys.service.impl;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;

import io.renren.common.utils.PageUtils;
import io.renren.common.utils.Query;
import io.renren.modules.sys.dao.CghtdjDao;
import io.renren.modules.sys.entity.CghtdjEntity;
import io.renren.modules.sys.service.CghtdjService;


@Service("cghtdjService")
public class CghtdjServiceImpl extends ServiceImpl<CghtdjDao, CghtdjEntity> implements CghtdjService {
	@Autowired
	CghtdjDao cghtdjdao;
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        String htmc = (String)params.get("htmc");
        String htbh = (String)params.get("htbh");
        String htlx = (String)params.get("htlx");

        IPage<CghtdjEntity> page = this.page(
                new Query<CghtdjEntity>().getPage(params),
                new QueryWrapper<CghtdjEntity>()
                .like(StringUtils.isNotBlank(htmc),"htmc", htmc)
                .eq(StringUtils.isNotBlank(htbh),"htbh", htbh)
                .like(StringUtils.isNotBlank(htlx),"htlx", htlx)

        );

        return new PageUtils(page);
    }

	@Override
	public Long getmaxid() {
		// TODO Auto-generated method stub
		return cghtdjdao.getmaxid();
	}

}
