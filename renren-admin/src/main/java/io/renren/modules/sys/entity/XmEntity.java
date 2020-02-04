package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

/**
 * 主项目
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-04 11:11:22
 */
@Data
@TableName("tb_xm")
public class XmEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 项目代码
	 */
	@TableId
	private Long xmId;
	/**
	 * 项目名称
	 */
	private String xmname;
	/**
	 * 项目短名
	 */
	private String xmsname;
	/**
	 * 工程编号
	 */
	private String gcbh;
	/**
	 * 项目货币
	 */
	private String xmhb;
	/**
	 * 建设单位
	 */
	private String jsdw;
	/**
	 * 开工日期
	 */
	private String kgrq;
	/**
	 * 完工日期
	 */
	private String wgrq;
	
	@TableField(exist=false)
	private MultipartFile file;
	/**
	 * 核算单元
	 */
	private String hsdy;
	/**
	 * 核算单元负责人
	 */
	private String hsdyfzr;
	/**
	 * 项目经理
	 */
	private String xmjl;
	/**
	 * 地点
	 */
	private String dd;
	/**
	 * 说明
	 */
	private String sm;
	/**
	 * 自检记录
	 */
	private String zjjl;
	/**
	 * 安全培训记录
	 */
	private String aqpxjl;
	/**
	 * 客户满意度
	 */
	private String khmyd;
	/**
	 * 附件
	 */
	private String filepath;

}
