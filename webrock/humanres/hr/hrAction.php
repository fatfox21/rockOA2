<?php
class hrClassAction extends Action
{
	public function getuinfAjax()
	{
		$urs = m('admin')->getone($this->adminid,'`id`,`ranking`,`workdate`');
		echo json_encode($urs);
	}
	
	public function hrendundAjax()
	{
		$urs 	= m('admin')->getone($this->adminid,'`id`,`ranking`,`workdate`');
		$reson 	= $this->option->getmnum('redundreson');
		echo json_encode(array('urs' => $urs, 'reson'=> $reson));
	}
	
	public function hrredundbefore($table, $cans, $id)
	{
		$msg = '';
		$to		= m($table)->rows("`uid`='".$cans['uid']."' and `id`<>$id  and `status` in(0,2)");
		if($to>0){
			$msg = '该人员已申请过离职申请，请不要重复申请';
		}
		return array('msg'=>$msg);
	}
	
	public function positivebefore($table, $cans, $id)
	{
		$msg = '';
		$to		= m($table)->rows("`uid`='".$cans['uid']."' and `id`<>$id  and `status` in(0,2)");
		if($to>0){
			$msg = '该人员已申请过转正申请，请不要重复申请';
		}
		return array('msg'=>$msg);
	}
}