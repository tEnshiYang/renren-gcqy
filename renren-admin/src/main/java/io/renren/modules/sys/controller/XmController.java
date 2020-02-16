package io.renren.modules.sys.controller;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

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

import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import io.renren.modules.sys.entity.XmEntity;
import io.renren.modules.sys.service.XmService;
import io.renren.modules.sys.shiro.ShiroUtils;
import io.renren.common.utils.PageUtils;
import io.renren.common.utils.R;



/**
 * 主项目
 *
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-04 11:11:22
 */
@RestController
@RequestMapping("sys/xm")
public class XmController {
    @Autowired
    private XmService xmService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @RequiresPermissions("sys:xm:list")
    public R list(@RequestParam Map<String, Object> params){
//      System.out.println("+++++++++++++");
//      for(Entry<String, Object> entry : params.entrySet()){  
//          System.out.println("Key = "+entry.getKey()+",value="+entry.getValue());  
//      }  
        PageUtils page = xmService.queryPage(params);

        return R.ok().put("page", page);
    }
    @RequestMapping("/setdefaultxm")
    @ResponseBody
    public String setxm(@RequestBody String xmId){
    	System.out.println(xmId);
    	String subId=xmId.substring(5);
    	Integer id=Integer.parseInt(subId);
    	int id2=(int)id;
  
    	XmEntity xmEntity=xmService.getById(id);
    	
    	ShiroUtils.setSessionAttribute("defaultxm", xmEntity);
    	
    	return "OK";
    }
    @RequestMapping("/getdefaultxm")
    @ResponseBody
    public XmEntity getxm(){
    	XmEntity xmEntity=(XmEntity)ShiroUtils.getSessionAttribute("defaultxm");

    	return xmEntity;
    }

    //附件
    @RequestMapping(value = "/fileUp", method = RequestMethod.POST)
    @ResponseBody
    public String uploadMult(HttpServletRequest request) {
    
    	  // 转型为MultipartHttpRequest：   
        MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;   
        // 获得文件：   
      
	   	 String xmId=request.getParameter("xmId").toString();
		
		 XmEntity xmEntity=xmService.getById(xmId);
		 System.out.println("******entity*************");
		 System.out.println(xmEntity);
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
        String path = "F:/test/xm";

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
        xmEntity.setFilepath(filePath);
        xmService.updateById(xmEntity);
        return "true";
    }
    /**
     * 信息
     */
    @RequestMapping("/info/{xmId}")
    @RequiresPermissions("sys:xm:info")
    public R info(@PathVariable("xmId") Long xmId){
        XmEntity xm = xmService.getById(xmId);

        return R.ok().put("xm", xm);
    }

    /**
     * 保存
     */
    @RequestMapping("/save")
    @RequiresPermissions("sys:xm:save")
    public R save(@RequestBody XmEntity xm){
        xmService.save(xm);

        return R.ok();
    }

    /**
     * 修改
     */
    @RequestMapping("/update")
    @RequiresPermissions("sys:xm:update")
    public R update(@RequestBody XmEntity xm){
        ValidatorUtils.validateEntity(xm);
        xmService.updateById(xm);
        
        return R.ok();
    }

    /**
     * 删除
     */
    @RequestMapping("/delete")
    @RequiresPermissions("sys:xm:delete")
    public R delete(@RequestBody Long[] xmIds){
        xmService.removeByIds(Arrays.asList(xmIds));

        return R.ok();
    }

}
