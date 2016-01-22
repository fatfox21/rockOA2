<?php
class taskClassAction extends Action
{
	
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
}