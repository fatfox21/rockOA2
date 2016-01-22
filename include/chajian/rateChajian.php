<?php 
/**
	任务队列
*/
class rateChajian extends Chajian{


	private function runquery($table, $date='', $stime='', $ntime='')
	{
		if($date == '')$date=date('Y-m-d');
		$arr	= m('tasktime')->getall("`table`='$table' and `mid`>0 and (startdt<='".$date." 23:59:59' or startdt is null) and (enddt>='".$date." 00:00:00' or enddt is null)");
		$dt		= explode('-', $date);
		$rows	= array();
		$week	= $this->rock->cnweek($date);
		$workbo	= true;//是工作日
		if(m('kq_xiu')->rows("`date`='$date' and `mid`=1")>0)$workbo=false;
		$allid	= '0';
		$cjdt	= c('date', true);
		$mntime	= 0;
		$mstime	= 0;
		if($ntime != '')$mntime = strtotime($date.' '.$ntime);
		if($stime != '')$mstime = strtotime($date.' '.$stime);
		foreach($arr as $k=>$rs){
			$sj		= $rs['shijian'];
			$sj		= str_replace(array('年','月','日','时','分','秒'),array('-','-','',':',':',''),$sj);
			$sid	= $rs['id'];
			$mid	= $rs['mid'];
			$val	= (int)$rs['rateval'];
			if($val<=0)$val=1;
			$st 	= 0;
			$et 	= 9999999999999;
			$stiie 	= $this->rock->repempt($rs['stime'], '00:00');
			$etiie 	= $this->rock->repempt($rs['etime'], '23:59');
			$stdt	= $rs['optdt'];
			if(!$this->rock->isempt($rs['startdt'])){
				$st 	= strtotime($rs['startdt']);
				$stdt	= $rs['startdt'];
			}
			if(!$this->rock->isempt($rs['enddt']))$et = strtotime($rs['enddt']);
			
			if($mstime >0 && $mstime>$st)$st = $mstime;
			if($mntime >0 && $mntime<$et)$et = $mntime;
			
			$atype	= $rs['atype'];
			switch($atype){
				case '仅一次':
					$runtime = $sj;
					if($this->rock->contain($runtime, $date)){
						$runtimes = strtotime($runtime);
						$rows[] = array(
							'runtime' => $runtime,
							'runtimes'=> $runtimes,
							'mid'	  => $mid,
							'id'	  => $sid,
							'st'	  => $st,
							'et'	  => $et	
						);
						$allid.=','.$mid.'';
					}
				break;
				case '分钟':
					$estea = ''.$date.' '.$etiie.':59';
					$eteim = strtotime($estea);
					
					$sstea = ''.$date.' '.$stiie.':'.$sj.'';
					$steim = strtotime($sstea);
					
					for($i=0; $i<60*24; $i=$i+$val){
						if($i>0){
							$sstea = $cjdt->adddate($sstea,'s', $val * 60, 'Y-m-d H:i:s');
							$steim = $steim + $val * 60;
						}
						if($steim<=$eteim && $steim <=$et){
							$rows[] = array(
								'runtime' => $sstea,
								'runtimes'=> $steim,
								'mid'	  => $mid,
								'id'	  => $sid,
								'st'	  => $st,
								'et'	  => $et
							);
						}else{
							break;
						}
					}
					$allid.=','.$mid.'';
				break;
				case '小时':
					$st1	= strtotime(''.$date.' '.$stiie.':00');
					$et1	= strtotime(''.$date.' '.$etiie.':59');
					if($st1 > $st)$st = $st1;
					if($et1 < $et)$et = $et1;
					
					for($i=0;$i<24;$i=$i+$val){
						$i1= ''.$i.'';
						if($i<10)$i1='0'.$i1;
						$runtime = ''.$date.' '.$i1.':'.$sj.'';
						$rows[] = array(
							'runtime' => $runtime,
							'runtimes'=>  strtotime($runtime),
							'mid'	  => $mid,
							'id'	  => $sid,
							'st'	  => $st,
							'et'	  => $et
						);
					}
					$allid.=','.$mid.'';
				break;
				case '天':
					$jgts	 = $cjdt->datediff('d', $stdt, $date);
					if($jgts % $val==0){
						$runtime = ''.$date.' '.$sj.'';
						$rows[]  = array(
							'runtime' => $runtime,
							'runtimes'=> strtotime($runtime),
							'mid'	  => $mid,
							'id'	  => $sid,
							'st'	  => $st,
							'et'	  => $et
						);
						$allid.=','.$mid.'';
					}
				break;
				
				case '月':
					$runtime = ''.$dt[0].'-'.$dt[1].'-'.$sj.'';
					if($this->rock->contain($runtime, $date)){
						$jgts	 = $cjdt->datediff('m', $stdt, $date);
						if($jgts % $val==0){
							$rows[] = array(
								'runtime' => $runtime,
								'runtimes'=> strtotime($runtime),
								'mid'	  => $mid,
								'id'	  => $sid,
								'st'	  => $st,
								'et'	  => $et
							);
							$allid.=','.$mid.'';
						}
					}
				break;
				
				case '年':
					$runtime = ''.$dt[0].'-'.$sj.'';
					if($this->rock->contain($runtime, $date)){
						$jgts	 = $cjdt->datediff('Y', $stdt, $date);
						if($jgts % $val==0){
							$rows[] = array(
								'runtime' => $runtime,
								'runtimes'=> strtotime($runtime),
								'mid'	  => $mid,
								'id'	  => $sid,
								'st'	  => $st,
								'et'	  => $et
							);
							$allid.=','.$mid.'';
						}
					}
				break;
				
				case '工作日':
					$runtime = ''.$date.' '.$sj.'';
					if($workbo){
						$rows[] = array(
							'runtime' => $runtime,
							'runtimes'=> strtotime($runtime),
							'mid'	  => $mid,
							'id'	  => $sid,
							'st'	  => $st,
							'et'	  => $et
						);
						$allid.=','.$mid.'';
					}
				break;
				
				case '休息日':
					$runtime = ''.$date.' '.$sj.'';
					if(!$workbo){
						$rows[] = array(
							'runtime' => $runtime,
							'runtimes'=> strtotime($runtime),
							'mid'	  => $mid,
							'id'	  => $sid,
							'st'	  => $st,
							'et'	  => $et
						);
						$allid.=','.$mid.'';
					}
				break;
			}
			
			if($atype == '周'.$week.''){
				$jgts	 = $cjdt->datediff('d', $stdt, $date);
				if($jgts % $val*7 ==0){
					$runtime = ''.$date.' '.$sj.'';
					$rows[] = array(
						'runtime' => $runtime,
						'runtimes'=> strtotime($runtime),
						'mid'	  => $mid,
						'id'	  => $sid,
						'st'	  => $st,
						'et'	  => $et
					);
					$allid.=','.$mid.'';
				}
			}
		}
		$row  = array();
		foreach($rows as $k=>$rs){
			if($rs['runtimes']>=$rs['st'] && $rs['runtimes']<=$rs['et']){
				$row[] = $rs;
			}
		}
		$resa = array('rows'=>$row,'allid'=>$allid);
		return $resa;
	}
	
	/**
		读取结果
	*/
	public function result($table, $dt='', $whe='', $stime='', $ntime='')
	{
		if($dt=='')$dt=date('Y-m-d');
		$arr	= $this->runquery($table, $dt, $stime, $ntime);
		$rowsa	= $arr['rows'];
		$allid	= $arr['allid'];
		if($allid=='0')return array();
		$arows	= m($table)->getall("`id` in($allid) $whe");
		$marr	= array();
		foreach($arows as $k=>$rs){
			$marr[$rs['id']] = $rs;
		}
		
		$barr 	= array();
		$ntie	= time();
		$oi		= 0;
		foreach($rowsa as $k=>$rb){
			$runst = $rb['runtimes'];
			if(isset($marr[$rb['mid']])){
				$nobj 	= $marr[$rb['mid']];
				$nobj['runtime']  = $rb['runtime'];
				$nobj['runtimes'] = $runst;
				$nobj['sid']	  = $rb['id'];//tasktime的ID
				$nobj['id'] 	  = null;
				$nobj['mid']	  = $rb['mid'];//主信息ID
				$nobj['ohui']	  = ($runst<$ntie)?'1':'0';
				$barr[] = $nobj;
				$oi++;
			}
		}
		$array	= c('array', true);
		$barrs	= $array->order($barr,'runtimes','asc');
		return $barrs;
	}
}                               