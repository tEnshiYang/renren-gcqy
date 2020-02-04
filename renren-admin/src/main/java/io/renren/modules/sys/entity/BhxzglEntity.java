package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 保含协助管理
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:05:54
 */
@Data
@TableName("tb_bhxzgl")
public class BhxzglEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 保含协助管理id
	 */
	@TableId
	private Long bhxzglId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 编号
	 */
	private String bh;
	/**
	 * 需求部门
	 */
	private String xqbm;
	/**
	 * 申请人
	 */
	private String sqr;
	/**
	 * 申请日期
	 */
	private String sqrq;
	/**
	 * 保函类型
	 */
	private String bhlx;
	/**
	 * 合同号
	 */
	private String hth;
	/**
	 * 工程名称
	 */
	private String gcmc;
	/**
	 * 工程总价
	 */
	private String gczj;
	/**
	 * 保函金额
	 */
	private String bhje;
	/**
	 * 工程总价百分比
	 */
	private String gczjbfb;
	/**
	 * 保函期限
	 */
	private String bhqx;
	/**
	 * 保函抬头
	 */
	private String bhtt;
	/**
	 * 保函格式
	 */
	private String bhgs;
	/**
	 * 预估价
	 */
	private String ygj;
	/**
	 * 甲方地址
	 */
	private String jfdz;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 附件
	 */
	private String fj;

}
