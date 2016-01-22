<?php 
class flow_dailyClassAction extends appapiAction{
	
	public function saveAjax()
	{
		$msg 	= '';
		$dt	 	= $this->date;
		$dtobj	= c('date', true);
		$dts	= (int)$this->post('dts','0');
		if($dts!=0)$dt = $dtobj->adddate($dt, 'd', $dts);
		
		$db 	= m('daily');
		$tos	= $db->rows("`dt`='$dt' and `uid`='$this->adminid'");
		if($tos >0 ){
			$msg = '['.$dt.']日报已写过了';
		}
		
		if($msg == ''){
			$arr = array(
				'uid' 	=> $this->adminid,
				'dt' 	=> $dt,
				'content' => $this->post('content'),
				'optdt' => $this->now,
				'adddt' => $this->now,
				'type' => '0',
				'optname' => $this->adminname,
			);
			$db->insert($arr);
			$id = $this->db->insert_id();
			$msg= '新增成功';
		}
		$this->showreturn($msg);
	}
}