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

import io.renren.modules.sys.entity.WjzglEntity;
import io.renren.modules.sys.service.WjzglService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 外经证管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:07:31
 */
@RestController
@RequestMapping("sys/wjzgl")
public class WjzglController {
    @Autowired
    private WjzglService wjzglService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:wjzgl:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = wjzglService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{wjzglId}")
    @RequiresPermissions("sys:wjzgl:info")
    public R info(@PathVariable("wjzglId") Long wjzglId){
        WjzglEntity wjzgl = wjzglService.getById(wjzglId);

        return R.ok().put("wjzgl", wjzgl);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:wjzgl:save")
    public R save(@RequestBody WjzglEntity wjzgl){
        wjzglService.save(wjzgl);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:wjzgl:update")
    public R update(@RequestBody WjzglEntity wjzgl){
        ValidatorUtils.validateEntity(wjzgl);
        wjzglService.updateById(wjzgl);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:wjzgl:delete")
    public R delete(@RequestBody Long[] wjzglIds){
        wjzglService.removeByIds(Arrays.asList(wjzglIds));

        return R.ok();
    }

}
