package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 劳务合同供应商
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:12:59
 */
@Data
@TableName("tb_lwhtgys")
public class LwhtgysEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 劳务合同供应商id
	 */
	@TableId
	private Long lwhtgysId;
	/**
	 * 状态
	 */
	private String zy;
	/**
	 * 供应商名称
	 */
	private String gysmc;
	/**
	 * 项目编号
	 */
	private String xmbh;
	/**
	 * 法人姓名
	 */
	private String frxm;
	/**
	 * 股东姓名
	 */
	private String gdxm;
	/**
	 * 供应商类型
	 */
	private String gyslx;
	/**
	 * 纳税人类型
	 */
	private String nsrlx;
	/**
	 * 合同类型
	 */
	private String htlx;
	/**
	 * 开户银行
	 */
	private String khyh;
	/**
	 * 银行账号
	 */
	private String yhzh;
	/**
	 * 开户许可证
	 */
	private String khxkz;
	/**
	 * 营业执照
	 */
	private String yyzz;
	/**
	 * 资质证明
	 */
	private String zzzm;
	/**
	 * 企业信用查询结果
	 */
	private String qyxycx;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 确认人
	 */
	private String qrr;
	/**
	 * 确认时间
	 */
	private String qrsj;

}
