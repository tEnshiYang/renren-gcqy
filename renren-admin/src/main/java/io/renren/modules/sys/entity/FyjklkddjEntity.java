package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 来款单登记
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:14:41
 */
@Data
@TableName("tb_fyjklkddj")
public class FyjklkddjEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 来款单登记id
	 */
	@TableId
	private Long fyjklkddjId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 状态
	 */
	private String zt;
	/**
	 * 项目负责人
	 */
	private String xmfzr;
	/**
	 * 来款日期
	 */
	private String lkrq;
	/**
	 * 来款来源
	 */
	private String lkly;
	/**
	 * 来款金额
	 */
	private String lkje;
	/**
	 * 来款单位
	 */
	private String lkdw;
	/**
	 * 摘要
	 */
	private String zy;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 创建人
	 */
	private String cjr;
	/**
	 * 创建时间
	 */
	private String cjsj;

}
