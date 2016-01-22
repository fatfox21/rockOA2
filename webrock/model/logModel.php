<?php
class logClassModel extends Model
{
	/**
		添加日志
	*/
	public function addlog($type='', $remark='', $sarr=array())
	{
		$arr['type']	= $type;
		$arr['ip']		= $this->rock->ip;
		$arr['web']		= $this->rock->web;
		$arr['optdt']	= $this->rock->now();
		$arr['remark']	= $remark;
		foreach($sarr as $k=>$v)$arr[$k]=$v;
		$this->insert($arr);
	}
	
	public function addread($table, $mid, $uid=0)
	{
		if($uid==0)$uid=$this->adminid;
		$arr['table']	= $table;
		$arr['mid']		= $mid;
		$arr['ip']		= $this->rock->ip;
		$arr['web']		= $this->rock->web;
		$arr['optdt']	= $this->rock->now();
		$arr['optid']	= $uid;
		m('reads')->insert($arr);
	}
	
	public function getread($table, $uid=0)
	{
		if($uid==0)$uid=$this->adminid;
		$sid = $this->db->getjoinval('[Q]reads','mid',"`table`='$table' and `optid`=$uid group by `mid`");
		if($sid=='')$sid = '0';
		return $sid;
	}
}