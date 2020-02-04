package io.renren.modules.sys.controller;

import java.util.Arrays;
import java.util.Date;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;

import freemarker.core.DebugBreak;
import io.renren.common.validator.ValidatorUtils;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.renren.modules.sys.entity.GenzongEntity;
import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.service.GenzongService;
import io.renren.modules.sys.shiro.ShiroUtils;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 项目跟踪监控
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-04 11:34:46
 */
@RestController
@RequestMapping("sys/genzong")
public class GenzongController {
    @Autowired
    private GenzongService genzongService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:genzong:list")
    public R list(@RequestParam Map<String, Object> params){
    	 SysUserEntity user=ShiroUtils.getUserEntity();
         String quanxian=user.getQuanxian();
         System.out.println(user.getUsername());
    	 if(quanxian.equals("负责人")){
         	params.put("jbr", user.getUsername());
         }
        PageUtils page = genzongService.queryPage(params);
       
     
       
//        System.out.println("+++++++++++++");
//        for(Entry<String, Object> entry : params.entrySet()){  
//            System.out.println("Key = "+entry.getKey()+",value="+entry.getValue());  
//        }  
        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{genzongId}")
    @RequiresPermissions("sys:genzong:info")
    public R info(@PathVariable("genzongId") Long genzongId){
        GenzongEntity genzong = genzongService.getById(genzongId);

        return R.ok().put("genzong", genzong);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:genzong:save")
    public R save(@RequestBody GenzongEntity genzong){
//    	String dateString=new Date().toString();
//    	genzong.setSqsj(dateString);
//    	System.out.println("+++++++++++++++++++++");
//    	System.out.println(genzong.getSqsj());
     
        genzongService.save(genzong);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:genzong:update")
    public R update(@RequestBody GenzongEntity genzong){
        ValidatorUtils.validateEntity(genzong);
        genzongService.updateById(genzong);
//        System.out.println("++++++++++++++++++++++++");
//        System.out.println(genzong.getSqsj());
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:genzong:delete")
    public R delete(@RequestBody Long[] genzongIds){
        genzongService.removeByIds(Arrays.asList(genzongIds));

        return R.ok();
    }

}
