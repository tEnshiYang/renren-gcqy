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

import io.renren.modules.sys.entity.SbclbgEntity;
import io.renren.modules.sys.service.SbclbgService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 设备材料变更
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:32:13
 */
@RestController
@RequestMapping("sys/sbclbg")
public class SbclbgController {
    @Autowired
    private SbclbgService sbclbgService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:sbclbg:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = sbclbgService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{sbclbgId}")
    @RequiresPermissions("sys:sbclbg:info")
    public R info(@PathVariable("sbclbgId") Long sbclbgId){
        SbclbgEntity sbclbg = sbclbgService.getById(sbclbgId);

        return R.ok().put("sbclbg", sbclbg);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:sbclbg:save")
    public R save(@RequestBody SbclbgEntity sbclbg){
        sbclbgService.save(sbclbg);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:sbclbg:update")
    public R update(@RequestBody SbclbgEntity sbclbg){
        ValidatorUtils.validateEntity(sbclbg);
        sbclbgService.updateById(sbclbg);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:sbclbg:delete")
    public R delete(@RequestBody Long[] sbclbgIds){
        sbclbgService.removeByIds(Arrays.asList(sbclbgIds));

        return R.ok();
    }

}
