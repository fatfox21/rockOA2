<?php
class workClassAction extends Action
{
	public function publicaftersave($table, $cans, $id)
	{
		$db 	= m('tasktime');
		$ndt	= $this->date;
		
		$ffsid	= $this->rock->post('plidPost','0');
		$db->record(array('table'=>$table,'mid'=>$id), "id in($ffsid)");
		$db->delete("`table`='$table' and mid='$id' and id not in($ffsid)");
		
		$scdb = m('work');
		$scdb->updatecont($id);
		$scdb->addday($ndt, '', $id);
		$rowss	= $db->getall("`table`='$table' and mid='$id' and `shijian`<'$ndt' and `atype`='仅一次'",'shijian');
		foreach($rowss as $k=>$rs){
			$dtss = substr($rs['shijian'], 0, 10);
			$scdb->addday($dtss, '', $id);
		}
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
			$sjks = 0;
			if(!$this->isempt($rs['enddt'])){
				$sjla = $dtc->diffstr($this->now, $rs['enddt'], 'd天H时i分', 1); 
				$sjsj = $dtc->datediff('i', $rs['enddt'],$this->now); 
			}
			
			$rows[$k]['sjla'] = $sjla;
			$rows[$k]['sjsj'] = $sjsj;
			$rows[$k]['sjks'] = $dtc->datediff('i', $rs['startdt'],$this->now); 
		
		}
		return array('rows'=>$rows);
	}
	
	//我的任务
	public function getwcslistbefore($table)
	{
		$s = "and mid>0 and instr(concat(',', distid, ','), ',$this->adminid,')>0";
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
		if($atype==10){
			$s = "and mid>0 and instr(concat(',', baoid, ','), ',$this->adminid,')>0";
		}
		
		//列出我下属id
		if($atype==11){
			$dusrt = m('admin')->getdownuser($this->adminid);
			if($dusrt==''){
				$s = 'and 1=2';
			}else{
				$dusrts = explode(',', $dusrt);
				foreach($dusrts as $uids){
					$tjw[] = " instr(concat(',', baoid, ','), ',$uids,')>0 ";
				}
				$s1	= join(' or ', $tjw);
				$s = 'and mid>0 and ('.$s1.')';
			}
		}
		if($atype==12){
			$s = "and mid>0 and `optid`='$this->adminid'";
		}
		return $s;
	}
	
	//任务报告
	public function workbgaftersave($table, $cans, $id)
	{
		$mid = $cans['mid'];
		m('work')->sendbaogao($mid, $cans['state'], $cans['explain']);
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