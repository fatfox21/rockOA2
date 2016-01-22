<?php 
/**
	*****************************************************************
	* 联系QQ： 290802026/1073744729									*
	* 版  本： V2.0													*
	* 开发者：雨中磐石工作室										*
	* 邮  箱： qqqq2900@126.com										*
	* 网  址： http://www.xh829.com/								*
	* 说  明: 数据模型											*
	* 备  注: 未经允许不得商业出售，代码欢迎参考纠正			*
	*****************************************************************
*/

abstract class Model{
	
	public 	$perfix		= PREFIX;
	public	$rock;
	public 	$db;
	public  $table;
	public 	$adminname;
	public 	$adminid;
	
	public function __construct($table='')
	{
		$this->rock			= $GLOBALS['rock'];
		$this->db			= $GLOBALS['db'];
		$this->adminid		= (int)$this->rock->session(QOM.'adminid',0);
		$this->adminname	= $this->rock->session(QOM.'adminname');
		$this->settable($table);
		$this->initModel();
	}
	
	public function settable($table)
	{
		$this->table	= ''.$this->perfix.''.$table.'';
	}
	
	public function initModel(){}
	

	public function getmou($fields, $where)
	{
		return $this->db->getmou($this->table, $fields, $this->getwhere($where));
	}

	public function getone($where, $fields='*')
	{
		return $this->db->getone($this->table, $this->getwhere($where), $fields);
	}
	
	public function getall($where, $fields='*')
	{
		$sql	= "select $fields from `$this->table` a where $where";
		return $this->db->getall($sql);
	}
	
	public function getarr($where, $fields='*', $kfied='id')
	{
		return $this->db->getarr($this->table, $this->getwhere($where), $fields, $kfied);
	}
	public function rows($where)
	{
		return $this->db->rows($this->table, $this->getwhere($where));
	}

	public function query($where, $fields='*')
	{
		$sql	= "select $fields from `$this->table` a where $where";
		return $this->db->query($sql);
	}
	
	public function record($arr, $where='')
	{
		return $this->db->record($this->table, $arr, $this->getwhere($where));
	}
	
	public function update($arr,$where)
	{
		return $this->record($arr, $where);
	}
	
	public function insert($arr)
	{
		return $this->record($arr, '');
	}
	
	private function getwhere($where='')
	{
		if(is_numeric($where))$where = "`id`='$where'";
		return $where;
	}
	
	public function getfields()
	{
		return $this->db->getallfields($this->table);
	}
	
	public function delete($where)
	{
		return  $this->db->delete($this->table, $this->getwhere($where));
	}
	
	public function getlimit($where, $page=1, $fields='*', $order='', $limit=20)
	{
		if($order != '')$order = 'order by '.$order.'';
		
		$sql 		= "select $fields from $this->table where $where $order ";
		$count		= $this->rows($where);
		$maxpage	= ceil($count/$limit);
		if($page > $maxpage)$page=$maxpage;
		if($page <= 0)$page=1;
		$sql	.= "limit ".($page-1)*$limit.",$limit";
		$rows	 = $this->db->getall($sql);
		
		return array(
			'rows'		=> $rows,
			'count'		=> $count,
			'maxpage'  	=> $maxpage,
			'page'		=> $page,
			'limit'		=> $limit,
			'prevpage'	=> $page-1,
			'nextpage'	=> $page+1,
			'url'		=> ''
		);
	}
	
	public function isempt($str)
	{
		return $this->rock->isempt($str);
	}
	
	public function contain($str, $s1)
	{
		return $this->rock->contain($str, $s1);
	}
}

class sModel extends Model{}