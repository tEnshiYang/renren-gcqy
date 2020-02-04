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

import io.renren.modules.sys.entity.ZjwlnbjsEntity;
import io.renren.modules.sys.service.ZjwlnbjsService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 内部结算
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:01:51
 */
@RestController
@RequestMapping("sys/zjwlnbjs")
public class ZjwlnbjsController {
    @Autowired
    private ZjwlnbjsService zjwlnbjsService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:zjwlnbjs:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = zjwlnbjsService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{bzjfkId}")
    @RequiresPermissions("sys:zjwlnbjs:info")
    public R info(@PathVariable("bzjfkId") Long bzjfkId){
        ZjwlnbjsEntity zjwlnbjs = zjwlnbjsService.getById(bzjfkId);

        return R.ok().put("zjwlnbjs", zjwlnbjs);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:zjwlnbjs:save")
    public R save(@RequestBody ZjwlnbjsEntity zjwlnbjs){
        zjwlnbjsService.save(zjwlnbjs);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:zjwlnbjs:update")
    public R update(@RequestBody ZjwlnbjsEntity zjwlnbjs){
        ValidatorUtils.validateEntity(zjwlnbjs);
        zjwlnbjsService.updateById(zjwlnbjs);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:zjwlnbjs:delete")
    public R delete(@RequestBody Long[] bzjfkIds){
        zjwlnbjsService.removeByIds(Arrays.asList(bzjfkIds));

        return R.ok();
    }

}
