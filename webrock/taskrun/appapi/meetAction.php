<?php 
class meetClassAction extends appapiAction{
	
	public function getmeetAjax()
	{
		$dt 	= $this->date;
		$dtobj 	= c('date', true);
		$arr	= array();
		for($i=0; $i<3; $i++){
			$dt = $dtobj->adddate($dt, 'd', $i);
			$zts 	= '今日';
			if($i==1)$zts = '明天';
			if($i==2)$zts = '后天';
			$meet 	= m('meet')->getmeet($dt, $this->adminid);
			if(count($meet)>0){
				$week = $this->rock->cnweek($dt);
				$arr['['.$zts.']'.$dt.'(周'.$week.')'] = $meet;
			}
		}
		
		$this->showreturn($arr);
	}
}