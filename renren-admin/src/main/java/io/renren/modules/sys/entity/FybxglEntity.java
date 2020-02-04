package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 费用报销管理
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:03:12
 */
@Data
@TableName("tb_fybxgl")
public class FybxglEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 费用报销管理id
	 */
	@TableId
	private Long fybxglId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 报销部门
	 */
	private String bxbm;
	/**
	 * 经办人
	 */
	private String jbr;
	/**
	 * 报销时间
	 */
	private String bxsj;
	/**
	 * 发票数量
	 */
	private String fpsl;
	/**
	 * 收款方
	 */
	private String skf;
	/**
	 * 付款方式
	 */
	private String fkfs;
	/**
	 * 开户行
	 */
	private String khh;
	/**
	 * 账号
	 */
	private String zh;
	/**
	 * 同步NC
	 */
	private String tbnc;
	/**
	 * 报销事由
	 */
	private String bxsy;
	/**
	 * 费用清单
	 */
	private String fyqd;
	/**
	 * 备注
	 */
	private String bz;

}
