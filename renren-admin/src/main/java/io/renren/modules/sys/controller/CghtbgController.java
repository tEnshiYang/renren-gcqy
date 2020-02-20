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

import io.renren.modules.sys.entity.CghtbgEntity;
import io.renren.modules.sys.entity.CghtdjEntity;
import io.renren.modules.sys.service.CghtbgService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 采购合同变更
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:18:09
 */
@RestController
@RequestMapping("sys/cghtbg")
public class CghtbgController {
    @Autowired
    private CghtbgService cghtbgService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:cghtbg:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = cghtbgService.queryPage(params);

        return R.ok().put("page", page);
    }

    @RequestMapping("/getnextbh")
    @ResponseBody
    public CghtbgEntity getCount(){
    	Integer xh=cghtbgService.count()+1;
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
    	CghtbgEntity cghtbgEntity=new CghtbgEntity();
    	cghtbgEntity.setBgbh(res);
    	return cghtbgEntity;
    }
    /**
     * 信息
     */
    @RequestMapping("/info/{cghtbgId}")
    @RequiresPermissions("sys:cghtbg:info")
    public R info(@PathVariable("cghtbgId") Long cghtbgId){
        CghtbgEntity cghtbg = cghtbgService.getById(cghtbgId);

        return R.ok().put("cghtbg", cghtbg);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:cghtbg:save")
    public R save(@RequestBody CghtbgEntity cghtbg){
        cghtbgService.save(cghtbg);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:cghtbg:update")
    public R update(@RequestBody CghtbgEntity cghtbg){
        ValidatorUtils.validateEntity(cghtbg);
        cghtbgService.updateById(cghtbg);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:cghtbg:delete")
    public R delete(@RequestBody Long[] cghtbgIds){
        cghtbgService.removeByIds(Arrays.asList(cghtbgIds));

        return R.ok();
    }

}
