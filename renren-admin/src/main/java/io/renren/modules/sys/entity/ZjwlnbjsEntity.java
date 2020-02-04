package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 内部结算
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:01:51
 */
@Data
@TableName("tb_zjwlnbjs")
public class ZjwlnbjsEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 内部结算id
	 */
	@TableId
	private Long bzjfkId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 部门
	 */
	private String bm;
	/**
	 * 创建人
	 */
	private String cjr;
	/**
	 * 记录时间
	 */
	private String jlsj;
	/**
	 * 费用清单
	 */
	private String fyqd;
	/**
	 * 备注
	 */
	private String bz;

}
