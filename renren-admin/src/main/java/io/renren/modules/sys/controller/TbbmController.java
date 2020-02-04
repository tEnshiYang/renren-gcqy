package io.renren.modules.sys.controller;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import io.renren.common.validator.ValidatorUtils;

import org.apache.commons.collections.map.HashedMap;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import io.renren.modules.sys.entity.SysDeptEntity;
import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.entity.TbbmEntity;
import io.renren.modules.sys.entity.XmEntity;
import io.renren.modules.sys.service.TbbmService;
import io.renren.modules.sys.service.impl.SysDeptServiceImpl;
import io.renren.modules.sys.shiro.ShiroUtils;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 投标报名管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-08 16:28:36
 */
@RestController
@RequestMapping("sys/tbbm")
public class TbbmController {
    @Autowired
    private TbbmService tbbmService;
    @Autowired
    private SysDeptServiceImpl deptService;
    /**
     * 列表 SysDeptServiceImpl
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:tbbm:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = tbbmService.queryPage(params);

        return R.ok().put("page", page);
    }

    @RequestMapping(value = "/fileUp", method = RequestMethod.POST)
    @ResponseBody
    public String uploadMult(HttpServletRequest request) {
    
    	  // 转型为MultipartHttpRequest：   
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        // 获得文件：   
      
	   	 String xmId=request.getParameter("xmId").toString();
		
		 TbbmEntity tbbmEntity=tbbmService.getById(xmId);
		 System.out.println("******entity*************");
		 System.out.println(tbbmEntity);
        List<MultipartFile> files = multipartRequest.getFiles("file1");
        List<MultipartFile> files2 = multipartRequest.getFiles("file2");
        List<MultipartFile> files3 = multipartRequest.getFiles("file3");
        List<MultipartFile> files4 = multipartRequest.getFiles("file4");
        List<MultipartFile> files5 = multipartRequest.getFiles("file5");
        int num=0;
        if (files.isEmpty()) {
            return "false";
        }
        num++;
        if(!files2.isEmpty()){
        	files.add(multipartRequest.getFiles("file2").get(0));
        	 num++;
        }
        if(!files3.isEmpty()){
        	files.add( multipartRequest.getFiles("file3").get(0));
        	 num++;
        }
        if(!files4.isEmpty()){
        	files.add( multipartRequest.getFiles("file4").get(0));
        	 num++;
        }
        if(!files5.isEmpty()){
        	files.add( multipartRequest.getFiles("file5").get(0));
        	 num++;
        }
     
       
        String filePath="";
        String path = "F:/test/tbbm";

        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();
            int size = (int) file.getSize();
            System.out.println(fileName + "-->" + size);

            if (file.isEmpty()) {
                return "false";
            } else {
            	filePath+=path + "/" + fileName+"&";
                File dest = new File(path + "/" + fileName);
                if (!dest.getParentFile().exists()) { // 判断文件父目录是否存在
                    dest.getParentFile().mkdir();
                }
                try {
                    file.transferTo(dest);
                } catch (Exception e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                    return "false";
                }
            }
        }
        tbbmEntity.setFilepath(filePath);
        tbbmService.updateById(tbbmEntity);
        return "true";
    }
    /**
     * 信息
     */
    @RequestMapping("/info/{tbbmId}")
    @RequiresPermissions("sys:tbbm:info")
    public R info(@PathVariable("tbbmId") Integer tbbmId){
        TbbmEntity tbbm = tbbmService.getById(tbbmId);

        return R.ok().put("tbbm", tbbm);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:tbbm:save")
    public R save(@RequestBody TbbmEntity tbbm){
       
    	//获取部门名称
        SysUserEntity user=ShiroUtils.getUserEntity();
        Long deptid=user.getDeptId();
        Map<String, Object> params=new HashedMap();
        params.put("deptId", deptid);
        SysDeptEntity dept=deptService.queryList(params).get(0);
        System.out.println("00000000000000");
        System.out.println(dept);
        tbbm.setBmmc(dept.getName());
        
        tbbmService.save(tbbm);
        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:tbbm:update")
    public R update(@RequestBody TbbmEntity tbbm){
        ValidatorUtils.validateEntity(tbbm);
        tbbmService.updateById(tbbm);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:tbbm:delete")
    public R delete(@RequestBody Integer[] tbbmIds){
        tbbmService.removeByIds(Arrays.asList(tbbmIds));

        return R.ok();
    }

}
