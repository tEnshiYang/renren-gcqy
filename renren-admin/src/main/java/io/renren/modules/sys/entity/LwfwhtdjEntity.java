package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 劳务服务合同登记
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:17:14
 */
@Data
@TableName("tb_lwfwhtdj")
public class LwfwhtdjEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 劳务服务合同id
	 */
	@TableId
	private Long lwfwhtId;
	/**
	 * 劳务合同总额
	 */
	private String lwhtze;
	/**
	 * 合同状态
	 */
	private String htzt;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 所属项目名称
	 */
	private String ssxmmc;
	/**
	 * 核算单元
	 */
	private String hsdy;
	/**
	 * 合同名称
	 */
	private String htmc;
	/**
	 * 合同编号
	 */
	private String htbh;
	/**
	 * 合同金额
	 */
	private String htje;
	/**
	 * 签约单位
	 */
	private String qydw;
	/**
	 * 合同主要内容
	 */
	private String htzynr;
	/**
	 * 合同发起人
	 */
	private String htfqr;
	/**
	 * 签约单位联系人
	 */
	private String qydwlxr;
	/**
	 * 签约单位联系方式
	 */
	private String qydwlxfs;
	/**
	 * 签订日期
	 */
	private String qdrq;
	/**
	 * 与业主签订合同金额
	 */
	private String yyzqdhtje;
	/**
	 * 已签采购合同金额
	 */
	private String yqcghtje;
	/**
	 * 已签劳务服务合同金额
	 */
	private String yqlwfuhtje;
	/**
	 * 已签采购合同比例
	 */
	private String yqcghtbl;
	/**
	 * 已签劳务合同比例
	 */
	private String yqlwhtbl;
	/**
	 * 已到款金额
	 */
	private String ydkje;
	/**
	 * 本项目近期拟到款金额
	 */
	private String bxmjqndkje;
	/**
	 * 本项目资金池金额
	 */
	private String bxmzjcye;
	/**
	 * 本核算单元资金池余额
	 */
	private String bhsdyzjcye;
	/**
	 * 是否包含劳务分包
	 */
	private String sfbhlwfb;
	/**
	 * 是否包含设备材料
	 */
	private String sfbhsbcl;
	/**
	 * 是否设计或技术服务
	 */
	private String sfsjhjsfw;
	/**
	 * 是否包含工程分包
	 */
	private String sfbhgcfb;
	/**
	 * 签订原因
	 */
	private String qdyy;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 创建人
	 */
	private String cjr;

}
