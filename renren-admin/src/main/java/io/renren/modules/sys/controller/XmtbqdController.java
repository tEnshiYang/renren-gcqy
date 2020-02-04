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

import io.renren.modules.sys.entity.XmtbqdEntity;
import io.renren.modules.sys.service.XmtbqdService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 项目投标清单
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:29:31
 */
@RestController
@RequestMapping("sys/xmtbqd")
public class XmtbqdController {
    @Autowired
    private XmtbqdService xmtbqdService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:xmtbqd:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = xmtbqdService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{xmtbqdId}")
    @RequiresPermissions("sys:xmtbqd:info")
    public R info(@PathVariable("xmtbqdId") Long xmtbqdId){
        XmtbqdEntity xmtbqd = xmtbqdService.getById(xmtbqdId);

        return R.ok().put("xmtbqd", xmtbqd);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:xmtbqd:save")
    public R save(@RequestBody XmtbqdEntity xmtbqd){
        xmtbqdService.save(xmtbqd);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:xmtbqd:update")
    public R update(@RequestBody XmtbqdEntity xmtbqd){
        ValidatorUtils.validateEntity(xmtbqd);
        xmtbqdService.updateById(xmtbqd);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:xmtbqd:delete")
    public R delete(@RequestBody Long[] xmtbqdIds){
        xmtbqdService.removeByIds(Arrays.asList(xmtbqdIds));

        return R.ok();
    }

}
