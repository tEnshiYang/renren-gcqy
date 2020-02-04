package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 业主发票登记
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:52:13
 */
@Data
@TableName("tb_yzfpdj")
public class YzfpdjEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 业主发票登记id
	 */
	@TableId
	private Long yzfpdjId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 项目地址
	 */
	private String xmdz;
	/**
	 * 合同名称
	 */
	private String htmc;
	/**
	 * 合同编号
	 */
	private String htbh;
	/**
	 * 申请时间
	 */
	private String sqsj;
	/**
	 * 申请人
	 */
	private String sqr;
	/**
	 * 单位地址
	 */
	private String dwdz;
	/**
	 * 单位电话
	 */
	private String dwdh;
	/**
	 * 单位开户银行
	 */
	private String dwkhyh;
	/**
	 * 单位开户账号
	 */
	private String dwkhzh;
	/**
	 * 单位全称
	 */
	private String dwqc;
	/**
	 * 暂扣金额
	 */
	private String zkje;
	/**
	 * 单位纳税识别号
	 */
	private String dwnssbh;
	/**
	 * 金额
	 */
	private String je;
	/**
	 * 发票类型
	 */
	private String fplx;
	/**
	 * 开票税率
	 */
	private String kpsl;
	/**
	 * 项目到票明细
	 */
	private String xudpmx;
	/**
	 * 开票内容
	 */
	private String kpnr;
	/**
	 * 备注
	 */
	private String bz;

}
