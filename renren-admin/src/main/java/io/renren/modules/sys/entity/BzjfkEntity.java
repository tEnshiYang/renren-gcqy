package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 保证金付款
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-10 13:31:36
 */
@Data
@TableName("tb_bzjfk")
public class BzjfkEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 付款id
	 */
	@TableId
	private Long bzjfkId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 核算单元负责人
	 */
	private String hsdyfzr;
	/**
	 * 是否支付保证金
	 */
	private String sfzfbzj;
	/**
	 * 收款单位
	 */
	private String skdw;
	/**
	 * 开户银行
	 */
	private String khyh;
	/**
	 * 收款单位联系人
	 */
	private String skdwlxr;
	/**
	 * 收款单位联系方式
	 */
	private String skdwdh;
	/**
	 * 银行账号
	 */
	private String yhzh;
	/**
	 * 付款方式
	 */
	private String fkfs;
	/**
	 * 投标保证金(元)
	 */
	private String tbbzj;
	/**
	 * 汇款截止时间
	 */
	private String hkjzrq;
	/**
	 * 同步NC
	 */
	private String tbnc;
	/**
	 * 财务编号
	 */
	private String cwbh;
	/**
	 * 付款理由
	 */
	private String fkly;
	/**
	 * 项目需求
	 */
	private String xmxq;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 
	 */
	private String spzt;
	/**
	 * 
	 */
	private String cjr;
	/**
	 * 
	 */
	private String cjsj;
	/**
	 * 
	 */
	private String czr;
	/**
	 * 
	 */
	private String czsj;

}
