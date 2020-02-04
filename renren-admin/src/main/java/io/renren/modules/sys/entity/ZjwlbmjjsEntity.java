package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 部门间结算
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 19:59:53
 */
@Data
@TableName("tb_zjwlbmjjs")
public class ZjwlbmjjsEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 部门间结算id
	 */
	@TableId
	private Long zjwlbmjjsId;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 付款部门
	 */
	private String fkbm;
	/**
	 * 付款项目
	 */
	private String fkxm;
	/**
	 * 收款部门
	 */
	private String skbm;
	/**
	 * 收款项目
	 */
	private String skxm;
	/**
	 * 申请人
	 */
	private String sqr;
	/**
	 * 创建时间
	 */
	private String cjsj;
	/**
	 * 费用清单
	 */
	private String fyqd;
	/**
	 * 备注
	 */
	private String bz;

}
