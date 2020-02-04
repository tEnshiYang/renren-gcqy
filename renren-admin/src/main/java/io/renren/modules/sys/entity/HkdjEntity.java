package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 还款登记
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:39:17
 */
@Data
@TableName("tb_hkdj")
public class HkdjEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 还款登记id
	 */
	@TableId
	private Long hkdjId;
	/**
	 * 标题
	 */
	private String bt;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 合同状态
	 */
	private String htzt;
	/**
	 * 还款时间
	 */
	private String hksj;
	/**
	 * 还款本金
	 */
	private String hkbj;
	/**
	 * 还款利息
	 */
	private String hklx;
	/**
	 * 本次还款
	 */
	private String bchk;
	/**
	 * 还款人
	 */
	private String hkr;

}
