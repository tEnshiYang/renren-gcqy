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

import io.renren.modules.sys.entity.YzfpdjEntity;
import io.renren.modules.sys.service.YzfpdjService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 业主发票登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:52:13
 */
@RestController
@RequestMapping("sys/yzfpdj")
public class YzfpdjController {
    @Autowired
    private YzfpdjService yzfpdjService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:yzfpdj:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = yzfpdjService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{yzfpdjId}")
    @RequiresPermissions("sys:yzfpdj:info")
    public R info(@PathVariable("yzfpdjId") Long yzfpdjId){
        YzfpdjEntity yzfpdj = yzfpdjService.getById(yzfpdjId);

        return R.ok().put("yzfpdj", yzfpdj);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:yzfpdj:save")
    public R save(@RequestBody YzfpdjEntity yzfpdj){
        yzfpdjService.save(yzfpdj);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:yzfpdj:update")
    public R update(@RequestBody YzfpdjEntity yzfpdj){
        ValidatorUtils.validateEntity(yzfpdj);
        yzfpdjService.updateById(yzfpdj);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:yzfpdj:delete")
    public R delete(@RequestBody Long[] yzfpdjIds){
        yzfpdjService.removeByIds(Arrays.asList(yzfpdjIds));

        return R.ok();
    }

}
