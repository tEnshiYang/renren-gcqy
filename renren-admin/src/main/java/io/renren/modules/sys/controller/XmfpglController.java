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

import io.renren.modules.sys.entity.XmfpglEntity;
import io.renren.modules.sys.service.XmfpglService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 项目发票管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:55:41
 */
@RestController
@RequestMapping("sys/xmfpgl")
public class XmfpglController {
    @Autowired
    private XmfpglService xmfpglService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:xmfpgl:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = xmfpglService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{xmfpglId}")
    @RequiresPermissions("sys:xmfpgl:info")
    public R info(@PathVariable("xmfpglId") Long xmfpglId){
        XmfpglEntity xmfpgl = xmfpglService.getById(xmfpglId);

        return R.ok().put("xmfpgl", xmfpgl);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:xmfpgl:save")
    public R save(@RequestBody XmfpglEntity xmfpgl){
        xmfpglService.save(xmfpgl);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:xmfpgl:update")
    public R update(@RequestBody XmfpglEntity xmfpgl){
        ValidatorUtils.validateEntity(xmfpgl);
        xmfpglService.updateById(xmfpgl);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:xmfpgl:delete")
    public R delete(@RequestBody Long[] xmfpglIds){
        xmfpglService.removeByIds(Arrays.asList(xmfpglIds));

        return R.ok();
    }

}
