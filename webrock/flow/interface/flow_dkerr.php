<?php
class dkerrflowClass extends flowChajian
{
	//审核完成了添加到打卡记录
	protected function flowthrough($sm)
	{
		m('kq_dkjl')->insert(array(
			'finge' 	=> $this->urs['finge'],
			'name' 		=> $this->urs['name'],
			'checktime' => $this->rs['dt'].' '.$this->rs['ytime'],
			'type' 		=> '1'
		));
	}
}