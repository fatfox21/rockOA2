<?php 
class workClassAction extends appapiAction{
	
	public function getdataAjax()
	{
		$page		= (int)$this->request('page','1');
		$protype	= (int)$this->request('atype','0');
		$uid 		= $this->adminid;
		$s 			= $this->rock->dbinstr('distid', $uid);
		$dt 		= $this->date;
		
		//未完成
		if($protype ==0){
			$s.= " and `startdt`<='$dt 23:59:59' and `state` in('待执行','执行中')";
		}
		//今日任务
		if($protype ==1){
			$s.= " and ((`dt`='$dt') or (`dt`<'$dt' and `state` in('待执行','执行中')))";
		}
		//报告给我的
		if($protype ==2){
			$s 		= $this->rock->dbinstr('baoid', $uid);
		}
		//我创建的
		if($protype ==3){
			$s 		= "`optid`=$uid";
		}
		//所有
		if($protype ==4){
			
		}

		$fen 		= 10;
		$count 		= $this->db->rows("[Q]work", "mid>0 and $s");
		$sql		= "select `id`,`type`,`title`,`state`,`startdt`,`enddt`,`dist`,`grade`,`baoname`,`bgtime`,`explain`,`optname` from `[Q]work` where mid>0 and $s order by `startdt` desc limit ".(($page-1)*$fen).",".$fen."";
		$rows 		= $this->db->getall($sql);
		$dtc 		= c('date');
		foreach($rows as $k=>$rs){
			$zt = $rs['state'];
			$zts = $rs['state'];
			if($zt=='执行中'){
				$zt = '<font color=#ff6600>'.$zt.'</font>';
			}
			if($zt=='已完成'){
				$zt = '<font color=green>'.$zt.'</font>';
			}
			if(!$this->isempt($rs['enddt']) &&  ($zts=='待执行'||$zts=='执行中')){
				$sjla = $dtc->diffstr($this->now, $rs['enddt'], 'd天H时i分', 1); 
				$sjsj = $dtc->datediff('i', $rs['enddt'],$this->now);
				if($sjsj>0)$zt.='<font color=red>超'.$sjla.'</font>';	
			}
			$rows[$k]['state'] = $zt;
		}
		$maxpage	= ceil($count/$fen);
		$this->showreturn(array(
			'rows'	=> $rows,
			'count' => $count,
			'maxpage' => $maxpage,
			'page' => $page,
		));
	}
	
	
	public function xiangAjax()
	{
		$mid 	= $this->get('mid');
		$rs 	= m('work')->getone("`id`='$mid'");
		$dtc 	= c('date');
		$zt = $rs['state'];
		$zts = $rs['state'];
		if($zt=='执行中'){
			$zt = '<font color=#ff6600>'.$zt.'</font>';
		}
		if($zt=='已完成'){
			$zt = '<font color=green>'.$zt.'</font>';
		}
		if(!$this->isempt($rs['enddt']) && ($zts=='待执行'||$zts=='执行中')){
			$sjla = $dtc->diffstr($this->now, $rs['enddt'], 'd天H时i分', 1); 
			$sjsj = $dtc->datediff('i', $rs['enddt'],$this->now);
			if($sjsj>0)$zt.='<font color=red>超'.$sjla.'</font>';	
		}
		$rs['zt'] = $zt;
		$rs['logarr'] = m('workbg')->getall("mid='$mid' order by id desc", '`state`,`explain`,`optdt`,`optname`');
		$isbg 		 = 0;
		if($this->contain(','.$rs['distid'].',',','.$this->adminid.','))$isbg = 1;
		$rs['isbg'] = $isbg;
		$this->showreturn($rs);
	}

	public function savebgAjax()
	{
		$mid 	= $this->post('mid');
		$state 	= $this->post('state');
		$sm 	= $this->post('explain');
		$arr 	= array(
			'mid' => $mid,
			'state' => $state,
			'explain' => $sm,
			'optdt' => $this->now,
			'optid' => $this->adminid,
			'optname' => $this->adminname
		);
		m('workbg')->insert($arr);
		m('work')->sendbaogao($mid, $state);
		$this->showreturn('保存成功');
	}
}