package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 采购合同登记
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:23:03
 */
@Data
@TableName("tb_cghtdj")
public class CghtdjEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 采购合同登记id
	 */
	@TableId
	private Long cghtdjId;
	/**
	 * 采购合同总额
	 */
	private String cghtze;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 合同状态
	 */
	private String htzt;
	/**
	 * 占业主合同金额比例
	 */
	private String jebl;
	/**
	 * 所属项目名称
	 */
	private String ssxmmc;
	/**
	 * 合同名称
	 */
	private String htmc;
	/**
	 * 合同编号
	 */
	private String htbh;
	/**
	 * 合同类型
	 */
	private String htlx;
	/**
	 * 甲方单位
	 */
	private String jfdw;
	/**
	 * 甲方联系人
	 */
	private String jflxr;
	/**
	 * 乙方单位
	 */
	private String yfdw;
	/**
	 * 乙方联系人
	 */
	private String yflxr;
	/**
	 * 经办人
	 */
	private String jbr;
	/**
	 * 发票税点
	 */
	private String fpsd;
	/**
	 * 采购事由
	 */
	private String cgsz;
	/**
	 * 签订日期
	 */
	private String qdrq;
	/**
	 * 累计到票金额
	 */
	private String ljdpje;
	/**
	 * 交货时间
	 */
	private String jhsj;
	/**
	 * 到货地点
	 */
	private String dhdd;
	/**
	 * 到货联系人
	 */
	private String shlxr;
	/**
	 * 运输方式及运输费用
	 */
	private String ysfsjfy;
	/**
	 * 甲方材料员
	 */
	private String jfcly;
	/**
	 * 电话
	 */
	private String dh1;
	/**
	 * 甲方现场项目经理
	 */
	private String jfxcxmjl;
	/**
	 * 电话
	 */
	private String dh2;
	/**
	 * 甲方采购服务专员
	 */
	private String jfcgfwzy;
	/**
	 * 电话
	 */
	private String dh3;
	/**
	 * 邮箱
	 */
	private String yx;
	/**
	 * 设备安装调试服务
	 */
	private String sbazts;
	/**
	 * 设备保修方式
	 */
	private String sbbxfs;
	/**
	 * 质保期_年
	 */
	private String zbq;
	/**
	 * 其他
	 */
	private String qt;
	/**
	 * 最终价
	 */
	private String zzj;

}
