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

import io.renren.modules.sys.entity.YzdwglEntity;
import io.renren.modules.sys.service.YzdwglService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 业主单位管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 16:55:31
 */
@RestController
@RequestMapping("sys/yzdwgl")
public class YzdwglController {
    @Autowired
    private YzdwglService yzdwglService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:yzdwgl:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = yzdwglService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{yzdwId}")
    @RequiresPermissions("sys:yzdwgl:info")
    public R info(@PathVariable("yzdwId") Long yzdwId){
        YzdwglEntity yzdwgl = yzdwglService.getById(yzdwId);

        return R.ok().put("yzdwgl", yzdwgl);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:yzdwgl:save")
    public R save(@RequestBody YzdwglEntity yzdwgl){
        yzdwglService.save(yzdwgl);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:yzdwgl:update")
    public R update(@RequestBody YzdwglEntity yzdwgl){
        ValidatorUtils.validateEntity(yzdwgl);
        yzdwglService.updateById(yzdwgl);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:yzdwgl:delete")
    public R delete(@RequestBody Long[] yzdwIds){
        yzdwglService.removeByIds(Arrays.asList(yzdwIds));

        return R.ok();
    }

}
