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
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.BzjtkEntity;
import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.service.BzjtkService;
import io.renren.modules.sys.shiro.ShiroUtils;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 保证金退款
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-09 15:25:50
 */
@RestController
@RequestMapping("sys/bzjtk")
public class BzjtkController {
    @Autowired
    private BzjtkService bzjtkService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:bzjtk:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = bzjtkService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{bzjtkId}")
    @RequiresPermissions("sys:bzjtk:info")
    public R info(@PathVariable("bzjtkId") Integer bzjtkId){
        BzjtkEntity bzjtk = bzjtkService.getById(bzjtkId);

        return R.ok().put("bzjtk", bzjtk);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:bzjtk:save")
    public R save(@RequestBody BzjtkEntity bzjtk){
    	String time=ShiroUtils.getNowTime();
    	SysUserEntity userEntity=ShiroUtils.getUserEntity();
    	bzjtk.setCjr(userEntity.getUsername());
    	bzjtk.setCjsj(time);
        bzjtkService.save(bzjtk);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:bzjtk:update")
    public R update(@RequestBody BzjtkEntity bzjtk){
        ValidatorUtils.validateEntity(bzjtk);
    	String time=ShiroUtils.getNowTime();
    	SysUserEntity userEntity=ShiroUtils.getUserEntity();
    	bzjtk.setCjr(userEntity.getUsername());
    	bzjtk.setCjsj(time);
        bzjtkService.updateById(bzjtk);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:bzjtk:delete")
    public R delete(@RequestBody Integer[] bzjtkIds){
        bzjtkService.removeByIds(Arrays.asList(bzjtkIds));

        return R.ok();
    }

}
