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

import io.renren.modules.sys.entity.WllyjlEntity;
import io.renren.modules.sys.service.WllyjlService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 物料领用记录
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:44:00
 */
@RestController
@RequestMapping("sys/wllyjl")
public class WllyjlController {
    @Autowired
    private WllyjlService wllyjlService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:wllyjl:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = wllyjlService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{wllyjlId}")
    @RequiresPermissions("sys:wllyjl:info")
    public R info(@PathVariable("wllyjlId") Long wllyjlId){
        WllyjlEntity wllyjl = wllyjlService.getById(wllyjlId);

        return R.ok().put("wllyjl", wllyjl);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:wllyjl:save")
    public R save(@RequestBody WllyjlEntity wllyjl){
        wllyjlService.save(wllyjl);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:wllyjl:update")
    public R update(@RequestBody WllyjlEntity wllyjl){
        ValidatorUtils.validateEntity(wllyjl);
        wllyjlService.updateById(wllyjl);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:wllyjl:delete")
    public R delete(@RequestBody Long[] wllyjlIds){
        wllyjlService.removeByIds(Arrays.asList(wllyjlIds));

        return R.ok();
    }

}
