<?php
class workClassModel extends Model
{
	public function updatecont($sid)
	{
		$rs	= $this->getone($sid);
		if(!$rs)return;
		
		$inner['title'] 	= $rs['title'];
		$inner['type'] 		= $rs['type'];
		$inner['grade'] 	= $rs['grade'];
		$inner['distid'] 	= $rs['distid'];
		$inner['dist'] 		= $rs['dist'];
		$inner['explain'] 	= $rs['explain'];
		$inner['baoname'] 	= $rs['baoname'];
		$inner['baoid'] 	= $rs['baoid'];
		$inner['bgtime'] 	= $rs['bgtime'];
		$inner['istx'] 		= $rs['istx'];
		$this->update($inner, "`mid`='$sid'");
	}
	
	
	public function addday($dt, $uid='', $aid='', $btype='')
	{
		$rate	= c('rate', true);
		$cdate	= c('date', true);
		$swhe	= '';
		if($uid != ''){
			$swhe = " and instr(concat(',', distid, ','), ',$uid,')>0";
		}
		$wherea = "and `mid`=0 and `status`=1 $swhe";
		if($aid != '')$wherea.=" and `id`='$aid'";
		
		$rows	= $rate->result('work', $dt, $wherea);
		
		$msid	= '0';
		$ssid	= '0';
		$rowsa	= array();	
		foreach($rows as $k=>$rs){
			$inner				= array(
				'title'	=> $rs['title']
			);
			$inner['mid'] 		= $rs['mid'];
			$inner['type'] 		= $rs['type'];
			$inner['grade'] 	= $rs['grade'];
			$inner['distid'] 	= $rs['distid'];
			$inner['dist'] 		= $rs['dist'];
			$inner['explain'] 	= $rs['explain'];
			$inner['baoname'] 	= $rs['baoname'];
			$inner['baoid'] 	= $rs['baoid'];
			$inner['bgtime'] 	= $rs['bgtime'];
			$inner['startdt'] 	= $rs['runtime'];
			$inner['istx'] 		= $rs['istx'];
			$inner['dt'] 		= $dt;
			$inner['optdt'] 	= $this->rock->now;
			$inner['optid'] 	= $rs['optid'];
			$inner['optname'] 	= $rs['optname'];
			$inner['status'] 	= '0';
			$inner['state'] 	= '待执行';
			
			$enddt				= $this->getent($inner['startdt'], $rs, $cdate);
			$inner['enddt'] 	= $enddt;
			$rowsa[]	= $inner;
			
			if($btype == ''){
				$where	= "`mid`='".$rs['mid']."' and `startdt`='".$inner['startdt']."'";
				$sid	= (int)$this->getmou('id', $where);
				if($sid == 0)$where = '';
				$this->record($inner, $where);
				if($sid == 0)$sid = $this->db->insert_id();
				
				$ssid.=','.$sid.'';
				$msid.=','.$rs['mid'].'';
			}
		}  
		if($btype == '')$this->delete("`mid` in($msid) and id not in($ssid)  and `dt`='$dt' $swhe");
		return $rowsa;
	}
	
	private function getent($dts, $rs, $cdate)
	{
		$sj		= '';
		$wcsj 	= (int)$rs['wcsj'];
		if($wcsj == 0)return '';
		$wclx 	= $rs['wclx'];
		$wctime = $rs['wctime'];
		$lxs  	= '';
		if($wclx == '小时'){
			$sj = $cdate->adddate($dts, 'H', $wcsj);
		}
		if($wclx == '工作日'){
			$wclx = '天';
		}
		if($wclx == '天' || $wclx == '周'){
			if($wclx == '周')$wcsj = $wcsj * 7;
			if($this->rock->isempt($wctime)){
				$sj = $cdate->adddate($dts, 'd', $wcsj);
			}else{
				$sj = $cdate->adddate($dts, 'd', $wcsj, 'Y-m-d');
				$sj	= $sj.' '.$wctime;
			}
		}
		return $sj;
	}
	public function delwork($id)
	{
		$where = "`mid` in($id)";
		$this->db->delete('[Q]todo', "`table` in('work','workbao') and `mid` in(select `id` from `[Q]work` where $where)");
		$this->delete("( $where) or (`id` in($id) ) ");
	}
	
	public function sendbaogao($id, $zt, $cont='')
	{
		$rs = $this->getone($id);
		$this->update("`state`='$zt'", $id);
		if(!$this->isempt($rs['baoid'])){
			$reim	= m('reim');
			$cont 	= ''.$this->adminname.'提交了['.$rs['title'].']的任务报告，任务状态['.$zt.']';
			m('todo')->addtz($rs['baoid'], '任务报告', $cont, 'work', $rs['id']);
			$reim->sendsystem($this->adminid, $rs['baoid'], '项目任务', $cont, 'work', $rs['id']);
		}
	}
	
	public function addworks($mid, $state, $sm)
	{
		$arr = array(
			'mid' 	=> $mid,
			'table' => 'work',
			'state' => $state,
			'explain' => $sm,
			'optdt' => $this->rock->now,
			'optid' => $this->adminid,
			'optname' => $this->adminname
		);
		$this->db->record('[Q]workbg', $arr);
	}
	
	public function getwwctotal($uid)
	{
		$to = $this->getwwcwork($uid,1);
		return $to;
	}
	
	public function getwwcwork($uid, $tlx=0)
	{
		$dt 	= $this->rock->date;
		$where 	= " ((startdt like '$dt%') or (startdt < '$dt' and `enddt` is null)) and (`state`='待执行' or `state` like  '执行中%') and ".$this->rock->dbinstr('distid',$uid);
		if($tlx == 0){
			$rows = $this->getall($where." order by `startdt`",'`type`,`title`,`state`,`startdt`,`grade`');
		}else{
			$rows = $this->rows($where);
		}
		return $rows;
	}
}