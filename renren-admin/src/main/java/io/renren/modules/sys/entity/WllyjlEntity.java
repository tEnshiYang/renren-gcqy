package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 物料领用记录
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:44:00
 */
@Data
@TableName("tb_wllyjl")
public class WllyjlEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 物料领用记录id
	 */
	@TableId
	private Long wllyjlId;
	/**
	 * 状态
	 */
	private String zt;
	/**
	 * 领用时间
	 */
	private String lysj;
	/**
	 * 领用单位
	 */
	private String lydw;
	/**
	 * 所属系统
	 */
	private String ssxt;
	/**
	 * 备注
	 */
	private String bz;
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
