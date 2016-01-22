<?php
class flowClassAction extends Action
{
	
	public function checkAjax()
	{
		$flownum	= $this->post('flownum');
		$id			= (int)$this->post('id');
		$zt			= (int)$this->post('zt');
		$sm			= $this->post('sm');
		
		$flow = f($flownum);
		$flow->initrecord($id);
		echo $flow->check($zt,$sm);
	}
	
	public function getinforAjax()
	{
		$rows	= array();
		$log	= array();
		$table	= $this->post('table');
		$mid	= $this->post('mid');
		$where	= "`table`='$table' and `mid`='$mid'";
		
		$rows	= m('flow_log')->getall("$where order by `id`");
		$rs		= m($table)->getone("`id`='$mid'");
		
		if($rs){
			if($rs['isturn']==1 && $rs['status'] != 1){
				$flars = m('flow_rule')->getone($where);
				if($flars){
					$nowuserid	= $flars['nowuserid'];
					$userarr	= explode('|', $flars['alluser']);
					$useridarr	= explode('|', $flars['alluserid']);
					$step		= $flars['step'];
					for($i=0; $i<$flars['allstep']; $i++){
						$zt = 2;
						$oi	= $i+1;
						if($oi<$step)$zt=0;
						if($oi==$step)$zt=1;
						$log[] = array(
							'name'	=> $userarr[$i],
							'zt'	=> $zt
						);
					}
				}
			}
		}
		echo json_encode(array(
			'totalCount'=> 10,
			'rows'		=> $rows,
			'log'		=> $log
		));
	}
	
	public function publicgetdataAjax()
	{
		$table		= $this->request('tablename');
		$flownum	= $this->request('flownum');
		$mid		= (int)$this->request('mid');
		$arr		= m('flowlog')->getdatalog($flownum, $table, $mid);
		echo json_encode($arr);
	}
	

	public function flowdelAjax()
	{
		$id		= (int)$this->post('id', '0');
		$flownum= $this->request('flownum');
		$sm		= $this->post('sm');
		$msg	= '';
		if($id==0 || $flownum=='')$msg='sorry;';
		if($msg==''){
			$flow = f($flownum);
			$flow->initrecord($id);
			$msg = $flow->flowdelete($sm);
		}
		if($msg=='')$msg='success';
		echo $msg;
	}
	
	public function flowzhuijiaAjax()
	{
		$id		= (int)$this->post('idPost', '0');
		$flownum= $this->request('flownumPost');
		$sm		= $this->post('explainPost');
		$fileid	= $this->post('fileidPost');
		$msg	= '';
		if($id==0 || $flownum=='')$msg='sorry;';
		if($msg==''){
			$flow = f($flownum);
			$flow->initrecord($id);
			$msg = $flow->addzhuijia($sm, $fileid);
		}
		$this->backmsg($msg, '追加成功');
	}
}