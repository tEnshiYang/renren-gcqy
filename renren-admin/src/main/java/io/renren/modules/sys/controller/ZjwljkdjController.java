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

import io.renren.modules.sys.entity.ZjwljkdjEntity;
import io.renren.modules.sys.service.ZjwljkdjService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 借款登记
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:57:56
 */
@RestController
@RequestMapping("sys/zjwljkdj")
public class ZjwljkdjController {
    @Autowired
    private ZjwljkdjService zjwljkdjService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:zjwljkdj:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = zjwljkdjService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{zjwljkdjId}")
    @RequiresPermissions("sys:zjwljkdj:info")
    public R info(@PathVariable("zjwljkdjId") Long zjwljkdjId){
        ZjwljkdjEntity zjwljkdj = zjwljkdjService.getById(zjwljkdjId);

        return R.ok().put("zjwljkdj", zjwljkdj);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:zjwljkdj:save")
    public R save(@RequestBody ZjwljkdjEntity zjwljkdj){
        zjwljkdjService.save(zjwljkdj);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:zjwljkdj:update")
    public R update(@RequestBody ZjwljkdjEntity zjwljkdj){
        ValidatorUtils.validateEntity(zjwljkdj);
        zjwljkdjService.updateById(zjwljkdj);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:zjwljkdj:delete")
    public R delete(@RequestBody Long[] zjwljkdjIds){
        zjwljkdjService.removeByIds(Arrays.asList(zjwljkdjIds));

        return R.ok();
    }

}
