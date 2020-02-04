package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 项目发票管理
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:55:41
 */
@Data
@TableName("tb_xmfpgl")
public class XmfpglEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 项目发票管理id
	 */
	@TableId
	private Long xmfpglId;
	/**
	 * 所属项目
	 */
	private String ssxm;
	/**
	 * 状态
	 */
	private String zt;
	/**
	 * 供应商名称
	 */
	private String gysmc;
	/**
	 * 合同名称
	 */
	private String htmc;
	/**
	 * 发票号码
	 */
	private String fphm;
	/**
	 * 发票类型
	 */
	private String fplx;
	/**
	 * 发票税率
	 */
	private String fpsl;
	/**
	 * 发票内容
	 */
	private String fpnr;
	/**
	 * 开票时间
	 */
	private String kpsj;
	/**
	 * 金额
	 */
	private String je;
	/**
	 * 登记人
	 */
	private String djr;
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

}
