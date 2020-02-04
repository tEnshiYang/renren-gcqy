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

import io.renren.modules.sys.entity.GczlEntity;
import io.renren.modules.sys.service.GczlService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 过程资料
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:45:59
 */
@RestController
@RequestMapping("sys/gczl")
public class GczlController {
    @Autowired
    private GczlService gczlService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:gczl:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = gczlService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{gczlId}")
    @RequiresPermissions("sys:gczl:info")
    public R info(@PathVariable("gczlId") Long gczlId){
        GczlEntity gczl = gczlService.getById(gczlId);

        return R.ok().put("gczl", gczl);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:gczl:save")
    public R save(@RequestBody GczlEntity gczl){
        gczlService.save(gczl);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:gczl:update")
    public R update(@RequestBody GczlEntity gczl){
        ValidatorUtils.validateEntity(gczl);
        gczlService.updateById(gczl);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:gczl:delete")
    public R delete(@RequestBody Long[] gczlIds){
        gczlService.removeByIds(Arrays.asList(gczlIds));

        return R.ok();
    }

}
