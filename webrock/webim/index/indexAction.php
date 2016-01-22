<?php 
class indexClassAction extends Action{
	
	public function beforeAction()
	{
		$this->adminid		= (int)$this->get('aid','0');
	}
	
	public function defaultAction()
	{
		$this->tpltype	= 'html';
		$uid			= $this->jm->gettoken('uid');
		$this->adminid	= $uid;
		$db		= m('admin');
		$ars	= $db->getone("`id`='$uid'", '`name`,`id`,`face`,`ranking`');
		if(!$ars)exit('sorry!');
		$this->smartydata['ars'] 		= $ars;
		$this->smartydata['aface']		= $this->rock->repempt($ars['face'], 'images/im/user100.png');
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
		$facarr = array('images/im/groups_blue.png','images/im/duihua_blue.png','images/im/shezhi_blue.png');
		$rows 	= m('reim')->getgroup($this->adminid, $facarr);
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
			'createname'	=> '',
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
		$rows = m('reim')->getwdarr($this->adminid);
		return $rows;
	}
	
	
	
	
	public function deptAction()
	{
		$this->smartydata['adminid'] = $this->adminid;
		$this->smartydata['groupid'] = $this->get('gid');
		$this->smartydata['changetype'] = $this->get('changetype');
	}
	public function loaddeptAjax()
	{
		$arr['darr'] 	= m('dept')->getdept(0, 'user');
		echo json_encode($arr);
	}
}