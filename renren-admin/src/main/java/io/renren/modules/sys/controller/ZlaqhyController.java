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

import io.renren.modules.sys.entity.FileUp;
import io.renren.modules.sys.entity.ZlaqhyEntity;
import io.renren.modules.sys.service.ZlaqhyService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 质量安全会议
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:50:13
 */
@RestController
@RequestMapping("sys/zlaqhy")
public class ZlaqhyController {
    @Autowired
    private ZlaqhyService zlaqhyService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:zlaqhy:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = zlaqhyService.queryPage(params);

        return R.ok().put("page", page);
    }
    @RequestMapping(value = "/fileUp", method = RequestMethod.POST,produces="application/json; charset=utf-8")
    @ResponseBody
    public FileUp uploadMult(HttpServletRequest request) {
    
    	  // 转型为MultipartHttpRequest：   
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        // 获得文件：   
      
	   	 String filepathString=request.getParameter("filename").toString();
		
        List<MultipartFile> files = multipartRequest.getFiles("file1");
        List<MultipartFile> files2 = multipartRequest.getFiles("file2");
        List<MultipartFile> files3 = multipartRequest.getFiles("file3");
        List<MultipartFile> files4 = multipartRequest.getFiles("file4");
        List<MultipartFile> files5 = multipartRequest.getFiles("file5");
        int num=0;
        if (files.isEmpty()) {
            return new FileUp("null", "null");
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
        String path = "F:/test/zlaqhy/"+filepathString;

        for (MultipartFile file : files) {
            String fileName = file.getOriginalFilename();
            int size = (int) file.getSize();
            System.out.println(fileName + "-->" + size);

            if (file.isEmpty()) {
            	
                return new FileUp("null", "null");
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
                    return new FileUp("null", "null");
                }
            }
        }
        FileUp resfile=new FileUp();
        resfile.setFilename(filepathString);
        resfile.setFilepath(filePath);
        return resfile;
    }

    /**
     * 信息
     */
    @RequestMapping("/info/{zlaqhyId}")
    @RequiresPermissions("sys:zlaqhy:info")
    public R info(@PathVariable("zlaqhyId") Long zlaqhyId){
        ZlaqhyEntity zlaqhy = zlaqhyService.getById(zlaqhyId);

        return R.ok().put("zlaqhy", zlaqhy);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:zlaqhy:save")
    public R save(@RequestBody ZlaqhyEntity zlaqhy){
        zlaqhyService.save(zlaqhy);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:zlaqhy:update")
    public R update(@RequestBody ZlaqhyEntity zlaqhy){
        ValidatorUtils.validateEntity(zlaqhy);
        zlaqhyService.updateById(zlaqhy);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:zlaqhy:delete")
    public R delete(@RequestBody Long[] zlaqhyIds){
        zlaqhyService.removeByIds(Arrays.asList(zlaqhyIds));

        return R.ok();
    }

}
