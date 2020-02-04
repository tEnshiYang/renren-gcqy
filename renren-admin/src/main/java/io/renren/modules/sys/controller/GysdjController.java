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

import io.renren.modules.sys.entity.GysdjEntity;
import io.renren.modules.sys.service.GysdjService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 供应商登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 17:07:01
 */
@RestController
@RequestMapping("sys/gysdj")
public class GysdjController {
    @Autowired
    private GysdjService gysdjService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:gysdj:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = gysdjService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{gysId}")
    @RequiresPermissions("sys:gysdj:info")
    public R info(@PathVariable("gysId") Long gysId){
        GysdjEntity gysdj = gysdjService.getById(gysId);

        return R.ok().put("gysdj", gysdj);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:gysdj:save")
    public R save(@RequestBody GysdjEntity gysdj){
        gysdjService.save(gysdj);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:gysdj:update")
    public R update(@RequestBody GysdjEntity gysdj){
        ValidatorUtils.validateEntity(gysdj);
        gysdjService.updateById(gysdj);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:gysdj:delete")
    public R delete(@RequestBody Long[] gysIds){
        gysdjService.removeByIds(Arrays.asList(gysIds));

        return R.ok();
    }

}
