<?php
class setClassAction extends Action
{

	public function setsaveAjax()
	{
		$this->option->setval('systemtitle', $this->post('titlePost'));
		$this->option->setval('systemlogo', $this->post('logoPost'));
		$this->backmsg();
	}
	
	public function getsetAjax()
	{
		$arr= array();
		$arr['title'] = $this->option->getval('systemtitle');
		$arr['logo'] = $this->option->getval('systemlogo', 'images/icons40.png');
		echo json_encode($arr);
	}
}