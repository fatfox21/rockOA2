<?php
class kqClassModel extends Model
{
	public $xiudb;
	public $xiumrs 	= array();
	public $userarr = array();
	
	public function initModel()
	{
		$this->settable('kq_set');
		$this->xiudb	= m('kq_xiu');
		$this->getxiumrs();
	}
	
	private function getxiumrs()
	{
		$rows = $this->db->getall("select * from `[Q]kq_xium` where `id`>1 and `receid` is not null order by `sort`");
		foreach($rows as $k=>$rs){
			$st1	= 0;$et1 = 9999999999999;
			if(!$this->isempt($rs['startdt']))$st1 	= strtotime($rs['startdt']);
			if(!$this->isempt($rs['enddt']))$et1 	= strtotime($rs['enddt']);
			$rows[$k]['starttime'] = $st1;
			$rows[$k]['endtime'] = $et1;
		}
		$this->xiumrs = $rows;
	}
	
	//读取考勤设置每天的状态
	private function readkaoset()
	{
		$rows	= $this->getall("`type`=0 and `mid`=0 order by `sort`", '`id`,`receid`');
		$mid 	= 0;
		$a		= array();
		foreach($rows as $k=>$rs){
			$receid = $rs['receid'];
			if($this->isempt($receid))$mid = $rs['id'];
		}
		$rows	= $this->getall("`type`='$mid' order by `sort`", '`id`,`name`,`stime`');
		foreach($rows as $k=>$rs){
			$rs['state'] = '';
			$rs['time'] = '';
			$rs['rows'] = $this->getall("`mid`='".$rs['id']."' order by `sort`", '`id`,`name`,`stime`,`etime`,`qtype`');
			$a[] = $rs;
		}
		return $a;
	}
	
	/**
		获取默认某天应该上班时间段
		返回array(array('每天上班时间断'))
	*/
	public function getsbarr($uid=0, $dts='')
	{
		$rows	= $this->getall("`type`=0 and `mid`=0 order by `sort`", '`id`,`receid`');
		$mid 	= 0;
		foreach($rows as $k=>$rs){
			$receid = $rs['receid'];
			if($this->isempt($receid))$mid = $rs['id'];
		}
		$rows	= $this->getall("`type`='$mid' and `stime` is not null and `etime` is not null order by `sort`", '`id`,`name`,`stime`,`etime`,`dt`');
		$arr 	= array();
		foreach($rows as $k=>$rs){
			$dt = $rs['dt'];
			if($this->isempt($dt)){
				$arr[] = $rs;
			}else{
				if($dt == $dts)$arr[] = $rs;
			}
		}
		return $arr;
	}
	
	/**
		根据时间间隔获取上班时间（分钟，秒）
	*/
	public function getsbtime($sdt, $edt, $uid=0)
	{
		$arr 	= $this->getsbarr($uid);
		$tot	= 0;
		$sdt1	= strtotime($sdt);
		$edt1	= strtotime($edt);
		$dtsa	= explode(' ', $sdt);
		$dts	= $dtsa[0];
		$dtobj	= c('date', true);
		$jg		= $dtobj->datediff('d', $sdt, $edt);
		
		for($i=0; $i<$jg+1; $i++){
			if($i>0)$dts = $dtobj->adddate($dts, 'd', 1);
			if(!$this->isworkdt($dts, $uid))continue;
			foreach($arr as $k=>$rs){
				$_sts = strtotime($dts.' '.$rs['stime']);
				$_ets = strtotime($dts.' '.$rs['etime']);
				if($_sts<$sdt1)$_sts=$sdt1;
				if($_ets>$edt1)$_ets=$edt1;
				$_tisg = $_ets - $_sts;
				if($_tisg>0)$tot+=$_tisg;
			}
		}
		return $tot / 3600;
	}
	
	/**
		匹配人员应该属于那种休息日
		$uid 数组 或者 deptid,deptpath
	*/
	public function getxiuid($dt, $uid=0)
	{
		$mid 	= 1;
		if($uid==0)return $mid;
		$deptpath = '';
		if(is_array($uid)){
			$uid = $uid['id'];
			if(isset($uid['deptpath']))$deptpath = $uid['deptpath'];
		}else{
			if(!isset($this->userarr[$uid])){
				$_urs = $this->db->getone('[Q]admin', "`id`='$uid'", '`deptid`,`deptpath`');
				$this->userarr[$uid] = $_urs;
			}
			$deptpath = $this->userarr[$uid]['deptpath'];
		}
		$utid  	= $dtid  	= array();
		$dttime	= strtotime($dt);
		foreach($this->xiumrs as $k=>$rs){
			$artid = explode(',', $rs['receid']);
			if($rs['starttime'] > $dttime || $rs['endtime'] < $dttime)continue;
			foreach($artid as $ssid){
				if($ssid=='')continue;
				$fs  = substr($ssid, 0, 1);
				$sid = str_replace('u','', $ssid);
				$sid = str_replace('d','', $sid);
				if($fs=='d'){
					$dtid[$sid]= $rs;
				}else{
					$utid[$sid]= $rs;
				}					
			}
		}
		if(isset($utid[$uid]))$mid = $utid[$uid]['id'];
		if($mid == 1 && !$this->isempt($deptpath)){
			$depa = explode(',', str_replace(array('[',']'), array('',''), $deptpath));
			foreach($depa as $depas){
				if(isset($dtid[$depas]))$mid = $dtid[$depas]['id'];
			}
		}
		return $mid;
	}
	
	/**
		判断对应人员日期是不是工作日
	*/
	public function isworkdt($dt, $uid=0, $blx='bo')
	{
		$isbo 	= true;
		$oi		= 1;
		$mid	= $this->getxiuid($dt, $uid);
		if($this->xiudb->rows("`date`='$dt' and `mid`='$mid'")>0){
			$isbo = false;
			$oi = 0;
		}
		if($blx=='int')return $oi;
		return $isbo;
	}
	
	/**
		判断对应日期在当月是第几个工作日
	*/
	public function getworkxu($dts)
	{
		$dtsa 	= explode('-', $dts);
		$mon  	= ''.$dtsa[0].'-'.$dtsa[1].'';
		$dtobj	= c('date', true);
		$max 	= $dtobj->getmaxdt($mon);
		$dtc	= $mon.'-01';
		
		$oixu	= 0;
		for($i=0; $i<$max; $i++){
			if($i>0)$dtc = $dtobj->adddate($dtc, 'd', 1);
			if($this->isworkdt($dtc)){
				$oixu++;
			}
			if($dtc == $dts)break;
		}
		return $oixu;
	}
}