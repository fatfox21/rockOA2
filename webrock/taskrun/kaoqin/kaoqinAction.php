<?php 
class kaoqinClassAction extends Action{
	
	//考勤分析
	public function fenxiAjax()
	{
		$sdt	= $this->post('startdt');
		$edt	= $this->post('enddt');
		$uid	= $this->post('uid');

		$date	= $this->date;
		$dtobj	= c('date', true);
		
		if($sdt == '')$sdt = $dtobj->adddate($date,'d', -3);
		if($edt == '')$edt = $dtobj->adddate($date,'d', -1);
		
		if(strtotime($edt)>time())$edt = $date;
		
		$jg		= $dtobj->datediff('d', $sdt, $edt);
		$uwhere	= 'workdate is not null and finge is not null and status=1';
		if($uid != '')$uwhere.=" and id in($uid)";
		$urows	= m('admin')->getall($uwhere, 'id,workdate,quitdt,finge');
		
		$dkjl	= m('kq_dkjl')->getall("`checktime` >='$sdt 00:00:00' and `checktime`<='$edt 23:59:59'  order by `checktime`");
		$dkrs	= array();
		foreach($dkjl as $k=>$rs){
			$sjl	= $rs['checktime'];
			$dtss = explode(' ', $sjl);
			$dkrs[$rs['finge']][] = array($dtss[0], $dtss[1], $sjl, strtotime($sjl));
		}
		$set	= $this->readkaoset();
		$db1 	= m('kq_anay');
		$kq 	= m('kq');
		$allarr = array();
		
		//请假和外出读取
		
		
		for($i=0; $i<=$jg; $i++){
			if($i>0)$sdt = $dtobj->adddate($sdt,'d', 1);
			$sdtss = strtotime($sdt);
			foreach($urows as $k=>$urs){
				$ruzd	= 0;$lzzt = 9999999999999;
				if(!$this->isempt($urs['workdate']))$ruzd 	= strtotime($urs['workdate']);
				if(!$this->isempt($urs['quitdt']))$lzzt 	= strtotime($urs['quitdt']);
				$uid	= $urs['id'];
				$zid   	= '0';
				
				//入职离职判断
				if($sdtss>=$ruzd && $sdtss<=$lzzt){
					$dtdk	= $this->getdk($dkrs, $urs['finge'], $sdt); //当天打卡记录
					$iswork	= $kq->isworkdt($sdt, $uid, 'int');
					$len	= count($dtdk);
					foreach($set as $k1=>$cog){//状态分析
						$ztname = $cog['name'];
						$sarr = array(
							'ztname'  => $ztname,
							'sort'  => $k1,
							'time'	=> '',
							'state'	=> '',
							'remark'=> '',
							'dt'	=> $sdt,
							'uid'	=> $uid,
							'optname'=> $this->adminname,
							'optdt'	=> $this->now,
							'iswork'=> $iswork
						);
						$time = '';$state = '未打卡';$remark = '';
						$zcarr= array();//读取正常时间段
						foreach($cog['rows'] as $k2=>$cog2){
							if($cog2['name']=='正常')$zcarr = $cog2;
						}
						if($len>0){//判断对应状态并且有打卡记录
							foreach($cog['rows'] as $k2=>$cog2){
								$st1	= strtotime($sdt.' '.$cog2['stime']);
								$et1	= strtotime($sdt.' '.$cog2['etime']);
								//获取这个时间段记录
								$jilsh	= array();
								foreach($dtdk as $k3=>$dtdks){
									if($dtdks[3] >= $st1 && $dtdks[3]<=$et1){
										$jilsh[] = $dtdks;
									}
								}
								$_lens = count($jilsh);
								if($_lens > 0){
									$jlsj	= $jilsh[0];
									if($cog2['qtype']==1)$jlsj	= $jilsh[$_lens-1];
									$time 	= $jlsj[1];
									$state 	= $cog2['name'];
									break;
								}
							}
						}
						$states = '';
						if($iswork==1 && $state !='正常')$states = $this->getstates($zcarr, $sdt, $uid);
						$sarr['time'] 	= $time;
						$sarr['remark'] = $remark;
						$sarr['state'] 	= $state;
						$sarr['states'] = $states;
						
						$where 	= "`dt`='$sdt' and `uid`='$uid' and `ztname`='$ztname'";
						$sid	= (int)$db1->getmou('id', $where);
						if($sid == 0)$where='';
						$db1->record($sarr, $where);
						if($sid == 0)$sid = $this->db->insert_id();
						$zid.=','.$sid.'';
						$sarr['id'] = $sid;
						$allarr[] 	= $sarr;
					}
				}
				$db1->delete("`id` not in($zid) and `dt`='$sdt' and `uid`='$uid'");
			}
		}
		
		echo 'success';
	}
	
	/**
	上班: (当前qtype==0)请假开始时间小于等于 设置正常的截止时间（取最小值）
	下班: (当前qtype==1)请假截止时间大于等于 设置正常的开始时间（取最大值）
	*/
	private function getstates($ztarr, $dts, $uid)
	{
		$st1	= strtotime($dts.' '.$ztarr['stime']);
		$et1	= strtotime($dts.' '.$ztarr['etime']);
		$s 		= '';
		$rows 	= $this->db->getall("select `stime`,`etime`,`qjkind` from `[Q]kq_info` where `uid`='$uid' and `status`=1 and `kind`='请假' and `stime`<='$dts 23:59:59' and `etime`>='$dts 00:00:00'");
		foreach($rows as $k=>$rs){
			$qst = strtotime($rs['stime']);
			$qet = strtotime($rs['etime']);
			if($ztarr['qtype']==1){
				if($qet >= $st1){
					$s = $rs['qjkind'];
				}
			}else{
				if($qst <= $et1){
					$s = $rs['qjkind'];
				}
			}
		}
		if($s==''){
			$rows 	= $this->db->getall("select `outtime`,`intime`,`atype` from `[Q]kq_out` where `uid`='$uid' and `status`=1 and `outtime`<='$dts 23:59:59' and `intime`>='$dts 00:00:00'");
			foreach($rows as $k=>$rs){
				$qst = strtotime($rs['outtime']);
				$qet = strtotime($rs['intime']);
				if($ztarr['qtype']==1){
					if($qet >= $st1){
						$s = $rs['atype'];
					}
				}else{
					if($qst <= $et1){
						$s = $rs['atype'];
					}
				}
			}
		}
		return $s;
	}
	
	
	
	
	private function getdk($arr, $finge, $dt)
	{
		$a	= array();
		if(isset($arr[$finge])){
			foreach($arr[$finge] as $dtss){
				if($dtss[0] == $dt)$a[] = $dtss;
			}
		}
		return $a;
	}

	//读取考勤设置
	private function readkaoset()
	{
		$db 	= m('kq_set');
		$rows	= $db->getall("`type`=0 and `mid`=0 order by `sort`", '`id`,`receid`');
		$mid 	= 0;
		$a		= array();
		foreach($rows as $k=>$rs){
			$receid = $rs['receid'];
			if($this->rock->isempt($receid))$mid = $rs['id'];
		}
		$rows	= $db->getall("`type`='$mid' order by `sort`", '`id`,`name`,`stime`');
		foreach($rows as $k=>$rs){
			$rs['state'] = '';
			$rs['time'] = '';
			$rs['rows'] = $db->getall("`mid`='".$rs['id']."' order by `sort`", '`id`,`name`,`stime`,`etime`,`qtype`');
			$a[] = $rs;
		}
		return $a;
	}
	
	public function testAjax()
	{
		//$api = c('apiCloud', true);
		//echo $api->send('1','enenen');
		//$json = "{'abc':'1','aa':'2'}";
		///$a = json_decode($json);
		//print_r($a);
		//echo $json;
		//echo m('flowlog')->getextview($this->adminid,'','a.');
		//$kq = m('kq');
		//echo $kq->isworkdt('2015-08-01', 1);
	}
	
	
	/**
		日报分析
	*/
	public function dailyfxAjax()
	{
		$nmonth	= date('Y-m');
		$uid	= (int)$this->request('uid', '0');
		$month	= $this->request('month', $nmonth);
		m('daily')->dailyfenxi($uid, $month, true);
		echo 'success';
	}
	

}