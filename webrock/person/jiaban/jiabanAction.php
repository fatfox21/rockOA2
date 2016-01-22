<?php 
class jiabanClassAction extends Action{
	

	public function totalAjax()
	{
		$start	= $this->post('stime');
		$end	= $this->post('etime');
		
		$date	= c('date', true);
		$sj		= $date->datediff('H', $start, $end);
		
		echo json_encode(array($sj, ''));
	}
}