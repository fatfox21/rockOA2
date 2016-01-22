<?php
class groupClassAction extends Action
{

	public function initAction()
	{
		$this->table	= $this->T('group');
	}
	
	public function defaultAction()
	{
		$this->title			= '组管理';
		
		$arr	= $this->getlimit($this->table,'id is not null','`sort`');
		$rows	= $arr['rows'];
		$header					= array(
			'name'		=> '组名,edit,sort',
			'sort'		=> '排序号,edit,sort',
			'ispir'		=> '权限验证,checkbox,sort',
			'id'		=> 'ID,sort'
		);
		
		$this->smartydata['pagin']	= $arr['pagin'];
		$this->smartydata['header'] = $this->icovheader($header);
		$this->smartydata['rs'] 	= $rows;
	}
	
	
	/**
		保存
	*/
	public function saveAjax()
	{
		$id		= (int)$this->rock->post('idPost');
		$msg	= '';
		if($msg == ''){
			$arr	= array(
				'name'	=> $this->rock->post('namePost'),
				'ispir'	=> $this->rock->post('ispirPost'),
				'sort'	=> $this->rock->post('sortPost'),
				'indate'=> $this->now
			);
			$where 	= '';
			if($id	!=0)$where	= "`id`='$id'";
			if(!$this->db->record($this->table, $arr, $where))$msg	= $this->db->error();
		}
		if($msg=='')$msg='success';
		echo $msg;
	}
	
	/**
		获取编辑信息
	*/
	function getinforAjax()
	{
		$id	= (int)$this->rock->get('id');
		echo json_encode($this->db->getone($this->table,"`id`='$id'"));
	}
	
	/**
		删除
	*/
	function delAjax()
	{
		$id		= (int)$this->rock->get('id');
		$msg	= '';
		if($msg == ''){
			if(!$this->db->delete($this->table,"`id`='$id'"))$msg= $this->db->error();
		}
		if($msg=='')$msg='success';
		echo $msg;
	}
}