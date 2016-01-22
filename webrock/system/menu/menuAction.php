<?php
class menuClassAction extends Action
{
	public $rows	= array();

	public function initAction()
	{
		$this->table	= $this->T('menu');
	}

	public function defaultAction()
	{
		$this->title		= '菜单管理';
		$where				= $this->getWhere();
		
		if($where == ''){
			$this->rows	= $this->getmenus(0);
		}else{
			$this->rows	= m('menu')->getall("`id`>0 $where");
		}
		$header					= array(
			'name'		=> '菜单名,edit,left',
			'url'		=> '链接地址,edit',
			'num'		=> '编号,edit',
			'sort'		=> '序号,edit',
			'icons'		=> '图标,edit',
			'status'	=> '启用,checkbox,edit',
			'ispir'		=> '权限,checkbox,edit',
			'isopen'	=> '展开,checkbox,edit',
			'id'		=> 'ID'
		);
		
		$this->smartydata['header'] = $this->icovheader($header);
		$this->smartydata['rs'] 	= $this->rows;
	}
	
	public function getmenus($pid)
	{
		$menu	= $this->db->getall("select `name`,`id`,`icons`,`url`,`num`,sort,`level`,`status`,`ispir`,`isopen`,(select count(1) from `$this->table` where `pid`=a.`id`)as `stotal` from `$this->table` a where `pid`='$pid' order by `sort`");
		foreach($menu as $k=>$rs){
			if($rs['stotal'] >0 ){
				$menu[$k]['children']	= $this->getmenus($rs['id']);
			}
		}
		return $menu;
	}
	
	/**
		保存
	*/
	public function saveAjax()
	{
		$id		= (int)$this->rock->post('idPost');
		$pid	= (int)$this->rock->post('pidPost');
		$num	= $this->rock->post('numPost');
		$msg	= '';
		if(!$this->rock->isempt($num)){
			if($this->db->rows($this->table,"`num`='$num' and `id`<>$id ")>0)$msg	= '编号['.$num.']已存在';
		}
		if($msg == ''){
			$arr	= array(
				'level'	=> (int)$this->db->getmou($this->table,'level',"`id`='$pid'")+1,	//级别
				'pid'	=> $pid,
				'name'	=> $this->rock->post('namePost'),
				'url'	=> $this->rock->post('urlPost'),
				'icons'	=> $this->rock->post('iconsPost'),
				'color'	=> $this->rock->post('colorPost'),
				'status'	=> $this->rock->post('statusPost'),
				'ispir'	=> $this->rock->post('ispirPost'),
				'sort'	=> $this->rock->post('sortPost'),
				'num'	=> $num,
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
		if($this->db->rows($this->table,"`pid`=$id")>0)$msg='存在下级栏目不能删除！';
		if($msg == ''){
			if(!$this->db->delete($this->table,"`id`='$id'"))$msg= $this->db->error();
		}
		if($msg=='')$msg='success';
		echo $msg;
	}
}