package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 供应商登记
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 17:07:01
 */
@Data
@TableName("tb_gysdj")
public class GysdjEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 供应商id
	 */
	@TableId
	private Long gysId;
	/**
	 * 单位名称
	 */
	private String dwmc;
	/**
	 * 状态
	 */
	private String zt;
	/**
	 * 注册资金
	 */
	private String zczj;
	/**
	 * 开户银行
	 */
	private String khyh;
	/**
	 * 账户
	 */
	private String zh;
	/**
	 * 传真
	 */
	private String cz;
	/**
	 * 电话
	 */
	private String dh;
	/**
	 * Email
	 */
	private String e;
	/**
	 * 企业性质
	 */
	private String qyxz;
	/**
	 * 供应商联系人
	 */
	private String gyslxr;
	/**
	 * 联系方式
	 */
	private String lxfs;
	/**
	 * 渠道来源
	 */
	private String qdly;
	/**
	 * 品牌
	 */
	private String pp;
	/**
	 * 供应范围
	 */
	private String gyfw;
	/**
	 * 地址
	 */
	private String dz;
	/**
	 * 营业执照
	 */
	private String yyzz;
	/**
	 * 产品代理证
	 */
	private String cpdlz;
	/**
	 * 其他信息
	 */
	private String qtxx;
	/**
	 * 联系人信息
	 */
	private String lxrxx;
	/**
	 * 备注
	 */
	private String bz;

}
