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

import io.renren.modules.sys.entity.BzjfkEntity;
import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.service.BzjfkService;
import io.renren.modules.sys.shiro.ShiroUtils;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 保证金付款
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-10 13:31:36
 */
@RestController
@RequestMapping("sys/bzjfk")
public class BzjfkController {
    @Autowired
    private BzjfkService bzjfkService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:bzjfk:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = bzjfkService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{bzjfkId}")
    @RequiresPermissions("sys:bzjfk:info")
    public R info(@PathVariable("bzjfkId") Long bzjfkId){
        BzjfkEntity bzjfk = bzjfkService.getById(bzjfkId);

        return R.ok().put("bzjfk", bzjfk);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:bzjfk:save")
    public R save(@RequestBody BzjfkEntity bzjfk){
    	String time=ShiroUtils.getNowTime();
    	SysUserEntity userEntity=ShiroUtils.getUserEntity();
    	bzjfk.setCjr(userEntity.getUsername());
    	bzjfk.setCjsj(time);
        bzjfkService.save(bzjfk);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:bzjfk:update")
    public R update(@RequestBody BzjfkEntity bzjfk){
        ValidatorUtils.validateEntity(bzjfk);
        String time=ShiroUtils.getNowTime();
    	SysUserEntity userEntity=ShiroUtils.getUserEntity();
    	bzjfk.setCzr(userEntity.getUsername());
    	bzjfk.setCzsj(time);
        bzjfkService.updateById(bzjfk);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:bzjfk:delete")
    public R delete(@RequestBody Long[] bzjfkIds){
        bzjfkService.removeByIds(Arrays.asList(bzjfkIds));

        return R.ok();
    }

}
