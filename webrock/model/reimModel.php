<?php
class reimClassModel extends Model
{
	private $socket;
	
	public function initModel()
	{
		$this->settable('im_mess');
		$this->socket = c('socket', true);
	}	
		
	/**
		发送信息推送的
	*/
	public function sendsystem($sendid, $receid, $gname, $cont, $table='',$mid='', $url='')
	{
		$onrs = $this->db->getone('[Q]im_group',"`type`=2 and `name`='$gname'");
		if(!$onrs){
			$this->db->record('[Q]im_group', array(
				'type'		=> 2,
				'name'		=> $gname,
				'createdt'	=> $this->rock->now
			));
			$gid	= $this->db->insert_id();
		}else{
			$gid	= $onrs['id'];
		}
		if($this->isempt($receid))return 'not receuid';
		$receids = $receid;
		$wheres	 = " and `id` in($receid)";
		if($receid=='all')$wheres='';
		$apsid 		= $resid = $allsid = '';
		$recrarr 	= $this->db->getall("select id,applastdt,imonline,imlastdt from [Q]admin where `status`=1 and `state`<>5 $wheres");
		$time 		= time();
		foreach($recrarr as $k=>$rs){
			if(!$this->isempt($rs['applastdt']))$apsid.=','.$rs['id'].'';
			if(!$this->isempt($rs['imlastdt'])){
				$time1= strtotime($rs['imlastdt']);
				if($time1>$time-60*15)$resid.=','.$rs['id'].'';
			}
			$allsid.=','.$rs['id'].'';
		}
		if($allsid != ''){
			$allsid = substr($allsid, 1);
			$this->insert(array(
				'type'	=> 'system',
				'optdt'	=> $this->rock->now,
				'zt'	=> 0,
				'cont'	=> $this->rock->jm->base64encode($cont),
				'sendid'=> $sendid,
				'receid'=> $gid,
				'optid'	=> $sendid,
				'receuid' => $allsid,
				'table'	=> $table,
				'mid'	=> $mid,
				'url'	=> $url
			));
			$messid	= $this->db->insert_id();
			$this->db->insert('[Q]im_messzt','`mid`,`uid`','select '.$messid.',id from `[Q]admin` where id in('.$allsid.') and `status`=1 and `state`<>5 ', true);
		}
		
		if($resid != ''){
			$resid = substr($resid, 1);
			if($receids=='all')$resid = 'all';
			$this->socket->send($sendid, $resid, array(
				'cont'	=> $cont,
				'gname'	=> $gname,
				'gid'	=> $gid,
				'type'	=> 'system',
				'now'	=> $this->rock->now,
				'messid'=> $messid,
				'table'	=> $table,
				'mid'	=> $mid,
				'url'	=> $url
			));
		}
		//app推送
		if($apsid != ''){
			$apsid = substr($apsid, 1);
			c('apiCloud')->send($apsid, array(
				'type' 	=> 'system',
				'gname'	=> $gname,
				'gid'	=> $gid,
				'messid'=> $messid,
				'sendname'	=> $this->adminname
			),'['.$gname.']发来一条信息');
		}
		return true;
	}
	
	public function sendstart()
	{
		$this->socket->sendstart();
	}

	//创建发送URL
	public function createurl($act, $mid, $arr=array())
	{
		$cans 	= array(
			'm' 	=> 'view',
			'd' 	=> 'taskrun',
			'a' 	=> $act,
			'uid' 	=> $this->adminid,
			'id' 	=> $mid
		);
		foreach($arr as $k=>$v)$cans[$k]=$v;
		$token	= $this->rock->jm->strrocktoken($cans);
		$url 	= '?rocktoken='.$token.'';
		return $url;
	}	
	
	//获取REIM未读的
	public function getwdarr($mid=0)
	{
		$rows 	= array();
		if($mid==0)$mid	= $this->adminid;
		$whes	= $this->rock->dbinstr('receuid', $mid);
		$arr 	= $this->getall("`zt`=0 and receid='$mid' and `type`='user' group by `sendid`", "`sendid`,count(1) as stotal,max(optdt) as optdts");
		foreach($arr as $k=>$rs){
			$uid 	= $rs['sendid'];
			$urs 	= $this->db->getone('[Q]admin',"`id`='$uid'",'`name`,`face`');
			if($urs){
				$rows[] = array(
					'type' 	=> 'user',
					'id'	=> $uid,
					'stotal'=> $rs['stotal'],
					'optdt'	=> $rs['optdts'],
					'name'	=> $urs['name'],
					'face'	=> $this->rock->repempt($urs['face'])
				);
			}
		}
		
		//组织结构
		/*
		$arr 	= $db->getall("`type`='dept' and id in(select mid from [Q]im_messzt where uid='$mid') group by `receid`", "`receid`,count(1) as stotal");
		foreach($arr as $k=>$rs){
			$rows[] = array(
				'type' 	=> 'dept',
				'id'	=> $rs['receid'],
				'stotal'=> $rs['stotal'],
			);
		}*/
		
		// 讨论组 群
		$groupa	= $this->db->getarr('[Q]im_group','1=1','`name`,`face`,`type`');
		$gid 	= '0';
		foreach($groupa as $_gid=>$kvs)$gid.=','.$_gid.'';
		$arr 	= $this->getall("`type`='group' and `receid` in($gid) and $whes and id in(select mid from [Q]im_messzt where uid='$mid') group by `receid`", "`receid`,count(1) as stotal,max(optdt) as optdts");
		foreach($arr as $k=>$rs){
			$grs	= $groupa[$rs['receid']];
			$rows[] = array(
				'type' 	=> 'group',
				'id'	=> $rs['receid'],
				'stotal'=> $rs['stotal'],
				'optdt'	=> $rs['optdts'],
				'name'	=> $grs['name'],
				'face'	=> $this->rock->repempt($grs['face'])
			);
		}
		
		//系统信息的
		$arr 	= $this->getall("`type`='system' and `receid` in($gid) and $whes and id in(select mid from [Q]im_messzt where uid='$mid') group by `receid`", "`receid`,count(1) as stotal,max(optdt) as optdts");
		foreach($arr as $k=>$rs){
			$grs	= $groupa[$rs['receid']];
			$rows[] = array(
				'type' 	=> 'system',
				'id'	=> $rs['receid'],
				'stotal'=> $rs['stotal'],
				'optdt'	=> $rs['optdts'],
				'name'	=> $grs['name'],
				'face'	=> $this->rock->repempt($grs['face'])
			);
		}
		
		return $rows;
	}
	
	public function getweitotal($uid, $type, $sid=0, $blx=0)
	{
		$whes	= $this->rock->dbinstr('receuid', $uid);
		$where  = "`type`='$type' and `receid` ='$sid' and $whes and id in(select mid from [Q]im_messzt where uid='$uid')";
		if($type == 'user'){
			$where  = "`zt`=0 and `receid`='$uid' and `type`='user'";
		}
		if($blx==1)return $where;
		$to 	= $this->rows($where);
		return $to;
	}
	
	public function getgroup($uid, $facarr=array('','',''))
	{
		$ids	= '0';
		$idrsa	= m('im_groupuser')->getall("uid='$uid'",'gid');
		foreach($idrsa as $k=>$rs){
			$ids.=','.$rs['gid'];
		}
		$rows 	= m('im_group')->getall("`id`>0 and ((`type`=2) or (`type` in(0,1) and `id` in($ids) ) ) order by `sort` ",'`type`,`name`,`id`,`face`,`sort`');
		foreach($rows as $k=>$rs){
			$rows[$k]['face'] = $this->rock->repempt($rs['face'], $facarr[$rs['type']]);
		}
		return $rows;
	}
	
	/**
		设置已读
	*/
	public function setyd($ids, $receid)
	{
		$this->update("`zt`=1", "`id` in($ids) and receid='$receid' and `type` in ('user')");
		m('im_messzt')->delete("uid='$receid' and `mid` in($ids)");
	}
}