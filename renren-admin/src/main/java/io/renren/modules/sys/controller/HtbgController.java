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

import io.renren.modules.sys.entity.HtbgEntity;
import io.renren.modules.sys.service.HtbgService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 业主合同变更
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 17:01:45
 */
@RestController
@RequestMapping("sys/htbg")
public class HtbgController {
    @Autowired
    private HtbgService htbgService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:htbg:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = htbgService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{htbgId}")
    @RequiresPermissions("sys:htbg:info")
    public R info(@PathVariable("htbgId") Long htbgId){
        HtbgEntity htbg = htbgService.getById(htbgId);

        return R.ok().put("htbg", htbg);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:htbg:save")
    public R save(@RequestBody HtbgEntity htbg){
        htbgService.save(htbg);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:htbg:update")
    public R update(@RequestBody HtbgEntity htbg){
        ValidatorUtils.validateEntity(htbg);
        htbgService.updateById(htbg);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:htbg:delete")
    public R delete(@RequestBody Long[] htbgIds){
        htbgService.removeByIds(Arrays.asList(htbgIds));

        return R.ok();
    }

}
