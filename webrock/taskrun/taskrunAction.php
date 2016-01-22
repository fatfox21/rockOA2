<?php 
class taskrunClassAction extends Action{
	
	/**
		读取今天运行的任务
	*/
	public function baseAjax()
	{
		$rate	= c('rate', true);
		$dt		= date('Y-m-d');
		$ndt	= date('Y-m-d', strtotime('+1 day'));
		$rows	= $rate->result('task', $dt, 'and `status`=1');
		$rowas	= $rate->result('task', $ndt, 'and `status`=1', '00:00:00','00:10:00');
		foreach($rowas as $k1=>$rs1)$rows[] = $rs1;
		
		$rowa	= array();
		$str	= '';
		foreach($rows as $k=>$rs){
			if($rs['ohui']==0){
				$rowa[] = $rs;
				$str.=$this->rock->strformat('@?0|?1|?2|?3|?4', $rs['runtime'], $rs['name'], $rs['url'], $rs['mid'], $rs['sid']);
			}	
		}
		if($str != '')$str = substr($str,1);
		echo $str;
	}
	
	
}