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

import io.renren.modules.sys.entity.LwfwhtfkEntity;
import io.renren.modules.sys.service.LwfwhtfkService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 劳务服务合同付款
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:22:57
 */
@RestController
@RequestMapping("sys/lwfwhtfk")
public class LwfwhtfkController {
    @Autowired
    private LwfwhtfkService lwfwhtfkService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:lwfwhtfk:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = lwfwhtfkService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{lwfwhtfkId}")
    @RequiresPermissions("sys:lwfwhtfk:info")
    public R info(@PathVariable("lwfwhtfkId") Long lwfwhtfkId){
        LwfwhtfkEntity lwfwhtfk = lwfwhtfkService.getById(lwfwhtfkId);

        return R.ok().put("lwfwhtfk", lwfwhtfk);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:lwfwhtfk:save")
    public R save(@RequestBody LwfwhtfkEntity lwfwhtfk){
        lwfwhtfkService.save(lwfwhtfk);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:lwfwhtfk:update")
    public R update(@RequestBody LwfwhtfkEntity lwfwhtfk){
        ValidatorUtils.validateEntity(lwfwhtfk);
        lwfwhtfkService.updateById(lwfwhtfk);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:lwfwhtfk:delete")
    public R delete(@RequestBody Long[] lwfwhtfkIds){
        lwfwhtfkService.removeByIds(Arrays.asList(lwfwhtfkIds));

        return R.ok();
    }

}
