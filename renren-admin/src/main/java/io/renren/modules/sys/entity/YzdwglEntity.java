package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 业主单位管理
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-11 16:55:31
 */
@Data
@TableName("tb_yzdwgl")
public class YzdwglEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 业主单位id
	 */
	@TableId
	private Long yzdwId;
	/**
	 * 公司名称
	 */
	private String gsmc;
	/**
	 * 公司代码
	 */
	private String gsdm;
	/**
	 * 公名缩写
	 */
	private String gmsx;
	/**
	 * 公司税号
	 */
	private String gssh;
	/**
	 * 开户银行
	 */
	private String khyh;
	/**
	 * 账户
	 */
	private String zh1;
	/**
	 * 账号
	 */
	private String zh2;
	/**
	 * 注册资金
	 */
	private String zczj;
	/**
	 * 项目角色
	 */
	private String xmjs;
	/**
	 * 传真
	 */
	private String cz;
	/**
	 * 办公室电话
	 */
	private String bgsdh;
	/**
	 * Email
	 */
	private String e;
	/**
	 * 有效期
	 */
	private String yxq;
	/**
	 * 地址
	 */
	private String dz;
	/**
	 * 甲乙方人员基本信息
	 */
	private String jyfryjbxx;
	/**
	 * 备注
	 */
	private String bz;
	/**
	 * 附件
	 */
	private String fj;

}
