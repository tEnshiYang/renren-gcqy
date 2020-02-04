package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 入围的单位
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-02-02 16:46:35
 */
@Data
@TableName("tb_rwddw")
public class RwddwEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 入围的单位
	 */
	@TableId
	private Integer rwddwId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 单位名称
	 */
	private String dwmc;
	/**
	 * 报价
	 */
	private String bj;
	/**
	 * 技术得分
	 */
	private String jsdf;
	/**
	 * 商务得分
	 */
	private String swdf;
	/**
	 * 项目经理
	 */
	private String xmjl;
	/**
	 * 排名
	 */
	private String pm;
	/**
	 * 是否中标
	 */
	private String sfzb;

}
