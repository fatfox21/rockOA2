<?php 
class appapiAction extends Action{
	
	private $appapikey = '2109358cd991df189b0c99fb21004d12';
	public $splittime = 0;
	
	public function initAction()
	{
		$msg 		= '';
		$time 		= time();
		$appapikey	= $this->rock->jm->base64decode($this->get('appapikey'));
		$timekey	= floatval($this->get('timekey','0'))/1000;
		$this->splittime = (int)($time - $timekey);
		if(md5($appapikey) != $this->appapikey)$msg = 'apikey invalid';
		if($msg == '' && A!='checklogin'){
			$time1 = $time - 3;
			$time2 = $time + 3;
			if($timekey>$time2 || $timekey<$time1)$msg = 'timekey invalid';
		}
		if($msg != ''){
			$this->showreturn('', $msg);
			exit();
		}
		$db 	= m('admin');
		$this->adminid 		= (int)$this->get('adminid','0');
		$this->adminname 	= $db->getmou('name', "`id`='$this->adminid'");
		$this->rock->adminid= $this->adminid;
		$this->rock->adminname = $this->adminname;
		$db->update("`applastdt`='$this->now'", "`id`='$this->adminid'");
	}
	
	public function showreturn($arr, $msg='')
	{
		echo json_encode(
			array(
				'code' 	=> 200,
				'msg'	=> $msg,
				'data'	=> $arr
			)
		);
	}
	
	public function submitflow($id)
	{
		$flownum 	= $this->request('flownum');
		$flow 		= f($flownum);
		$flow->adminid 		= $this->adminid;
		$flow->adminname 	= $this->adminname;
		$flow->initrecord($id);
		$msg 		= $flow->submit(1);
		return $msg;
	}
}