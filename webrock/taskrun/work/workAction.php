<?php 
/**
	工作任务
*/
class workClassAction extends Action{
	
	public function getlistAjax()
	{
		$db		= m('work');
		$dt		= $this->post('dt', $this->date);
		$uid	= $this->post('uid');
		$db->addday($dt, $uid);//工作任务

		//m('schedule')->addday($dt, $uid);//日程事务
		echo 'success';
	}
}