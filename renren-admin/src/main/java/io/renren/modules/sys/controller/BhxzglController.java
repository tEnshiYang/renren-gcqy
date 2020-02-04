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

import io.renren.modules.sys.entity.BhxzglEntity;
import io.renren.modules.sys.service.BhxzglService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 保含协助管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:05:54
 */
@RestController
@RequestMapping("sys/bhxzgl")
public class BhxzglController {
    @Autowired
    private BhxzglService bhxzglService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:bhxzgl:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = bhxzglService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{bhxzglId}")
    @RequiresPermissions("sys:bhxzgl:info")
    public R info(@PathVariable("bhxzglId") Long bhxzglId){
        BhxzglEntity bhxzgl = bhxzglService.getById(bhxzglId);

        return R.ok().put("bhxzgl", bhxzgl);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:bhxzgl:save")
    public R save(@RequestBody BhxzglEntity bhxzgl){
        bhxzglService.save(bhxzgl);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:bhxzgl:update")
    public R update(@RequestBody BhxzglEntity bhxzgl){
        ValidatorUtils.validateEntity(bhxzgl);
        bhxzglService.updateById(bhxzgl);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:bhxzgl:delete")
    public R delete(@RequestBody Long[] bhxzglIds){
        bhxzglService.removeByIds(Arrays.asList(bhxzglIds));

        return R.ok();
    }

}
