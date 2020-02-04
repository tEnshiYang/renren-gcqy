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

import io.renren.modules.sys.entity.FybxglEntity;
import io.renren.modules.sys.service.FybxglService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 费用报销管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:03:12
 */
@RestController
@RequestMapping("sys/fybxgl")
public class FybxglController {
    @Autowired
    private FybxglService fybxglService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:fybxgl:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = fybxglService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{fybxglId}")
    @RequiresPermissions("sys:fybxgl:info")
    public R info(@PathVariable("fybxglId") Long fybxglId){
        FybxglEntity fybxgl = fybxglService.getById(fybxglId);

        return R.ok().put("fybxgl", fybxgl);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:fybxgl:save")
    public R save(@RequestBody FybxglEntity fybxgl){
        fybxglService.save(fybxgl);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:fybxgl:update")
    public R update(@RequestBody FybxglEntity fybxgl){
        ValidatorUtils.validateEntity(fybxgl);
        fybxglService.updateById(fybxgl);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:fybxgl:delete")
    public R delete(@RequestBody Long[] fybxglIds){
        fybxglService.removeByIds(Arrays.asList(fybxglIds));

        return R.ok();
    }

}
