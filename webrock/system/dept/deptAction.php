<?php
class deptClassAction extends Action
{
	
	public function publicaftersave($table, $cans, $id)
	{
		m('admin')->record(array('deptname'=>$cans['name']), "`deptid`='$id'");
	}
	
	public function getdeptAjax()
	{
		$type 	= $this->request('changetype');
		$val 	= $this->request('val');
		$pid	= 0;
		$rows	= m('dept')->getdept($pid, $type);
		echo json_encode(array(
			'root'	=>'.',
			'children'=>$rows
		));
	}
}