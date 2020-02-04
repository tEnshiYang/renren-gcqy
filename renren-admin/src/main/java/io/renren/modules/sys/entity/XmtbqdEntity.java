package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 项目投标清单
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:29:31
 */
@Data
@TableName("tb_xmtbqd")
public class XmtbqdEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 项目投标清单id
	 */
	@TableId
	private Long xmtbqdId;
	/**
	 * 系统名称
	 */
	private String xtmc;
	/**
	 * 设备编码
	 */
	private String sbbm;
	/**
	 * 推荐品牌
	 */
	private String tjpp;
	/**
	 * 投标品牌
	 */
	private String tbpp;
	/**
	 * 物品名称
	 */
	private String wpmc;
	/**
	 * 单位
	 */
	private String dw;
	/**
	 * 数量
	 */
	private String sl;
	/**
	 * 单价
	 */
	private String dj;
	/**
	 * 排序
	 */
	private String px;
	/**
	 * 成本单价
	 */
	private String cbdj;
	/**
	 * 型号规格
	 */
	private String xhgg;
	/**
	 * 技术参数要求
	 */
	private String jscsyq;
	/**
	 * 备注
	 */
	private String bz;

}
