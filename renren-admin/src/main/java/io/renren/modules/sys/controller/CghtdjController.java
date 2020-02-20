package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.Map;

import io.renren.common.validator.ValidatorUtils;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.qiniu.linking.model.SaveasReply;

import io.renren.modules.sys.entity.CghtdjEntity;
import io.renren.modules.sys.entity.CgqdEntity;
import io.renren.modules.sys.entity.XmtbqdEntity;
import io.renren.modules.sys.service.CghtdjService;
import io.renren.modules.sys.service.CgqdService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 采购合同登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:23:03
 */
@RestController
@RequestMapping("sys/cghtdj")
public class CghtdjController {
    @Autowired
    private CghtdjService cghtdjService;
    @Autowired
    CgqdService cgqdService;
    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:cghtdj:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = cghtdjService.queryPage(params);

        return R.ok().put("page", page);
    }
    
    @RequestMapping("/saveqd")
    @ResponseBody
    public String save(@RequestBody XmtbqdEntity[] xmtbqdEntities){
    	for(XmtbqdEntity x:xmtbqdEntities){
    		Long htid= x.getHtId();
        	Long qdid= x.getXmtbqdId();
        	CgqdEntity cgqdEntity=new CgqdEntity();
        	cgqdEntity.setCghtdjId(htid);
        	cgqdEntity.setXmtbqdId(qdid);
        	cgqdService.save(cgqdEntity);
    	}
    
    	return "OK";
    }
    
    @RequestMapping("/gethtid")
    @ResponseBody
    public CghtdjEntity gethtid(){
    	Long long1=cghtdjService.getmaxid();
    	Long res;
    	if(long1==null){
    		res=(long) 1;
    	}else{
    		res=long1+1;
    	}
    	
    	CghtdjEntity entity=new CghtdjEntity();
    	entity.setCghtdjId(res);
    	return entity;
    }
    //获取编号
    @RequestMapping("/getxh")
    @ResponseBody
    public CghtdjEntity getCount(){
    	Integer xh=cghtdjService.count()+1;
    	String res="-";
    	if((xh+"").length()==1){
    		res+="000"+xh;
    	}else if((xh+"").length()==2){
    		res+="00"+xh;
    	}else if((xh+"").length()==3){
    		res+="0"+xh;
    	}else if((xh+"").length()==4){
    		res+=""+xh;
    	}
    	CghtdjEntity cghtdjEntity=new CghtdjEntity();
    	cghtdjEntity.setHtbh(res);
    	return cghtdjEntity;
    }
    /**
     * 信息
     */
    @RequestMapping("/info/{cghtdjId}")
    @RequiresPermissions("sys:cghtdj:info")
    public R info(@PathVariable("cghtdjId") Long cghtdjId){
        CghtdjEntity cghtdj = cghtdjService.getById(cghtdjId);
      
        return R.ok().put("cghtdj", cghtdj);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:cghtdj:save")
    public R save(@RequestBody CghtdjEntity cghtdj){
        cghtdjService.save(cghtdj);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:cghtdj:update")
    public R update(@RequestBody CghtdjEntity cghtdj){
        ValidatorUtils.validateEntity(cghtdj);
        cghtdjService.updateById(cghtdj);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:cghtdj:delete")
    public R delete(@RequestBody Long[] cghtdjIds){
        cghtdjService.removeByIds(Arrays.asList(cghtdjIds));

        return R.ok();
    }

}
