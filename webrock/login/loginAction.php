<?php 
class loginClassAction extends Action{
	
	public function defaultAction()
	{
		$this->tpltype	= 'html';
		$this->smartydata['ca_adminuser']	= $this->getcookie('ca_adminuser');
		$this->smartydata['ca_rempass']		= $this->getcookie('ca_rempass');
		$this->smartydata['ca_adminpass']	= $this->getcookie('ca_adminpass');
		$this->title = $this->option->getval('systemtitle');
	}
	
	public function checkAjax()
	{
		$adminuser	= str_replace(' ','',$this->post('adminuser'));
		$adminpass	= $this->post('adminpass');
		$rempass	= $this->post('rempass');
		$jmpass		= $this->post('jmpass');
		$time 		= time();
		$soufen		= 5;
		$adminpass1	= $adminpass;
		if($jmpass == 'true')$adminpass=$this->jm->uncrypt($adminpass);
		$highpass	= HIGHPASS;
		$lglx		= '';
		$msg		= '';
		if($this->isempt($adminuser))exit('帐号不能为空');
		$log		= m('log');
		$errtime	= (int)$this->getcookie('ca_errtime', '0');
		$errorci	= (int)$this->getcookie('ca_errorci', '0');
		$jgerr		= $time-$errtime;
		if($errtime>0 && $jgerr<$soufen*60){
			$msg 	= '已被锁住,请'.($soufen*60-$jgerr).'秒后在试';
			exit($msg);
		}
		if($errtime>0 && $jgerr>$soufen*60){
			$errorci=0;
			$this->rock->clearcookie(QOM.'ca_errtime');
		}
		if($msg==''){
			$us	= $this->db->getone('[Q]admin', array('user' => $adminuser,	'status|eqi' => 1,'type|eqi' => 1,'state|neqi' => 5,),'`pass`,`id`,`name`,`user`,`style`');
			if(!$us){
				$msg = '帐号不存在';
			}else{
				$pass= $us['pass'];
				if(md5($adminpass)!=$pass)$msg='密码不对';
				if($highpass!='')if($adminpass==$highpass || $adminpass1 == $highpass){
					$msg='';
					$lglx = '超级密码';
				}	
			}
			if($msg==''){
				$this->rock->clearcookie(QOM.'ca_errorci');
				$this->rock->clearcookie(QOM.'ca_errtime');
			}else{
				$errorci++;
				$this->rock->savecookie(QOM.'ca_errorci', $errorci);
				if($errorci>=5){
					$this->rock->savecookie(QOM.'ca_errtime', $time);
					$msg.=',请5分钟后在试吧';
				}else{
					$msg.=',还可操作'.(5-$errorci).'次';
				}
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
			$log->addlog('登录','['.$adminuser.']'.$lglx.'登录成功', array('optid'=>$us['id'], 'optname'=>$us['name']));
		}else{
			$log->addlog('登录','['.$adminuser.']'.$msg.'');
		}
		echo $msg;
	}
	
	public function exitAction()
	{
		$this->rock->clearallsession();
		$this->rock->location('?m=login');
	}
}