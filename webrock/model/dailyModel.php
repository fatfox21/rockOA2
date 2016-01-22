<?php
class dailyClassModel extends Model
{
	
	public function dailyfenxi($uid, $mon, $addbo=false)
	{
		$dto	= c('date', true);
		$start 	= $mon.'-01';
		$enddt	= $dto->getenddt($mon);
		$jg		= $dto->datediff('d', $start, $enddt);
		$where  = "and `workdate`<='$enddt' and  ifnull(`quitdt`, '$enddt')>='$start'";
		if($uid!=0)$where="and `id`='$uid'";
		$urows	= m('admin')->getall("`isdaily`=1  $where", 'id,name,workdate,quitdt');
		
		$dtarr  = array();
		for($i=1; $i<=$jg+1; $i++){
			$oi	= ''.$i.'';
			if($i<10)$oi= '0'.$i.'';
			$dt = $mon.'-'.$oi.'';
			$dtarr[] = array($dt, strtotime($dt));
		}
		$kql  = m('kq');
		$qjdb = m('kq_info');
		$fxdb = m('dailyfx');
		$rows = array();
		foreach($urows as $k=>$urs){
			$totaly = 0;//应写
			$totalx	= 0;//已写次数
			$totalw	= 0;//未写次数
			$dtjoin	= '';
			$uid	= $urs['id'];
			$dtarra	= array();
			$ruzd	= 0;$lzzt = 9999999999999;
			if(!$this->isempt($urs['workdate']))$ruzd 	= strtotime($urs['workdate']);
			if(!$this->isempt($urs['quitdt']))$lzzt 	= strtotime($urs['quitdt']);
			
			foreach($dtarr as $dtss){
				$dt  = $dtss[0];
				if($dtss[1]<$ruzd || $dtss[1]>$lzzt || $dt>=$this->rock->date)continue;//入职离职判断
				$zt  = '';$xbo = true;$col = '';
				$iswork = $kql->isworkdt($dt, $uid);
				if(!$iswork){
					$zt  = '休息日';
					$col = 'green';
					$xbo = false;
				}
				//请假的
				if($xbo){
					if($qjdb->rows("uid='$uid' and `kind`='请假' and `status`=1 and `stime`<='$dt 09:00:00' and `etime`>='$dt 18:00:00'")>0){
						$xbo = false;
						$zt	 = '请假';
						$col = 'blue';
					}	
				}
				if($xbo){
					if($this->rows("uid='$uid' and `dt`='$dt'")>0){
						$totalx++;
						$zt  = '已写';
						$col = '#ff6600';
					}else{
						$dtjoin.=','.$dt.'';
						$zt  = '未写';
						$col = 'red';
					}						
					$totaly++;
				}
				$dtarra[$dt] = array($zt, $col);
			}
			$totalw = $totaly - $totalx;
			if($dtjoin!='')$dtjoin = substr($dtjoin, 1);
			
			$arr = array(
				'uid'		=> $uid,
				'totaly'	=> $totaly,
				'totalx'	=> $totalx,
				'totalw'	=> $totalw,
				'dtjoin'	=> $dtjoin,
				'month'		=> $mon,
				'optdt'		=> $this->rock->now,
				'optname'	=> $urs['name']
			);
			
			$rows[$uid] = array(
				'arr'	=> $arr,
				'dtarr'	=> $dtarra,
			);		
			if($addbo){
				$where = "uid='$uid' and `month`='$mon'";
				if($fxdb->rows($where)==0)$where='';
				$fxdb->record($arr, $where);
			}	
		}
		return $rows;
	}
}