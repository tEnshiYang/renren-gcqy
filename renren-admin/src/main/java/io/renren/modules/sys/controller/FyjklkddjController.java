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

import io.renren.modules.sys.entity.FyjklkddjEntity;
import io.renren.modules.sys.service.FyjklkddjService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 来款单登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:14:41
 */
@RestController
@RequestMapping("sys/fyjklkddj")
public class FyjklkddjController {
    @Autowired
    private FyjklkddjService fyjklkddjService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:fyjklkddj:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = fyjklkddjService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{fyjklkddjId}")
    @RequiresPermissions("sys:fyjklkddj:info")
    public R info(@PathVariable("fyjklkddjId") Long fyjklkddjId){
        FyjklkddjEntity fyjklkddj = fyjklkddjService.getById(fyjklkddjId);

        return R.ok().put("fyjklkddj", fyjklkddj);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:fyjklkddj:save")
    public R save(@RequestBody FyjklkddjEntity fyjklkddj){
        fyjklkddjService.save(fyjklkddj);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:fyjklkddj:update")
    public R update(@RequestBody FyjklkddjEntity fyjklkddj){
        ValidatorUtils.validateEntity(fyjklkddj);
        fyjklkddjService.updateById(fyjklkddj);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:fyjklkddj:delete")
    public R delete(@RequestBody Long[] fyjklkddjIds){
        fyjklkddjService.removeByIds(Arrays.asList(fyjklkddjIds));

        return R.ok();
    }

}
