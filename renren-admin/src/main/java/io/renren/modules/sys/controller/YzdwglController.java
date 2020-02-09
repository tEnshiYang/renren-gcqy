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

import io.renren.modules.sys.entity.YzdwglEntity;
import io.renren.modules.sys.entity.ZbxqdEntity;
import io.renren.modules.sys.service.YzdwglService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 业主单位管理
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 16:55:31
 */
@RestController
@RequestMapping("sys/yzdwgl")
public class YzdwglController {
    @Autowired
    private YzdwglService yzdwglService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:yzdwgl:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = yzdwglService.queryPage(params);

        return R.ok().put("page", page);
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{yzdwId}")
    @RequiresPermissions("sys:yzdwgl:info")
    public R info(@PathVariable("yzdwId") Long yzdwId){
        YzdwglEntity yzdwgl = yzdwglService.getById(yzdwId);

        return R.ok().put("yzdwgl", yzdwgl);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:yzdwgl:save")
    public R save(@RequestBody YzdwglEntity yzdwgl){
        yzdwglService.save(yzdwgl);

        return R.ok();
    }
    @RequestMapping(value = "/fileUp", method = RequestMethod.POST)
    @ResponseBody
    public String uploadMult(HttpServletRequest request) {
    
    	  // 转型为MultipartHttpRequest：   
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        // 获得文件：   
      
	   	 String yzdwglId=request.getParameter("yzdwglId").toString();
		
	   	YzdwglEntity yzdwglEntity=yzdwglService.getById(yzdwglId);
		 System.out.println("******entity*************");
		 System.out.println(yzdwglEntity);
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
        String path = "F:/test/yzdwgl";

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
        if(yzdwglEntity.getFj()!=null||!yzdwglEntity.getFj().equals("")){
        	filePath=yzdwglEntity.getFj()+filePath;
        }
        yzdwglEntity.setFj(filePath);
        yzdwglService.updateById(yzdwglEntity);
        return "true";
    }
    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:yzdwgl:update")
    public R update(@RequestBody YzdwglEntity yzdwgl){
        ValidatorUtils.validateEntity(yzdwgl);
        yzdwglService.updateById(yzdwgl);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:yzdwgl:delete")
    public R delete(@RequestBody Long[] yzdwIds){
        yzdwglService.removeByIds(Arrays.asList(yzdwIds));

        return R.ok();
    }

}
