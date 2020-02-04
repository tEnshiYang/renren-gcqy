package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 业主合同登记
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 16:59:30
 */
@Data
@TableName("tb_yzht")
public class YzhtEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 业主合同id
	 */
	@TableId
	private Long yzhtId;
	/**
	 * 所属项目名称
	 */
	private String ssxmmc;
	/**
	 * 合同名称
	 */
	private String htmc;
	/**
	 * 签约主体
	 */
	private String qyzt;
	/**
	 * 项目类别
	 */
	private String xmlb;
	/**
	 * 档案编号
	 */
	private String dabh;
	/**
	 * 合同金额
	 */
	private String htje;
	/**
	 * 财务编号
	 */
	private String cwbh;
	/**
	 * 投标保证金金额
	 */
	private String tbbzj;
	/**
	 * 发票类型
	 */
	private String fplx;
	/**
	 * 甲方单位
	 */
	private String jfdw;
	/**
	 * 乙方单位
	 */
	private String yfdw;
	/**
	 * 甲方联系人
	 */
	private String jflxr;
	/**
	 * 乙方联系人
	 */
	private String yflxr;
	/**
	 * 甲方联系人电话
	 */
	private String jfdh;
	/**
	 * 乙方联系人电话
	 */
	private String yfdh;
	/**
	 * 总包单位
	 */
	private String zbdw;
	/**
	 * 监理单位
	 */
	private String jldw;
	/**
	 * 总包联系人
	 */
	private String zblxr;
	/**
	 * 监理联系人
	 */
	private String jllxr;
	/**
	 * 总包联系人电话
	 */
	private String zbdh;
	/**
	 * 监理联系人电话
	 */
	private String jldh;
	/**
	 * 现场经理
	 */
	private String xcjl;
	/**
	 * 现场经理电话
	 */
	private String xcjldh;
	/**
	 * 质量员
	 */
	private String zly;
	/**
	 * 质量员电话
	 */
	private String zlydh;
	/**
	 * 安全员
	 */
	private String aqy;
	/**
	 * 安全员电话
	 */
	private String aqydh;
	/**
	 * 施工队长
	 */
	private String sgdz;
	/**
	 * 施工队长电话
	 */
	private String sgdzdh;
	/**
	 * 申请人
	 */
	private String sqr;
	/**
	 * 申请单位
	 */
	private String sqdw;
	/**
	 * 合同支付方式
	 */
	private String htzffs;
	/**
	 * 工程地址
	 */
	private String gcdz;
	/**
	 * 承包内容
	 */
	private String cbnr;
	/**
	 * 所属地区
	 */
	private String ssdq;
	/**
	 * 所属领域
	 */
	private String ssly;
	/**
	 * 项目创优目标
	 */
	private String xmcymb;
	/**
	 * 工程结构形成
	 */
	private String gcjgxc;
	/**
	 * 资金来源
	 */
	private String zjly;
	/**
	 * 保修期
	 */
	private String bxq;
	/**
	 * 招标代理
	 */
	private String zbdl;
	/**
	 * 招标文件
	 */
	private String zbwj;
	/**
	 * 投标文件
	 */
	private String tbwj;
	/**
	 * 投标清单
	 */
	private String tbqd;
	/**
	 * 中标通知书
	 */
	private String zbtzs;
	/**
	 * 合同电子档
	 */
	private String htdzd;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 合同状态
	 */
	private String htzt;

}
