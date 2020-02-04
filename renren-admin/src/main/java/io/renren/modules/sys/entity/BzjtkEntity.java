package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 保证金退款
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-09 15:25:50
 */
@Data
@TableName("tb_bzjtk")
public class BzjtkEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 保证金退款id
	 */
	@TableId
	private Integer bzjtkId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 申请部门
	 */
	private String sqbm;
	/**
	 * 是否中标
	 */
	private String sfzb;
	/**
	 * 回款单位
	 */
	private String hkdw;
	/**
	 * 回款日期
	 */
	private String hkrq;
	/**
	 * 回款金额
	 */
	private String hkje;
	/**
	 * 核算单元负责人
	 */
	private String hsdyfzr;
	/**
	 * 同步NC
	 */
	private String tbnc;
	/**
	 * 公示网址链接
	 */
	private String gswzlj;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 附件路径
	 */
	private String filepath;
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
	/**
	 * 审批状态
	 */
	private String spzt;

}
