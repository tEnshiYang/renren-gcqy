package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 质量安全会议
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:50:13
 */
@Data
@TableName("tb_zlaqhy")
public class ZlaqhyEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 质量安全会议id
	 */
	@TableId
	private Long zlaqhyId;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 编号
	 */
	private String bh;
	/**
	 * 文档名称
	 */
	private String wdmc;
	/**
	 * 责任人
	 */
	private String zrr;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 附件
	 */
	private String fj;
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
