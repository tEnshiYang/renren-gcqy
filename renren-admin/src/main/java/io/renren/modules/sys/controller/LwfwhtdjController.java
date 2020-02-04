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

import io.renren.modules.sys.entity.LwfwhtdjEntity;
import io.renren.modules.sys.service.LwfwhtdjService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 劳务服务合同登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:17:14
 */
@RestController
@RequestMapping("sys/lwfwhtdj")
public class LwfwhtdjController {
    @Autowired
    private LwfwhtdjService lwfwhtdjService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:lwfwhtdj:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = lwfwhtdjService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{lwfwhtId}")
    @RequiresPermissions("sys:lwfwhtdj:info")
    public R info(@PathVariable("lwfwhtId") Long lwfwhtId){
        LwfwhtdjEntity lwfwhtdj = lwfwhtdjService.getById(lwfwhtId);

        return R.ok().put("lwfwhtdj", lwfwhtdj);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:lwfwhtdj:save")
    public R save(@RequestBody LwfwhtdjEntity lwfwhtdj){
        lwfwhtdjService.save(lwfwhtdj);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:lwfwhtdj:update")
    public R update(@RequestBody LwfwhtdjEntity lwfwhtdj){
        ValidatorUtils.validateEntity(lwfwhtdj);
        lwfwhtdjService.updateById(lwfwhtdj);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:lwfwhtdj:delete")
    public R delete(@RequestBody Long[] lwfwhtIds){
        lwfwhtdjService.removeByIds(Arrays.asList(lwfwhtIds));

        return R.ok();
    }

}
