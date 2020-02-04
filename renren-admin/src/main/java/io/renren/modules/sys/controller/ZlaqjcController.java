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

import io.renren.modules.sys.entity.ZlaqjcEntity;
import io.renren.modules.sys.service.ZlaqjcService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 质量安全检查
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:47:23
 */
@RestController
@RequestMapping("sys/zlaqjc")
public class ZlaqjcController {
    @Autowired
    private ZlaqjcService zlaqjcService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:zlaqjc:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = zlaqjcService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{zlaqjcId}")
    @RequiresPermissions("sys:zlaqjc:info")
    public R info(@PathVariable("zlaqjcId") Long zlaqjcId){
        ZlaqjcEntity zlaqjc = zlaqjcService.getById(zlaqjcId);

        return R.ok().put("zlaqjc", zlaqjc);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:zlaqjc:save")
    public R save(@RequestBody ZlaqjcEntity zlaqjc){
        zlaqjcService.save(zlaqjc);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:zlaqjc:update")
    public R update(@RequestBody ZlaqjcEntity zlaqjc){
        ValidatorUtils.validateEntity(zlaqjc);
        zlaqjcService.updateById(zlaqjc);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:zlaqjc:delete")
    public R delete(@RequestBody Long[] zlaqjcIds){
        zlaqjcService.removeByIds(Arrays.asList(zlaqjcIds));

        return R.ok();
    }

}
