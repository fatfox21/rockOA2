<?php
class kaoqinClassModel extends Model
{
	
	
	public function initModel()
	{
		$this->settable('kq_info');
	}
	
	
	/**
		计算剩余假期时间
	*/
	public function getqjsytime($uid, $type, $dt, $id)
	{
		$types 	= '增加'.$type.'';
		if($type=='调休')$types='加班';
		$to1	= (int)$this->getmou("sum(totals)", "`kind`='请假' and `qjkind`='$type' and `uid`='$uid'  and `status` <>5 and `id`<>$id ");
		$zto	= (int)$this->getmou("sum(totals)", "`kind`='$types' and `uid`='$uid'  and `status`=1 and `stime`<='$dt'");
		
		return $zto - $to1;
	}
	
	/**
		判断这段时间是否可以申请请假
	*/
	public function leavepan($uid, $qjkind, $start, $end, $totals, $id=0)
	{
		$msg 	= '';
		$sdf 	= $this->rows("`uid`='$uid' and ((`stime`<='$start' and `etime`>='$start') or (`stime`<='$end' and `etime`>='$end') or (`stime`>='$start' and `etime`<='$end')) and `kind`='请假' and `id`<>'$id' and `status`<>5 ");
		if($sdf > 0){
			$msg = '该时间段已申请过了';
		}
		$tsjia	= '事假,病假';
		if($msg == '' && !$this->contain($tsjia, $qjkind)){
			$sy1	= $this->getqjsytime($uid, $qjkind, $start, $id);
			if($sy1<0)$sy1=0;
			$totals	= floatval($totals);
			if($totals>$sy1)$msg = '剩余['.$qjkind.']'.$sy1.'小时,不能申请';
		}
		return $msg;
	}
	
	public function getdkjl($finge, $month)
	{
		$startdt = ''.$month.'-01';
		$enddt	 = c('date')->getenddt($month);
		$rows 	 = m('kq_dkjl')->getall("`finge`='$finge' and `checktime`>='$startdt 00:00:00' and `checktime`<='$enddt 23:59:59' order by `checktime`",'`checktime`');
		$arr 	 = array();
		foreach($rows as $k=>$rs){
			$dts = explode(' ', $rs['checktime']);
			$dta = explode('-', $dts[0]);
			$d	 = (int)$dta[2];
			$arr[$d][] = $dts[1];
		}
		return $arr;
	}
	
	/**
		考勤分析
	*/
	public function getanay($uid, $month)
	{
		$start 	= ''.$month.'-01';
		$dtobj	= c('date');
		$end	= $dtobj->getenddt($month);
		$max 	= $dtobj->getmaxdt($month);
		
		$rows	= array();
		$ssras	= array();
		$ssra	= $this->db->getall("SELECT ztname,time,state,states,dt,iswork,emiao FROM `[Q]kq_anay` where `dt`>='$start' and `dt`<='$end' and `uid`='$uid' order by dt,sort");
		foreach($ssra as $k=>$rs)$ssras[$rs['dt']][] = $rs;
		$tojarr = array();
		for($i=1; $i<=$max; $i++){
			$str	= '';
			$iswork	= 0;
			$oi		= $i;
			if($i<10)$oi = '0'.$oi.'';
			$dt		= ''.$month.'-'.$oi.'';
			if(isset($ssras[$dt])){
				foreach($ssras[$dt] as $k1=>$rs){
					$iswork	= $rs['iswork']; $state = $rs['state']; $states = $rs['states']; $emiao = $rs['emiao'];
					if(!isset($tojarr[$state]))$tojarr[$state] = 0;
					
					$str.=''.$rs['ztname'].':';
					$s11 = '';
					$s11.=''.$state.'';
					if(!$this->isempt($rs['time'])){
						if(!$this->isempt($emiao)){
							$ois = floor((int)$emiao / 60);
							$s11.=''.$ois.'分钟';
						}
						$s11.='('.$rs['time'].')';
					}
					$col1 = '';
					if($state!='正常'){
						if($this->isempt($states))$col1='red';
					}	
					if($iswork==0){
						$col1='#888888';
						$s11.=',休息日';
					}
					if(!$this->isempt($states))$s11.=','.$states.'';
					$s11='<font color='.$col1.'>'.$s11.'</font>';
					$str.=''.$s11.'<br>';
					
					if($iswork==1 && $this->isempt($states))$tojarr[$state]++;//异常
				}
			}
			$rows[$i] = array(
				'str' 		=> $str,
				'iswork'	=> $iswork
			);
		}
		$rows[99] = $tojarr;
		return $rows;
	}
}