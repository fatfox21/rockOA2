<?php 
class userClassAction extends Action{
	
	
	public function defaultAction()
	{
		$db		= m('admin');
		$aid	= (int)$this->get('aid');
		$uid	= (int)$this->get('uid');
		$ars	= $db->getone($aid, '`name`,`id`,`face`');
		$urs	= $db->getone($uid, '`name`,`id`,`deptname`,`ranking`,`face`,`email`');
		$this->smartydata['ars'] 		= $ars;
		$this->smartydata['aface']		= $this->rock->repempt($ars['face'], 'images/im/user100.png');
		
		$this->smartydata['urs'] 		= $urs;
		$this->smartydata['uface']		= $this->rock->repempt($urs['face'], 'images/im/user100.png');
		$this->smartydata['now'] 		= $this->now;
		
		$dbs	= m('im_mess');
		$wdarr	= $dbs->getall("`zt`=0 and `sendid`='$uid' and `receid`='$aid' and `type`='user' order by `optdt` desc ", 'optdt,zt,id,cont,sendid');
		if($this->db->count==0){
			$wdarr	= $dbs->getall("`type`='user' and ((`sendid`='$aid' and `receid`='$uid') or (`receid`='$aid' and `sendid`='$uid')) order by `optdt` desc limit 3", 'optdt,zt,id,cont,sendid');
		}
		$this->smartydata['wdarr'] = json_encode($wdarr);
		
	}
	
	public function testsendAjax()
	{
		echo m('im_mess')->send(1, 1, '会议通知', '哈哈啊'.$this->rock->now.'');
	}

	public function saveAjax()
	{
		$receid 	= $this->post('receid');
		$arr 		= m('reims')->senduser($receid, array(
			'cont'	=> $this->post('cont'),
			'sendid'=> $this->post('sendid'),
			'optdt'	=> $this->post('optdt')
		), 1);
		echo json_encode($arr);
	}
	
	/**
		设置已读
	*/
	public function setydAjax()
	{
		$ids	= $this->post('ids');
		$receid	= $this->post('receid');
		m('im_mess')->update("`zt`=1", "`id` in($ids) and receid='$receid' and `type` in ('user')");
		m('im_messzt')->delete("uid='$receid' and `mid` in($ids)");
	}
}