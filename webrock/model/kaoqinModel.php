<?php
class kaoqinClassModel extends Model
{
	
	
	public function initModel()
	{
		$this->settable('kq_info');
	}
	
	
	/**
		计算剩余假期时间
	*/
	public function getqjsytime($uid, $type, $dt, $id)
	{
		$types 	= '增加'.$type.'';
		if($type=='调休')$types='加班';
		$to1	= (int)$this->getmou("sum(totals)", "`kind`='请假' and `qjkind`='$type' and `uid`='$uid'  and `status` <>5 and `id`<>$id ");
		$zto	= (int)$this->getmou("sum(totals)", "`kind`='$types' and `uid`='$uid'  and `status`=1 and `stime`<='$dt'");
		
		return $zto - $to1;
	}
}