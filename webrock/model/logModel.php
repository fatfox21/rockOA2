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
}