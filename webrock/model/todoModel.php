<?php
class todoClassModel extends Model
{
	/**
		添加通知
	*/
	public function add($uid, $title, $mess, $arrs=array())
	{
		$arr['title']	= $title;
		$arr['mess']	= $mess;
		$arr['status']	= '0';
		$arr['optdt']	= $this->rock->now;
		foreach($arrs as $k=>$v)$arr[$k] = $v;
		$uid	= ''.$uid.'';
		$suid	= explode(',', $uid);
		foreach($suid as $suids){
			$arr['uid']	= $suids;
			$this->insert($arr);
		}
	}
	
	/**
		添加唯一的通知
	*/
	public function addtz($uid, $title, $mess, $table='', $mid='', $url='')
	{
		$where = '';
		if($table != '')$where = " and `table`='$table'";
		if($mid != '')$where .= " and `mid`='$mid'";
		if($where != ''){
			$this->delete("`uid` in($uid) $where");
		}
		
		$this->add($uid, $title, $mess, array(
			'table'	=> $table,
			'mid'	=> $mid,
			'url'	=> $url
		));
	}
	
	public function setyidu($table='', $mid='', $uid=0)
	{
		if($uid==0)$uid=$this->adminid;
		$where = "`table`='$table' and `mid`='$mid' and `uid`='$uid'";
		$this->update('`status`=1', $where);
	}
}