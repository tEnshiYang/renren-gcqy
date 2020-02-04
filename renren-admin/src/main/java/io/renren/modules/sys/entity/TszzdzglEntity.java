package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 特殊走账对账管理
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:11:43
 */
@Data
@TableName("tb_tszzdzgl")
public class TszzdzglEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 特殊走账对账管理id
	 */
	@TableId
	private Long tszzdzglId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 项目编号
	 */
	private String xmbh;
	/**
	 * 财务编号
	 */
	private String cwbh;
	/**
	 * 项目联系人
	 */
	private String xmlxr;
	/**
	 * 联系方式
	 */
	private String lxfs;
	/**
	 * 合作方
	 */
	private String hzf;
	/**
	 * 中标金额
	 */
	private String zbje;
	/**
	 * 结算金额
	 */
	private String jsje;
	/**
	 * 奖金池余额
	 */
	private String jjcye;
	/**
	 * 已上交利润
	 */
	private String ysjlr;
	/**
	 * 企业所得税%
	 */
	private String qysds;
	/**
	 * 中标日期
	 */
	private String zbrq;
	/**
	 * 结算报告
	 */
	private String jsbg;
	/**
	 * 竣工报告
	 */
	private String jgbg;
	/**
	 * 内部验收报告
	 */
	private String nbysbg;
	/**
	 * 采购及特殊走账明细
	 */
	private String cgjtszzmx;
	/**
	 * 往来款明细
	 */
	private String wlkmx;
	/**
	 * 业主发票明细
	 */
	private String yzfpmx;
	/**
	 * 业主打款明细
	 */
	private String yzdkmx;
	/**
	 * 备注
	 */
	private String bz;

}
