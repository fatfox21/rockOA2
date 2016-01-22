<?php 
class dailyClassAction extends Action{
	
	
	public function setsaveAjax()
	{
		$val = $this->post('valuePost').','.$this->post('typePost');
		$this->option->setval('dailyset', $val);
		$this->backmsg();
	}
	
	public function getsetAjax()
	{
		$arr= array();
		$arr['set'] = $this->option->getval('dailyset');
		echo json_encode($arr);
	}
}