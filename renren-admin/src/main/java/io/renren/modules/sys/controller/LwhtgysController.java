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
import io.renren.modules.sys.entity.LwhtgysEntity;
import io.renren.modules.sys.entity.XmEntity;
import io.renren.modules.sys.service.LwhtgysService;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 劳务合同供应商
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:12:59
 */
@RestController
@RequestMapping("sys/lwhtgys")
public class LwhtgysController {
    @Autowired
    private LwhtgysService lwhtgysService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:lwhtgys:list")
    public R list(@RequestParam Map<String, Object> params){
        PageUtils page = lwhtgysService.queryPage(params);

        return R.ok().put("page", page);
    }

    //附件
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
        String path = "F:/test/lwhtgys/"+filepathString;

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
    @RequestMapping("/info/{lwhtgysId}")
    @RequiresPermissions("sys:lwhtgys:info")
    public R info(@PathVariable("lwhtgysId") Long lwhtgysId){
        LwhtgysEntity lwhtgys = lwhtgysService.getById(lwhtgysId);

        return R.ok().put("lwhtgys", lwhtgys);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:lwhtgys:save")
    public R save(@RequestBody LwhtgysEntity lwhtgys){
        lwhtgysService.save(lwhtgys);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:lwhtgys:update")
    public R update(@RequestBody LwhtgysEntity lwhtgys){
        ValidatorUtils.validateEntity(lwhtgys);
        lwhtgysService.updateById(lwhtgys);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:lwhtgys:delete")
    public R delete(@RequestBody Long[] lwhtgysIds){
        lwhtgysService.removeByIds(Arrays.asList(lwhtgysIds));

        return R.ok();
    }

}
