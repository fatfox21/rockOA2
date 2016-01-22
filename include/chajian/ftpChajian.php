<?php
/********************************************
* MODULE:FTP类
*******************************************/
class ftpChajian extends Chajian
{
	public $off;                          // 返回操作状态(成功/失败)
	public $conn;                      		// FTP连接
	public $ftppath;						//FTP目录

	/**
	* 方法：FTP连接
	* @FTP_HOST -- FTP主机
	* @FTP_PORT -- 端口
	* @FTP_USER -- 用户名
	* @FTP_PASS -- 密码
	*/
	function __construct($FTP_HOST='rili123.gotoftp3.com',$FTP_PORT=21,$FTP_USER='rili123',$FTP_PASS='s7qa2kq2')
	{
		$this->conn = @ftp_connect($FTP_HOST,$FTP_PORT) or die("FTP服务器连接失败");
		@ftp_login($this->conn,$FTP_USER,$FTP_PASS) or die("FTP服务器登陆失败");
		@ftp_pasv($this->conn,1); // 打开被动模拟
		$this->ftppath	= ftp_pwd($this->conn);
		
		$a = ftp_nlist($this->conn, "wwwroot/");
		print_r($a);
	}

	/**
	* 方法：上传文件
	* @path    -- 本地路径
	* @newpath -- 上传路径
	* @type    -- 若目标目录不存在则新建
	*/
	function up_file($path,$newpath,$type=true)
	{
		if($type) $this->dir_mkdirs($newpath);
		$this->off = @ftp_put($this->conn,$newpath,$path,FTP_BINARY);
		if(!$this->off) echo "文件上传失败,请检查权限及路径是否正确！";
	}

	/**
	* 方法：移动文件
	* @path    -- 原路径
	* @newpath -- 新路径
	* @type    -- 若目标目录不存在则新建
	*/
	function move_file($path,$newpath,$type=true)
	{
		if($type) $this->dir_mkdirs($newpath);
		$this->off = @ftp_rename($this->conn,$path,$newpath);
		if(!$this->off) echo "文件移动失败,请检查权限及原路径是否正确！";
	}

	/**
	* 方法：复制文件
	* 说明：由于FTP无复制命令,本方法变通操作为：下载后再上传到新的路径
	* @path    -- 原路径
	* @newpath -- 新路径
	* @type    -- 若目标目录不存在则新建
	*/
	function copy_file($path,$newpath,$type=true)
	{
		$downpath = "c:/tmp.dat";
		$this->off = @ftp_get($this->conn,$downpath,$path,FTP_BINARY);// 下载
		if(!$this->off) echo "文件复制失败,请检查权限及原路径是否正确！";
		$this->up_file($downpath,$newpath,$type);
	}

	/**
	* 方法：删除文件
	* @path -- 路径
	*/
	function del_file($path)
	{
		$this->off = @ftp_delete($this->conn,$path);
		if(!$this->off) echo "文件删除失败,请检查权限及路径是否正确！";
	}

	/**
	* 方法：生成目录
	* @path -- 路径
	*/
	function dir_mkdirs($path)
	{
		$path_arr  = explode('/',$path);              // 取目录数组
		$file_name = array_pop($path_arr);            // 弹出文件名
		$path_div  = count($path_arr);                // 取层数

		foreach($path_arr as $val)                    // 创建目录
		{
			if(@ftp_chdir($this->conn,$val) == FALSE)
			{
				$tmp = @ftp_mkdir($this->conn,$val);
				if($tmp == FALSE)
				{
					echo "目录创建失败,请检查权限及路径是否正确！";
					exit;
				}
				@ftp_chdir($this->conn,$val);
			}
		}
		
		for($i=1;$i<=$path_div;$i++)                  // 回退到根
		{
			@ftp_cdup($this->conn);
		}
	}

	/**
	* 方法：关闭FTP连接
	*/
	function close()
	{
		@ftp_close($this->conn);
	}
}
// class class_ftp end




/************************************** 测试 ***********************************
$ftp = new ftp('222.13.67.42',21,'hlj','123456');          // 打开FTP连接
$ftp->up_file('aa.wav','test/13548957217/bb.wav');         // 上传文件
//$ftp->move_file('aaa/aaa.php','aaa.php');                // 移动文件
//$ftp->copy_file('aaa.php','aaa/aaa.php');                // 复制文件
//$ftp->del_file('aaa.php');                               // 删除文件
$ftp->close();                                             // 关闭FTP连接
//******************************************************************************/