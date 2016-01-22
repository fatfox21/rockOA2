<?php 
class reimClassAction extends appapiAction{
	
	
	
	public function senduserAjax()
	{
		$arr = array(
			'cont'		=> $this->post('cont'),
			'sendid'	=> $this->post('sendid'),
			'receid'	=> $this->post('receid'),
			'type'		=> $this->post('type'),
			'optdt'		=> $this->post('optdt'),
			'zt'		=> '0',
			'ftype'		=> '1'
		);
		$arr['receuid'] = $arr['sendid'].','.$arr['receid'];
		$bo = m('im_mess')->insert($arr);
		$arr['id'] 		= $this->db->insert_id();
		$arr['nuid'] 	= $this->post('nuid');
		
		//推送发送
		$tsmsg = c('socket',true)->send($arr['sendid'], $arr['receid'], array(
			'cont' 	=> $this->jm->uncrypt($arr['cont']),
			'type' 	=> $arr['type'],
			'now' 	=> $arr['optdt'],
			'messid' => $arr['id']
		));
		$this->showreturn($arr);
	}
	
	public function getmessAjax()
	{
		$messid	= $this->request('messid', '0'); 
		$rs 	= m('im_mess')->getone("`id`='$messid'");
		if($rs)$this->setyd($messid, $rs['receid']);
		$this->showreturn($rs);
	}
	
	/**
		设置已读
	*/
	private function setyd($ids, $receid)
	{
		m('reim')->setyd($ids, $receid);
	}
	
	//获取个人未读信息
	public function getwdmesslistAjax()
	{
		$type 	= $this->get('type');
		$dt 	= $this->date;
		$aid 	= $this->get('aid');
		$receid = $this->get('receid');
		$maxid 	= (int)$this->get('maxmessid');
		$db 	= m('im_mess');
		
		$where1	= "`type`='$type' and `zt`=0 and `receid`='$aid' and `sendid`='$receid'";
		$wetoa	= $db->rows($where1);
		
		$where	= "`id`>$maxid ";
		if($maxid==0)$where .= " and `optdt` like '$dt%'";
		
		$where 	= "$where and `type`='$type' and ((`receid`='$aid' and `sendid`='$receid') or (`sendid`='$aid' and `receid`='$receid')) order by `id` asc limit 50";
		if($wetoa>0)$where = "$where1 order by `id` asc";
		$rows 	= $db->getall($where);
		$len	= 0;
		$ids 	= '0';
		foreach($rows as $k=>$rs){
			$len++;
			if($rs['zt']==0)$ids .= ','.$rs['id'].'';
		}
		if($ids!='0')$this->setyd($ids, $aid);
		
		$rowss = array();
		for($i=$len-1; $i>=0; $i--)$rowss[]=$rows[$i];
		$this->showreturn($rowss);
	}
	
	//获取组未读
	public function getwdgrouplistAjax()
	{
		$dbws	= m('reim');
		$type 	= $this->get('type');
		$dt 	= $this->date;
		$tblx 	= (int)$this->get('tblx','0');
		$uid 	= $this->get('aid');
		$maxid 	= (int)$this->get('maxmessid');
		$receid = $this->get('receid');
		$whes	= $this->rock->dbinstr('receuid', $uid);
		$order 	= '';
		$where 	= "`id` in(select `mid` from `[Q]im_messzt` where `uid`='$uid')";
		$where	= "`id`>$maxid ";
		if($maxid==0)$where .= " and `optdt` <= '$dt 23:59:59'";
		
		$wdtotal= $dbws->getweitotal($uid, $type, $receid);
		$wdwhere= $dbws->getweitotal($uid, $type, $receid, 1);
		
		$zwhere = " $where and `receid`='$receid' and `type`='$type' and $whes order by `id` asc limit 20";
		if($wdtotal > 0){
			$zwhere = " $wdwhere order by `id` asc limit 20";
		}
		
		$rows	= $dbws->getall($zwhere, 'optdt,zt,id,cont,sendid,`table`,mid');
		$ids 	= '0';
		$suids	= '0';
		$len 	= 0;
		foreach($rows as $k=>$rs){
			$len++;
			$ids .= ','.$rs['id'].'';
			$suids.= ','.$rs['sendid'];
			$wdtotal--;
		}
		if($suids != '0' && $type!='system'){
			$farr	= $this->db->getarr('[Q]admin', "`id` in($suids)",'`face`,`name`');
			foreach($rows as $k=>$rs){
				$face =  $name = '';
				if(isset($farr[$rs['sendid']])){
					$face = $farr[$rs['sendid']]['face'];
					$name = $farr[$rs['sendid']]['name'];
				}	
				if($this->isempt($face))$face='';
				$rows[$k]['face'] 	  = $face;
				$rows[$k]['sendname'] = $name;
			}
		}
		if($ids!='0')$this->setyd($ids, $uid);
		
		$rowss = array();
		for($i=$len-1; $i>=0; $i--)$rowss[]=$rows[$i];
		
		if($wdtotal<0)$wdtotal=0;
		$this->showreturn(array(
			'rows' => $rowss,
			'wdtotal' => $wdtotal
		));
	}
}