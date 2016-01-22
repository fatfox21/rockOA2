<?php 
class indexClassAction extends Action{
	
	public $allmenuid	= '';
	
	public function defaultAction()
	{
		$this->tpltype	= 'html';
		$this->rock->savesession(array(QOM.'adminallmenuid'	=> $this->getuserext($this->adminid)));
		$this->allmenuid			= $this->getsession('adminallmenuid');
		
		$mewhere	= '';
		$myext		= $this->allmenuid;
		$admintype	= '1';
		if($myext != '-1'){
			$admintype	= '0';
			$mewhere	= ' and `id` in('.str_replace(array('[',']'), array('',''), $myext).')';
		}
		$menu							= $this->db->getrows('[Q]menu',"`pid`=0 and `status`=1 $mewhere",'`id`,`name`,`icons`','`sort`');
		$my								= $this->db->getone('[Q]admin', $this->adminid, '`id`,`name`,`deptname`,`ranking`,`face`,`style`,`loginci`,`deptid`,`user`');
		if(!$my)exit('sorry!');
		$dept							= $this->db->getone('[Q]dept', $my['deptid']);
		
		$menu[] = array(
			'id' 	=> 0,
			'name' 	=> '个人常用菜单',
			'icons' => 'computer'
		);
		
		$this->smartydata['menu']		= json_encode($menu); 
		$this->smartydata['my']			= $my;
		$this->smartydata['admintype']	= $admintype;
		$this->smartydata['dept']		= $dept;
		$this->smartydata['face']		= $this->rock->repempt($my['face'], 'images/noface.jpg');
		$this->smartydata['systemtitle']= $this->option->getval('systemtitle');
		$this->smartydata['systemlogo']	= $this->option->getval('systemlogo', 'images/icons40.png');
		
		$style  = (int)$this->rock->repempt($my['style'], '0');
		$stylea	= array('classic','neptune','access','gray');
		$this->smartydata['style']		= $style;
		$this->smartydata['stylenep']	= $stylea[$style];
	}
	
	public function changestyleAjax()
	{
		$xu = $this->get('xu');
		m('admin')->update("`style`='$xu'", $this->adminid);
	}


	/**
		获取菜单
	*/
	public function getmenuAjax()
	{
		$pid				= (int)$this->get('pid');
		$this->allmenuid	= $this->getsession('adminallmenuid');
		if($pid == 0){
			$menu = $this->getmenuchang();
		}else{
			$where	= "`pid`='$pid'";
			$menu	= $this->getmenu($where);
		}
		echo json_encode($menu);
	}
	public function getmenu($whe)
	{
		$stotal	= $this->db->getsql(array('table'	=> '[Q]menu',	'fields'=> 'count(1)',	'where'	=> '`pid`=a.`id` and `status`=1'));
		$menu	= $this->db->getrows('`[Q]menu` a', "$whe and `status`=1", '`name`,`id`,`icons`,`url`,`num`,`isopen`,`ischeck`,('.$stotal.')as `stotal`', '`sort`');
		$rows	= array();
		foreach($menu as $k=>$rs){
			$id	= $rs['id'];
			$st = $rs['stotal'];
			$sd	= '['.$id.']';
			$num= $rs['num'];
			$rs['text'] = $rs['name'];
			if($this->isempt($num))$num = 'menunum_'.$id.'';
			$bo	= true;
			$rs['leaf'] = true;
			if(!$this->isempt($rs['icons']))$rs['icon']='mode/icons/'.$rs['icons'].'.png';
			if($rs['isopen']==1)$rs['expanded'] = true;
			if($st>0){
				$rs['leaf'] 	= false;
				$children		= $this->getmenu("`pid`='$id'");	
				$rs['children']	= $children;
				if(count($children)<=0)$bo=false;
			}else{
				if(!$this->contain($this->allmenuid,$sd))$bo = false;
			}
			$rs['stotal']	= $st;
			if($this->allmenuid == '-1')$bo = true;
			$rs['num']		= $num;
			$rs['menutype']	= 'sys';
			if($bo)$rows[]	= $rs;
		}
		return $rows;
	}
	
	//常用菜单
	public function getmenuchang()
	{
		$arr = array();
		$rows = m('menucom')->getall("`uid`='$this->adminid' order by `sort`,`id`");
		foreach($rows as $k=>$rs){
			$arr[] = array(
				'leaf' => true,
				'name' => $rs['name'],
				'text' => $rs['name'],
				'icon' => $rs['icon'],
				'icons' => str_replace(array('mode/icons/','.png'),array('',''), $rs['icon']),
				'url' => $rs['url'],
				'num' => $rs['num'],
				'menutype' => 'cy'
			);
		}
		return $arr;
	}
	
	//添加常用
	public function addchangmenuAjax()
	{
		$num = $this->post('num');
		if($num=='')return;
		$db 	= m('menucom');
		$where 	= "`num`='$num' and `uid`='$this->adminid'";
		if($db->rows($where)==0)$where='';
		$db->record(array(
			'uid' => $this->adminid,
			'url' => $this->post('url'),
			'num' => $this->post('num'),
			'name' => $this->post('name'),
			'icon' => $this->post('icon'),
			'menuid' => $this->post('menuid'),
			'optdt' => $this->now
		), $where);
	}

	/**
		查看菜单权限
	*/	
	private function getuserext($uid)
	{
		$guid 	= '-1';
		if($this->adminuser=='admin')return $guid;
		$gasql	= " ( id in( select `sid` from `[Q]sjoin` where `type`='ug' and `mid`='$uid') or id in( select `mid` from `[Q]sjoin` where `type`='gu' and `sid`='$uid') )";//用户所在组id
		$gsql	= "select `id` from `[Q]group` where $gasql ";
		$owhe	= " and (`id` in(select `sid` from `[Q]sjoin` where ((`type`='um' and `mid`='$uid') or (`type`='gm' and `mid` in($gsql) ) ) ) or `id` in(select `mid` from `[Q]sjoin` where ((`type`='mu' and `sid`='$uid') or (`type`='mg' and `sid` in($gsql) )) ))";
		if($this->db->rows('`[Q]group`',"`ispir`=0 and $gasql")>0)$owhe=''; 	//不用权限验证的用户
		$guid	= '[0]';
		if($owhe != ''){
			$arss	= $this->db->getall("select `id`,`pid`,(select `pid` from `[Q]menu` where `id`=a.`pid`)as `mpid` from `[Q]menu` a where (`status` =1 $owhe) or (`status` =1 and `ispir`=0) order by `sort`");
			foreach($arss as $ars){
				$guid.=',['.$ars['id'].']';
				$bpid	= $ars['pid'];
				$bmpid	= $ars['mpid'];
				if(!$this->rock->contain($guid, '['.$bpid.']')){
					$guid.=',['.$bpid.']';
				}
				if(!$this->rock->isempt($bmpid)){
					if(!$this->rock->contain($guid, '['.$bmpid.']')){
						$guid.=',['.$bmpid.']';
					}
				}
			}
		}
		return $guid;
	}
	
	public function testAction()
	{
		$this->display = false;
		$arr = m('weixin:index')->sendnews('1', '今日会议', array(
			'title' => '会议',
			'description' => "参会人：开发部门\n时间：09:00-12:00",
			'url'	=> 'http://m.rockoa.com/meet.html'
		));
		print_r($arr);
	}
}