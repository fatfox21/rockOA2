<?php
/**
	*****************************************************************
	* 联系QQ： 290802026/1073744729									*
	* 版  本： V2.0													*
	* 开发者：雨中磐石工作室										*
	* 邮  箱： qqqq2900@126.com										*
	* 网  址： http://www.xh829.com/								*
	* 说  明: 数据库核心类										*
	* 备  注: 未经允许不得商业出售，代码欢迎参考纠正			*
	*****************************************************************
*/ 
abstract class mysql{
	
	public $conn		= null; 
	public $iudcount	= 0;
	public $iudarr		= array();
	public $tran		= false;
	
	public  $nowsql;
	public  $countsql	= 0;
	public  $sqlarr		= array();
	public  $total		= 0;
	public  $count		= 0;
	public 	$perfix		= PREFIX;
	public  $errorbool	= false;
	public  $errormsg	= '';
	public  $nowerror	= false;
	public  $basename;
	
	protected $db_host 	= DB_HOST;
	protected $db_user	= DB_USER;
	protected $db_pass	= DB_PASS;
	protected $db_base	= DB_BASE;
	

	public function __construct()
	{
		$this->errorbool	= false;
		$this->errormsg		= '';
	} 

	public function __destruct()
	{
		if($this->conn){
			$this->tranend();
			$this->close();
		}
	}

	protected function connect(){}
	protected function selectdb($name)
	{
		$this->basename	= $name;
	}
	
	protected function querysql($sql){return false;}
	
	protected function starttran(){}
	protected function endtran($bo){}
	
	public function fetch_array($res, $type=0){return false;}
	public function insert_id(){return 0;}
	
	public function error(){return '';}
	public function close(){}
	
	
	public function changeattr($host, $user, $pass, $base)
	{
		$this->db_host	= $host;
		$this->db_user	= $user;
		$this->db_pass	= $pass;
		$this->db_base	= $base;
	}
	
	public function connectdb()
	{
		$this->errormsg	= '';
		$this->connect();
		return $this->conn;
	}
	
	public function query($sql, $ebo=true)
	{
		if($this->conn == null)$this->connect();
		$sql	= trim($sql);
		$sql	= str_replace(array('[Q]', '[date]', '[now]'), array($this->perfix, date('Y-m-d'), date('Y-m-d H:i:s')), $sql);
		$this->countsql++;
		$this->sqlarr[]	= $sql;
		$this->nowsql	= $sql;
		$this->count 	= 0;
		$rsbool			= $this->querysql($sql);
		$this->nowerror	= false;
		if(!$rsbool)$this->nowerror = true;
		if(!$rsbool && DEBUG && $ebo){
			$rock	= $GLOBALS['rock'];
			$fdir	= ''.ROOT_PATH.'/log/'.date('Y-m').'';
			if(!file_exists($fdir))mkdir($fdir);
			$fname	= ''.$fdir.'/mysqli'.date('YmdHis').'_'.rand(1000,9000).'.log';
			$txt	= '[错误SQL]：'.$sql.'----------原因：'.$this->error().'';
			$fc	= fopen($fname,'w');
			fwrite($fc, $txt);
			fclose($fc);
		}
		return $rsbool;
	}
	
	public function execsql($sql)
	{
		return $this->query($sql);
	}
	
	public function getone($table,$where,$fields='*')
	{
		$sql="select $fields from $table where $where limit 1";
		$res=$this->query($sql);
		if($res){
			$row=$this->fetch_array($res);
			return $row;
		}else{
			return false;
		}
	}
	
	public function getall($sql)
	{
		$res=$this->query($sql);
		$arr=array();
		if($res){
			while($row=$this->fetch_array($res)){
				$arr[]	= $row;
				$this->count++;
			}
		}
		return $arr;
	}

	public function getarr($table, $where, $fields='*', $kfied='id')
	{
		$sql = "select `$kfied`,$fields from $table where $where";
		$res = $this->query($sql);
		$arr = array();
		if($res){
			while($row=$this->fetch_array($res)){
				$arr[$row[$kfied]]	= $row;
				$this->count++;
			}
		}
		return $arr;
	}	

	/**
		读取全部同时将第一个字段作为主键(读取的数据存在数组里)
	*/	
	public function getkeyall($table,$fields,$where='')
	{
		$sql="select $fields from $table ";
		if($where!='')$sql.=" where $where";
		$res=$this->query($sql);
		$arr=array();
		if($res){
			while(list($ka,$ab) = $this->fetch_array($res, 1)){
				$arr[$ka]=$ab;
				$this->count++;
			}
		}
		return $arr;
	}
	
	/**
		读取一条sql语句用规定字符连接起来
	*/	
	public function getjoinval($table,$fields,$where='',$join=',')
	{
		$sql="select $fields from $table ";
		if($where!='')$sql.=" where $where";
		$res=$this->query($sql);
		$arr=array();
		if($res){
			while(list($kv) = $this->fetch_array($res, 1)){
				$arr[]=$kv;
				$this->count++;
			}
		}
		return join($join,$arr);
	}	
	
	/**
		读取某行某字段的
	*/	
	public function getmou($table,$fields,$where)
	{
		$sql="select $fields from $table where $where";
		$res=$this->query($sql);
		if($res){
			$row = $this->fetch_array($res, 1);
			$this->count = 1;
			return $row[0];
		}else{
			return false;
		}
	}	

	/**
		启用事务
	*/	
	private function tranbegin($sql)
	{
		if($this->errorbool)return false;
		if($this->conn == null)$this->connect();
		$this->iudcount++;
		if(!$this->tran){
			$this->starttran();
			$this->tran=true;
		}
		$rsa	= $this->query($sql);
		$this->iudarr[]=$rsa;
		if(!$rsa)$this->errorbool = true;
		return $rsa;
	}
	
	/**
		事务结束
	*/	
	private function tranend()
	{
		if($this->tran){
			$this->endtran($this->backsql());
		}
		$this->tran=false;
	}
	
	/**
		判断插入更新删除sql语句是否有错
	*/	
	public function backsql()
	{
		$subt=true;
		foreach($this->iudarr as $tra){
			if(!$tra){
				$subt=false;
				break;
			}
		}	
		return $subt;	
	}

	public function insert($table,$name,$values,$sel=false)
	{
		$sql="insert into `$table` ($name) ";
		if(!$sel){
			$sql.="values($values)";
		}else{
			$sql.=$values;
		}
		return $this->tranbegin($sql);
	}

	public function update($table,$content,$where)
	{
		$sql="update `$table` set $content where $where ";
		return $this->tranbegin($sql);
	}	

	public function delete($table,$where)
	{
		$sql="delete from `$table` where $where ";
		return $this->tranbegin($sql);
	}
	
	/**
		记录添加修改
	*/	
	public function record($table,$array,$where='')
	{
		$addbool  	= true;
		if($where != '')$addbool=false;
		$cont		= '';
		if(is_array($array)){
			foreach($array as $key=>$val){
				$cont.=",`$key`=".$this->toaddval($val)."";
			}
			$cont	= substr($cont,1);
		}else{
			$cont	= $array;
		}
		if($addbool){
			$sql="insert into `$table` set $cont";
		}else{
			$sql="update `$table` set $cont where $where";
		}
		return $this->tranbegin($sql);
	}
	
	/**
		返回总条数
	*/	
	public function rows($table,$where,$rowtype='count(1)'){
		return (int)$this->getmou($table,$rowtype,$where);
	}

	/**
		返回所有数据库的表
	*/	
	public function getalltable()
	{	
		$sql = "select `TABLE_NAME` from information_schema.`TABLES` where `TABLE_SCHEMA`='$this->basename'";
		$arr = $this->getall($sql);
		$rows= array();
		foreach($arr as $k=>$rs)$rows[] = $rs['TABLE_NAME'];
		return $rows;
	}
	
	/**
		返回表所有字段
	*/	
	public function getallfields($table)
	{
		return array();
	}
	
	public function getfields($table)
	{
		$f	= $this->getallfields($table);
		foreach($f as $f1)$arr[$f1]='';
		return $arr;
	}
	
	public function gettablefields($table)
	{
		$sql	= "select COLUMN_NAME as `name`,DATA_TYPE as `type`,COLUMN_COMMENT as `explain`,COLUMN_TYPE as `types` from information_schema.COLUMNS where `TABLE_NAME`='$table' and `TABLE_SCHEMA` ='".DB_BASE."' order by `ORDINAL_POSITION`";
		return $this->getall($sql);
	}
	
	/**
		读取表结构
	*/
	public function gettablecolumn($table, $fields='')
	{
		$where 	= '';
		if($fields!='')$where = "and `COLUMN_NAME`='$fields'";
		$sql 	= "select COLUMN_NAME as `name`,DATA_TYPE as `type`,COLUMN_COMMENT as `explain`,COLUMN_TYPE as `types`,COLUMN_DEFAULT as 'defval' from information_schema.COLUMNS where `TABLE_NAME`='$table' and `TABLE_SCHEMA` ='".DB_BASE."' $where order by `ORDINAL_POSITION`";	
		$arr 	= $this->getall($sql);
		$rows 	= array();
		foreach($arr as $k=>$rs){
			$dev 	= 'NULL';
			if(!$this->isempt($rs['defval']))$dev=$rs['defval'];
			$str 	= "`".$rs['name']."` ".$rs['types']." DEFAULT ".$dev."";
			
			if(!$this->isempt($rs['explain']))$str.=" COMMENT '".$rs['explain']."'";
			$rows[] = $str;
		}
		return $rows;
	}
	
	public function showcreatetable($table)
	{
		$sql = "show create table `$table`";
		$res= $this->query($sql);
		list($ka,$nr) = $this->fetch_array($res, 1);
		return $nr;
	}

	/**
		判断变量是否为空
	*/	
	public function isempt($str)
	{
		$bool=false;
		if( ($str==''||$str==NULL||empty($str)) && (!is_numeric($str)) )$bool=true;
		return $bool;
	}
	
	/**
		转换数据库可插入的对象
	*/	
	public function toaddval($str)
	{
		$adstr="'$str'";
		if($this->isempt($str)){
			$adstr='null';
		}elseif(substr($str,0,1)=='{'&&substr($str,-1)=='}'){
			//$adstr=substr($str,1,-1);
		}
		return $adstr;
	}
	
	/**
		创建随机编号
	*/		
	public function ranknum($table,$field='num',$n=6, $dx=0)
	{
		$arr	= array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
		$num	= '';
		for($i=1;$i<=$n;$i++)$num.=$arr[rand(0,count($arr)-1)];
		if($dx==1)$num	= strtoupper($num);//转换成大写
		$rsnum	= $this->getmou($table,$field,"`$field`='$num'");
		return ($rsnum)?$this->ranknum($table,$field,$n, $dx):$num;		
	}
	
	/**
		流水编号
	*/		
	public function sericnum($num, $table,$fields='sericnum')
	{
		$ymd 	= date('Ymd');
		$ym 	= date('Ym');
		$num	= str_replace('Ymd', $ymd, $num);
		$num	= str_replace('Ym', $ym, $num);
		$max	= (int)$this->getmou($table, "max(cast(replace(`$fields`,'$num','') as decimal(10)))","`$fields` like '".$num."%'");
		$max++;
		if($max<10){
			$num.='000'.$max.'';
		}elseif($max<100){
			$num.='00'.$max.'';	
		}elseif($max<1000){
			$num.='0'.$max.'';	
		}else{
			$num.=''.$max.'';
		}
		return $num;
	}	
	
	/**
		获取所有顶级信息连接起来
		$table	表名
		$pfields	上级字段
	*/
	private $joinarr=array();
	public function getpval($table,$pfields,$jfield,$afid,$plit='/',$afield='id',$maxlen=5)
	{
		$this->joinarr	= array();
		$this->joinlen	= 0;
		$this->getpvala($table,$pfields,$jfield,$afid,$afield,$maxlen);
		return join($plit,array_reverse($this->joinarr));
	}
	private function getpvala($table,$pfields,$jfield,$afid,$afield,$maxlen)
	{
		if(count($this->joinarr)>=$maxlen)return;
		$rsa	= $this->getone($table,"`$afield`='$afid'","`id`,`$pfields`,`$jfield`");
		if($rsa){
			$this->joinarr[]=$rsa[$jfield];
			$pid	= $rsa[$pfields];
			if($pid!=$afid)if($this->rows($table,"`$afield`='$pid'")>0)$this->getpvala($table,$pfields,$jfield,$pid,$afield,$maxlen);
		}
	}
}