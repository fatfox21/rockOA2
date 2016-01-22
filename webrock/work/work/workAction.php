<?php
class workClassAction extends Action
{
	public function publicaftersave($table, $cans, $id)
	{
		$db = m('tasktime');
		
		$ffsid	= $this->rock->post('plidPost','0');
		$db->record(array('table'=>$table,'mid'=>$id), "id in($ffsid)");
		$db->delete("`table`='$table' and mid='$id' and id not in($ffsid)");
		
		$scdb = m('work');
		$scdb->updatecont($id);
		$scdb->addday($this->date, '', $id);
	}
	
	
	public function getlistwock($table, $rows)
	{
		$dt		= $this->post('dt', $this->date);
		$atype	= (int)$this->post('atype');
		$uid	= $this->post('uid', $this->adminid);
		if($dt > $this->date && $atype==0){
			$rows = m('work')->addday($dt, $uid, '', 'back');
		}
		return array('rows'=>$rows);
	}
	
	public function getwcslistwock($table, $rows)
	{
		$dtc = c('date', true);
		
		foreach($rows as $k=>$rs){
			$sjla = '';
			$sjsj = 0;
			if(!$this->isempt($rs['enddt'])){
				$sjla = $dtc->diffstr($this->now, $rs['enddt'], 'd天H时i分', 1); 
				$sjsj = $dtc->datediff('i', $rs['enddt'],$this->now); 
			}
			$rows[$k]['sjla'] = $sjla;
			$rows[$k]['sjsj'] = $sjsj;
		}
		return array('rows'=>$rows);
	}
	
	//我的任务
	public function getwcslistbefore($table)
	{
		$s = "and mid>1 and instr(concat(',', distid, ','), ',$this->adminid,')";
		$atype = (int)$this->request('atype','0');
		if($atype==1){//未完成
			$s.="  and ifnull(state,'')<>'已完成'";
		}
		if($atype==2){
			$s.="  and ifnull(state,'')='已完成'";
		}
		if($atype==3){//超期
			$s.="  and ifnull(state,'')<>'已完成' and `enddt`<'$this->now'";
		}
		return $s;
	}
	
	//任务报告
	public function workbgaftersave($table, $cans, $id)
	{
		$mid = $cans['mid'];
		m('work')->update("`state`='".$cans['state']."'", $mid);
		
	}
	
	public function getmontlistAjax()
	{
		$enddt		= $this->get('enddt');
		$dt			= $this->get('startdt');
		$uid		= $this->get('uid');
		$dtc 		= c('date', true);
		$jg			= $dtc->datediff('d', $dt, $enddt);
		$dtaa1		= strtotime($this->date);
		
		$dbw		= m('work');
		
		$arr		= array();
		for($i=0; $i<=$jg; $i++){
			if($i>0)$dt = $dtc->adddate($dt, 'd', 1);
			$dtaa2		= strtotime($dt);
			$s = '';
			$col = '';
			if($dtaa2<=$dtaa1){
				$rows = $dbw->getall("dt='$dt' and mid>0 and instr(concat(',', distid, ','), ',$uid,')>0", 'title,state');
				foreach($rows as $a=>$ars){
					$s .= ''.($a+1).'.'.$ars['title'].'('.$ars['state'].')<br>';
				}
			}else{
				$rows = $dbw->addday($dt, $uid, '', 'back');
				foreach($rows as $a=>$ars){
					$s .= ''.($a+1).'.'.$ars['title'].'<br>';
				}
				$col = '#888888';
			}
			$arr[$i+1] = array(
				'str' => '<font color="'.$col.'">'.$s.'</font>'
			);
		}
		echo json_encode($arr);
	}
	
	public function delworkAjax()
	{
		$id		= $this->rock->post('id');
		m('work')->delwork($id);
		echo 'success';
	}
}