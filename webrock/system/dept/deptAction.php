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
		if($this->contain($type, 'all')){
			$rows[] = array(
				'name' => '全体人员',
				'id' => 'all',
				'type' => 'a',
				'did' => 'all',
				'uid' => 'all',
				'checked' => false,
				'leaf' => true
			);
		}
		echo json_encode(array(
			'root'	=>'.',
			'children'=>$rows
		));
	}
	
	public function getcompanydataAjax()
	{
		$rows = m('company')->getall('id>0 order by `sort`','`id`,`name`');
		echo json_encode($rows);
	}
}