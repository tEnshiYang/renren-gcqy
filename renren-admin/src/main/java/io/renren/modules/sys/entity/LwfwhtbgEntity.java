package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 劳务服务合同变更
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:19:47
 */
@Data
@TableName("tb_lwfwhtbg")
public class LwfwhtbgEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 劳务服务合同变更id
	 */
	@TableId
	private Long lwfwhtbgId;
	/**
	 * 所属项目名称
	 */
	private String ssxmmc;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 合同名称
	 */
	private String htmc;
	/**
	 * 变更编号
	 */
	private String bgbh;
	/**
	 * 变更标题
	 */
	private String bgbt;
	/**
	 * 合同原金额
	 */
	private String htyje;
	/**
	 * 本次变更金额
	 */
	private String bcbgje;
	/**
	 * 申请人姓名
	 */
	private String sqrxm;
	/**
	 * 申请单位名称
	 */
	private String sqdwmc;
	/**
	 * 变更后金额
	 */
	private String bghje;
	/**
	 * 变更文档
	 */
	private String bgwd;
	/**
	 * 变更原因
	 */
	private String bgyy;
	/**
	 * 备注
	 */
	private String bz;

}
