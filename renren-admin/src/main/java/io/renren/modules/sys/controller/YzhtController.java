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

import io.renren.modules.sys.entity.YzhtEntity;
import io.renren.modules.sys.service.YzhtService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 业主合同登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 16:59:30
 */
@RestController
@RequestMapping("sys/yzht")
public class YzhtController {
    @Autowired
    private YzhtService yzhtService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:yzht:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = yzhtService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{yzhtId}")
    @RequiresPermissions("sys:yzht:info")
    public R info(@PathVariable("yzhtId") Long yzhtId){
        YzhtEntity yzht = yzhtService.getById(yzhtId);

        return R.ok().put("yzht", yzht);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:yzht:save")
    public R save(@RequestBody YzhtEntity yzht){
        yzhtService.save(yzht);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:yzht:update")
    public R update(@RequestBody YzhtEntity yzht){
        ValidatorUtils.validateEntity(yzht);
        yzhtService.updateById(yzht);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:yzht:delete")
    public R delete(@RequestBody Long[] yzhtIds){
        yzhtService.removeByIds(Arrays.asList(yzhtIds));

        return R.ok();
    }

}
