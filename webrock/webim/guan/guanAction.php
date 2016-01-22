<?php
class guanClassAction extends Action
{
	public function groupuserafter($table, $rows)
	{
		$dbs = m('admin');
		foreach($rows as $k=>$rs){
			$rs1 = $dbs->getone($rs['uid'],'`name`,`deptname`,`state`');
			if($rs1){
				$rows[$k]['name'] 	  = $rs1['name'];
				$rows[$k]['deptname'] = $rs1['deptname'];
			}else{
				$rows[$k]['name'] 	  = '不存在';
			}
		}
		return array('rows'=>$rows);
	}
	
	public function adduserAjax()
	{
		$gid = $this->post('gid');
		$val = $this->post('val');
		$dbs = m('admin');
		$suid= $dbs->gjoin($val);
		if($suid != ''){
			$ouid = $this->db->getjoinval('[Q]im_groupuser','uid',"`gid`='$gid'");
			if($this->isempt($ouid))$ouid='0';
			$this->db->insert('[Q]im_groupuser','gid,uid,adddt',"select '$gid',`id`,'$this->now' from [Q]admin where `id` in($suid) and `id` not in($ouid)", true);
		}
		echo '添加成功';
	}
	
	public function setsaveAjax()
	{
		$this->option->setval('reimipsystem', $this->post('ipPost'));
		$this->option->setval('reimportsystem', $this->post('portPost'));
		$this->backmsg();
	}
	
	public function getsetAjax()
	{
		$arr= array();
		$arr['ip'] 		= $this->option->getval('reimipsystem');
		$arr['port'] 	= $this->option->getval('reimportsystem');
		echo json_encode($arr);
	}
}