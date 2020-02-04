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

import io.renren.modules.sys.entity.RwddwEntity;
import io.renren.modules.sys.service.RwddwService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 入围的单位
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-02-02 16:46:35
 */
@RestController
@RequestMapping("sys/rwddw")
public class RwddwController {
    @Autowired
    private RwddwService rwddwService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:rwddw:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = rwddwService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{rwddwId}")
   
    public R info(@PathVariable("rwddwId") Integer rwddwId){
        RwddwEntity rwddw = rwddwService.getById(rwddwId);

        return R.ok().put("rwddw", rwddw);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")

    public R save(@RequestBody RwddwEntity rwddw){
        rwddwService.save(rwddw);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:rwddw:update")
    public R update(@RequestBody RwddwEntity rwddw){
        ValidatorUtils.validateEntity(rwddw);
        rwddwService.updateById(rwddw);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    public R delete(@RequestBody Integer[] rwddwIds){
        rwddwService.removeByIds(Arrays.asList(rwddwIds));

        return R.ok();
    }

}
