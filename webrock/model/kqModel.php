<?php
class kqClassModel extends Model
{
	public $xiudb;
	public $xiumrs 	= array();
	public $userarr = array();
	public $setmrs	= array();
	
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
	
	
	private function getsetmrs($dt)
	{
		$a = array();
		if(isset($this->setmrs[$dt])){
			$a = $this->setmrs[$dt];
			return $a;
		}
		$where= "`startdt`<='$dt' and `enddt`>='$dt' and `receid` is not null";
		$rows = $this->db->getall("select `startdt`,`enddt`,`id`,`mid`,`receid` from `[Q]kq_setm` where $where  order by `sort`");
		foreach($rows as $k=>$rs){
			$st1	= 0;$et1 = 9999999999999;
			if(!$this->isempt($rs['startdt']))$st1 	= strtotime($rs['startdt']);
			if(!$this->isempt($rs['enddt']))$et1 	= strtotime($rs['enddt']);
			$rows[$k]['starttime'] = $st1;
			$rows[$k]['endtime'] = $et1;
		}
		$this->setmrs[$dt] = $rows;
		return $rows;
	}
	
	/**
		读取考勤设置每天的状态
	*/
	public function readkaoset($dt, $uid=0)
	{
		$mid 	= $this->getkqid($dt, $uid);
		$a		= array();
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
		获取默认某天应该上班时间段,默认都是1全体人员
		返回array(array('每天上班时间断'))
	*/
	public function getsbarr($uid=0, $dts='')
	{
		$mid 	= $this->getkqid($dts, $uid);
		$rows	= $this->getall("`type`='$mid' and `stime` is not null and `etime` is not null order by `sort`", '`id`,`name`,`stime`,`etime`,`dt`');
		$arr 	= $rows;
		return $arr;
	}
	
	/**
		根据时间间隔获取上班时间小时
	*/
	public function getsbtime($sdt, $edt, $uid=0)
	{
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
			$arr 	= $this->getsbarr($uid, $dts);
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
		匹配人员应该属于那种休息日(xium)
		数据匹配
		$uid 数组 或者 deptid,deptpath
	*/
	public function getxiuid($dt, $uid=0)
	{
		return $this->getxiuidss($dt, $uid, $this->xiumrs, 'id');
	}
	
	/**
		匹配对应考勤id（setm）
	*/
	public function getkqid($dt, $uid=0)
	{
		if($uid==0 || $dt=='')return 1;
		$arr = $this->getsetmrs($dt);
		return $this->getxiuidss($dt, $uid, $arr, 'mid');
	}
	
	
	private function getxiuidss($dt, $uid=0, $xiumrs, $esfi='mid')
	{
		$mid 	= m('pipei')->getpipeimid($uid, $xiumrs, $esfi, 1, $dt);
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
	
	
	/**
		读取某个人日期对应考勤时间
	*/
	public function getkqtime()
	{
		
	}
}