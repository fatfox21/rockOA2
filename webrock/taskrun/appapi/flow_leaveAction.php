<?php 
class flow_leaveClassAction extends appapiAction{
	
	public function saveAjax()
	{
		$arr = array(
			'kind' 	=> '请假',
			'uid' 	=> $this->adminid,
			'qjkind' => $this->post('qjkind'),
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
		$sj 	= ceil(m('kq')->getsbtime($stime, $etime));
		
		$this->showreturn($sj);
	}

}