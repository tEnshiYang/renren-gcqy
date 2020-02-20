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
import io.renren.modules.sys.entity.ZlaqjcEntity;
import io.renren.modules.sys.service.ZlaqjcService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 质量安全检查
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:47:23
 */
@RestController
@RequestMapping("sys/zlaqjc")
public class ZlaqjcController {
    @Autowired
    private ZlaqjcService zlaqjcService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:zlaqjc:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = zlaqjcService.queryPage(params);

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
        String path = "F:/test/zlaqjc/"+filepathString;

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
    @RequestMapping("/info/{zlaqjcId}")
    @RequiresPermissions("sys:zlaqjc:info")
    public R info(@PathVariable("zlaqjcId") Long zlaqjcId){
        ZlaqjcEntity zlaqjc = zlaqjcService.getById(zlaqjcId);

        return R.ok().put("zlaqjc", zlaqjc);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:zlaqjc:save")
    public R save(@RequestBody ZlaqjcEntity zlaqjc){
        zlaqjcService.save(zlaqjc);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:zlaqjc:update")
    public R update(@RequestBody ZlaqjcEntity zlaqjc){
        ValidatorUtils.validateEntity(zlaqjc);
        zlaqjcService.updateById(zlaqjc);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:zlaqjc:delete")
    public R delete(@RequestBody Long[] zlaqjcIds){
        zlaqjcService.removeByIds(Arrays.asList(zlaqjcIds));

        return R.ok();
    }

}
