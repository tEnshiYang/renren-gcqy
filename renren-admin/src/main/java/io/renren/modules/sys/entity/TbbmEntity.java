package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 投标报名管理
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-08 16:28:36
 */
@Data
@TableName("tb_tbbm")
public class TbbmEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 投标报名id
	 */
	@TableId
	private Integer tbbmId;
	/**
	 * 申请人
	 */
	private String sqr;
	/**
	 * 申请时间
	 */
	private String sqsj;
	/**
	 * 部门名称
	 */
	private String bmmc;
	/**
	 * 投标时间
	 */
	private String tbsj;
	/**
	 * 投标方式
	 */
	private String tbfs;

	/**
	 * 审批状态
	 */
	private String spzt;
	/**
	 * 项目经理出席答辩情况
	 */
	private String dbqk;
	/**
	 * 项目经理公示压证情况
	 */
	private String gsyz;
	/**
	 * 项目经理资格等级要求
	 */
	private String zgdj;
	/**
	 * 项目经理社保要求
	 */
	private String sbyq;
	/**
	 * 项目资审方式
	 */
	private String zsfs;
	/**
	 * 投标保证金(元)
	 */
	private String tbbzj;
	/**
	 * 项目控制价
	 */
	private String xmkzj;
	/**
	 * 项目经理业绩要求
	 */
	private String xmjlyjyq;
	/**
	 * 项目是否已挂网
	 */
	private String sfgw;
	/**
	 * 招标平台
	 */
	private String zbpt;
	/**
	 * 企业业绩要求
	 */
	private String qyyjyq;
	/**
	 * 竞争优势
	 */
	private String jzys;
	/**
	 * 上午扣分情况
	 */
	private String swkfqk;
	/**
	 * 参加招标理由
	 */
	private String cjzbly;
	/**
	 * 主要竞争对手
	 */
	private String zyjzds;
	/**
	 * 招标文件
	 */
	private String zbwj;
	/**
	 * 跟踪报备审批单
	 */
	private String gzbbspd;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 附件
	 */
	private String filepath;

}
