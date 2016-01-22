<?php 
class indexClassAction extends Action{
	
	public function beforeAction()
	{
		$this->adminid		= (int)$this->getsession('imadminid',0);
		$this->adminuser	= $this->getsession('imadminuser');
		$this->adminname	= $this->getsession('imadminname');
	}
	
	public function defaultAction()
	{
		$db		= m('admin');
		$this->smartydata['adminid']	= $this->adminid;
		$this->smartydata['adminname']	= $this->adminname;
		
		$ars	= $db->getone($this->adminid, '`name`,`id`,`face`,`ranking`');
		$this->smartydata['ars'] 		= $ars;
		$this->smartydata['aface']		= $this->rock->repempt($ars['face'], 'images/im/user100.png');
	}
	
	public function websocketAction()
	{
		
	}
	
	//定时更新我在线时间
	private function updatemy()
	{
		$uid = $this->adminid;
		$now = $this->now;
		$db  = m('admin');
		$db->update("`imonline`=1,`imlastdt`='$now'", $uid);
		$moindts = c('date',true)->adddate($now,'i', -12);
		$db->update("`imonline`=0", "`imlastdt`<'$moindts'");
	}
	
	public function dingshiupAjax()
	{
		$this->updatemy();
	}
	
	public function loadinitAjax()
	{
		$arr = array();
		$this->updatemy();
		$arr['uarr'] 	= $this->getuserla();
		$arr['wdarr'] 	= $this->getwdarr();
		$arr['garr'] 	= $this->getmygroup();
		$arr['darr'] 	= m('dept')->getdept(0, 'user');
		echo json_encode($arr);
	}
	
	private function getuserla($where='')
	{
		$urs = m('admin')->getall("`status`=1 and `state`<>5 $where order by `imonline` desc,`name` asc",'`id`,`name`,`deptid`,`ranking`,`imonline`,`face`');
		foreach($urs as $k=>$rs){
			$urs[$k]['face'] = $this->rock->repempt($rs['face'], 'images/im/user100.png');
		}
		return $urs;
	}
	
	public function getuseroneAjax()
	{
		$uid 	= $this->get('sholauid','0');
		$arr 	= $this->getuserla("and `id`='$uid'");
		echo json_encode($arr);
	}
	
	//获取最近联系人
	public function getzjlianxi()
	{
		
	}
	
	//读取我所在的群和讨论组
	public function getmygroup()
	{
		$ids	= '0';
		$idrsa	= m('im_groupuser')->getall("uid='$this->adminid'",'gid');
		foreach($idrsa as $k=>$rs){
			$ids.=','.$rs['gid'];
		}
		$rows 	= m('im_group')->getall("`id`>0 and ((`type`=2) or (`type` in(0,1) and `id` in($ids) ) ) order by `sort` ",'`type`,`name`,`id`');
		foreach($rows as $k=>$rs){
			//$urs[$k]['face'] = $this->rock->repempt($rs['face'], 'images/im/user100.png');
		}
		return $rows;
	}
	
	//创建讨论组
	public function createlunAjax()
	{
		$val	= $this->post('val');
		$aid	= $this->get('aid');
		$now 	= $this->rock->now;
		$this->db->record('[Q]im_group', array(
			'type'			=> 1,
			'name'			=> $val,
			'createid'		=> $aid,
			'createname'	=> $this->adminname,
			'createdt'		=> $now
		));
		$gid	= $this->db->insert_id();
		m('im_groupuser')->insert(array(
			'gid' => $gid,
			'uid' => $aid,
			'adddt' => $now
		));
		echo 'success';
	}
	
	public function loadgroupAjax()
	{
		$arr = array();
		
		$arr['wdarr'] 	= $this->getwdarr();
		$arr['garr'] 	= $this->getmygroup();
		echo json_encode($arr);
	}
	
	/**
		未读信息
	*/
	public function getwd()
	{
		$total 	= 0;
		$db 	= m('im_mess');
		$mid	= $this->adminid;
		$whes	= $this->rock->dbinstr('receuid', $mid);
		
		$to1	= $db->rows("`zt`=0 and receid='$mid' and `type` in ('user')");
		$to2	= $db->rows("`type` in('dept','group','system') and $whes and id in(select mid from [Q]im_messzt where uid='$mid')");
		$total	= $to1 + $to2;
		return $total;
	}
	
	/**
		读取未读数组
	*/
	public function getwdarr()
	{
		$db 	= m('im_mess');
		$rows 	= array();
		$mid	= $this->adminid;
		
		$whes	= $this->rock->dbinstr('receuid', $mid);
		
		$arr 	= $db->getall("`zt`=0 and receid='$mid' and `type`='user' group by `sendid`", "`sendid`,count(1) as stotal");
		foreach($arr as $k=>$rs){
			$rows[] = array(
				'type' 	=> 'user',
				'id'	=> $rs['sendid'],
				'stotal'=> $rs['stotal'],
			);
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
		$arr 	= $db->getall("`type`='group' and $whes and id in(select mid from [Q]im_messzt where uid='$mid') group by `receid`", "`receid`,count(1) as stotal");
		foreach($arr as $k=>$rs){
			$rows[] = array(
				'type' 	=> 'group',
				'id'	=> $rs['receid'],
				'stotal'=> $rs['stotal'],
			);
		}
		
		//系统信息的
		$whes	= $this->rock->dbinstr('receuid', $mid);
		$arr 	= $db->getall("`type`='system' and $whes and id in(select mid from [Q]im_messzt where uid='$mid') group by `receid`", "`receid`,count(1) as stotal");
		foreach($arr as $k=>$rs){
			$rows[] = array(
				'type' 	=> 'system',
				'id'	=> $rs['receid'],
				'stotal'=> $rs['stotal'],
			);
		}
		
		return $rows;
	}
}