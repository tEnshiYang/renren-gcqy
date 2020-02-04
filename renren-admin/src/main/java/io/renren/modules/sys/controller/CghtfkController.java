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

import io.renren.modules.sys.entity.CghtfkEntity;
import io.renren.modules.sys.service.CghtfkService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 采购合同付款
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:10:19
 */
@RestController
@RequestMapping("sys/cghtfk")
public class CghtfkController {
    @Autowired
    private CghtfkService cghtfkService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:cghtfk:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = cghtfkService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{tbCghtfk}")
    @RequiresPermissions("sys:cghtfk:info")
    public R info(@PathVariable("tbCghtfk") Long tbCghtfk){
        CghtfkEntity cghtfk = cghtfkService.getById(tbCghtfk);

        return R.ok().put("cghtfk", cghtfk);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:cghtfk:save")
    public R save(@RequestBody CghtfkEntity cghtfk){
        cghtfkService.save(cghtfk);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:cghtfk:update")
    public R update(@RequestBody CghtfkEntity cghtfk){
        ValidatorUtils.validateEntity(cghtfk);
        cghtfkService.updateById(cghtfk);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:cghtfk:delete")
    public R delete(@RequestBody Long[] tbCghtfks){
        cghtfkService.removeByIds(Arrays.asList(tbCghtfks));

        return R.ok();
    }

}
