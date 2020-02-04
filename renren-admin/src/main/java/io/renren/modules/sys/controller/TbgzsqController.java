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

import io.renren.modules.sys.entity.TbgzsqEntity;
import io.renren.modules.sys.service.TbgzsqService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 投标盖章申请
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-09 16:12:27
 */
@RestController
@RequestMapping("sys/tbgzsq")
public class TbgzsqController {
    @Autowired
    private TbgzsqService tbgzsqService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:tbgzsq:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = tbgzsqService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{gzsqId}")
    @RequiresPermissions("sys:tbgzsq:info")
    public R info(@PathVariable("gzsqId") Integer gzsqId){
        TbgzsqEntity tbgzsq = tbgzsqService.getById(gzsqId);

        return R.ok().put("tbgzsq", tbgzsq);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:tbgzsq:save")
    public R save(@RequestBody TbgzsqEntity tbgzsq){
        tbgzsqService.save(tbgzsq);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:tbgzsq:update")
    public R update(@RequestBody TbgzsqEntity tbgzsq){
        ValidatorUtils.validateEntity(tbgzsq);
        tbgzsqService.updateById(tbgzsq);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:tbgzsq:delete")
    public R delete(@RequestBody Integer[] gzsqIds){
        tbgzsqService.removeByIds(Arrays.asList(gzsqIds));

        return R.ok();
    }

}
