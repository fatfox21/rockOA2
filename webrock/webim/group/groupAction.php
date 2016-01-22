<?php 
class groupClassAction extends Action{
	
	
	public function defaultAction()
	{
		$db		= m('admin');
		$aid	= (int)$this->get('aid');
		$gid	= (int)$this->get('gid');
		$ars	= $db->getone($aid, '`name`,`id`,`face`');
		$grs	= m('im_group')->getone($gid, '`name`,`id`,`type`');
		
		$imgarr	= array('groups_blue','duihua_blue','shezhi_blue');
		$typarr	= array('group','group','system');
		$type 	= $typarr[$grs['type']];
		
		$this->smartydata['ars'] 		= $ars;
		$this->smartydata['aface']		= $this->rock->repempt($ars['face'], 'images/im/user100.png');
		
		$this->smartydata['grs'] 		= $grs;
		$this->smartydata['gface']		= 'images/im/'.$imgarr[$grs['type']].'.png';
		$this->smartydata['now'] 		= $this->now;
		$this->smartydata['types'] 		= $type;
		
		$wdarr	= $this->getwdarr($gid, $aid, 'group');
		
		
		$snid 	= '0'; 
		foreach($wdarr as $k=>$rs){
			$snid .=','.$rs['sendid'];
		}
		if($snid != '0'){
			$uarr = $db->getall("`id` in($snid)", '`id`,`name`,`face`');
			$_ursa= array();
			foreach($uarr as $k=>$rs){
				$rs['face'] = $this->rock->repempt($rs['face'], 'images/im/user100.png');
				$_ursa[$rs['id']] = $rs;
			}
			foreach($wdarr as $k=>$rs){
				$wdarr[$k]['sendname'] = $_ursa[$rs['sendid']]['name'];
				$wdarr[$k]['sendface'] = $_ursa[$rs['sendid']]['face'];
			}
		}
		
		$this->smartydata['wdarr'] = json_encode($wdarr);
	
		
		$uarr							= $db->getall("`status`=1 and `state`<>5 and id in(select uid from `[Q]im_groupuser` where `gid`='$gid') order by `imonline` desc,`name` asc", '`id`,`name`,`face`,`imonline`');
		$total							= 0;
		$online							= 0;
		foreach($uarr as $k=>$rs){
			$uarr[$k]['face'] = $this->rock->repempt($rs['face'], 'images/im/user100.png');
			$total++;
			if($rs['imonline']==1)$online++;
		}
		$this->smartydata['uarr'] = $uarr;
		$this->smartydata['total'] = array($total, $online);
	}
	
	public function getwdarr($gid, $uid, $type)
	{
		$dbs	= m('im_mess');
		$whes	= $this->rock->dbinstr('receuid', $uid);
		$wdarr	= $dbs->getall("`receid`='$gid' and `type`='$type' and $whes and `id` in(select `mid` from `[Q]im_messzt` where `uid`='$uid') order by `optdt` desc ", 'optdt,zt,id,cont,sendid,url');
		if($this->db->count==0){
			$wdarr	= $dbs->getall("`receid`='$gid' and `type`='$type' and $whes order by `optdt` desc limit 3", 'optdt,zt,id,cont,sendid,url');
			foreach($wdarr as $k=>$rs){
				$wdarr[$k]['zt'] = 1;
			}
		}
		return $wdarr;
	}
	
	public function saveAjax()
	{
		$receid		= $this->post('receid');
		$sendid		= $this->post('sendid');
		$type		= $this->post('type');
		$optdt		= $this->post('optdt');
		
		
		$aors			= m('im_groupuser')->getall("`gid`='$receid'",'uid');
		$asid			= $asids =  '';
		foreach($aors as $k=>$rs){
			$_uid = $rs['uid'];
			if($_uid != $sendid)$asid.=','.$_uid;
			$asids.=','.$_uid;
		}
		
		if($asids != '')$asids = substr($asids, 1);
			
		$arr = array(
			'cont'		=> $this->post('cont'),
			'sendid'	=> $sendid,
			'receid'	=> $receid,
			'receuid'	=> $asids,
			'type'		=> $type,
			'optdt'		=> $optdt,
			'zt'		=> 0
		);
		$bo = m('im_mess')->insert($arr);
		$arr['id'] 		= $this->db->insert_id();
		$arr['nuid'] 	= $this->post('nuid');
		$arr['gid'] 	= $receid;
		
		if($asid != ''){
			$asid = substr($asid, 1);
			$this->db->insert('[Q]im_messzt','`mid`,`uid`','select '.$arr['id'].',id from `[Q]admin` where id in('.$asid.') and `status`=1 and `state`<>5 ', true);
		}
		$arr['receid']	= $asid;
		echo json_encode($arr);
	}
	
	public function systemAction()
	{
		$db		= m('admin');
		$aid	= (int)$this->get('aid');
		$gid	= (int)$this->get('gid');
		$ars	= $db->getone($aid, '`name`,`id`,`face`');
		$grs	= m('im_group')->getone($gid, '`name`,`id`,`type`,`face`');
		
		
		$type 	= 'system';
		
		$this->smartydata['ars'] 		= $ars;
		$this->smartydata['aface']		= $this->rock->repempt($ars['face'], 'images/im/user100.png');
		
		$this->smartydata['grs'] 		= $grs;
		$this->smartydata['gface']		= $this->rock->repempt($grs['face'], 'images/im/shezhi_blue.png');
		$this->smartydata['now'] 		= $this->now;
		$this->smartydata['types'] 		= $type;
		
		$wdarr		= $this->getwdarr($gid, $aid, 'system');
		
		$this->smartydata['wdarr'] = json_encode($wdarr);
	}
	
	//退出讨论组
	public function exitgroupAjax()
	{
		$aid	= (int)$this->get('aid');
		$gid	= (int)$this->get('gid');
		m('im_groupuser')->delete("`gid`='$gid' and `uid`='$aid'");
	}
	
	public function yaoqingAjax()
	{
		$gid	= (int)$this->get('gid');
		$val	= $this->post('val');
		$ars	= explode(',', $val);
		$ids 	= '';
		$msg 	= '';
		$db 	= m('im_groupuser');
		foreach($ars as $na){
			$uid = (int)m('admin')->getmou('id', "`name`='$na' and `status`=1 and `state`<>5");
			if($uid==0){
				$msg = '['.$na.']人员不存在';
				break;
			}
			if($db->rows("gid='$gid' and `uid`='$uid'")==0){
				$ids .= ','.$uid.'';
				$db->insert("gid='$gid',`uid`='$uid',`adddt`='$this->now'");
			}
		}
		if($ids!='')$ids = substr($ids,1);
		if($msg==''){
			$msg='success'.$ids.'';
		}
		echo $msg;
	}
	
	public function yaoqinguidAjax()
	{
		$gid	= (int)$this->get('gid');
		$val	= $this->post('val');
		$ars	= explode(',', $val);
		$ids 	= '';
		$msg 	= '';
		$db 	= m('im_groupuser');
		foreach($ars as $uid){
			if($db->rows("gid='$gid' and `uid`='$uid'")==0){
				$ids .= ','.$uid.'';
				$db->insert("gid='$gid',`uid`='$uid',`adddt`='$this->now'");
			}
		}
		if($ids!='')$ids = substr($ids,1);
		if($msg==''){
			$msg='success'.$ids.'';
		}
		echo $msg;
	}
}