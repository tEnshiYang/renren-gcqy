package io.renren.modules.sys.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 项目跟踪监控
 * 
 * @author Mark
 * @email sunlightcs@gmail.com
 * @date 2020-01-04 11:34:46
 */
@Data
@TableName("tb_genzong")
public class GenzongEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	/**
	 * 序号
	 */
	@TableId
	private Long genzongId;
	/**
	 * 瀹℃壒鐘舵€?
	 */
	private String xmname;
	/**
	 * 杩涘睍鐘舵€?
	 */
	private String xmbh;
	private String jzzk;
	/**
	 * 椤圭洰缂栧彿
	 */
	private String hsdy;

	/**
	 * 鐢宠浜?
	 */
	private String hsdyfzr;
	/**
	 * 闁汇垹鐤囬顒勫籍閸洘锛?
	 */
	private String hsfzrdh;
	/**
	 * 鐢宠閮ㄩ棬
	 */
	private String hy;
	/**
	 * 椤圭洰鍚嶇О
	 */
	private String sqbm;
	/**
	 * 椤圭洰鍦板潃
	 */
	private String jbr;
	/**
	 * 鏍哥畻鍗曞厓
	 */
	private String jbrdh;
	/**
	 * 鏍哥畻鍗曞厓璐熻矗浜?
	 */
	private String sqsj;
	/**
	 * 
	 */
	private String xmszqy;
	/**
	 * 
	 */
	private String dqfzrxm;
	/**
	 * 
	 */
	private String dqfzrdh;
	/**
	 * 业务内容概况
	 */
	private String ywnrgk;
	/**
	 * 
	 */
	private String xxjd;
	/**
	 * 
	 */
	private String jcbmjcr;
	/**
	 * 
	 */
	private String qtxx;
	/**
	 * 
	 */
	private String bbsy;
	/**
	 * 
	 */
	private String bz;
	/**
	 * 
	 */
	private String tzjsdw;
	/**
	 * 
	 */
	private String qyxz;
	/**
	 * 
	 */
	private String xmdz;
	/**
	 * 
	 */
	private String jsgm;
	/**
	 * 
	 */
	private String nzbxs;
	/**
	 * 
	 */
	private String rdxtgs;
	/**
	 * 
	 */
	private String zjly;
	/**
	 * 
	 */
	private String xxly;
	/**
	 * 
	 */
	private String mqzk;
	/**
	 * 
	 */
	private String gzqk;
	/**
	 * 
	 */
	private String yzbsj;
	/**
	 * 
	 */
	private String xmgk;
	/**
	 * 
	 */
	private String jzysgxzy;
	/**
	 * 
	 */
	private String fzr;
	/**
	 * 
	 */
	private String fzrdh;
	/**
	 * 
	 */
	private String fgld;
	/**
	 * 
	 */
	private String fglddh;
	/**
	 * 
	 */
	private String bmfzr;
	/**
	 * 
	 */
	private String bmfzrdh;
	/**
	 * 
	 */
	private String zygcs;
	/**
	 * 
	 */
	private String gcsdh;
	private String zbdwmc;
	/**
	 * 
	 */
	private String zblxr;
	/**
	 * 
	 */
	private String zbdh;
	/**
	 * 
	 */
	private String zbdlmc;
	/**
	 * 
	 */
	private String dllxr;
	/**
	 * 
	 */
	private String dldh;

}
