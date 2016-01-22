<?php
class setClassAction extends Action
{

	public function savefieldsAjax()
	{
		$id = $this->rock->post('id');
		m('flow_set')->record(array(
			'fields'	=> $this->rock->post('fields')
		), $id);
	}
	
	
	public function pipeiAjax()
	{
		$sid 	= $this->post('id');
		$rows	= m('flow_set')->getall("`id` in($sid) and `isflow`=1 and `table` is not null order by `sort`", 'num');
		$str	= '';
		$mess	= '';//邮件内容
		$naes	= '';
		
		foreach($rows as $k=>$rsss){
			$flow	 = f($rsss['num']);
			$arrs	 = $flow->reloadpipei();
			$str	.= ''.($k+1).'、'.$arrs[0];
		}
		echo $str;
	}
	
	public function pandtablela($table, $cans, $id)
	{
		$tab 		= $cans['table'];
		if($this->isempt($tab))return;
		$alltabls 	= $this->db->getalltable();
		if(!in_array(''.PREFIX.''.$tab.'', $alltabls)){
			$sql = "CREATE TABLE `[Q]".$tab."` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `optdt` datetime DEFAULT NULL COMMENT '操作时间',
  `optid` int(11) DEFAULT NULL,
  `optname` varchar(20) DEFAULT NULL COMMENT '操作人',
  `applydt` date DEFAULT NULL COMMENT '申请日期',
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `status` tinyint(1) DEFAULT '0',
  `isturn` tinyint(1) DEFAULT '0',
  `nowcheckid` varchar(50) DEFAULT NULL,
  `allcheckid` varchar(200) DEFAULT NULL,
  `nstatus` tinyint(1) DEFAULT '0',
  `statusman` varchar(20) DEFAULT NULL,
  `nowcheckname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";
			$this->db->query($sql);
		}
	}
	
	
	public function pagesetAction()
	{
		$setid	= $this->get('setid');
		$rs 	= m('flow_set')->getone("`id`='$setid'");
		if(!$rs)exit('sorry!');
		$this->smartydata['rs'] = $rs;
		$this->title  = $rs['name'].'_页面设置';
		
		$table  = $rs['table'];
		$farr	= c('edit')->getfield($table, 1);
		$fleft	= array();
		$fleft[]= array('base_name', '申请人');
		$fleft[]= array('base_deptname', '申请部门');
		$fleft[]= array('base_sericnum', '单号');
		foreach($farr as $k=>$rs1){
			$fleft[] = array($k, $rs1['name']);
		}
		$fleft[] = array('file_content', '相关文件');
		$this->smartydata['fleft'] = $fleft;
		$path 		= ''.ROOT_PATH.'/webrock/flow/applyview/page/page_'.$rs['num'].'.html';
		$content 	= '';
		if(file_exists($path)){
			$content = file_get_contents($path);
		}
		$this->smartydata['content'] = $content;
	}
	
	public function pagesaveAjax()
	{
		$content = $this->post('content');
		$num 	 = $this->post('num');
		$path 		= 'webrock/flow/applyview/page/page_'.$num.'.html';
		$this->rock->createtxt($path, $content);
		echo 'success';
	}
}