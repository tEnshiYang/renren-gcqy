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

import io.renren.modules.sys.entity.CghtdjEntity;
import io.renren.modules.sys.service.CghtdjService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 采购合同登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:23:03
 */
@RestController
@RequestMapping("sys/cghtdj")
public class CghtdjController {
    @Autowired
    private CghtdjService cghtdjService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:cghtdj:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = cghtdjService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{cghtdjId}")
    @RequiresPermissions("sys:cghtdj:info")
    public R info(@PathVariable("cghtdjId") Long cghtdjId){
        CghtdjEntity cghtdj = cghtdjService.getById(cghtdjId);

        return R.ok().put("cghtdj", cghtdj);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:cghtdj:save")
    public R save(@RequestBody CghtdjEntity cghtdj){
        cghtdjService.save(cghtdj);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:cghtdj:update")
    public R update(@RequestBody CghtdjEntity cghtdj){
        ValidatorUtils.validateEntity(cghtdj);
        cghtdjService.updateById(cghtdj);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:cghtdj:delete")
    public R delete(@RequestBody Long[] cghtdjIds){
        cghtdjService.removeByIds(Arrays.asList(cghtdjIds));

        return R.ok();
    }

}
