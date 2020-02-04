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

import io.renren.modules.sys.entity.ZjwlbmjjsEntity;
import io.renren.modules.sys.service.ZjwlbmjjsService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 部门间结算
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:59:53
 */
@RestController
@RequestMapping("sys/zjwlbmjjs")
public class ZjwlbmjjsController {
    @Autowired
    private ZjwlbmjjsService zjwlbmjjsService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:zjwlbmjjs:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = zjwlbmjjsService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{zjwlbmjjsId}")
    @RequiresPermissions("sys:zjwlbmjjs:info")
    public R info(@PathVariable("zjwlbmjjsId") Long zjwlbmjjsId){
        ZjwlbmjjsEntity zjwlbmjjs = zjwlbmjjsService.getById(zjwlbmjjsId);

        return R.ok().put("zjwlbmjjs", zjwlbmjjs);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:zjwlbmjjs:save")
    public R save(@RequestBody ZjwlbmjjsEntity zjwlbmjjs){
        zjwlbmjjsService.save(zjwlbmjjs);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:zjwlbmjjs:update")
    public R update(@RequestBody ZjwlbmjjsEntity zjwlbmjjs){
        ValidatorUtils.validateEntity(zjwlbmjjs);
        zjwlbmjjsService.updateById(zjwlbmjjs);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:zjwlbmjjs:delete")
    public R delete(@RequestBody Long[] zjwlbmjjsIds){
        zjwlbmjjsService.removeByIds(Arrays.asList(zjwlbmjjsIds));

        return R.ok();
    }

}
