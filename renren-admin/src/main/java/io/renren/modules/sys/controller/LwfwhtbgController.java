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

import io.renren.modules.sys.entity.LwfwhtbgEntity;
import io.renren.modules.sys.entity.LwfwhtdjEntity;
import io.renren.modules.sys.service.LwfwhtbgService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 劳务服务合同变更
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:19:47
 */
@RestController
@RequestMapping("sys/lwfwhtbg")
public class LwfwhtbgController {
    @Autowired
    private LwfwhtbgService lwfwhtbgService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:lwfwhtbg:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = lwfwhtbgService.queryPage(params);

        return R.ok().put("page", page);
    }

    @RequestMapping("/getxh")
    @ResponseBody
    public LwfwhtbgEntity getCount(){
    	Integer xh=lwfwhtbgService.count()+1;
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
    	LwfwhtbgEntity lwfwhtbgEntity=new LwfwhtbgEntity();
    	lwfwhtbgEntity.setBgbh(res);
    	
    	return lwfwhtbgEntity;
    }
    /**
     * 信息
     */
    @RequestMapping("/info/{lwfwhtbgId}")
    @RequiresPermissions("sys:lwfwhtbg:info")
    public R info(@PathVariable("lwfwhtbgId") Long lwfwhtbgId){
        LwfwhtbgEntity lwfwhtbg = lwfwhtbgService.getById(lwfwhtbgId);

        return R.ok().put("lwfwhtbg", lwfwhtbg);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:lwfwhtbg:save")
    public R save(@RequestBody LwfwhtbgEntity lwfwhtbg){
        lwfwhtbgService.save(lwfwhtbg);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:lwfwhtbg:update")
    public R update(@RequestBody LwfwhtbgEntity lwfwhtbg){
        ValidatorUtils.validateEntity(lwfwhtbg);
        lwfwhtbgService.updateById(lwfwhtbg);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:lwfwhtbg:delete")
    public R delete(@RequestBody Long[] lwfwhtbgIds){
        lwfwhtbgService.removeByIds(Arrays.asList(lwfwhtbgIds));

        return R.ok();
    }

}
