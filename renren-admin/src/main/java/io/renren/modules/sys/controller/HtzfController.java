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

import io.renren.modules.sys.entity.HtzfEntity;
import io.renren.modules.sys.service.HtzfService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 业主合同作废
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 17:04:12
 */
@RestController
@RequestMapping("sys/htzf")
public class HtzfController {
    @Autowired
    private HtzfService htzfService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:htzf:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = htzfService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{htzfId}")
    @RequiresPermissions("sys:htzf:info")
    public R info(@PathVariable("htzfId") Long htzfId){
        HtzfEntity htzf = htzfService.getById(htzfId);

        return R.ok().put("htzf", htzf);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:htzf:save")
    public R save(@RequestBody HtzfEntity htzf){
        htzfService.save(htzf);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:htzf:update")
    public R update(@RequestBody HtzfEntity htzf){
        ValidatorUtils.validateEntity(htzf);
        htzfService.updateById(htzf);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:htzf:delete")
    public R delete(@RequestBody Long[] htzfIds){
        htzfService.removeByIds(Arrays.asList(htzfIds));

        return R.ok();
    }

}
