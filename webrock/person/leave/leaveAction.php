<?php 
class leaveClassAction extends Action{
	
	
	public function publicbeforesave($table, $arr, $id)
	{
		
		$msg 	= m('kaoqin')->leavepan($arr['uid'], $arr['qjkind'], $arr['stime'], $arr['etime'], $arr['totals'], $id);
		return array('msg'=>$msg);
	}
	
	public function sickbeforeaction($table, $arr, $id)
	{
		$msg = '';
		$type= $arr['type'];
		$mid = $arr['mid'];
		$uid = $arr['uid'];
		$ladt = c('date')->lastmonth($this->date,'Y-m-01');
		$to   = 0;
		if($type==0){
			$tabs = 'kq_info';
			$rso = m($tabs)->getone("`id`='$mid' and `uid`='$uid' and `status`=1 and isxj=0 and `stime`>='$ladt' and `id`='$mid'",'qjkind');
			if($rso){
				$to 	= 1;
				$msg 	= m('kaoqin')->leavepan($uid, $rso['qjkind'], $arr['stime'], $arr['etime'], $arr['totals'], $mid);
			}
		}else{
			$tabs = 'kq_out';
			$to = m($tabs)->rows("`id`='$mid' and `uid`='$uid' and `status`=1 and isxj=0 and `outtime`>='$ladt'");
		}
		if($to==0)$msg='该单不能申请销假，可能已过期';
		if($msg==''){
			$to = m($table)->rows("`type`='$type' and `mid`='$mid' and `id`<>$id");
			if($to>0)$msg='请不要重复申请';
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
	
	
	/**
		读取销假的
	*/
	public function changetypesickAjax()
	{
		$type = (int)$this->get('type');
		$rows = array();
		$ladt = c('date')->lastmonth($this->date,'Y-m-01');
		if($type==0){
			$tabs = 'kq_info';
			$rows = m($tabs)->getall("`uid`='$this->adminid' and `status`=1 and isxj=0 and `stime`>='$ladt' order by `stime` desc",'`id`,`stime`,`etime`,`totals`');
		}else{
			$tabs = 'kq_out';
			$rows = m($tabs)->getall("`uid`='$this->adminid' and `status`=1 and isxj=0 and `outtime`>='$ladt' order by `outtime` desc",'`id`,`outtime`,`intime`');
		}
		$dbs 	= m('flow_bill');
		$rowss = array();
		foreach($rows as $k=>$rs){
			$vsl = $dbs->getmou('sericnum', "`table`='$tabs' and `mid`='".$rs['id']."'");
			if($vsl){
				if($type==0)$rowss[]=array($rs['id'], $vsl,$rs['stime'],$rs['etime'],$rs['totals']);
				if($type==1)$rowss[]=array($rs['id'], $vsl,$rs['outtime'],$rs['intime'],0);
			}
		}
		echo json_encode($rowss);
	}
}