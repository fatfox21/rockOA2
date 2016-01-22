<?php 
/**
	*****************************************************************
	* 联系QQ： 290802026/1073744729									*
	* 版  本： V2.0													*
	* 开发者：雨中磐石工作室										*
	* 邮  箱： qqqq2900@126.com										*
	* 网  址： http://www.xh829.com/								*
	* 说  明: 主控制器处理										*
	* 备  注: 未经允许不得商业出售，代码欢迎参考纠正			*
	*****************************************************************
*/

abstract class mainAction{
	
	public $rock;
	public $db;
	public $smarty;
	public $smartydata	= array();	//模版数据
	public $seldata		= array();
	public $display		= true;		//是否显示模板	
	public $bodytitle	= '';		//副标题
	public $keywords	= '';		//关键词
	public $description	= '';		//说明
	public $linkdb		= true;		//是否连接数据库
	public $params		= array();	//参数
	public $now;
	public $date;
	public $ip;
	public $web;
	public $title		= TITLE;
	public $titles		= '';
	public $option;
	public $jm;
	
	public $table;
	public $extentid	= 0;
	public $importjs	= '';		//引入js文件
	public $perfix		= '';
	public $tplname		= '';		//模板文件
	public $tplpath		= '';		//模板文件路径
	
	public function __construct()
	{
		$this->rock		= $GLOBALS['rock'];
		$this->smarty	= $GLOBALS['smarty'];
		$this->jm		= c('jm', true);
		$this->now		= $this->rock->now();
		$this->date		= $this->rock->date;
		$this->ip		= $this->rock->ip;
		$this->web		= $this->rock->web;
		$this->perfix	= PREFIX;
		$this->display	= true;
		$this->initMysql();	
		$this->initConstruct();
		$this->initProject();
		$this->initAction();
		$this->beforeAction();
	}
	
	public function defaultAction(){}
	public function initAction(){}
	public function initProject(){}
	public function afterAction(){}
	public function initMysql(){}
	public function beforeAction(){}
	
	public function T($n)
	{
		return $this->perfix.''.$n;
	}

	private function initConstruct()
	{
		$linkdb			= $this->rock->get('linkdb','true');
		$this->params	= explode('-', $this->rock->get('s'));	//参数
		if($linkdb == 'true' && $this->linkdb){
			$this->initMysqllink();
		}
	}

	private function initMysqllink()
	{
		$this->db		= import('mysql');
		$GLOBALS['db']	= $this->db;
		include_once(''.ROOT_PATH.'/include/Model.php');
		$this->option	= m('option');
	}
	
	private function setBasedata()
	{
		$this->smartydata['bodytitle']	= $this->bodytitle;
		$this->smartydata['keywords']	= $this->keywords;
		$this->smartydata['description']= $this->description;
		$this->smartydata['title']		= $this->title;
		$this->smartydata['titles']		= $this->titles;
		$this->smartydata['rewrite']	= REWRITE;
		$this->smartydata['now']		= $this->now;
		$this->smartydata['ip']			= $this->ip;
		$this->smartydata['url']		= URL;
		$this->smartydata['urly']		= URLY;
	}

	public function setSmartyData()
	{
		$this->setBasedata();
		$this->smarty->assign('URL', URL);
		$this->smarty->assign('PARAMS', $this->rock->get('s'));
		$this->smarty->assign('HOST', HOST);
		$this->smarty->assign('URLY', URLY);
		$this->smarty->assign('TITLE', TITLE);
		$this->smarty->assign('importmode', '');
		$this->smarty->assign('da', $this->smartydata);
	}
	
	public function setHtmlData()
	{
		$this->setBasedata();
	}

	public function getsession($name,$dev='')
	{
		return $this->rock->session(QOM.''.$name.'', $dev);
	}
	
	public function post($na, $dev='', $lx=0)
	{
		return $this->rock->post($na, $dev, $lx);
	}
	
	public function get($na, $dev='', $lx=0)
	{
		return $this->rock->get($na, $dev, $lx);
	}
	
	public function request($na, $dev='', $lx=0)
	{
		return $this->rock->request($na, $dev, $lx);
	}
	
	public function isempt($str)
	{
		return $this->rock->isempt($str);
	}
	
	public function contain($str, $a)
	{
		return $this->rock->contain($str, $a);
	}
	
	public function getcookie($name, $dev='')
	{
		return $this->rock->cookie(QOM.''.$name.'', $dev);
	}
	
	public function stringformat($str, $arr=array())
	{
		return $this->rock->stringformat($str, $arr);
	}
	
	public function getcan($i,$dev='')
	{
		$val	= '';
		if(isset($this->params[$i]))$val=$this->params[$i];
		if($this->rock->isempt($val)){
			$val=$dev;
		}else{
			$val=str_replace('[a]','-',$val);
		}
		return $val;
	}
	
	public function getmnumAjax()
	{
		$mnum	= $this->rock->request('mnum');
		$rows	= $this->option->getmnum($mnum);
		echo json_encode($rows);
	}
}