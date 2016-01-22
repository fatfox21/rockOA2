<?php 
class installClassAction extends Action{
	
	public function initMysql()
	{
		$this->linkdb = false;
	}
	
	public function defaultAction()
	{
		$this->title	= TITLE.'_安装';
	}
	
	public function saveAjax()
	{
		$host 	= $this->post('host');
		$user 	= $this->post('user');
		$pass 	= $this->post('pass');
		$base 	= $this->post('base');
		$perfix = $this->post('perfix');
		$title 	= $this->post('title');
		$qom 	= $this->post('qom');
		$url 	= $this->post('url');
		$highpass 	= $this->post('highpass');
		
		$msg  	= '';

		if($this->isempt($msg)){
			@$conn=mysql_connect($host,$user,$pass);
			$msg = mysql_error();
		}
		if(!$this->isempt($msg)){
			$msg = '无法连接数据库密码/用户名有误';
		}
		if($this->isempt($msg)){
			@mysql_select_db($base, $conn);
			$msg = mysql_error();
			
			//数据库不存在就创建
			if(!$this->isempt($msg)){
				@mysql_query("CREATE DATABASE `$base` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci");
				$msg = mysql_error();
				if($this->isempt($msg)){
					@mysql_select_db($base, $conn);
					$msg = mysql_error();
				}
			}
			if(!$this->isempt($msg)){
				$msg = ''.$base.'数据库名不存在/不能创建';
			}
		}
		
		if($this->isempt($msg)){
			mysql_query("SET NAMES 'utf8'");
			$dburl = ROOT_PATH.'/rainrock.sql';
			if(!file_exists($dburl))$msg = '数据库sql文件不存在';
		}
		if($this->isempt($msg)){
			$sqlss 	= file_get_contents($dburl);
			$a 		= explode(";", $sqlss);
			for($i=0; $i<count($a)-1; $i++){
				$sql 	= $a[$i];
				$sql	= str_replace('`rock_', '`'.$perfix.'', $sql); //前缀替换
				$bo 	= mysql_query($sql, $conn);
				if(!$bo){
					$msg = '导入文件失败:'.mysql_error();
					break;
				}
			}
		}
		if($this->isempt($msg)){
			mysql_query("update `".$perfix."option` set `value`='$title' where `num`='systemtitle'");//系统标题
			$txt = "<?php
return array(
	'url'		=> '$url',		//系统URL
	'title'		=> '$title',	//系统默认标题
	'db_host'	=> '$host',		//数据库地址
	'db_user'	=> '$user',		//用户名
	'db_pass'	=> '$pass',		//密码
	'db_base'	=> '$base',		//数据库名称
	'perfix'	=> '$perfix',	//表名前缀
	'qom'		=> '$qom',		//session、cookie前缀
	'highpass'	=> '$highpass',	//超级管理员密码，可用于登录任何帐号
	'install'	=> true			//已安装，不要去掉啊
);";
			$this->rock->createtxt('webrock/webrockConfig.php', $txt);
		}
		if($this->isempt($msg))$msg = 'success';
		echo $msg;
	}
}