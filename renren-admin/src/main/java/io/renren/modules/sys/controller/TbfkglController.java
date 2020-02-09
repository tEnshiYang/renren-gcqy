package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
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
import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.entity.TbfkglEntity;
import io.renren.modules.sys.service.RwddwService;
import io.renren.modules.sys.service.TbfkglService;
import io.renren.modules.sys.shiro.ShiroUtils;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 投标反馈管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-09 16:25:12
 */
@RestController
@RequestMapping("sys/tbfkgl")
public class TbfkglController {
    @Autowired
    private TbfkglService tbfkglService;

    @Autowired
    private RwddwService rwddwService;
    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:tbfkgl:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = tbfkglService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{tbfkId}")
    @RequiresPermissions("sys:tbfkgl:info")
    public R info(@PathVariable("tbfkId") Integer tbfkId){
        TbfkglEntity tbfkgl = tbfkglService.getById(tbfkId);

        return R.ok().put("tbfkgl", tbfkgl);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:tbfkgl:save")
    public R save(@RequestBody TbfkglEntity tbfkgl){
    	String time=ShiroUtils.getNowTime();
    	SysUserEntity userEntity=ShiroUtils.getUserEntity();
    	tbfkgl.setCzr(userEntity.getUsername());
    	tbfkgl.setCzsj(time);
        tbfkglService.save(tbfkgl);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:tbfkgl:update")
    public R update(@RequestBody TbfkglEntity tbfkgl){
        ValidatorUtils.validateEntity(tbfkgl);
    	String time=ShiroUtils.getNowTime();
    	SysUserEntity userEntity=ShiroUtils.getUserEntity();
    	tbfkgl.setCzr(userEntity.getUsername());
    	tbfkgl.setCzsj(time);
        tbfkglService.updateById(tbfkgl);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:tbfkgl:delete")
    public R delete(@RequestBody Integer[] tbfkIds){
    	  //删除相关入围单位
    	   TbfkglEntity tbfkglEntity=tbfkglService.getById(tbfkIds);
           Map<String, Object> params=new HashMap<>();
       	params.put("xmmc", tbfkglEntity.getXmmc());
           PageUtils page = rwddwService.queryPage(params);
           List<RwddwEntity> list=(List<RwddwEntity>) page.getList();
           for(RwddwEntity r:list){
           	rwddwService.removeById(r.getRwddwId());
           }
        tbfkglService.removeByIds(Arrays.asList(tbfkIds));
      
     
        return R.ok();
    }

}
