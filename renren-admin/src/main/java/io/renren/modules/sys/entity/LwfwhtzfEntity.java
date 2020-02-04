package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 劳务服务合同作废
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:25:22
 */
@Data
@TableName("tb_lwfwhtzf")
public class LwfwhtzfEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 劳务服务合同作废id
	 */
	@TableId
	private Long lwfwhtzfId;
	/**
	 * 所属项目名称
	 */
	private String ssxmmc;
	/**
	 * 合同名称
	 */
	private String htmc;
	/**
	 * 作废编号
	 */
	private String zfbh;
	/**
	 * 申请人姓名
	 */
	private String sqrxm;
	/**
	 * 申请单位名称
	 */
	private String sqdwmc;
	/**
	 * 申请日期
	 */
	private String sqrq;
	/**
	 * 申请理由
	 */
	private String sqly;
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
