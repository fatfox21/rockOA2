<?php
class faceClassAction extends Action
{

	/**
		保存头像
	*/
	public function saveAjax()
	{
		$id			= $this->adminid;
		$arr		= array('face'=>$this->rock->post('facePost'));
		$msg		= '';
		if(!$this->db->record($this->T('admin'),$arr, "`id`='$id'"))$msg= $this->db->error();
		if($msg=='')$msg='success';
		echo $msg;
	}
}