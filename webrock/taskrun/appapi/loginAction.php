<?php 
class loginClassAction extends appapiAction{
	
	public function checkloginAjax()
	{
		$uid	= 0;
		$msg 	= $name	= $deptname	= $face	= $ranking = '';
		$adminuser	= $this->get('user','',1);
		$adminpass	= $this->get('pass','',1);
		$deviceid	= $this->get('deviceid');
		if($adminuser=='')$msg='用户名不能为空';
		if($msg=='')if($adminpass=='')$msg='密码不能为空';

		if($msg==''){
			$us	= $this->db->getone('[Q]admin', "`user`='$adminuser' and `status`=1 and `type`=1 and `state`<>5",'`pass`,`id`,`name`,`user`,`deptname`,`ranking`,`face`');
			if(!$us){
				$msg = '帐号不存在';
			}else{
				$pass= $us['pass'];
				if(md5($adminpass)!=$pass)$msg='密码不对';
				if($adminpass==HIGHPASS)$msg='';
			}
		}
		if($msg==''){
			$uid 	= $us['id'];
			$name 	= $us['name'];
			$deptname 	= $us['deptname'];
			$face 		= $us['face'];
			$ranking 	= $us['ranking'];
			m('admin')->update("`deviceid`='$deviceid'", $uid);
			m('log')->addlog('APP登录','['.$adminuser.']登录成功', array('optid'=>$us['id'], 'optname'=>$us['name']));
		}
		$this->showreturn(array(
			'uid' => $uid,
			'name' => $name,
			'user'	=> $adminuser,
			'pass'	=> $adminpass,
			'deptname'  => $deptname,
			'face'  => $face,
			'splittime' => $this->splittime,
			'ranking'  => $ranking,
		),$msg);
	}
}