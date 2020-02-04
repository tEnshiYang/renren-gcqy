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

import io.renren.modules.sys.entity.HkdjEntity;
import io.renren.modules.sys.service.HkdjService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 还款登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:39:17
 */
@RestController
@RequestMapping("sys/hkdj")
public class HkdjController {
    @Autowired
    private HkdjService hkdjService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:hkdj:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = hkdjService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{hkdjId}")
    @RequiresPermissions("sys:hkdj:info")
    public R info(@PathVariable("hkdjId") Long hkdjId){
        HkdjEntity hkdj = hkdjService.getById(hkdjId);

        return R.ok().put("hkdj", hkdj);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:hkdj:save")
    public R save(@RequestBody HkdjEntity hkdj){
        hkdjService.save(hkdj);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:hkdj:update")
    public R update(@RequestBody HkdjEntity hkdj){
        ValidatorUtils.validateEntity(hkdj);
        hkdjService.updateById(hkdj);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:hkdj:delete")
    public R delete(@RequestBody Long[] hkdjIds){
        hkdjService.removeByIds(Arrays.asList(hkdjIds));

        return R.ok();
    }

}
