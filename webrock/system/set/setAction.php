<?php
class setClassAction extends Action
{

	public function setsaveAjax()
	{
		$msg = '';
		if($this->contain(URL, '211.149.234.93')){
			$msg = '请不要修改，谢谢';
		}else{
			$this->option->setval('systemtitle', $this->post('titlePost'));
			$this->option->setval('systemlogo', $this->post('logoPost'));
		}
		$this->backmsg($msg);
	}
	
	public function getsetAjax()
	{
		$arr= array();
		$arr['title'] = $this->option->getval('systemtitle');
		$arr['logo'] = $this->option->getval('systemlogo', 'images/icons40.png');
		echo json_encode($arr);
	}
}