<?php 
class scheduleClassAction extends Action
{
	public function guanbefore($table)
	{
		$s 	= "and `uid`=$this->adminid";
		$dt = $this->post('dt');
		if($dt !='')$s = m('schedule')->getdtwhere($dt, $this->adminid);
		return $s;
	}
	
	public function publicaftersave($table, $cans, $id)
	{
		/*
		$db = m('tasktime');
		
		$ffsid	= $this->rock->post('plidPost','0');
		$db->record(array('table'=>$table,'mid'=>$id), "id in($ffsid)");
		$db->delete("`table`='$table' and mid='$id' and id not in($ffsid)");
		
		$scdb = m('schedule');
		$scdb->updatecont($id);
		$scdb->addday($this->date, $this->adminid, $id);*/
	}
	
	public function getmontlistAjax()
	{
		$enddt		= $this->get('enddt');
		$dt			= $this->get('startdt');
		$uid		= $this->get('uid');
		$dtc 		= c('date', true);
		$jg			= $dtc->datediff('d', $dt, $enddt);
		$dtaa1		= strtotime($this->date);
		
		$dbw		= m('schedule');
		
		$arr		= array();
		for($i=0; $i<=$jg; $i++){
			if($i>0)$dt = $dtc->adddate($dt, 'd', 1);
			$dtaa2		= strtotime($dt);
			$s 		= '';
			$col 	= '';
			$rows 	= $dbw->getdtarr($dt, $uid);
			foreach($rows as $a=>$ars){
				$s .= ''.($a+1).'.'.$ars['title'].'<br>';
			}
			if($dtaa2==$dtaa1){
				
			}else if($dtaa2<$dtaa1){
				$col = '#888888';
			}else{
				$col = '#888888';
			}
			$arr[$i+1] = array(
				'str' => '<font color="'.$col.'">'.$s.'</font>'
			);
		}
		echo json_encode($arr);
	}
}