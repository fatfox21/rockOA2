<?php
class taskClassAction extends Action
{
	public function taskrestartAjax()
	{
		$msg = c('socket')->sendshell('taskrestart');
		echo $msg;
	}
	public function taskaftershow($table, $rows)
	{
		$db = m('taskuser');
		foreach($rows as $k=>$rs){
			$s = '';
			if($rs['zntx'])$s.=',站内';
			if($rs['emtx'])$s.=',邮件';
			if($s!=''){
				$s = substr($s, 1).'通知';
				$rso = $db->getone("`id`='".$rs['confuid']."'",'recename,chaoname');
				if($rso){
					$s.='<br>接收:'.$rso['recename'].'';
					if(!$this->isempt($rso['chaoname']))$s.=';抄送:'.$rso['chaoname'].'';
				}
			}
			$rows[$k]['todocont'] = $s;
		}
		return array('rows'=>$rows);
	}
	
	public function publicaftersave($table, $cans, $id)
	{
		$ffsid	= $this->rock->post('timeidPost','0');
		$db = m('tasktime');
		$db->record(array('table'=>$table,'mid'=>$id), "id in($ffsid)");
		$db->delete("`table`='$table' and mid='$id' and id not in($ffsid)");
	}
	
	public function gettaketimeAjax()
	{
		$mid	= $this->rock->get('mid');
		$table	= $this->rock->get('table');
		$rows	= m('tasktime')->getall("`table`='$table' and mid='$mid' order by id asc");
		echo  json_encode($rows);
	}

	public function taskqueueAjax()
	{
		$rate	= c('rate', true);
		$ndt	= date('Y-m-d');
		$dt		= $this->rock->post('dt', $ndt);
		$hor	= date('H:i:s');
		if($dt != $ndt)$hor='';
		$rows	= $rate->result('task', $dt, 'and `status`=1', $hor);
		echo json_encode(array(
			'totalCount'=> count($rows),
			'rows'		=> $rows
		));
	}
	
	public function gettaskuserAjax()
	{
		$rows = m('taskuser')->getall('id>0 order by `sort`','id,name');
		echo json_encode($rows);
	}
}