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

import io.renren.modules.sys.entity.TszzdzglEntity;
import io.renren.modules.sys.service.TszzdzglService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 特殊走账对账管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:11:43
 */
@RestController
@RequestMapping("sys/tszzdzgl")
public class TszzdzglController {
    @Autowired
    private TszzdzglService tszzdzglService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:tszzdzgl:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = tszzdzglService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{tszzdzglId}")
    @RequiresPermissions("sys:tszzdzgl:info")
    public R info(@PathVariable("tszzdzglId") Long tszzdzglId){
        TszzdzglEntity tszzdzgl = tszzdzglService.getById(tszzdzglId);

        return R.ok().put("tszzdzgl", tszzdzgl);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:tszzdzgl:save")
    public R save(@RequestBody TszzdzglEntity tszzdzgl){
        tszzdzglService.save(tszzdzgl);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:tszzdzgl:update")
    public R update(@RequestBody TszzdzglEntity tszzdzgl){
        ValidatorUtils.validateEntity(tszzdzgl);
        tszzdzglService.updateById(tszzdzgl);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:tszzdzgl:delete")
    public R delete(@RequestBody Long[] tszzdzglIds){
        tszzdzglService.removeByIds(Arrays.asList(tszzdzglIds));

        return R.ok();
    }

}
