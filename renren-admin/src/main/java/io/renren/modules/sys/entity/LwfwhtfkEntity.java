package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 劳务服务合同付款
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:22:57
 */
@Data
@TableName("tb_lwfwhtfk")
public class LwfwhtfkEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 劳务服务合同付款id
	 */
	@TableId
	private Long lwfwhtfkId;
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
	 * 支付编号
	 */
	private String zfbh;
	/**
	 * 支付类别
	 */
	private String zflb;
	/**
	 * 付款方式
	 */
	private String fkfs;
	/**
	 * 申请方
	 */
	private String sqf;
	/**
	 * 申请方联系人
	 */
	private String sqflxr;
	/**
	 * 开户银行
	 */
	private String khyh;
	/**
	 * 银行账号
	 */
	private String yhzh;
	/**
	 * 发票情况
	 */
	private String fpqk;
	/**
	 * 期数
	 */
	private String qs;
	/**
	 * 发票类型
	 */
	private String fqlx;
	/**
	 * 同步NC
	 */
	private String tbnc;
	/**
	 * 总金额
	 */
	private String zje;
	/**
	 * 本次付款金额
	 */
	private String bcfkje;
	/**
	 * 付款理由
	 */
	private String fkly;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 扣发发票税金
	 */
	private String kffpsj;
	/**
	 * 税金比率
	 */
	private String sjbl;
	/**
	 * 是否发票补齐
	 */
	private String sffpbq;
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

}
