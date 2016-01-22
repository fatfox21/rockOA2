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
  `explain` varchar(500) DEFAULT NULL COMMENT '说明',
  `status` tinyint(1) DEFAULT '0' COMMENT '@0|待审核,1|审核通过,2|审核不通过',
  `isturn` tinyint(1) DEFAULT '0' COMMENT '@0|未提交,1|提交',
  `nowcheckid` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  `allcheckid` varchar(200) DEFAULT NULL COMMENT '@所以审核人',
  `nstatus` tinyint(1) DEFAULT '0' COMMENT '@当然状态',
  `statusman` varchar(20) DEFAULT NULL COMMENT '@审核人',
  `nowcheckname` varchar(50) DEFAULT NULL COMMENT '@当前审核人',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;";
			$this->db->query($sql);
		}
	}
}