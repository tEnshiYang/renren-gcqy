package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 过程资料
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:45:59
 */
@Data
@TableName("tb_gczl")
public class GczlEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 过程资料id
	 */
	@TableId
	private Long gczlId;
	/**
	 * 所属项目
	 */
	private String ssxm;
	/**
	 * 资料名称
	 */
	private String zlmc;
	/**
	 * 资料文件类型
	 */
	private String zlwjlx;
	/**
	 * 记录时间
	 */
	private String jlsj;
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
