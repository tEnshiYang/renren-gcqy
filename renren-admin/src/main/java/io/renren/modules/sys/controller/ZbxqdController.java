package io.renren.modules.sys.controller;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import io.renren.common.validator.ValidatorUtils;

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

import io.renren.modules.sys.entity.SysUserEntity;
import io.renren.modules.sys.entity.XmEntity;
import io.renren.modules.sys.entity.ZbxqdEntity;
import io.renren.modules.sys.service.ZbxqdService;
import io.renren.modules.sys.shiro.ShiroUtils;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 制标需求单
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-09 15:43:42
 */
@RestController
@RequestMapping("sys/zbxqd")
public class ZbxqdController {
    @Autowired
    private ZbxqdService zbxqdService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:zbxqd:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = zbxqdService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{zbxqdId}")
    @RequiresPermissions("sys:zbxqd:info")
    public R info(@PathVariable("zbxqdId") Integer zbxqdId){
        ZbxqdEntity zbxqd = zbxqdService.getById(zbxqdId);

        return R.ok().put("zbxqd", zbxqd);
    }
    
    @RequestMapping(value = "/fileUp", method = RequestMethod.POST)
    @ResponseBody
    public String uploadMult(HttpServletRequest request) {
    
    	  // 转型为MultipartHttpRequest：   
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        // 获得文件：   
      
	   	 String zbxqdId=request.getParameter("zbxqdId").toString();
		
	   	ZbxqdEntity zbxqdEntity=zbxqdService.getById(zbxqdId);
		 System.out.println("******entity*************");
		 System.out.println(zbxqdEntity);
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
        String path = "F:/test/zbxqd";

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
        zbxqdEntity.setFilepath(filePath);
        zbxqdService.updateById(zbxqdEntity);
        return "true";
    }
    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:zbxqd:save")
    public R save(@RequestBody ZbxqdEntity zbxqd){
    	String time=ShiroUtils.getNowTime();
    	SysUserEntity userEntity=ShiroUtils.getUserEntity();
    	zbxqd.setCzr(userEntity.getUsername());
    	zbxqd.setCzsj(time);
        zbxqdService.save(zbxqd);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:zbxqd:update")
    public R update(@RequestBody ZbxqdEntity zbxqd){
        ValidatorUtils.validateEntity(zbxqd);
        String time=ShiroUtils.getNowTime();
    	SysUserEntity userEntity=ShiroUtils.getUserEntity();
    	zbxqd.setCzr(userEntity.getUsername());
    	zbxqd.setCzsj(time);
        zbxqdService.updateById(zbxqd);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:zbxqd:delete")
    public R delete(@RequestBody Integer[] zbxqdIds){
        zbxqdService.removeByIds(Arrays.asList(zbxqdIds));

        return R.ok();
    }

}
