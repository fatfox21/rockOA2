<?php
class reimsClassModel extends Model
{
	public function initModel()
	{
		$this->settable('im_mess');
	}	
	
	/**
		发送单人信息
		$lx = 0 web发送的 1 客户端C#发送
	*/
	public function senduser($receid, $cans=array(), $lx=0)
	{
		$cont		= '';
		if(isset($cans['cont']))$cont=$cans['cont'];
		$sendid		= $this->adminid;
		$optdt		= $this->rock->now;
		if(isset($cans['optdt']))$optdt=$cans['optdt'];
		if(isset($cans['sendid']))$sendid=$cans['sendid'];
		
		$arr = array(
			'cont'		=> $cont,
			'sendid'	=> $sendid,
			'receid'	=> $receid,
			'type'		=> 'user',
			'optdt'		=> $optdt,
			'zt'		=> '0',
			'ftype'		=> '1'
		);
		$arr['receuid'] = $arr['sendid'].','.$arr['receid'];
		$bo = m('im_mess')->insert($arr);
		$arr['id'] 		= $this->db->insert_id();
		$arr['nuid'] 	= $this->rock->request('nuid');
		
		if($lx==0 || $lx==1){
			
		}
		//客户端发送
		if($lx==0){
			$receids = m('admin')->getonline($arr['receid']);
			if($receids != ''){
				c('socket')->send($arr['sendid'], $receids , array(
					'cont' 	=> $this->rock->jm->base64decode($cont),
					'type' 	=> $arr['type'],
					'now' 	=> $optdt,
					'messid' => $arr['id']
				));
			}
		}
		return $arr;
	}
	
	/**
		发送群讨论信息
		$lx = 0 web发送的 1 客户端C#发送
	*/
	public function sendgroup($gid, $cans=array(), $lx=0)
	{
		$cont		= '';
		if(isset($cans['cont']))$cont=$cans['cont'];
		$receid		= $gid;
		$sendid		= $this->adminid;
		$gname		= m('im_group')->getmou('name', $gid);
		$type		= 'group';
		$optdt		= $this->rock->now;
		if(isset($cans['optdt']))$optdt=$cans['optdt'];
		if(isset($cans['type']))$type=$cans['type'];
		if(isset($cans['sendid']))$sendid=$cans['sendid'];
		
		$aors		= m('im_groupuser')->getall("`gid`='$receid'",'uid');
		$asid		= $asids =  '';
		foreach($aors as $k=>$rs){
			$_uid = $rs['uid'];
			if($_uid != $sendid)$asid.=','.$_uid;
			$asids.=','.$_uid;
		}
		
		if($asids != '')$asids = substr($asids, 1);
			
		$arr = array(
			'cont'		=> $cont,
			'sendid'	=> $sendid,
			'receid'	=> $receid,
			'receuid'	=> $asids,
			'type'		=> $type,
			'optdt'		=> $optdt,
			'zt'		=> '1'
		);
		$bo = $this->insert($arr);
		$arr['id'] 		= $this->db->insert_id();
		$arr['nuid'] 	= $this->rock->request('nuid');
		$arr['gid'] 	= $receid;
		
		if($asid != ''){
			$asid = substr($asid, 1);
			$this->db->insert('[Q]im_messzt','`mid`,`uid`,`gid`','select '.$arr['id'].',`id`,'.$gid.' from `[Q]admin` where id in('.$asid.') and `status`=1 and `state`<>5 ', true);
		}
		$arr['receid']	= $asid;
		//yunba推送到客户端
		if($lx==0 || $lx==1){
			
		}
		//推送到客户端上
		if($lx==0 && $asid != ''){
			$receids = m('admin')->getonline($asid);
			if($receids != ''){
				c('socket')->send($arr['sendid'], $receids , array(
					'cont' 	=> $this->rock->jm->base64decode($cont),
					'type' 	=> $arr['type'],
					'gid'	=> $gid,
					'gname'	=> $gname,
					'now' 	=> $optdt,
					'messid' => $arr['id']
				));
			}
		}
		return $arr;
	}
	
	
	public function getgroupinfor($receid, $uid, $type='group')
	{
		$dbws		= m('reim');
		$loginkey 	= $this->get('loginkey');
		$whes		= $this->rock->dbinstr('receuid', $uid);
		$order 		= '';

		$wdtotal= $dbws->getweitotal($uid, $type, $receid);
		$wdwhere= $dbws->getweitotal($uid, $type, $receid, 1);
		if($wdtotal > 0){
			$zwhere = " $wdwhere order by `id` desc limit 10";
		}else{
			$zwhere = " `receid`='$receid' and `type`='$type' and $whes order by `id` desc limit 5";
		}
		$this->webimonline($loginkey, 1);
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
		if($type!='system')$rows 	= $this->ivaregarr($suids, $rows);
		if($ids!='0')$this->setyd($ids, $uid);
		if($wdtotal<0)$wdtotal=0;
		return array(
			'rows' 		=> $rows,
			'wdtotal' 	=> $wdtotal
		);
	}
}