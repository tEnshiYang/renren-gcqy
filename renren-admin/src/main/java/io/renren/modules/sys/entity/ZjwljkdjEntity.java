package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 借款登记
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:57:56
 */
@Data
@TableName("tb_zjwljkdj")
public class ZjwljkdjEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 借款登记id
	 */
	@TableId
	private Long zjwljkdjId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 标题
	 */
	private String bt;
	/**
	 * 申请人
	 */
	private String sqr;
	/**
	 * 申请部门
	 */
	private String sqbm;
	/**
	 * 借款金额
	 */
	private String jkje;
	/**
	 * 借款类型
	 */
	private String jklx;
	/**
	 * 被借项目
	 */
	private String bjxm;
	/**
	 * 借款时间
	 */
	private String jksj;
	/**
	 * 借款周期
	 */
	private String jkzq;
	/**
	 * 月息%
	 */
	private String yx;
	/**
	 * 超期利息%
	 */
	private String cqlx;
	/**
	 * 到期还款本金
	 */
	private String dqhkbj;
	/**
	 * 到期还款利息
	 */
	private String dqhklx;
	/**
	 * 同步NC
	 */
	private String tbnc;
	/**
	 * 借款说明
	 */
	private String jksm;

}
