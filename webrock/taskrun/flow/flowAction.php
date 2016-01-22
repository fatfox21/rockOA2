<?php 
class flowClassAction extends Action{
	

	public function repipeiAjax()
	{
		$rows	= m('flow_set')->getall("`isflow`=1 and `table` is not null order by `sort`", 'num');
		$str	= '';
		foreach($rows as $k=>$rsss){
			$flow	 = f($rsss['num']);
			$arrs	 = $flow->reloadpipei();
			$str	.= ''.($k+1).'、'.$arrs[0];
		}
		echo 'success';
	}
	
	
	/**
		流程单据查看
	*/
	public function viewAction()
	{
		$this->tpltype = 'html';
		$uid		= $this->jm->gettoken('uid');
		$modenum	= $this->jm->gettoken('modenum');
		$table		= $this->jm->gettoken('table');
		$mid		= $this->jm->gettoken('mid');
		if($modenum == '' || $mid=='')exit('sorry!');
		
		$flow		= f($modenum);
		$flow->initrecord($mid);
		if(!$flow->rs)exit('记录不存在');
		
		$this->title					= $flow->flowname;
		$this->smartydata['content']	= $flow->contentview();
		
		//判断是不是我审核
		$table 		= $flow->table;
		$arr		= m('flowlog')->getdatalog($modenum, $table, $mid, $uid);
		$this->smartydata['arr']	= $arr;
		$this->smartydata['urs']	= m('admin')->getall("`id` in($uid) order by `sort`",'`id`,`name`,`ranking`');
	}
	
	/**
		提交审核
	*/
	public function checkAjax()
	{
		$flownum	= $this->post('flownum');
		$id			= (int)$this->post('id');
		$cid		= (int)$this->post('cid');
		$zt			= (int)$this->post('zt');
		$sm			= $this->post('sm');
		$flow = f($flownum);
		$flow->adminid 		= $cid;
		$flow->adminname 	= m('admin')->getmou('name',"`id`='$cid'");
		$flow->initrecord($id);
		echo $flow->check($zt, $sm, $cid);
	}
}