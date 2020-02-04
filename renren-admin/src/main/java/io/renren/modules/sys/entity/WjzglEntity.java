package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 外经证管理
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 20:07:31
 */
@Data
@TableName("tb_wjzgl")
public class WjzglEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 外经证管理id
	 */
	@TableId
	private Long wjzglId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 编号
	 */
	private String bh;
	/**
	 * 需求部门
	 */
	private String xqbm;
	/**
	 * 申请人
	 */
	private String sqr;
	/**
	 * 申请日期
	 */
	private String sqrq;
	/**
	 * 项目档案编号
	 */
	private String xmdabh;
	/**
	 * 工程名称
	 */
	private String gcmc;
	/**
	 * 工程地质市
	 */
	private String gcdzs;
	/**
	 * 区
	 */
	private String q;
	/**
	 * 号
	 */
	private String h;
	/**
	 * 工程合同价
	 */
	private String gchtj;
	/**
	 * 计税方式
	 */
	private String jsfs;
	/**
	 * 开工日期
	 */
	private String kgrq;
	/**
	 * 竣工日期
	 */
	private String jgrq;
	/**
	 * 甲方单位名称
	 */
	private String jfdwmc;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 附件
	 */
	private String fj;

}
