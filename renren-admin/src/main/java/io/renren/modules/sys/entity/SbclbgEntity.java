package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 设备材料变更
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:32:13
 */
@Data
@TableName("tb_sbclbg")
public class SbclbgEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 设备材料变更id
	 */
	@TableId
	private Long sbclbgId;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 单号
	 */
	private String dh;
	/**
	 * 所属项目
	 */
	private String ssxm;
	/**
	 * 标题
	 */
	private String bt;
	/**
	 * 需求时间
	 */
	private String xqsj;
	/**
	 * 变更情况说明
	 */
	private String bgqksm;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 操作人
	 */
	private String czr;
	/**
	 * 操作时间
	 */
	private String czsj;
	/**
	 * 创建人
	 */
	private String cjr;
	/**
	 * 创建时间
	 */
	private String cjsj;

}
