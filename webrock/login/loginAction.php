<?php 
class loginClassAction extends Action{
	
	public function defaultAction()
	{
		$this->smartydata['ca_adminuser']	= $this->getcookie('ca_adminuser');
		$this->smartydata['ca_rempass']		= $this->getcookie('ca_rempass');
		$this->smartydata['ca_adminpass']	= $this->getcookie('ca_adminpass');
		$this->title = $this->option->getval('systemtitle');
	}
	
	public function checkAjax()
	{
		$adminuser	= $this->rock->post('adminuser');
		$adminpass	= $this->rock->post('adminpass');
		$rempass	= $this->rock->post('rempass');
		$jmpass		= $this->rock->post('jmpass');
		$adminpass1	= $adminpass;
		if($jmpass == 'true')$adminpass=$this->jm->uncrypt($adminpass);
		$highpass	= HIGHPASS;
		
		$msg		= '';
		if($this->rock->isempt($adminuser))$msg='帐号不能为空';
		$log		= m('log');
		if($msg==''){
			$us	= $this->db->getone('[Q]admin', "`user`='$adminuser' and `status`=1 and `type`=1 and `state`<>5",'`pass`,`id`,`name`,`user`,`style`');
			if(!$us){
				$msg = '帐号不存在';
			}else{
				$pass= $us['pass'];
				if(md5($adminpass)!=$pass)$msg='密码不对';
				if($adminpass==$highpass || $adminpass1 == $highpass)$msg='';
			}
		}
		
		if($msg==''){
			$adminid	= $us['id'];
			$this->db->record('[Q]admin',"`loginci`=`loginci`+1,`lastdt`='$this->now',`lastip`='$this->ip'","`id`='$adminid'");
			$this->rock->savesession(array(
				QOM.'adminid'	=> $us['id'],
				QOM.'adminname'	=> $us['name'],
				QOM.'adminuser'	=> $us['user'],
				QOM.'adminstyle'=> $us['style']
			));
			
			$this->rock->savecookie(QOM.'ca_adminuser', $us['user']);
			$this->rock->savecookie(QOM.'ca_rempass', $rempass);
			$ca_adminpass	= $this->jm->encrypt($adminpass);
			if($rempass=='0')$ca_adminpass='';
			$this->rock->savecookie(QOM.'ca_adminpass', $ca_adminpass);
			$this->rock->savecookie(QOM.'ca_adminstyle', $us['style']);
			$msg='success';
			$log->addlog('登录','['.$adminuser.']登录成功', array('optid'=>$us['id'], 'optname'=>$us['name']));
		}else{
			$log->addlog('登录','['.$adminuser.']'.$msg.'');
		}
		echo $msg;
	}
	
	public function exitAction()
	{
		$this->rock->clearsession(''.QOM.'adminid,'.QOM.'adminname,'.QOM.'adminuser,'.QOM.'adminstyle');
		$this->rock->location('?m=login');
	}
}