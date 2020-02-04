package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 采购合同作废
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:20:02
 */
@Data
@TableName("tb_cghtzf")
public class CghtzfEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 采购合同作废id
	 */
	@TableId
	private Long cghtzfId;
	/**
	 * 所属项目名称
	 */
	private String ssxmmc;
	/**
	 * 审批状态
	 */
	private String spzt;
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
	 * 申请日期
	 */
	private String sqrq;
	/**
	 * 甲方公司名称
	 */
	private String jfgsmc;
	/**
	 * 乙方公司名称
	 */
	private String yfgsmc;
	/**
	 * 合同签订日期
	 */
	private String htqdrq;
	/**
	 * 签订金额
	 */
	private String qdje;
	/**
	 * 作废情况说明
	 */
	private String zfqksm;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 作废明细
	 */
	private String zfmx;
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
