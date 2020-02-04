package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 制标需求单
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-09 15:43:42
 */
@Data
@TableName("tb_zbxqd")
public class ZbxqdEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer zbxqdId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 项目地址
	 */
	private String xmdz;
	private String spzt;
	private String jzzk;
	private String czr;
	private String czsj;
	/**
	 * 项目概算
	 */
	private String xmgs;
	/**
	 * 制标类型
	 */
	private String zblx;
	/**
	 * 投标日期
	 */
	private String tbrq;
	/**
	 * 投标截止日期
	 */
	private String tbjzrq;
	/**
	 * 制标申请人
	 */
	private String zbsqr;
	/**
	 * 拟派授权代表
	 */
	private String npsqdb;
	/**
	 * 资格审查方式
	 */
	private String zgscfs;
	/**
	 * 招标方式
	 */
	private String zbfs;
	/**
	 * 申请部门
	 */
	private String sqbm;
	/**
	 * 开标时项目经理是否需要到场
	 */
	private String kbjldc;
	/**
	 * 中标后项目经理证书是否押证
	 */
	private String zbjlzsyz;
	/**
	 * 中标后项目经理证书是否公示
	 */
	private String zbjlzsgs;
	/**
	 * 项目经理是否需要现场答辩
	 */
	private String jlxcdb;
	/**
	 * 项目经理资格等级要求
	 */
	private String jlzgyq;
	/**
	 * 项目经理社保要求
	 */
	private String jlsbyq;
	/**
	 * 资格条件的业绩要求
	 */
	private String xmjlzgtjyjyq;
	/**
	 * 得分条件的业绩要求
	 */
	private String xmjldftjyjyq;
	/**
	 * 业绩是否需要从诚信库中挑选
	 */
	private String yjccxktx;
	/**
	 * 标书制作费用
	 */
	private String bszzfy;
	/**
	 * 资格条件的业绩要求
	 */
	private String qyzgtjyjyq;
	/**
	 * 得分条件的业绩要求
	 */
	private String qydftjyjyq;
	/**
	 * 产品授权及质保要求
	 */
	private String cpsqjzb;
	/**
	 * 授权代表社保年限要求
	 */
	private String sqdbsbnx;
	/**
	 * 法定代表人是否需要出场
	 */
	private String fddbrsfcc;
	/**
	 * 开标时间
	 */
	private String kbsj;
	/**
	 * 开标地点
	 */
	private String kbdd;
	/**
	 * 投标类型
	 */
	private String tblx;
	/**
	 * 纸质投标文件(正本)
	 */
	private String zztbwjZ;
	/**
	 * 纸质投标文件(副本)
	 */
	private String zztbwjF;
	/**
	 * 电子投标文件(光盘)
	 */
	private String dztbwjG;
	/**
	 * 电子投标文件(U盘)
	 */
	private String dztbwjU;
	/**
	 * 电子投标文件是否加密
	 */
	private String dztbwjjm;
	/**
	 * 投标文件组成
	 */
	private String tbwjzc;
	/**
	 * 投标文件路径
	 */
	private String tbwjpath;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 附件路径
	 */
	private String filepath;

}
