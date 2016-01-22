<?php
class assetsClassAction extends Action
{
	public function upassetmstate($table, $cans, $id)
	{
		m('assetm')->record(array('state'=>$cans['state']), $cans['mid']);
	}
	
	//创建编号
	public function autopannum($table, $cans, $id)
	{
		$num	= $cans['num'];
		if($this->isempt($num)){
			$qz = m('option')->getmou('value',"`mnum`='assetstype' and `name`='".$cans['typename']."'");
			if($this->isempt($qz))$qz = 'ZC';
			$num = $this->db->sericnum(''.$qz.'-', '[Q]assetm','num');
		}
		$arr['num']	= $num;
		return array('rows'=>$arr);
	}
}