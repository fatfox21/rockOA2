<?php
class flow_courseClassModel extends Model
{
	public function getcourseact($num)
	{
		$arr[1] = array('审核通过','green');
		$arr[2] = array('审核不通过','red');
		if($this->isempt($num))return $arr;
		$mid 	= (int)$this->db->getmou('[Q]flow_set','id', "`num`='$num'");
		$rows	= $this->db->getall("select * from [Q]flow_courseact where `mid`='$mid' order by `sort`");
		foreach($rows as $k=>$rs){
			$na = $rs['names'];
			if($this->isempt($na))$na = $rs['name'];
			$arr[$rs['actv']] = array($na, $rs['color']);
		}
		return $arr;
	}
	
	public function getcheckact($table, $mid)
	{
		$rulers = m('flow_rule')->getone("`table`='$table' and `mid`='$mid'", "`nowcourseid`");
		$arr[1] = array('通过','1', 0, 0,'green');
		$arr[2] = array('不通过','2', 0, -1, 'red');//-1需要填写说明
		if($rulers){
			$courseid 	= $rulers['nowcourseid'];
			$rows		= $this->db->getall("select * from [Q]flow_courseact where `cid`='$courseid' order by `sort`");
			if($this->db->count>0)$arr=array();
			foreach($rows as $k=>$rs){
				$arr[$rs['actv']] = array($rs['name'], $rs['actv'], $rs['id'], $rs['nid'], $rs['color']);
			}
		}
		return $arr;
	}
	
	
	public function getstatuss($tabs, $rs, $sp=',')
	{
		if(!$rs)return '<font color=#888888>记录不存在</font>';
		if($rs['isturn']!=1)return '<font color=#ff6600>待提交</font>';
		$ztname = '';
		$status = $rs['status'];
		if($status==5){
			$ztname = '<font color=#888888>已删除</font>';
			return $ztname;
		}
		//if(isset($ztarr[$rs['nstatus']]) && !$this->isempt($rs['statusman'])){
			//$ztname = ''.$rs['statusman'].'<font color="'.$ztarr[$rs['nstatus']][1].'">'.$ztarr[$rs['nstatus']][0].'</font>';
		//}
		$lostlog = m('flow_log')->getone("`table`='$tabs' and `mid`='".$rs['id']."' and courseid>0 order by `id` desc");
		$cols 	 = array('','green','red');
		if(is_array($lostlog)){
			$colss  = $cols[$lostlog['status']];
			if(!$this->isempt($lostlog['color']))$colss = $lostlog['color'];
			$zts = $lostlog['statusname'];
			if($this->contain($zts,'通过'))$zts='审核'.$zts.'';
			$ztname = ''.$lostlog['checkname'].'<font color="'.$colss .'">'.$zts.'</font>';
		}
		if(!$this->isempt($rs['nowcheckname']) && $status!=1){
			if($ztname!='')$ztname.=$sp;
			if($status==0){
				$ztname .= '<font color=blue>待'.$rs['nowcheckname'].'处理</font>';
			}else{
				$ztname .= '<font color=#9854F7>待提交人处理</font>';
			}
		}
		if($status==1 && $ztname=='')$ztname='<font color=green>已处理完成</font>';
		return $ztname;
	}
}