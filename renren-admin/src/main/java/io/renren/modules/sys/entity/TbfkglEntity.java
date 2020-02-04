package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 投标反馈管理
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-09 16:25:12
 */
@Data
@TableName("tb_tbfkgl")
public class TbfkglEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	@TableId
	private Integer tbfkId;
	/**
	 * 项目名称
	 */
	private String xmmc;
	/**
	 * 参加人员
	 */
	private String cjry;
	/**
	 * 评分办法
	 */
	private String pfbf;
	/**
	 * 开标时间
	 */
	private String kbsj;
	/**
	 * 反馈类型
	 */
	private String fklx;
	/**
	 * 价格
	 */
	private String jg;
	/**
	 * 结果
	 */
	private String zbsqr;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 入围单位
	 */
	private String rwdw;
	/**
	 * 
	 */
	private String czr;
	/**
	 * 
	 */
	private String czsj;
	/**
	 * 
	 */
	private String caozr;
	/**
	 * 
	 */
	private String caozsj;
	/**
	 * 
	 */
	private String zbqk;
	/**
	 * 
	 */
	private String sffkb;
	/**
	 * 
	 */
	private String sfxm;

}
