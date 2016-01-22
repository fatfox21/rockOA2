<?php 
class leaveClassAction extends Action{
	
	
	public function publicbeforesave($table, $arr, $id)
	{
		$msg 	= '';
		$start 	= $arr['stime'];
		$end 	= $arr['etime'];
		$qjkind	= $arr['qjkind'];
		$db		= m($table);
		$sdf 	= $db->rows("`uid`='".$arr['uid']."' and ((`stime`<='$start' and `etime`>='$start') or (`stime`<='$end' and `etime`>='$end') or (`stime`>='$start' and `etime`<='$end')) and `kind`='请假' and `id`<>'$id' and `status`<>5 ");
		if($sdf > 0){
			$msg = '该时间段已申请过了';
		}
		$tsjia	= '事假,病假';
		if($msg == '' && !$this->contain($tsjia, $qjkind)){
			$sy1	= m('kaoqin')->getqjsytime($arr['uid'], $qjkind, $start, $id);
			if($sy1<0)$sy1=0;
			if($arr['totals']>$sy1)$msg = '剩余['.$qjkind.']'.$sy1.'小时,不能申请';
		}
		return array('msg'=>$msg);
	}
	
	//统计请假时间
	public function totalAjax()
	{
		$start	= $this->post('stime');
		$end	= $this->post('etime');
		$sj 	= ceil(m('kq')->getsbtime($start, $end));
		echo json_encode(array($sj, ''));
	}
	
	
	public function publicstoreAfter($table, $rows)
	{
		$opentype	= $this->post('opentype');
		$arr		= array();
		//可用年假	= 总假期 - 已申请的年假
		if($opentype == '0'){
			$db = m($table);
			$month	= date('Y-m');
			$to1	= (int)$db->getmou("sum(totals)", "`kind`='请假' and `uid`='$this->adminid' and `stime` like '".$month."%' and `status` in(0,1)");
			$to2	= (int)$db->getmou("sum(totals)", "`kind` like '增加%' and `uid`='$this->adminid' and `status`=1");
			$to3	= 0;
			$arr['totalstring'] = '本月请假<font color=red>'.$to1.'</font>小时，可用假期<font color=green>'.$to3.'</font>小时';
		}
		return $arr;
	}
}