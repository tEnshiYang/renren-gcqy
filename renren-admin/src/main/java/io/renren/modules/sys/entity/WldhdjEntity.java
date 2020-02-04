package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 物料到货登记
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:41:30
 */
@Data
@TableName("tb_wldhdj")
public class WldhdjEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 物料到货登记id
	 */
	@TableId
	private Long wldhdjId;
	/**
	 * 状态
	 */
	private String zt;
	/**
	 * 分包商
	 */
	private String fbs;
	/**
	 * 合同名称
	 */
	private String htmc;
	/**
	 * 合同编号
	 */
	private String htbh;
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
