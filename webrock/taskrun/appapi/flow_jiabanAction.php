<?php 
class flow_jiabanClassAction extends appapiAction{
	
	public function saveAjax()
	{
		$arr = array(
			'kind' 	=> '加班',
			'uid' 	=> $this->adminid,
			'stime' => $this->post('stime'),
			'etime' => $this->post('etime'),
			'totals' => (int)$this->post('totals'),
			'explain' => $this->post('explain'),
			'optdt' => $this->now,
		);
		m('kq_info')->insert($arr);
		$id = $this->db->insert_id();
		
		$msg = $this->submitflow($id);
		$this->showreturn($msg);
	}
	
	public function totalAjax()
	{
		$stime = $this->get('stime','', 1);
		$etime = $this->get('etime','', 1);
		
		$date	= c('date', true);
		$sj		= $date->datediff('H', $stime, $etime);
		
		$this->showreturn($sj);
	}

}