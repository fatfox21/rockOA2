<?php 
class installClassAction extends Action{
	
	public function defaultAction()
	{
		$this->tpltype	= 'html';
		$this->title	= TITLE.'_安装';
	}
	
	public function saveAjax()
	{
		$dbtype 	= $this->post('dbtype');
		$host 		= $this->post('host');
		$user 		= $this->post('user');
		$pass 		= $this->post('pass');
		$base 		= $this->post('base');
		$perfix 	= $this->post('perfix');
		$title 		= $this->post('title');
		$qom 		= $this->post('qom');
		$url 		= $this->post('url');
		$highpass 	= $this->post('highpass');
		$paths 		= 'webrock/webrockConfig.php';
		
		$msg  		= '';
		
		if($dbtype=='mysql' && !function_exists('mysql_connect'))exit('未开启mysql扩展模块');
		if($dbtype=='mysqli' && !class_exists('mysqli'))exit('未开启mysqli扩展模块');
		//if(!is_writable(ROOT_PATH.'/'.$paths))exit('无法写入目录:webrock/');
		
		//1
		$db1 		= import($dbtype);
		$db1->changeattr($host, $user, $pass, 'information_schema');
		$db1->connectdb();
		$msg = $db1->errormsg;
		if(!$this->isempt($msg))exit('用户名/密码有误:'.$msg.'');
		
		
		//2
		$db 		= import($dbtype);
		$db->changeattr($host, $user, $pass, $base);
		$db->connectdb();
		$msg = $db->errormsg;
		if(!$this->isempt($msg)){
			$db1->query("CREATE DATABASE `$base` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci");
		}
		
		$db->connectdb();
		$msg = $db->errormsg;
		if(!$this->isempt($msg))exit('无法创建数据库:'.$msg.'');
		
		
		$dburl = ROOT_PATH.'/rainrock.sql';
		if(!file_exists($dburl))exit('数据库sql文件不存在');
		
		$sqlss 	= file_get_contents($dburl);
		$a 		= explode(";
", $sqlss);
		for($i=0; $i<count($a)-1; $i++){
			$sql 	= $a[$i];
			$sql	= str_replace('`rock_', '`'.$perfix.'', $sql); //前缀替换
			$bo		= $db->query($sql);
			if(!$bo){
				exit('导入失败:'.$db->error().'');
			}
		}
		
		$usql = "update `".$perfix."option` set `value`='$title' where `num`='systemtitle'";
		$db->query($usql);
		
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
	'db_drive'	=> '$dbtype',	//操作数据库驱动
	'install'	=> true			//已安装，不要去掉啊
);";
		$this->rock->createtxt($paths, $txt);
		@file_get_contents('http://www.xh829.com/index.php?m=index&a=install&version='.VERSION.'&ajaxbool=true');//我们用来统计安装数量而已
		echo 'success';
	}
}