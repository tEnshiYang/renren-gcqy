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

import io.renren.modules.sys.entity.CghtfkEntity;
import io.renren.modules.sys.entity.CghtzfEntity;
import io.renren.modules.sys.service.CghtzfService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 采购合同作废
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:20:02
 */
@RestController
@RequestMapping("sys/cghtzf")
public class CghtzfController {
    @Autowired
    private CghtzfService cghtzfService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:cghtzf:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = cghtzfService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{cghtzfId}")
    @RequiresPermissions("sys:cghtzf:info")
    public R info(@PathVariable("cghtzfId") Long cghtzfId){
        CghtzfEntity cghtzf = cghtzfService.getById(cghtzfId);

        return R.ok().put("cghtzf", cghtzf);
    }
    @RequestMapping("/getnextbh")
    @ResponseBody
    public CghtzfEntity getCount(){
    	Integer xh=cghtzfService.count()+1;
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
    	CghtzfEntity cghtzfEntity=new CghtzfEntity();
    	cghtzfEntity.setZfbh(res);
    	return cghtzfEntity;
    }
    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:cghtzf:save")
    public R save(@RequestBody CghtzfEntity cghtzf){
        cghtzfService.save(cghtzf);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:cghtzf:update")
    public R update(@RequestBody CghtzfEntity cghtzf){
        ValidatorUtils.validateEntity(cghtzf);
        cghtzfService.updateById(cghtzf);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:cghtzf:delete")
    public R delete(@RequestBody Long[] cghtzfIds){
        cghtzfService.removeByIds(Arrays.asList(cghtzfIds));

        return R.ok();
    }

}
