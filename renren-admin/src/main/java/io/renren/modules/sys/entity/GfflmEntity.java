package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 供方分类码
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:27:39
 */
@Data
@TableName("tb_gfflm")
public class GfflmEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 供方分类码id
	 */
	@TableId
	private Long gfflmId;
	/**
	 * 分类码值
	 */
	private String flmz;
	/**
	 * 排序号
	 */
	private String pxh;
	/**
	 * 上级分类
	 */
	private String sjfl;
	/**
	 * 描述
	 */
	private String ms;
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
