package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 投标盖章申请
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-09 16:12:27
 */
@Data
@TableName("tb_tbgzsq")
public class TbgzsqEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer gzsqId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 投标时间
	 */
	private String tbsj;
	/**
	 * 盖章时间
	 */
	private String gzsj;
	/**
	 * 投标保证金
	 */
	private String tbbzj;
	/**
	 * 付款方式
	 */
	private String fkfs;
	/**
	 * 招标人
	 */
	private String zbr;
	/**
	 * 招标联系人
	 */
	private String zblxr;
	/**
	 * 招标代理
	 */
	private String zbdl;
	/**
	 * 招标代理联系人
	 */
	private String zbdllxr;
	/**
	 * 资金来源
	 */
	private String zjly;
	/**
	 * 项目所在地
	 */
	private String xmszd;
	/**
	 * 核算单元负责人
	 */
	private String hsdyfzr;
	/**
	 * 其他信息
	 */
	private String qtxx;
	/**
	 * 技术分
	 */
	private String jsf;
	/**
	 * 商务分
	 */
	private String swf;
	/**
	 * 商务扣分情况
	 */
	private String swkfqk;
	/**
	 * 价格分
	 */
	private String jgf;
	/**
	 * 最高限价
	 */
	private String zgxj;
	/**
	 * 暂定价
	 */
	private String zdj;
	/**
	 * 基准价计算方式
	 */
	private String jzjjsfs;
	/**
	 * 高扣
	 */
	private String gk;
	/**
	 * 抵扣
	 */
	private String dk;
	/**
	 * 设备材料成本
	 */
	private String sbclcb;
	/**
	 * 拟报价
	 */
	private String nbj;
	/**
	 * 拟主要竞争对手情况
	 */
	private String nzyjzds;
	/**
	 * 
	 */
	private String spzt;

}
