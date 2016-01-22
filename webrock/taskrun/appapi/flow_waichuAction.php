<?php 
class flow_waichuClassAction extends appapiAction{
	
	public function saveAjax()
	{
		$arr = array(
			'uid' 	=> $this->adminid,
			'optid' => $this->adminid,
			'atype' => $this->post('atype'),
			'outtime' => $this->post('outtime'),
			'intime' => $this->post('intime'),
			'address' => $this->post('address'),
			'reason' => $this->post('reason'),
			'explain' => $this->post('explain'),
			'optdt' 	=> $this->now,
			'applydt' 	=> $this->date
		);
		m('kq_out')->insert($arr);
		$id = $this->db->insert_id();
		
		$msg = $this->submitflow($id);
		$this->showreturn($msg);
	}
}