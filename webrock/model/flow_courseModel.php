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
			foreach($rows as $k=>$rs){
				$arr[$rs['actv']] = array($rs['name'], $rs['actv'], $rs['id'], $rs['nid'], $rs['color']);
			}
		}
		return $arr;
	}
}