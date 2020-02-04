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

import io.renren.modules.sys.entity.GfflmEntity;
import io.renren.modules.sys.service.GfflmService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 供方分类码
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:27:39
 */
@RestController
@RequestMapping("sys/gfflm")
public class GfflmController {
    @Autowired
    private GfflmService gfflmService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:gfflm:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = gfflmService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{gfflmId}")
    @RequiresPermissions("sys:gfflm:info")
    public R info(@PathVariable("gfflmId") Long gfflmId){
        GfflmEntity gfflm = gfflmService.getById(gfflmId);

        return R.ok().put("gfflm", gfflm);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:gfflm:save")
    public R save(@RequestBody GfflmEntity gfflm){
        gfflmService.save(gfflm);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:gfflm:update")
    public R update(@RequestBody GfflmEntity gfflm){
        ValidatorUtils.validateEntity(gfflm);
        gfflmService.updateById(gfflm);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:gfflm:delete")
    public R delete(@RequestBody Long[] gfflmIds){
        gfflmService.removeByIds(Arrays.asList(gfflmIds));

        return R.ok();
    }

}
