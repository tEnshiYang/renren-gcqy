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

import io.renren.modules.sys.entity.ZlaqhyEntity;
import io.renren.modules.sys.service.ZlaqhyService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 质量安全会议
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:50:13
 */
@RestController
@RequestMapping("sys/zlaqhy")
public class ZlaqhyController {
    @Autowired
    private ZlaqhyService zlaqhyService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:zlaqhy:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = zlaqhyService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{zlaqhyId}")
    @RequiresPermissions("sys:zlaqhy:info")
    public R info(@PathVariable("zlaqhyId") Long zlaqhyId){
        ZlaqhyEntity zlaqhy = zlaqhyService.getById(zlaqhyId);

        return R.ok().put("zlaqhy", zlaqhy);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:zlaqhy:save")
    public R save(@RequestBody ZlaqhyEntity zlaqhy){
        zlaqhyService.save(zlaqhy);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:zlaqhy:update")
    public R update(@RequestBody ZlaqhyEntity zlaqhy){
        ValidatorUtils.validateEntity(zlaqhy);
        zlaqhyService.updateById(zlaqhy);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:zlaqhy:delete")
    public R delete(@RequestBody Long[] zlaqhyIds){
        zlaqhyService.removeByIds(Arrays.asList(zlaqhyIds));

        return R.ok();
    }

}
