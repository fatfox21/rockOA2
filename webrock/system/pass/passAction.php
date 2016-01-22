<?php
class passClassAction extends Action
{

	public function saveAjax()
	{
		$id			= $this->adminid;
		$oldpass	= $this->rock->post('passoldPost');
		$pasword	= $this->rock->post('passwordPost');
		$msg		= '';
		if($this->rock->isempt($pasword))$msg ='新密码不能为空';
		if($msg == ''){
			$oldpassa	= $this->db->getmou($this->T('admin'),"`pass`","`id`='$id'");
			if($oldpassa != md5($oldpass))$msg ='旧密码不正确';
			if($msg==''){
				if($oldpassa == md5($pasword))$msg ='新密码不能和旧密码相同';
			}
		}
		if($msg == ''){
			if(!$this->db->record($this->T('admin'), "`pass`='".md5($pasword)."'", "`id`='$id'"))$msg	= $this->db->error();
		}
		$this->backmsg($msg,'修改成功');
	}
}