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

import io.renren.modules.sys.entity.LwhtgysEntity;
import io.renren.modules.sys.service.LwhtgysService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 劳务合同供应商
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:12:59
 */
@RestController
@RequestMapping("sys/lwhtgys")
public class LwhtgysController {
    @Autowired
    private LwhtgysService lwhtgysService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:lwhtgys:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = lwhtgysService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{lwhtgysId}")
    @RequiresPermissions("sys:lwhtgys:info")
    public R info(@PathVariable("lwhtgysId") Long lwhtgysId){
        LwhtgysEntity lwhtgys = lwhtgysService.getById(lwhtgysId);

        return R.ok().put("lwhtgys", lwhtgys);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:lwhtgys:save")
    public R save(@RequestBody LwhtgysEntity lwhtgys){
        lwhtgysService.save(lwhtgys);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:lwhtgys:update")
    public R update(@RequestBody LwhtgysEntity lwhtgys){
        ValidatorUtils.validateEntity(lwhtgys);
        lwhtgysService.updateById(lwhtgys);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:lwhtgys:delete")
    public R delete(@RequestBody Long[] lwhtgysIds){
        lwhtgysService.removeByIds(Arrays.asList(lwhtgysIds));

        return R.ok();
    }

}
