<?php
class reimClassModel extends Model
{
	public function initModel()
	{
		$this->settable('im_mess');
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
		if($table!=''){
			//$this->update("`zt`=1", "`table`='$table' and `mid`='$mid' and `zt`=0 and `type`='system' and `sendid`='$gid' and `receid` in($receid)");
		}
		$this->insert(array(
			'type'	=> 'system',
			'optdt'	=> $this->rock->now,
			'zt'	=> 0,
			'cont'	=> $this->rock->jm->encrypt($cont),
			'sendid'=> $sendid,
			'receid'=> $gid,
			'optid'	=> $sendid,
			'receuid' => $receid,
			'table'	=> $table,
			'mid'	=> $mid,
			'url'	=> $url
		));
		$messid	= $this->db->insert_id();
		
		$this->db->insert('[Q]im_messzt','`mid`,`uid`','select '.$messid.',id from `[Q]admin` where id in('.$receid.') and `status`=1 and `state`<>5 ', true);

		$socket	= c('socket', true);
		return $socket->send($sendid, $receid, array(
			'cont'	=> $cont,
			'gname'	=> $gname,
			'gid'	=> $gid,
			'type'	=> 'system',
			'now'	=> $this->rock->now,
			'messid'=> $messid,
			'url'	=> $url
		));
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
}