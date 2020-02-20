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

import io.renren.modules.sys.entity.LwfwhtfkEntity;
import io.renren.modules.sys.entity.LwfwhtzfEntity;
import io.renren.modules.sys.service.LwfwhtzfService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 劳务服务合同作废
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:25:22
 */
@RestController
@RequestMapping("sys/lwfwhtzf")
public class LwfwhtzfController {
    @Autowired
    private LwfwhtzfService lwfwhtzfService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:lwfwhtzf:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = lwfwhtzfService.queryPage(params);

        return R.ok().put("page", page);
    }
    @RequestMapping("/getxh")
    @ResponseBody
    public LwfwhtzfEntity getCount(){
    	Integer xh=lwfwhtzfService.count()+1;
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
    	LwfwhtzfEntity lwfwhtzfEntity=new LwfwhtzfEntity();
    	lwfwhtzfEntity.setZfbh(res);
    	
    	return lwfwhtzfEntity;
    }

    /**
     * 信息
     */
    @RequestMapping("/info/{lwfwhtzfId}")
    @RequiresPermissions("sys:lwfwhtzf:info")
    public R info(@PathVariable("lwfwhtzfId") Long lwfwhtzfId){
        LwfwhtzfEntity lwfwhtzf = lwfwhtzfService.getById(lwfwhtzfId);

        return R.ok().put("lwfwhtzf", lwfwhtzf);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:lwfwhtzf:save")
    public R save(@RequestBody LwfwhtzfEntity lwfwhtzf){
        lwfwhtzfService.save(lwfwhtzf);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:lwfwhtzf:update")
    public R update(@RequestBody LwfwhtzfEntity lwfwhtzf){
        ValidatorUtils.validateEntity(lwfwhtzf);
        lwfwhtzfService.updateById(lwfwhtzf);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:lwfwhtzf:delete")
    public R delete(@RequestBody Long[] lwfwhtzfIds){
        lwfwhtzfService.removeByIds(Arrays.asList(lwfwhtzfIds));

        return R.ok();
    }

}
