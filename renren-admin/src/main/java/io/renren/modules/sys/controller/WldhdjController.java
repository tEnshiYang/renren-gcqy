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

import io.renren.modules.sys.entity.WldhdjEntity;
import io.renren.modules.sys.service.WldhdjService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 物料到货登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:41:30
 */
@RestController
@RequestMapping("sys/wldhdj")
public class WldhdjController {
    @Autowired
    private WldhdjService wldhdjService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:wldhdj:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = wldhdjService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{wldhdjId}")
    @RequiresPermissions("sys:wldhdj:info")
    public R info(@PathVariable("wldhdjId") Long wldhdjId){
        WldhdjEntity wldhdj = wldhdjService.getById(wldhdjId);

        return R.ok().put("wldhdj", wldhdj);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:wldhdj:save")
    public R save(@RequestBody WldhdjEntity wldhdj){
        wldhdjService.save(wldhdj);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:wldhdj:update")
    public R update(@RequestBody WldhdjEntity wldhdj){
        ValidatorUtils.validateEntity(wldhdj);
        wldhdjService.updateById(wldhdj);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:wldhdj:delete")
    public R delete(@RequestBody Long[] wldhdjIds){
        wldhdjService.removeByIds(Arrays.asList(wldhdjIds));

        return R.ok();
    }

}
