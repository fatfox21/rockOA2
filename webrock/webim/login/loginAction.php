<?php 
class loginClassAction extends Action{
	
	public function defaultAction()
	{
		
	}
	
	public function checkAjax()
	{
		$adminuser	= $this->request('adminuser');
		$adminpass	= $this->request('adminpass');
		$msg		= '';
		if($this->isempt($adminuser))$msg='帐号不能为空';
		$log		= m('log');
		$db 		= m('admin');
		if($msg==''){
			$us	= $db->getone("`user`='$adminuser' and `status`=1 and `type`=1 and `state`<>5",'`pass`,`id`,`name`,`user`,`imonline`');
			if(!$us){
				$msg = '帐号不存在';
			}else{
				$pass= $us['pass'];
				if(md5($adminpass)!=$pass)$msg='密码不对';
			}
		}
		if($msg==''){
			if($us['imonline']==1){
				//$msg = '请不要重复登录';
			}
		}
		if($msg==''){
			$adminid = $us['id'];
			m('admin')->update("`imonline`=1",$adminid);
			$keystr = $this->jm->strrocktoken(array(
				'm' => 'index',
				'd' => 'webim',
				'uid'=>$adminid
			));
			$msg='success@@@'.$keystr.'';
		}
		echo $msg;
	}
}